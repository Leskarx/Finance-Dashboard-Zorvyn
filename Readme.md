# 💰 Finance Dashboard UI

A simple and responsive finance dashboard built using React and Tailwind CSS.
This project simulates a basic financial tracking system where users can view their balance, analyze spending, and manage transactions.

The goal of this project was not to overcomplicate things, but to focus on **clean UI, clear structure, and practical frontend implementation**.

---

## 🚀 Features

### 📊 Dashboard Overview

* Summary cards:

  * Total Balance (₹)
  * Total Income (₹)
  * Total Expenses (₹)
* Time-based visualization:

  * Balance trend using a line chart
* Category-based visualization:

  * Spending breakdown using a pie chart

---

### 📋 Transactions

* View a list of transactions with:

  * Date
  * Amount (₹)
  * Category
  * Type (Income / Expense)

#### Functionalities:

* 🔍 Search transactions (by text/category)
* 🎯 Filter by:

  * Type (income/expense)
  * Category
  * Date range
* ↕ Sort by:

  * Date
  * Amount

---

### 📄 Pagination

* Displays a limited number of transactions per page (5–10)
* Includes:

  * Next / Previous buttons
  * Page numbers
* Automatically resets to page 1 when filters/search change

---

### 👨‍💼 Role-Based UI

* Two roles:

  * Viewer → can only view data
  * Admin → can add and delete transactions
* Role can be switched using a dropdown in the UI

---

### 💡 Insights

* Highest spending category
* Monthly comparison (current vs previous month)
* Simple insights like:

  * “Spending increased compared to last month”

---

### 🌙 Dark Mode

* Toggle between light and dark theme

---

### 💾 Local Storage Persistence

* Saves:

  * Transactions
  * Selected role
  * Theme preference
* Data is retained even after refresh

---

### 🔄 Mock API Simulation

* Simulated API call to fetch transactions
* Includes loading state for better UX

---

### 📤 Export Functionality

* Export transactions as:

  * JSON
  * CSV

---

### 🎬 UI Enhancements

* Hover effects on cards and buttons
* Smooth modal transitions
* Clean and minimal layout

---

### 📱 Responsive Design

* Fully responsive across:

  * Desktop
  * Tablet
  * Mobile
* Features:

  * Sidebar → collapses into hamburger menu on mobile
  * Charts adjust based on screen size
  * Transactions table becomes scrollable or stacked

---

## 🧠 Tech Stack

* React (Vite)
* Tailwind CSS
* Recharts (for charts)
* Context API (state management)

---

## 🏗 Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── context/
 ├── services/
 ├── utils/
 ├── data/
```

---

## ⚙️ Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/Leskarx/Finance-Dashboard-Zorvyn
cd finance-dashboard
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

---

## 🧠 Approach & Decisions

* Kept the UI minimal to ensure clarity and usability
* Used Context API to avoid unnecessary complexity
* Implemented mock API instead of backend to simulate real-world behavior
* Focused on reusable components and simple logic
* Added pagination to handle larger datasets efficiently

---

## ⚠️ Assumptions & Trade-offs

* No real backend (data is mocked)
* Basic validation in forms (kept simple)
* Filtering and pagination are implemented in-memory
* Charts are simplified for clarity

---

## 🏆 What This Project Demonstrates

* Clean and responsive UI design
* Practical state management
* Handling of real-world features like filtering, pagination, and role-based UI
* Attention to edge cases (empty states, loading states, etc.)
* Ability to structure a frontend project properly

---

## 💡 Final Note

This project focuses on simplicity, clarity, and practical frontend architecture.
Instead of overengineering, the emphasis was on building something that is **easy to understand, maintain, and extend**.

---
