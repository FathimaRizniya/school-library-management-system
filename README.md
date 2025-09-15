# School Library Management System

This is a **School Library Management System** built using **Laravel** (backend) and **React** (frontend).  
It helps manage books, students, and borrowing/return records in a school library.

---

## Features
- Add, edit, delete, and view books  
- Manage students and their borrowing records  
- Issue and return books  
- Simple user authentication (login/register)  
- Search for books  

---

## Tech Stack
- **Backend:** Laravel  
- **Frontend:** React  
- **Database:** MySQL  
- **Tools:** Composer, npm, Git  

---

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/FathimaRizniya/school-library-management-system.git
   cd school-library-management-system
2. Install backend dependencies:
   ```bash
composer install
cp .env.example .env
php artisan migrate
php artisan serve

4. Install frontend dependencies:
npm install
npm run dev

5. Open the project in your browser:
http://localhost:8000
