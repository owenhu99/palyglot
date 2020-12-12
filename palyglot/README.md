# Palyglot

## Installation and Setup

Navigate to `/backend` and install dependencies with `npm install`

An env file is required to store the URL to the mongodb cluster as an environment variable
- Create a file `.env` under `/backend`
- Add the line `MONGODB_URL=<URL>` where `<URL>` is the URL to the MongoDB cluster you have created

A configuration file for Firebase Admin SDK is required
- Create a folder `config` under `/backend`
- Generate a private key in your Firebase Console under Service accounts in settings
- A JSON file will be generated, copy the file to `/backend/config` and rename it `fbServiceAccountKey.json`

Navigate to `/frontend` and install dependencies with `npm install`

An env file is required to store the URL to the backend server as an environment variable
- Create a file `.env` under `/frontend`
- Add the line `REACT_APP_BACKEND_URL=<URL>` where `<URL>` is the URL to where the backend server is running

An env.local file is required to store additional data regarding Firebase access
- Create a file `.env.local` under `/frontend`
- Add the following lines and replace the content accordingly
```
REACT_APP_FIREBASE_API_KEY=<API_KEY>
REACT_APP_FIREBASE_AUTH_DOMAIN=<AUTH_DOMAIN>
REACT_APP_FIREBASE_DATABASE_URL=<DB_URL>
REACT_APP_FIREBASE_PROJECT_ID=<PROJECT_ID>
REACT_APP_FIREBASE_STORAGE_BUCKET=<STORGE_BUCKET>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<SENDER_ID>
REACT_APP_FIREBASE_APP_ID=<APP_ID>
REACT_APP_BACKEND_URL=<BACKEND_URL>
```

## Running the application

Navgiate to `/backend` and `/frontend` and execute `npm start`, the URL to the web app will be displayed in the terminal
