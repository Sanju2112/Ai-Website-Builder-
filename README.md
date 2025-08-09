# AI Website Builder

An AI-powered website builder that transforms your ideas into fully functional websites with HTML, CSS, and JavaScript — instantly!

## Features

- Generate website code instantly from text prompts  
- Live code editor with syntax highlighting and auto-formatting like vs code 
- Copy and download generated HTML, CSS, and JS  
- Real-time preview of your website  
- Responsive and modern dark-themed UI  

## Tech Stack

- Frontend: React, Monaco Editor, Tailwind CSS  
- Backend: Node.js, Express  
- AI Integration: Gemini API  
- HTTP Requests: Axios

## Screenshots 

<img width="1440" height="900" alt="Screenshot 2025-08-09 at 7 49 55 PM" src="https://github.com/user-attachments/assets/c9da79d3-7053-40e5-a26f-3de15f81e922" />
<img width="1440" height="900" alt="Screenshot 2025-08-09 at 7 50 45 PM" src="https://github.com/user-attachments/assets/274b945a-5bf4-48ec-a856-5032bffbc829" />

## User Setup
### 1. Clone the Repository
```bash
git clone https://github.com/Sanju2112/Ai-Website-Builder-.git
cd Ai-Website-Builder-
````

### 2. Setup Backend

```bash
cd backend
npm install
```

* Create a `.env` file inside the `backend` folder with the following content:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

* Start the backend server:

```bash
node server.js
```

### 3. Setup Frontend

Open a new terminal window/tab:

```bash
cd frontend
npm install
```

* Create a `.env` file inside the `frontend` folder with the following content:

```
VITE_API_URL=your_backend_url
```

* Start the frontend development server:

```bash
npm run dev
```




