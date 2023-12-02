import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import AuthService from "../services/auth.service";

const CreateTomato = ({ onCancel }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  const userAuth = AuthService.getCurrentUser();
  const URL = `http://localhost:8080/users/${userAuth.email}/createNewTomato`;

  const handleCreateTomato = (e) => {
    e.preventDefault();

    setMessage("");

    if (!name || !quantity) {
      setMessage("Wszystkie pola muszą być wypełnione.");
      return;
    } else {
      window.location.reload();

      const newTomato = {
        name,
        quantity,
      };

      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAuth.accessToken}`,
        },
        body: JSON.stringify(newTomato),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 400) {
            alert("Taki pomidor już istnieje");
          }
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
        });
      setName("");
      setQuantity("");
    }
  };

  return (
    <div className="createForm">
      <Form onSubmit={handleCreateTomato}>
        <div className="form-inline">
          <Form.Group className="mr-2">
            <Form.Control
              name="name"
              type="text"
              placeholder="Odmiana"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="narrow-input transparent-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="quantity"
              type="number"
              placeholder="Ilość krzaków"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="narrow-input transparent-input"
            />
          </Form.Group>
          <Button
            className="create-button"
            variant="outline-secondary"
            type="submit"
            value="Dodaj"
          >
            Dodaj odmianę
          </Button>
          <Button
            className="create-button"
            variant="outline-secondary"
            onClick={onCancel}
          >
            Anuluj
          </Button>
        </div>
        <div className="Tfoot">
          <br />
          {message && <p>{message}</p>}
        </div>
      </Form>
    </div>
  );
};

export default CreateTomato;
