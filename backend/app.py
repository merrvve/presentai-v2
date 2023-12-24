from flask import Flask, request, json, jsonify, send_from_directory
from flask_cors import CORS
import uuid
import pptxOperations
import pdfOperations
import pubmedOperations
import openaiOperations
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime
import pytz

load_dotenv()



app = Flask(__name__)
CORS(app)


istanbul = pytz.timezone('Europe/Istanbul')
DB_CONNECTION_STRING = os.getenv('DB_CONNECTION_STRING')



# MongoDB setup
client = MongoClient(DB_CONNECTION_STRING)  # Replace with your MongoDB connection string
db = client['presentai']

@app.route("/hello")
def hello_world():
    #work_id=str(uuid.uuid4())

    #result=pubmedOperations.searchPubmed('mirna and vitamin d',work_id)
    openaiOperations.openaiCompletion("x")
    result="ok"
    return result

@app.route("/api/add-contact", methods=['POST'])
def add_contact():
    contact = request.get_json()
    if not contact:
        return jsonify({'message': 'No data provided'}), 400
    contact['created_date']= datetime.now(istanbul)
    db.contacts.insert_one(contact)
    return jsonify("ok")

@app.route("/api/add-log", methods=['POST'])
def add_log():
    log = request.get_json()
    if not log:
        return jsonify({'message': 'No data provided'}), 400
    log['created_date']= datetime.now(istanbul)
    db.logs.insert_one(log)
    return jsonify("ok")


@app.route("/api/add-notify-list", methods=['POST'])
def add_notify():
    contact = request.get_json()
    if not contact:
        return jsonify({'message': 'No data provided'}), 400
    contact['created_date']= datetime.now(istanbul)
    db.notifyList.insert_one(contact)
    return jsonify("ok")


@app.route("/api/create-slides-openai", methods=['POST'])
def create_slides_openai():
    message = request.get_json()
    work_id=str(uuid.uuid4())
    filename=work_id+'.pptx'
    print(message)
    result=openaiOperations.openaiCompletion(message['text'])
    print(result)
    if not result:
        jsonify({'message': 'Cannot create pptx file'}), 400
    if(pptxOperations.create_presentation(result,filename,True)):
        return send_from_directory('userDocs', filename, as_attachment=True), 200
    else:
        return jsonify({'message': 'Cannot create pptx file'}), 400

@app.route("/api/search-pubmed", methods=['POST'])
def serach_pubmed():
    message = request.get_json()
    work_id=str(uuid.uuid4())
    result=pubmedOperations.searchPubmed(message['query'],work_id)
    return result

@app.route("/api/download-file", methods=['POST'])
def download_file():
    message = request.get_json()
    return send_from_directory( 'userDocs',message['filename'], as_attachment=True), 200
        

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
