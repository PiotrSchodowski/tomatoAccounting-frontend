import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");

    if (email.length < 5 || !email.includes("@")) {
      setMessage("Email musi mieć przynajmniej 5 znaków i zawierać @.");
    } else if (password.length < 5 || !/[A-Z]/.test(password)) {
      setMessage(
        "Hasło musi mieć przynajmniej 5 znaków i zawierać co najmniej jedną wielką literę."
      );
    } else {
      AuthService.login(email, password).then(
        () => {
          history.push("/products");
          window.location.reload();
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

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    alert("Wylogowano");
    window.location.reload();
  };

  return (
    <div className="Rejestracja">
      <div className="createForm">
        {user ? (
          <div className="form-inline">
            <Button
              type="button"
              variant="outline-secondary"
              onClick={handleLogout}
            >
              Wyloguj
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleLogin}>
            <div className="form-inline">
              <Form.Group className="mr-2">
                <Form.Control
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
                  placeholder="Hasło"
                  value={password}
                  className="narrow-input transparent-input"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="outline-secondary">
                Zaloguj
              </Button>
            </div>
            <div className="Tfoot">
              <br />
              {message}
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
