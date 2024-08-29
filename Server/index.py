import os
import pdfplumber
import subprocess
import json
import time

def extract_text(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    text = ''
    
    if ext == '.txt':
        with open(file_path, 'r') as file:
            text = file.read()
    elif ext == '.pdf':
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text
    else:
        raise ValueError("Unsupported file type: " + ext)
    
    return text

def run_ollama(prompt, model_name, retries=3):
    command = ['ollama', 'run', model_name]
    
    for attempt in range(retries):
        try:
            result = subprocess.run(command, input=prompt, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=240)
        except subprocess.TimeoutExpired:
            print(f"Ollama command timed out on attempt {attempt + 1}. Retrying...")
            time.sleep(5)  # Wait before retrying
            continue
        
        if result.returncode != 0:
            print(f"Error running Ollama on attempt {attempt + 1}: {result.stderr}")
            return None

        # Print the raw output for debugging
        print(f"Raw output from Ollama (attempt {attempt + 1}):")
        print(result.stdout)

        # Extract JSON from the raw output
        raw_output = result.stdout.strip()
        
        json_start = raw_output.find('{')
        json_end = raw_output.rfind('}') + 1
        
        if json_start != -1 and json_end != -1:
            json_content = raw_output[json_start:json_end]
            try:
                return json.loads(json_content)
            except json.JSONDecodeError:
                print("Failed to decode JSON from Ollama output.")
                continue

        print("No valid JSON found in the output.")
        return None
    
    print("Failed to get valid JSON from Ollama after multiple attempts.")
    return None

def extract_info_from_file(file_path, model_name):
    # Extract text from the file
    extracted_text = extract_text(file_path)

    # Split the text into separate conversations
    conversations = extracted_text.split('##')

    # Process each conversation
    results = []
    for conversation in conversations:
        conversation = conversation.strip()
        if conversation:  # Avoid processing empty conversations
            # Prepare the prompt with the specified format
            prompt = f"""
            Extract the following information from the provided text and return it in JSON format:

            1. Customer Requirements for a Car:
                - Car Type (Hatchback, SUV, Sedan)
                - Fuel Type
                - Color
                - Distance Travelled
                - Make Year
                - Transmission Type
            2. Company Policies Discussed:
                - Free RC Transfer
                - 5-Day Money Back Guarantee
                - Free RSA for One Year
                - Return Policy
            3. Customer Objections:
                - Refurbishment Quality
                - Car Issues
                - Price Issues
                - Customer Experience Issues (e.g., long wait time, salesperson behaviour)
          
            Text: {conversation}    
            
            Output format:
            {{
                "conversations": [
                    {{
                        "customer_requirements": {{
                            "car_type": "",
                            "fuel_type": "",
                            "color": "",
                            "distance_travelled": "",
                            "make_year": "",
                            "transmission_type": ""
                        }},
                        "company_policies": {{
                            "free_rc_transfer": false,
                            "five_day_money_back_guarantee": false,
                            "free_rsa_for_one_year": false,
                            "return_policy": ""
                        }},
                        "customer_objections": {{
                            "refurbishment_quality": "",
                            "car_issues": "",
                            "price_issues": "",
                            "customer_experience_issues": ""
                        }}
                    }}
                ]
            }}
            """

            # Run the prompt through Ollama
            response = run_ollama(prompt, model_name)
            
            if response:
                results.append(response)
            else:
                results.append({"error": "Failed to extract information from one conversation"})
    
    return results

# Example usage
if __name__ == "__main__":
    file_path = 'combined.txt'  # Replace with the actual file path
    model_name = 'llama3.1'  # Replace with the actual model name
    
    # Extract information from the combined file
    extracted_info = extract_info_from_file(file_path, model_name)
    
    # Save the response as a JSON file
    with open('extracted_info.json', 'w') as json_file:
        json.dump(extracted_info, json_file, indent=4)
    print("Extracted information saved to extracted_info.json")
