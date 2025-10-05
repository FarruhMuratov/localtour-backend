from firebase_functions import https_fn
from firebase_admin import initialize_app
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

load_dotenv()
initialize_app()

@https_fn.on_request()
def ask_gemini(req: https_fn.Request) -> https_fn.Response:
    # CORS headers
    if req.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return https_fn.Response('', headers=headers)
    
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    
    api_key = os.environ.get('GEMINI_API_KEY')
    client = genai.Client(api_key=api_key)
    
    prompt = req.args.get('prompt', 'Hello, how are you?')
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",      # ← 4 spaces indent
        contents=prompt,
        config=types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_budget=0)
        )
    )
    
    return https_fn.Response(response.text, headers=headers)  # ← 4 spaces indent

@https_fn.on_request()
def extract_hints(req: https_fn.Request) -> https_fn.Response:
    # CORS headers
    if req.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return https_fn.Response('', headers=headers)
    
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    
    api_key = os.environ.get('GEMINI_API_KEY')
    client = genai.Client(api_key=api_key)
    
    answer = req.args.get('answer', '')
    
    # Extract key facts using Flash model (fast)
    extraction_prompt = f"Extract only the key facts and important information from this answer as concise bullet points:\n\n{answer}"
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=extraction_prompt,
        config=types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_budget=0)
        )
    )
    
    return https_fn.Response(response.text, headers=headers)