# AI Resumer and Job React App

This repository contains a full-stack application for building AI-powered resumes and managing job applications efficiently.

- **Frontend:** React app built with Vite, providing user interface and Firebase integration.  
- **Backend:** Node.js + Express REST API, handling data, auth, and business logic.  
- **Database:** MongoDB Atlas for persistent data storage.  
- **Authentication & Storage:** Firebase services.  
- **Containerization:** Both frontend and backend can be run in Docker containers.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Getting Started](#getting-started)  
- [Prerequisites](#prerequisites)  
- [Environment Variables](#environment-variables)  
- [Running Locally with Docker](#running-locally-with-docker)  
- [Frontend](#frontend)  
- [Backend](#backend)  
- [Usage](#usage)  
- [Contributing](#contributing)  
- [License](#license)

---

## Project Overview

The app helps users create AI-enhanced resumes and manage job applications through an interactive web interface. The backend API manages data persistence, authentication, and integrates with Firebase for storage and notifications.

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)  
- [Node.js](https://nodejs.org/) (optional, if running outside Docker)  
- MongoDB Atlas cluster with access credentials  
- Firebase project with authentication and storage configured  

---

### Environment Variables

Sensitive and configurable data are managed via environment variables. Below are example `.env` templates with placeholders for you to fill.

# Ai_Resume_Builder_and_Jobs
### Backend `.env` sample (template)

```env
PORT=5000

# MongoDB connection string
MONGO_URI=mongodb+srv://<username>:<password>@portfoliodb.wki9opb.mongodb.net/?retryWrites=true&w=majority&appName=Ai_Resume

# Firebase service account credentials
TYPE=service_account
PROJECT_ID=your-project-id-here
PRIVATE_KEY_ID=your-private-key-id-here
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR-PRIVATE-KEY-HERE\n-----END PRIVATE KEY-----\n"
CLIENT_EMAIL=your-firebase-client-email-here
CLIENT_ID=your-firebase-client-id-here
AUTH_URI=https://accounts.google.com/o/oauth2/auth
TOKEN_URI=https://oauth2.googleapis.com/token
AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
CLIENT_X509_CERT_URL=your-firebase-client-cert-url-here
UNIVERSE_DOMAIN=googleapis.com



### frontend .env sample template 
# Firebase config (from your Firebase project settings)
VITE_API_KEY=your-firebase-api-key-here
VITE_AUTH_DOMAIN=your-firebase-auth-domain-here
VITE_PROJECT_ID=your-firebase-project-id-here
VITE_STORAGE_BUCKET=your-firebase-storage-bucket-here
VITE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id-here
VITE_APP_ID=your-firebase-app-id-here
VITE_MEASUREMENT_ID=your-firebase-measurement-id-here

