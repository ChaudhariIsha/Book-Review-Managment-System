import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRoute, RenderNavBar } from "./Component/Navigationbar.jsx";
import Home from "./Component/Home";
import LoginForm from "./Component/Login";
import RegisterForm from "./Component/Register";
import ReviewList from './Component/ReviewList.jsx';
import SubmitReviewForm from './Component/SubmitReview.jsx';
import EditReviewForm from './Component/EditReview.jsx';
import About from './Component/About';
import Contact from './Component/Contact';

export function App() {
  return (
    <BrowserRouter>
      <RenderNavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/book" element={<ReviewList />} />
          <Route path="/submit-review" element={<SubmitReviewForm />} />
          <Route path="/edit-review/:id" element={<EditReviewForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


