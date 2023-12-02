import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import AuthService from "../services/auth.service";

const UpdateTomato = ({ onCancel }) => {
  const [message, setMessage] = useState("");
  const [tomatoName, setTomatoName] = useState("");
  const [harvestWeight, setHarvestWeight] = useState("");
  const user = AuthService.getCurrentUser();
  const token = user.accessToken;
  const email = user.email;

  const handleUpdateTomato = (e) => {
    e.preventDefault();

    if (!tomatoName || !harvestWeight) {
      setMessage("Wszystkie pola muszą być wypełnione.");
      return;
    } else {
      window.location.reload();

      const URL = `http://localhost:8080/users/${email}/addHarvestToTomato/${tomatoName}/${harvestWeight}`;

      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 400) {
            alert("Nie ma takiego pomidora");
          }
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          alert(resMessage);
        });
    }
  };

  return (
    <div className="createForm">
      <Form>
        <div className="form-inline">
          <Form.Group className="mr-2">
            <Form.Control
              name="name"
              type="text"
              placeholder="Odmiana"
              value={tomatoName}
              onChange={(event) => setTomatoName(event.target.value)}
              className="narrow-input transparent-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="weight"
              type="number"
              placeholder="Waga w kg"
              value={harvestWeight}
              onChange={(event) => setHarvestWeight(event.target.value)}
              className="narrow-input transparent-input"
            />
          </Form.Group>
          <Button
            className="create-button"
            variant="outline-secondary"
            type="submit"
            value="Dodaj"
            onClick={(event) => handleUpdateTomato(event)}
          >
            Zatwierdź zbiory
          </Button>
          <Button
            onClick={onCancel}
            className="create-button"
            variant="outline-secondary"
          >
            Cofnij
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

export default UpdateTomato;
