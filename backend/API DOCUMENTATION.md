# 📦 Courier Management API Documentation

## 🔐 Authentication Endpoints

### **POST** `/api/auth/register`

**Description:** Register a new user (Client or Admin)

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "address": "123 Main St",
  "phone": "555-1234",
  "role": "CLIENT" // or "ADMIN"
}
```

#### Response

```json
{
  "message": "User created",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "role": "CLIENT",
    "created_at": "2025-06-13T19:28:47.050Z",
    "updated_at": "2025-06-13T19:28:47.050Z"
  }
}
```

---

### **POST** `/api/auth/login`

**Description:** Log in and receive a JWT token

#### Request Body

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
}
```

---

### **GET** `/api/auth/user/:id`

**Description:** Get a user by ID

#### Response

```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "role": "CLIENT",
  "created_at": "2025-06-13T19:28:47.050Z",
  "updated_at": "2025-06-13T19:28:47.050Z"
}
```

---

## 🚚 Shipment Endpoints

> 🔐 All Shipment endpoints require the **Authorization header**:
>
> ```
> Authorization: Bearer <your_jwt_token>
> ```

---

### **POST** `/api/shipments`

**Role:** CLIENT\
**Description:** Create a new shipment

#### Request Body

```json
{
  "recipientName": "Alice Smith",
  "recipientAddress": "456 Elm St",
  "note" : "Sample note"
}
```

#### Response

```json
{
  "id": "uuid",
  "senderId": "uuid",
  "recipientName": "Alice Smith",
  "recipientAddress": "456 Elm St",
  "note" : "Sample note",
  "status": "PENDING",
  "created_at": "2025-06-13T12:34:56.000Z",
  "updated_at": "2025-06-13T12:34:56.000Z"
}
```

---

### **GET** `/api/shipments/`

**Role:** CLIENT / Admin\
**Description:** Get all shipments by the user role (Clients - own shipments, Admin - All shipments)

#### Response

```json
[
  {
    "id": "uuid",
    "senderId": "uuid",
    "recipientName": "Alice Smith",
    "recipientAddress": "456 Elm St",
    "note" : "Sample note",
    "status": "PENDING",
    "created_at": "...",
    "updated_at": "..."
  }
]
```

---

### **GET** `/api/shipments/:id`

**Roles:** CLIENT / ADMIN\
**Description:** Get a single shipment by ID

#### Response

```json
{
  "id": "uuid",
  "senderId": "uuid",
  "recipientName": "Alice Smith",
  "recipientAddress": "456 Elm St",
  "note" : "Sample note",
  "status": "INTRANSIT",
  "created_at": "...",
  "updated_at": "..."
}
```

---

### **PUT** `/api/shipments/:id`

**Role:** CLIENT (owner)\
**Allowed only if status is PENDING**``

#### Request Body

```json
{
  "recipientName": "Updated Name",
  "recipientAddress": "New Address",
  "note" : "Sample note"
}
```

#### Response

```json
{
  "id": "uuid",
  "senderId": "uuid",
  "recipientName": "Updated Name",
  "recipientAddress": "New Address",
  "note" : "Sample note",
  "status": "INTRANSIT",
  "created_at": "...",
  "updated_at": "..."
}
```

---

### **DELETE** `/api/shipments/:id`

**Role:** CLIENT (owner)\
**Allowed only if status is PENDING**``

#### Response

```json
{
  "message": "Shipment deleted successfully"
}
```

---

### **PATCH** `/api/shipments/:id/status`

**Role:** ADMIN\
**Description:** Update status of any shipment

#### Request Body

```json
{
  "status": "DELIVERED"
}
```

#### Response

```json
{
  "id": "uuid",
  "senderId": "uuid",
  "recipientName": "Updated Name",
  "recipientAddress": "New Address",
  "note" : "Sample note",
  "status": "DELIVERED",
  "created_at": "...",
  "updated_at": "..."
}
```

---

## 🔒 Roles Summary

| Action                 | CLIENT (owner) | ADMIN |
| ---------------------- | -------------- | ----- |
| Register / Login       | ✅              | ✅     |
| Create shipment        | ✅              | ❌     |
| View all shipments     | ✅ (if owner)   | ✅     |
| View specific shipment | ✅ (if owner)   | ✅     |
| Update shipment        | ✅ (if PENDING) | ❌     |
| Delete shipment        | ✅ (if PENDING) | ❌     |
| Update shipment status | ❌              | ✅     |

---
