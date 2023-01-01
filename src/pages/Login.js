import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Login.css";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg">
        </Col>
        <Col md={5} className="d-flex align-items-center justify-content-center flex-direction-column">
        <Form style={{ width: '80%', maxWidth: 500 }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login 💭
          </Button>
          <div className='py-4'>
            <p className="text-center">Don't have an account?
            <Link to="/signup">Signup</Link>
            </p>
          </div>
        </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
