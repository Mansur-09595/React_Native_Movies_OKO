# OKO Movies Backend

This project represents the backend of the OKO Movies application, developed using Django and Django REST Framework.

## 📌 Functionality
- Update the search query count for movies
- Retrieve a list of popular (trending) movies
- REST API for frontend interaction

## 🛠️ Installation and Setup

### 1. Clone the repository
```sh
git clone https://github.com/your-repo/oko_movies.git
cd oko_movies/backend
```

### 2. Create a virtual environment
```sh
python -m venv venv
source venv/bin/activate  # for macOS/Linux
venv\Scripts\activate  # for Windows
```

### 3. Install dependencies
```sh
pip install -r requirements.txt
```

### 4. Set up the database
Apply migrations:
```sh
python manage.py migrate
```

Create a superuser (optional):
```sh
python manage.py createsuperuser
```

### 5. Run the server
```sh
python manage.py runserver
```

## 📡 API Endpoints

### 🔹 Update Search Count
**POST /api/update-search-count/**
#### Request body:
```json
{
  "query": "Interstellar",
  "movie_id": 157336,
  "title": "Interstellar",
  "poster_path": "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
}
```

### 🔹 Get Trending Movies
**GET /api/trending-movies/**

### 🔹 Server Status Check
```sh
curl http://<IP_Computer>/api/trending-movies/
```

## 🔧 Technologies
- Python 3.9+
- Django
- Django REST Framework
- SQLite (по умолчанию, можно заменить на PostgreSQL)

## 📝 Author
Developed for the OKO Movies project.