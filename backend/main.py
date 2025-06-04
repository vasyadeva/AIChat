from flask_cors import CORS
from groq import Groq
from envirement import key, port
from flask import Flask, request, jsonify
import sqlite3

client = Groq(
    api_key = key
)

app = Flask(__name__)
CORS(app)
message_history = []
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('content', '')
    
    
    if not user_message:
        return jsonify({'error': 'Повідомлення не може бути порожнім'}), 400
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "Answer with sense a humor, here is conversation history: " + str(message_history)
                }
                ,
                {
                    "role": "user",
                    "content": user_message
                }
            ],
            model = "llama3-70b-8192",
        )
        message_history.append({
            'role': 'user',
            'content': user_message
        })
        message_history.append({
            'role': 'assistant',
            'content': chat_completion.choices[0].message.content
        })
        return jsonify({
            'content': chat_completion.choices[0].message.content,
            'role': 'assistant'
        })
    except Exception as e:
        return jsonify({'error': 'Помилка при обробці запиту, зменштіть ваш запит або розпочніть новий чат'}), 500

@app.route('/new_chat', methods=['POST'])
def new_chat():
    message_history.clear()
    return jsonify({'message': 'Ok'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=port)
    

