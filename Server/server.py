# server.py

from flask import Flask, request, jsonify
from extractor.index import extract_info_from_pdf

app = Flask(__name__)

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
    
    if file and file.filename.endswith('.pdf'):
        file.save(f"./uploads/temp.pdf")
        result = extract_info_from_pdf("./uploads/temp.pdf", "llama3.1")
        
        return jsonify({"message": "PDF received successfully", "data": result}), 200
    
    return jsonify({"error": "Invalid file type, only PDF allowed"}), 400

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')
