import React from "react";
import "../styles/Footer.css";
import "../images/pom3.avif";

const Footer = () => {
  return (
    <footer>
      <div className="Footer">
        <div className="FooterText">
          Twoje pomidory, twoje konto, nasza pasja. Zapisuj swoje plony i bądź
          na bieżąco z tym co rośnie w Twoim ogrodzie.
        </div>
        <div className="FooterText2">
          © 2023 TomatoesCompany. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
