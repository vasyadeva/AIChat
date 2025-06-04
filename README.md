# AI Chat Application

Minimalistic web-app to chat with LLM, which responds with humor

## Technologies

### Backend
- **Flask**
- **Groq API**

### Frontend
- **Angular**
- **Bootstrap**

## Setup

### 1. Backend (Flask)

#### Install dependencies
```bash
cd backend
pip install flask flask-cors groq
```

#### Configuration
for changing key or port modify `envirement.py` file:
```python
key = "your_groq_api_key_here"
port = 5000
```

#### Run
```bash
python main.py
```

Server will start at `http://localhost:5000`

### 2. Frontend (Angular)

#### Install dependencies
```bash
cd frontend/AIChat
npm install
```

#### Run
```bash
ng serve
```

App will be available at `http://localhost:4200`

## Features

- **Conversation history**: Backend stores message history in memory
- **Humor**: AI is configured to respond with sense of humor
- **Minimalistic design**: Simple and user-friendly interface

## Usage

1. Start backend server
2. Start frontend application
3. Open browser at `http://localhost:4200`
4. Type message in the input field at the bottom
5. Press "Send" or Enter
6. For new chat click "New Chat" button
