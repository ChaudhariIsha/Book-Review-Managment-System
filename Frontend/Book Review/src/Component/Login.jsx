import React, { useState } from 'react';
import { loginUser, storeToken } from '../Services/UserService';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Lottie from "lottie-react";
import bookLoader from "../assets/BookLoader.json";
import '../assets/Login.css' // Make sure path is correct

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // control loader

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // show loader

    try {
      const response = await loginUser(formData);

      if (response.status === 200) {
        console.log('Login Token:', response.data.token);
        storeToken(response.data.token);
        toast.success('Login successful!');
        navigate('/', { replace: true }); // redirect to home page immediately
      }
    } catch (error) {
      setLoading(false); // hide loader on error

      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong...!");
      }
    }
  };

  return (
    <div className="login-page-background">
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      {loading ? (
        <Lottie animationData={bookLoader} loop={true} style={{ width: 200, height: 200 }} />
      ) : (
        <Row>
          <Col>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center mb-4">Login</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <small>
                    Don't have an account? <Link to="/register">Register here</Link>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
    </div>
  );
}

export default LoginForm;
