# AI Resume & Job Application Tracker

A **Single Page Application (SPA)** designed to help users build AI-powered resumes, track their job applications, and manage their profile settings — built with React (prototype), Node.js, Express, and MongoDB backend.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture & Design](#architecture--design)  
- [UI Prototype](#ui-prototype)  
- [Getting Started](#getting-started)  
- [Folder Structure](#folder-structure)  
- [Future Improvements](#future-improvements)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Project Overview

This app streamlines the job application process by integrating:  
- **AI-powered resume creation and editing** with live preview  
- **Job application tracking** with status updates and notes  
- **User account management**  
- **Dashboard** for quick stats and actions  

It’s designed to apply advanced React concepts with production-grade architecture, ready to integrate with a Node.js + Express backend using MongoDB for persistence, and Redis for caching and rate limiting.

---

## Features

- **Dashboard:** Overview stats (resumes created, jobs applied, AI suggestions) and quick action buttons  
- **Resume Builder:**  
  - Form-based resume editing with live preview  
  - Buttons for AI suggestions and saving resumes  
- **Job Tracker:**  
  - Table listing applied jobs with status badges (In Progress, Offer, Rejected)  
  - Add new job application functionality  
- **Settings:**  
  - User profile editing for username and email  
- **Responsive UI:** Optimized for desktop and mobile screens  
- **Accessibility:** Focus states, ARIA labels for screen readers  

---

## Tech Stack

| Layer            | Technology                |
|------------------|---------------------------|
| Frontend         | React (planned), HTML/CSS Prototype |
| Backend          | Node.js, Express.js        |
| Database         | MongoDB                   |
| Caching & Rate Limit | Redis                    |
| Styling          | CSS inspired by shadcn/ui |
| Version Control  | Git                       |

---

## Architecture & Design

- **Frontend SPA:**  
  - Navbar-based routing switching between dashboard, resume builder, job tracker, and settings pages  
  - Componentized UI with card layouts, forms, tables, and buttons  
  - Live preview updates using React state (in full app) or vanilla JS in prototype  

- **Backend:**  
  - RESTful API endpoints for CRUD operations on resumes, jobs, and user profiles  
  - Authentication & Authorization (JWT/session based)  
  - Redis caching for session management and rate limiting API requests  

- **Database:**  
  - MongoDB schemas for users, resumes, job applications  
  - Indexed queries for performance on job tracking  

---

## UI Prototype

The initial prototype is a clean, minimal SPA with:

- Navbar with active link highlight  
- Four main pages with distinct layouts  
- Cards with shadows and rounded corners for visual hierarchy  
- Responsive and accessible form controls  

See the full HTML/CSS/JS prototype in `/prototype/index.html`.

---

## Getting Started

### Prerequisites

- Node.js (v18+)  
- MongoDB instance (local or cloud)  
- Redis server (for caching and rate limiting)  

### Installation

1. Clone the repo:  
   ```bash
   git clone https://github.com/yourusername/ai-resume-job-tracker.git
   cd ai-resume-job-tracker
