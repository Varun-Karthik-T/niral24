# extractor/index.py

import os
import pdfplumber
import subprocess
import json

def extract_text(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    text = ''
    print("Extracting text from file")
    if ext == '.txt':
        with open(file_path, 'r') as file:
            text = file.read()
    elif ext == '.pdf':
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text()
    else:
        raise ValueError("Unsupported file type: " + ext)
    
    return text

def run_ollama(prompt, model_name):
    command = ['ollama', 'run', model_name]
    print("running llama")
    # Execute the command and pass the prompt via stdin
    result = subprocess.run(command, input=prompt, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    if result.returncode != 0:
        print(f"Error running Ollama: {result.stderr}")
        return None

    # Print the raw output to troubleshoot
    print("Raw output from Ollama:")
    print(result.stdout)

    # Attempt to clean and extract JSON from the raw output
    raw_output = result.stdout.strip()
    
    # Try to locate where the JSON content begins and ends
    json_start = raw_output.find('{')
    json_end = raw_output.rfind('}') + 1
    
    if json_start != -1 and json_end != -1:
        json_content = raw_output[json_start:json_end]
        try:
            return json.loads(json_content)
        except json.JSONDecodeError:
            print("Failed to decode JSON from cleaned Ollama output.")
            return None
    else:
        print("No valid JSON found in the output.")
        return None

def extract_info_from_pdf(file_path, model_name):
    # Extract text from the PDF file
    extracted_text = extract_text(file_path)

    # Prepare the prompt by injecting the extracted text
    prompt = f"""
    Extract the following information from the provided text and return in JSON format:

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

    Text: {extracted_text}
    """

    # Run the prompt through Ollama
    response = run_ollama(prompt, model_name)
    
    return response

# Example usage
if __name__ == "__main__":
    file_path = 'conv1.pdf'  # Replace with the actual file path
    model_name = 'llama3.1'  # Replace with the actual model name
    
    # Extract information
    info = extract_info_from_pdf(file_path, model_name)
    
    # Save the response as a JSON file
    if info:
        with open('extracted_info.json', 'w') as json_file:
            json.dump(info, json_file, indent=4)
        print("Extracted information saved to extracted_info.json")
    else:
        print("Failed to extract information.")
