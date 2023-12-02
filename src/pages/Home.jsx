import React from "react";
import AuthService from "../services/auth.service";

function Home() {
  const user = AuthService.getCurrentUser();

  return (
    <div>
      <h1>Dzień dobry {user ? user.email : "Gościu"}!</h1>
      <p>
        Zapraszam serdecznie do aplikacji, w której możesz rejestrować swoje
        plony.
        {user
          ? ""
          : " Zaloguj się lub zarejestruj, aby móc korzystać z serwisu."}
      </p>
    </div>
  );
}

export default Home;
