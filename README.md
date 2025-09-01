# EateryCrit (still in progress!)

**EateryCrit** is an interactive web application that allows users to explore restaurants, submit reviews, and view average ratings. Some restaurants may be fictional. The app is built with **React** (frontend) and **Flask + SQLAlchemy** (backend), with full CORS support and user auth with Flask.

Made with Flask + SQLAlchemy + SQLite, along with React (TSX) + TailwindCSS + Framer Motion. Overall, I got to work with relational databases and configuring REST API endpoints to GET/POST needed data.

<p align="center">
  <img width="720" height="350" alt="image" src="https://github.com/user-attachments/assets/82923bf0-8bcc-4189-8c99-d07fd9ce0fb5" />

</p>
---

## 🍣 Features

### 1. **user auth!**

* Secure login and logout functionality using cookie sessions, integrated with Redis.
* Frontend communicates with Flask backend via REST API endpoints.
* Users, restaurants and reviews stored using SQLite & SQLAlchemy (relational db).

### 2. **restaurant listings!**

* Displays a list of restaurants fetched from the backend.
* Each restaurant shows the name, average rating, location and other information! (AI-generated images - future implementation)
* Later on, users will be able to add restaurants, so reviews can be added!

### 3. **ratings and reviews!**

* Users can submit ratings for restaurants, ONLY given they are registered.
* Ratings are stored and displayed in real-time (dynamic updating).

### 4. **dynamic animations!**

* Smooth **slide-up animation** for welcome messages.
* **Typing animation** for personalized greetings.
* Subtle **form popup transitions** for login and review submission.
* Rocking or bouncing animations for logos to enhance UI engagement.

### 6. **responsiveness!**

* A KEY concept I heavily support is responsiveness, thus...
* built with **TailwindCSS** for mobile-first design.

---

## 🍡 tech Stack

* **Frontend:** React, TailwindCSS, Framer Motion (animations), TypewriterJS (typing effect)
* **Backend:** Python Flask, Flask-CORS, SQLite/SQLAlchemy
* **APIs:** AI image generation (DALL·E / Stable Diffusion) -> FUTURE IMPLEMENTATION!!!
* **State Management:** React hooks (`useState`), dictionaries for average ratings
* **React Router:** Used React router to form a browser router, navigating between pages

---

## 🍤 setup & installation

* clone the repo! This is straightforward

### backend (Flask)

Create and activate virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # windows
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend server:

```bash
python app.py
```

> It should bind to 127.0.0.1:5000 by default, which is used in the front-end

---

### frontend (React)

Navigate to frontend folder:

```bash
cd ../client
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## 🍧 Usage

1. Navigate to the login page and log in (or sign up) with valid credentials.
2. Browse the restaurant list. Use filters if wanted! (In the future -> ADD RESTAURANT!)
3. Click on a restaurant to view details and submit ratings.
4. AI-generated images appear for fictional restaurants. -> FUTURE IMPLEMENTATIONS!
5. Enjoy smooth animations and personalized greetings.

---
Do you want me to do that?
