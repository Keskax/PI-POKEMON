import React from "react";
import { Link } from "react-router-dom";
import style from "./landingPage.module.css";

const LandingPage = () => {
  return (
    <div>
      <div className={style.container}>
        <Link to="/home">
          <button className={style.button}>ENTER</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
