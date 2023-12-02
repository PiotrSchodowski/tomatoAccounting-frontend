import React from "react";
import { Button } from "react-bootstrap";

const FormNavigation = ({ onBack }) => {
  return (
    <div className="form-navigation">
      <Button
        className="create-button"
        variant="outline-secondary"
        onClick={onBack}
      >
        Cofnij
      </Button>
    </div>
  );
};

export default FormNavigation;
