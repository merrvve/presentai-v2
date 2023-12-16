from flask import Flask, request, json, jsonify, send_from_directory
from flask_cors import CORS
import uuid
import pptxOperations
import pdfOperations
import pubmedOperations

app = Flask(__name__)
CORS(app)

@app.route("/hello")
def hello_world():
    work_id=str(uuid.uuid4())

    result=pubmedOperations.searchPubmed('vitamin b12 deficiency infants',work_id)
    
    return result

@app.route("/api/search-pubmed", methods=['POST'])
def serach_pubmed():
    message = request.get_json()
    work_id=str(uuid.uuid4())
    result=pubmedOperations.searchPubmed(message['query'],work_id)
    return result
        

@app.route("/api/create-slides", methods=['POST', 'GET'])
def create_slides():
    if request.method=='POST':
        filename = str(uuid.uuid4()) +'.pptx'
        textInput = request.get_json()
        isGPT=False
        if not textInput:
            return jsonify({'message': 'No data provided'}), 400
        if(textInput['tool']==2):
            isGPT=True
        if(pptxOperations.create_pptx(textInput['text'],filename,isGPT)):
            return send_from_directory('userDocs', filename, as_attachment=True), 200
        else:
            return jsonify({'message': 'Cannot create pptx file'}), 400
        return "ok"
    else:
        filename = str(uuid.uuid4()) +'.pptx'
        
        text="deneme, deneme.deneme. dedmem \n\n grjklgjrelg"
        pptxOperations.create_pptx(text,filename,False)
        return jsonify(filename), 200

@app.route("/api/extract-pdf-tables", methods=['POST', 'GET'])
def extract_pdf_tables():
    if request.method=='POST':
        return jsonify("ok")
    else:
        pdfOperations.extract_tables("foo.pdf")
        return jsonify("ok")
