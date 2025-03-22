<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">NestJS Authentication Boilerplate</h1>

<p align="center">
  <a href="https://circleci.com/gh/nestjs/nest">
    <img src="https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456" alt="CircleCI Build Status" />
  </a>
</p>

## 📌 Description

A robust authentication boilerplate built with **NestJS**, featuring:
- JWT-based authentication
- Google OAuth integration
- PostgreSQL database with **Docker** support

## 🚀 Project Setup

### 1️⃣ Install Dependencies 📦
```bash
$ yarn install
```

### 2️⃣ Run PostgreSQL (Using Git bash 🐧)
```bash
$ yarn start:postgres
```

### 3️⃣ Create `.env` File ⚙️
Create a `.env` file in the project root and add the following environment variables:

```env
NODE_ENV=development

# Database configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASS=your_password
DB_NAME=your_database

# Authentication with JWT
JWT_SECRET_PHRASE=your_secret_phrase
JWT_EXPIRE_TIME=3600s

# Authentication with Google OAuth
GOOGLE_AUTH_CLIENT_ID=your_client_id
GOOGLE_AUTH_CLIENT_SECRET=your_client_secret
GOOGLE_AUTH_CALLBACK_URL=your_callback_url
```

## 🔥 Run the Project

### Development Mode
```bash
$ yarn run start
```

### Watch Mode (Hot Reloading)
```bash
$ yarn run start:dev
```

### Production Mode
```bash
$ yarn run start:prod
```
