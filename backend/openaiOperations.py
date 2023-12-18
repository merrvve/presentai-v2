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


def openaiCompletion(content):
    last_slide=''
    completion = client.chat.completions.create(
      model="gpt-3.5-turbo-1106",
      messages=[
        {"role": "system", "content": "You are a helpful assistant. Organise this content into summarised slides for a coherent and engaging presentation. Your response should be in JSON object list for slides and each slide should be with properties 'title' and 'content'."},
        {"role": "user", "content": "This is the first part of the text (totally 2 parts):Stock car racing is a form of automobile racing run on oval tracks and road courses measuring approximately 0.25 to 2.66 miles (0.4 to 4.3 km). It originally used production-model cars, hence the name 'stock car', but is now run using cars specifically built for racing. It originated in the southern United States; its largest governing body is NASCAR. Its NASCAR Cup Series is the premier top-level series of professional stock car racing. Australia, Canada, New Zealand, Mexico, Brazil and the United Kingdom also have forms of stock car racing.[1] Top-level races typically range between 200 and 600 miles (322 and 966 km) in length.  Top-level stock cars exceed 200 mph (322 km/h)[2][3][4] at speedway tracks and on superspeedway tracks such as Daytona International Speedway and Talladega Superspeedway.[5][6] Contemporary NASCAR-spec top-level cars produce maximum power outputs of 860–900 hp[7][8] from their naturally aspirated V8 engines. In October 2007 American race car driver Russ Wicks set a speed record for stock cars in a 2007-season Dodge Charger built to NASCAR specifications by achieving a maximum speed of 244.9 mph (394.1 km/h) at Bonneville Speedway.[9][10] For the 2015 NASCAR Cup Series, power output of the competing cars ranged from 750 to 800 hp (560 to 600 kW).[11][12]  History  1934 Ford stock car racer with reinforcement in the front  This section needs additional citations for verification. Please help improve this article by adding citations to reliable sources in this section. Unsourced material may be challenged and removed. Find sources: 'Stock car racing' – news · newspapers · books · scholar · JSTOR (March 2018) (Learn how and when to remove this template message) Early years In the 1920s, moonshine runners during the Prohibition era would often have to outrun the authorities. To do so, they had to upgrade their vehicles—while leaving them looking ordinary, so as not to attract attention. Eventually, runners started getting together with fellow runners and making runs together. They would challenge one another and eventually progressed to organized events in the early 1930s. The main problem racing faced was the lack of a unified set of rules among the different tracks. When Bill France Sr. saw this problem, he set up a meeting at the Streamline Hotel in order to form an organization that would unify the rules.[13]  When NASCAR was first formed by France in 1948 to regulate stock car racing in the U.S., there was a requirement that any car entered be made entirely of parts available to the general public through automobile dealers. Additionally, the cars had to be models that had sold more than 500 units to the public. This is referred to as 'homologation.' In NASCAR's early years, the "}
      ],
      response_format={"type": "json_object"}
    )
    response=completion.choices[0].message.content
    slides= json.loads(response,encoding="utf-8")
    
    print(slides, type(slides))

