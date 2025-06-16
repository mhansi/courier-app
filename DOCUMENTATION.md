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

## 📋 User Stories

### 👤 Client Users

1. As a **Client**, I want to **register an account**, so that I can start sending shipments.

2. As a **Client**, I want to **log into the system**, so I can manage my shipments.

3. As a **Client**, I want to **create a new shipment**, so that I can send packages to recipients.

4. As a **Client**, I want to **view a list of my own shipments**, so I can track what I’ve sent.

5. As a **Client**, I want to **edit shipment details**, so I can correct or update information — but only if the shipment is in **PENDING** status.

6. As a **Client**, I want to **delete a shipment**, so I can cancel a shipment request — but only if it is still in **PENDING** status.

### 🛡️ Admin Users

7. As an **Admin**, I want to **log into the system**, so that I can manage and monitor all shipments.

8. As an **Admin**, I want to **view all shipments created by any user**, so I can oversee and manage the courier operations.

9. As an **Admin**, I want to **update the status of any shipment**, so I can reflect its current progress (e.g., from PENDING to INTRANSIT).

---

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
