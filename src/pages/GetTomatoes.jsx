import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import AuthService from "../services/auth.service";

const GetTomatoes = () => {
  const [tomatoes, setTomatoes] = useState([]);

  const user = AuthService.getCurrentUser();
  const token = user.accessToken;
  const email = user.email;

  const sortedTomatoes = [...tomatoes].sort((a, b) => b.result - a.result);

  const URL = `http://localhost:8080/users/${email}/getTomatoList`;

  useEffect(() => {
    if (token) {
      fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Nie udało się pobrać pomidorów.");
          }
        })
        .then((data) => {
          setTomatoes(data);
        })
        .catch(() => {});
    }
  }, [URL, token]);

  const totalQuantity = sortedTomatoes.reduce(
    (sum, tomato) => sum + tomato.quantity,
    0
  );
  const totalWeight = sortedTomatoes.reduce(
    (sum, tomato) => sum + tomato.weight,
    0
  );
  const totalResult = sortedTomatoes.reduce(
    (sum, tomato) => sum + tomato.result,
    0
  );

  const deleteTomatoes = (name) => {
    const URL_DEL = `http://localhost:8080/users/${email}/deleteTomato/${name}`;

    fetch(URL_DEL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        const newTomatoes = tomatoes.filter((tomato) => tomato.name !== name);
        setTomatoes(newTomatoes);
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania pomidora:", error);
      });
  };

  return (
    <div>
      <>
        <Table className="transparent-table" size="sm">
          <thead>
            <tr>
              <th>Odmiana</th>
              <th>Ilość</th>
              <th>Waga w Kg</th>
              <th>Kg / Odmiana</th>
            </tr>
          </thead>
          <tbody>
            {sortedTomatoes.map((tomato) => (
              <tr key={tomato.id}>
                <td>{tomato.name}</td>
                <td>{tomato.quantity}</td>
                <td>{tomato.weight}</td>
                <td>{tomato.result}</td>
                <td>
                  <Button
                    className="delete-button"
                    variant="outline-secondary"
                    onClick={() => deleteTomatoes(tomato.name)}
                  >
                    Usuń
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th>
                <span className="Tfoot">*</span>
              </th>
              <th>
                <span className="Tfoot">{totalQuantity}</span>
              </th>
              <th>
                <span className="Tfoot">{totalWeight}</span>
              </th>
              <th>
                <span className="Tfoot">{totalResult}</span>
              </th>
            </tr>
          </tfoot>
        </Table>
      </>
    </div>
  );
};

export default GetTomatoes;
