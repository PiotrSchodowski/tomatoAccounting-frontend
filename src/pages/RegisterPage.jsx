import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import AuthService from "../services/auth.service";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");

    if (email.length < 5 || !email.includes("@")) {
      setMessage("Email musi mieć przynajmniej 5 znaków i zawierać @.");
    } else if (password.length < 5 || !/[A-Z]/.test(password)) {
      setMessage(
        "Hasło musi mieć przynajmniej 5 znaków i zawierać co najmniej jedną wielką literę."
      );
    } else {
      AuthService.register(email, password).then(
        (response) => {
          setMessage(response.data.message);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
        }
      );
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="Rejestracja">
      <div className="createForm">
        <Form onSubmit={handleRegister}>
          <div className="form-inline">
            <Form.Group className="mr-2">
              <Form.Control
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                className="narrow-input transparent-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                name="password"
                placeholder="Hasło"
                value={password}
                className="narrow-input transparent-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="outline-secondary">
              Zarejestruj
            </Button>
          </div>
          <div className="Tfoot">
            <br />
            {message}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
