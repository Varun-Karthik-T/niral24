from flask import Flask, request, jsonify
from extractor.index import extract_info_from_pdf
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/pdf", methods=["POST"])
def upload_pdf():
    print("request received")
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Check for valid file types (PDF or TXT)
    if file and (file.filename.endswith('.pdf') or file.filename.endswith('.txt')):
        file_path = f"./uploads/temp{file.filename}"
        file.save(file_path)
        
        # Update the function to handle both PDF and TXT files
        result = extract_info_from_pdf(file_path, "llama3.1")
        
        return jsonify({"message": "File received successfully", "data": result}), 200
    
    return jsonify({"error": "Invalid file type, only PDF or TXT allowed"}), 400

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=3000)
