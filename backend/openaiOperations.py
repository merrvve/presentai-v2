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
client = OpenAI(api_key = os.getenv('OPENAI_API_KEY'))

def split_string_to_parts(input_string, part_length):
    """
    Split a string into parts where each part has a length of 'part_length'.
    """
    return [input_string[i:i+part_length] for i in range(0, len(input_string), part_length)]


def openaiCompletion(content):
    parts=split_string_to_parts(content,2500)
    slides={'slides':[]}
    x=len(parts)

    for i in range(1,x):
        print(i,x)
        last_slide=''
        completion = client.chat.completions.create(
          model="gpt-3.5-turbo-1106",
          messages=[
            {"role": "system", "content": """
You are a helpful assistant. Your task is to organize the following content into a summarized slides for a coherent and engaging presentation. This is part {0} of {1}. 

If there was a previous part, the last slide content was: {2}

Please create a json objects list  that each one has a title and a content property. example structure: {{slides:[{{title:,content:}}]}}. The text is:

  """.format(str(i),str(x),last_slide)},
            {"role": "user", "content": parts[i-1]}
          ],
          response_format={"type": "json_object"}
        )
        #response = json.loads(completion['choices'][0].message.content)
        #slides['slides'].extend(response['slides'])

        response=json.loads(completion.choices[0].message.content,encoding="utf-8")
        slides['slides'].extend(response['slides'])
        #slides.upload(json.loads(response,encoding="utf-8"))
        last_slide=slides['slides'][-1]['content']
    return slides['slides']
