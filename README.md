
# 🎬 OKO Movies — Mobile Movie Search App

**OKO Movies** is a full-stack mobile application built with **React Native (Expo)** for the frontend and **Django + Django REST Framework** for the backend.  
The app allows users to search for movies (via TMDB API), track trending searches, and explore popular titles.  
Data is synced with a PostgreSQL database and deployed using [Render.com](https://render.com/).

---

## ✨ Features

- 🔍 Search for movies using TMDB API
- 📊 Automatically tracks and stores search popularity
- 🔥 View trending movies based on search frequency
- 🎨 Styled with NativeWind (Tailwind CSS for React Native)
- 📱 Expo-powered mobile frontend
- 🌐 Django REST API backend with PostgreSQL
- ☁️ Deployed on Render.com

---

## 📁 Project Structure

```
/React_Native_Movies_OKO
│
├── backend/               # Django backend (API, models, DB)
│   ├── manage.py
│   ├── backend/           # Django config (settings, urls, wsgi)
│   └── requirements.txt
│
├── frontend/              # React Native app (Expo + Tailwind + Axios)
│   ├── app/
│   ├── components/
│   ├── services/
│   └── package.json
```

---

## 🚀 Technologies Used

### Frontend
- React Native (Expo SDK 52)
- Expo Router
- Tailwind via NativeWind
- Axios
- React Navigation

### Backend
- Django 5.1.7
- Django REST Framework
- PostgreSQL (via Render)
- Gunicorn (WSGI server)
- CORS headers

---

## ⚙️ Setup Instructions

### 🔧 Backend (Django)
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run migrations:
   ```bash
   python manage.py migrate
   ```

3. Run the server:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

### 📱 Frontend (React Native)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Expo development server:
   ```bash
   npm start
   ```

3. Run on Android/iOS/Web:
   ```bash
   npm run android
   npm run ios
   npm run web
   ```

---

## 🌍 Environment Variables

### Backend
Make sure to define `.env` (or Render variables):

```env
DJANGO_SECRET_KEY=your_secret_key
DEBUG=False
ALLOWED_HOSTS=oko-movies-database.onrender.com
DATABASE_URL=postgres://...
```

### Frontend
In `app.json` or `.env`, store:

```env
EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key
```

---

## 📡 Deployment (Render.com)

- **Backend:** deployed using `gunicorn backend.wsgi:application`
- **Frontend:** runs on Expo (local / mobile)

---

## 🧪 Testing

```bash
npm test      # Jest testing
npm run lint  # Expo linting
```

---

## 🙏 Credits

- Movie data provided by [TMDB API](https://developers.themoviedb.org/3)
- Icons by [Expo Vector Icons](https://icons.expo.fyi)
- UI inspiration from modern mobile movie apps