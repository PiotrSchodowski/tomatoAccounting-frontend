import React, { useState, useContext } from "react";
import GetTomatoes from "./GetTomatoes";
import CreateTomato from "./CreateTomato";
import UpdateTomato from "./UpdateTomato";
import { Button } from "react-bootstrap";

function Products() {
  const [showCreateTomatoForm, setShowCreateTomatoForm] = useState(false);
  const [showUpdateTomatoForm, setShowUpdateTomatoForm] = useState(false);
  const user = localStorage.getItem("user");

  const handleCreateTomatoClick = () => {
    setShowCreateTomatoForm(true);
    setShowUpdateTomatoForm(false);
  };

  const handleUpdateTomatoClick = () => {
    setShowCreateTomatoForm(false);
    setShowUpdateTomatoForm(true);
  };

  const handleFormBack = () => {
    setShowCreateTomatoForm(false);
    setShowUpdateTomatoForm(false);
  };

  return (
    <div>
      {user ? (
        <>
          <section>
            <div className="button-container">
              {showCreateTomatoForm || showUpdateTomatoForm ? null : (
                <>
                  <Button
                    className="create-button"
                    variant="outline-secondary"
                    onClick={handleCreateTomatoClick}
                  >
                    Stwórz nową odmianę
                  </Button>
                  <Button
                    className="create-button"
                    variant="outline-secondary"
                    onClick={handleUpdateTomatoClick}
                  >
                    Dodaj zbiory
                  </Button>
                </>
              )}
            </div>
            {showCreateTomatoForm && <CreateTomato onCancel={handleFormBack} />}
            {showUpdateTomatoForm && <UpdateTomato onCancel={handleFormBack} />}
            <GetTomatoes />
          </section>
        </>
      ) : (
        <p>Proszę się zalogować</p>
      )}
    </div>
  );
}

export default Products;
