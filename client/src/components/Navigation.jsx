import React from "react";
import { NavLink } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  faHandHolding,
  faBookReader,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Navigation = () => {
  return (
    <div className="Navigation">
        <div className="logo">
            <img src="./img/livre.png" alt="logo"/>
            <h4>Bibliothèque</h4>
        </div>
      <div className="navigation">
        <NavLink to="/" exact activeClassName="nav-active">
          <FontAwesomeIcon icon={faHome} /> Home
        </NavLink>
        <NavLink to="/livres" activeClassName="nav-active">
          {" "}
          <FontAwesomeIcon icon={faBook} /> Livres
        </NavLink>
        <NavLink to="/lecteurs" activeClassName="nav-active">
          <FontAwesomeIcon icon={faBookReader} /> Lecteurs
        </NavLink>
        <NavLink to="/prets" activeClassName="nav-active">
          <FontAwesomeIcon icon={faHandHolding} /> Prets
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
