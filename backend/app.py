from flask import Flask, request, json, jsonify
from flask_cors import CORS
import uuid
import pptxOperations
import pdfOperations

app = Flask(__name__)
CORS(app)

@app.route("/hello")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/create-slides", methods=['POST', 'GET'])
def create_slides():
    if request.method=='POST':
        filename = str(uuid.uuid4()) +'.pptx'
        slides = request.get_json()
        if not slides:
            return jsonify({'message': 'No data provided'}), 400
        if(pptxOperations.create_pptx(slides,filename)):
            return jsonify(filename), 200
        else:
            return jsonify({'message': 'Cannot create pptx file'}), 400

    else:
        filename = str(uuid.uuid4()) +'.pptx'
        
        slides=[
            {'title': 'Sample Text','content':'This is a default pptx file.'},
            {'title': 'slide2','content':'content2'}
        ]
        pptxOperations.create_pptx(slides,filename)
        return jsonify(filename), 200

@app.route("/api/extract-pdf-tables", methods=['POST', 'GET'])
def extract_pdf_tables():
    if request.method=='POST':
        return jsonify("ok")
    else:
        pdfOperations.extract_tables("foo.pdf")
        return jsonify("ok")
