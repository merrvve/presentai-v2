import os
from openai import OpenAI
from dotenv import load_dotenv
import json
load_dotenv()
import requests

# Load environment variables from .env file
load_dotenv()

# Retrieve API key from environment variable
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key = os.getenv('OPENAI_API_KEY'), organization = os.getenv('OPENAI_ORGANIZATION'))

def split_string_to_parts(input_string, part_length):
    """
    Split a string into parts where each part has a length of 'part_length'.
    If the length of the input string is less than or equal to 'part_length', 
    return a list containing the input string as its only element.
    """
    if len(input_string) <= part_length:
        return [input_string]
    return [input_string[i:i + part_length] for i in range(0, len(input_string), part_length)]



def openaiCompletion(content):
    
    parts=split_string_to_parts(content,2500)
    slides={'slides':[]}
    x=len(parts)
    for i in range(0,x):
        last_slide=''
        completion = client.chat.completions.create(
          model="gpt-4-turbo",
          messages=[
            {"role": "system", "content": """
You are a helpful assistant. Your task is to organize the following content into a summarized slides for a coherent and engaging presentation. This is part {0} of {1}. 

If there was a previous part, the last slide content was: {2}

Please create a json objects list  that each one has a title and a content property. example structure: {{slides:[{{title:,content:}}]}}. The text is:

  """.format(str(i+1),str(x),last_slide)},
            {"role": "user", "content": parts[i]}
          ],
          response_format={"type": "json_object"}
        )
        #response = json.loads(completion['choices'][0].message.content)
        #slides['slides'].extend(response['slides'])

        response=json.loads(completion.choices[0].message.content)
        slides['slides'].extend(response['slides'])
        #slides.upload(json.loads(response,encoding="utf-8"))
        last_slide=slides['slides'][-1]['content']
    return slides['slides']


def testOpenaiCompletion(content):
  completion = client.chat.completions.create(
          model="gpt-4-turbo",
          messages=[
            {"role": "system", "content": """
You are a helpful assistant
  """},
            {"role": "user", "content": "What is angular ssg"}
          ],
        )
        #response = json.loads(completion['choices'][0].message.content)
        #slides['slides'].extend(response['slides'])

  response=json.loads(completion.choices[0].message.content)
  print(response)
  return response