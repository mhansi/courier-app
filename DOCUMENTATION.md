# 🚚 Courier App – Project Setup Guide

This guide walks you through setting up and running the **Courier App** with both backend and frontend services.

---

## 📦 Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Start PostgreSQL service.**

   > 💡 No need to manually create the database – Prisma handles this.

3. **Create a `.env` file** in the `backend` directory with the following variables:

   ```
   PORT=5000
   DATABASE_URL=postgresql://<db_user>:<password>@localhost:5432/<db_name>
   JWT_SECRET=<your_random_secret>
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Run the migration and seed script:**

   ```bash
   npm run migrate
   ```

   This will:

   * Create the database and tables.
   * Generate Prisma types.
   * Seed an **ADMIN** user with:

     ```
     Email:    admin@example.com
     Password: admin123
     ```

   ✅ You should see: `Admin user created`

6. **Start the backend in development mode:**

   ```bash
   npm run dev
   ```

   ✅ You should see: `Server running on port 5000`

---

## 🌐 Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Create a `.env` file** in the `frontend` directory with the following:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the frontend in development mode:**

   ```bash
   npm run dev
   ```

   ✅ You should see output like:

   ```
   VITE vX.X.X  ready in XX ms
   ➜  Local:   http://localhost:5173/
   ```

   The frontend will be available at: [http://localhost:5173/](http://localhost:5173/)

---

## 👥 About the Application

The application mainly have 2 user types CLIENT and ADMIN. With the limited time, there's only CLIENT registration in the application (an ADMIN user already seeded).

### 👤 Client Users

After registering as a **CLIENT**, you can:

* Create shipments
* View your own shipments
* Edit shipments **only in `PENDING` status** (status field is not editable)
* Delete shipments **only in `PENDING` status**

### 🛡️ Admin Users

After logging in as an **ADMIN**, you can:

* View all shipments
* Edit the **status** of any shipment

### ⚙️ Technologies Used

#### Backend

* PostgreSQL - As the database.
* Prisma - As the ORM. It handles DB queries, data seeds and backend data types.
* Node + Express - As the backend development framework.
* JWT + Bcypt - For user authenticationmechanism and hashing.

#### Frontend

* React - As the frontend development framework.
* React-Router - For page routing.
* Axios - To handle API calls.
* Tailwind - For styling.

---

## 🚀 Future Improvements

Here are several ideas to enhance the application further:

- **Recipient as a User Entity**  
  Convert recipients into registered users. This would allow:
  - Senders to easily search and select saved recipients without re-entering data.
  - Recipients to log in and track their shipments.

- **Delivery Drivers as a Separate Entity**  
  Introducing a dedicated driver role can enable:
  - Shipment assignment and tracking from pickup to delivery.
  - Features like driver performance analytics and ratings.

- **Pagination for Shipments Table**  
  Especially useful for **ADMIN** users who may need to handle large datasets efficiently.

- **Improved Data Modeling**  
  - Separate **authentication** and **user profile** data for better structure.
  - Enable profile customization, better user management, and modular authentication strategies (e.g., **Google Sign-In**).

- **Admin Analytics Dashboard**  
  With the collected data, build an insights dashboard that shows:
  - Shipment trends by users or businesses
  - Driver performance metrics
  - Overall system health and activity

---
