# 🌍 Project Walkthrough: TourMitra - A Tourism Management System

Congratulations! Your **TourMitra** project is now a professional, high-end web application with a secure backend and a premium, beautiful User Interface. This walkthrough will guide you through how to run your project and explain its features in very simple terms for your final presentation.

---

## 🚀 How to Run the Project (Step-by-Step)
To run this project, you need two terminal windows open because it has two parts: the **Backend** (Database & Logic) and the **Frontend** (Website UI).

### Part 1: Start the Backend (Database Connection)
1. **Open Terminal 1**: Navigate to your project folder:
   ```powershell
   cd desktop\FINALPROJECT\backend
   ```
2. **Install Requirements** (If you haven't already):
   ```powershell
   npm install
   ```
3. **Run the Backend Server**:
   ```powershell
   npm run dev
   ```
   *(Wait until you see "Server running on port 5001". This means your computer is successfully talking to the Cloud Database!)*

### Part 2: Start the Frontend (The Website)
1. **Open Terminal 2**: Open a brand new terminal and go to the frontend folder:
   ```powershell
   cd desktop\FINALPROJECT\frontend
   ```
2. **Install Requirements** (If you haven't already):
   ```powershell
   npm install
   ```
3. **Run the Website**:
   ```powershell
   npm run dev
   ```

### Part 3: View the Site
1. Open your web browser (Chrome, Edge, or Safari).
2. Go to the address shown in Terminal 2, which is typically: **`http://localhost:5173`**

---

## 🛡️ Core Features (Easy to Understand)

* **Beautiful User Interface**: A modern, animated design that looks stunning on phones and laptops.
* **Secure Login System**: Users can safely sign up, log in, and recover forgotten passwords.
* **Cloud Database**: Uses MongoDB Atlas on the internet to store users, places, and messages safely so nothing is lost.
* **Admin Dashboard**: A secret control panel just for the owner to manage the site.
* **Live Watching**: The admin can see exactly how many people are online at any given second!

---

## 📖 How the Project Works (Start-to-Finish Flow)

Here is the exact journey of how someone uses your TourMitra website. **You can read this exact flow to your teacher during your presentation:**

1. **The Welcome Screen (Home Page):** 
   When a user opens the website, they see a beautiful welcome screen. They can scroll down to see popular tourist spots across different districts.

2. **Creating an Account (Signup/Login):** 
   To access all the features, the user clicks "Login" or "Register" to create a new profile. Their password is automatically encrypted (hidden into a secret code) and stored safely in the MongoDB Cloud Database.

3. **Exploring Places (Destinations):** 
   The user browses through various districts. When they click on a district, they see a list of cool tourist destinations with images, descriptions, and ratings.

4. **Getting in Touch (Contact):** 
   If the tourist has a question, they click on the "Contact Us" page, fill in their name and message, and hit send. This message is instantly saved directly to the database.

5. **Admin Access (Behind the Scenes):** 
   The owner of the website (the Admin) logs in using a special admin account. Instead of seeing the normal website, they get redirected to a secret *Admin Dashboard*.

6. **Dashboard Management:** 
   In the Admin Dashboard, the website owner can view all registered users, read the incoming contact messages from tourists, and even see a live counter of how many people are using the website right now!