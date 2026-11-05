# StudioSpace – Creative Studio Booking Marketplace

**Discover. Create. Inspire.**

StudioSpace is a premium peer-to-peer creative studio booking marketplace designed for photographers, filmmakers, podcasters, musicians, and content creators. It connects creative professionals with inspiring studio spaces where they can bring their ideas to life.

## 🌐 Live Website

**Client Live URL:** [Add Your Deployed Client URL Here]

## ✨ Key Features

- **Explore Creative Studios:** Browse different creative spaces, including photography studios, film stages, podcast lounges, music suites, and more.
- **Category Filtering:** Easily discover studios by selecting your preferred category.
- **Studio Details:** View studio images, descriptions, locations, hourly rates, amenities, and booking information.
- **Studio Management:** Studio owners can create, update, and delete their studio listings.
- **Booking System:** Customers can request studio bookings and manage their reservations.
- **Booking Status Tracking:** Track booking progress through Pending, Confirmed, Completed, and Cancelled statuses.
- **User Dashboard:** Manage personal bookings and view relevant account information.
- **Host Dashboard:** Manage customer bookings, monitor completed reservations, and track earnings.
- **Authentication:** Access protected features through user authentication.
- **Responsive Design:** Enjoy a consistent experience across mobile, tablet, laptop, and desktop devices.

## 🛠️ Technology Stack

### Frontend
- Next.js (App Router)
- React.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Next.js Image
- React Toastify
- Better Auth

### Backend
- Node.js
- Express.js
- MongoDB
- REST API

## 📦 Local Installation & Setup

Follow these steps to run StudioSpace locally.

### 1. Clone the Client Repository

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
```

### 2. Navigate to the Client Directory

```bash
cd studio-space
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the client root directory and add the environment variables required by your project.

Add your authentication configuration and backend API URL using the variable names defined in your project.

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## ⚙️ Backend Setup

### 1. Clone the Backend Repository

```bash
git clone YOUR_BACKEND_REPOSITORY_URL
```

### 2. Navigate to the Backend Directory

```bash
cd studio-space-backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure MongoDB

Set up your MongoDB connection string and other required environment variables according to your backend configuration.

### 5. Start the Backend Server

Run the development script configured in your backend `package.json`, for example:

```bash
npm run dev
```

The backend API runs locally on:

```text
http://localhost:5000
```

## 🔐 Examiner Test Credentials

Use the following credentials to test the application.

**Test User Account**

- Email: `YOUR_EXAMINER_TEST_EMAIL`
- Password: `YOUR_EXAMINER_TEST_PASSWORD`

**Test Host Account**

- Email: `YOUR_EXAMINER_HOST_EMAIL`
- Password: `YOUR_EXAMINER_HOST_PASSWORD`

*Replace these placeholders with your actual working test accounts before submission. Do not commit real production passwords or secrets.*

## 📁 Project Structure

```text
studio-space/
├── app/
│   ├── dashboard/
│   ├── studios/
│   ├── my-bookings/
│   ├── my-listing/
│   ├── add-studio/
│   ├── login/
│   └── register/
├── components/
│   ├── Home/
│   ├── Shared/
│   └── ui/
├── lib/
├── public/
├── .env.local
├── package.json
└── README.md
```

## 🎨 Design System

StudioSpace follows a consistent premium visual identity.

| Design Element | Value |
|---|---|
| Primary Color | `#9CF237` |
| Secondary Color | `#1E1E1E` |
| Background | `#FFFFFF` |
| Surface | `#F4F5F6` |
| Muted Text | `#6B7280` |
| Border | `#E5E7EB` |
| Heading Font | Playfair Display |
| Body Font | DM Sans |

## 🚀 Project Goals

StudioSpace aims to simplify creative studio discovery and booking by providing a professional platform where studio owners can showcase their spaces and creators can find the perfect environment for their projects.

---

**StudioSpace – Discover Your Space. Create Something Amazing.**