# Match-Mingle Frontend ⚛️

This is the React-based frontend for **Match-Mingle**, built with [Vite](https://vitejs.dev/) and styled with [Tailwind CSS](https://tailwindcss.com/).

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [React](https://reactjs.org/) (Version 18+)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) for managing global state (auth, feed, etc.)
- **Routing**: [React Router DOM](https://reactrouter.com/) for page navigation
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a sleek, modern, and utility-first UI
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Client**: [Axios](https://axios-http.com/) for making asynchronous HTTP requests

---

## 🏗️ Project Architecture

The frontend follows a **modular architecture** to ensure maintainability and scalability:

- `src/components/`: Common UI components like `Navbar`, `ProtectedRoute`, etc.
- `src/modules/`: Feature-specific modules (auth, feed, profile, connections, requests), each containing its own components and logic.
- `src/store/`: Centralized Redux store including slices for auth, feed, connections, and request management.
- `src/assets/`: Static images, icons, and theme-related assets.

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🧪 Development Guidelines

- **Component Creation**: All components should be functional and follow a clean, reusable structure.
- **State Management**: Use Redux slices for global data (e.g., user authentication state, connection lists).
- **Styling**: Use Tailwind utility classes directly in JSX. Follow the project's consistent color palette.
- **API Calls**: All backend interactions should be handled within Redux thunks or dedicated service files to keep the components focused on the UI.

---

## 📱 Features Implemented

- **Secure Auth Flow**: Seamless login/signup with redirection to protected routes.
- **Interactive Feed**: Swipeable cards to discover new people.
- **Dynamic Profile Editing**: Real-time form validation and profile updates.
- **Real-time Status Boards**: Instantly view pending requests and active connections.
- **Responsive Layout**: Designed to look great on mobile, tablet, and desktop screens.
