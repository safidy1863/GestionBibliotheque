import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarTimes,
  faBook,
  faBookReader,
  faHandHolding,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DoughnutChart } from "../charts/Doughnut";
import { isEmpty } from "./Empty";
import ConsultationAmende from "../components/ConsultationAmende";
import { apparitionOpacite } from "../actions/apparition.action";
import { apparitionConsultation } from "../actions/apparitionConsultation.action";
import ConsultationIndisponible from "../components/ConsultationIndisponible";

const Home = () => {
  const listeLecteurs = useSelector((state) => state.lecteursReducer);
  const listeLivres = useSelector((state) => state.livresReducer);
  const listePrets = useSelector((prets) => prets.pretsReducer);
  const apparitionConsultations = useSelector(
    (state) => state.apparitionConsultationReducer
  );
  const apparition = useSelector((state) => state.apparitionReducer);
  const [amendeConsult, setAmendeConsult] = useState(false);
  const [indispoConsult, setIndispoConsult] = useState(false);
  const lecteurIndisponible = isEmpty(listeLecteurs)
    ? 0
    : listeLecteurs.filter((indispo) => indispo.DISPONIBLITE === "Non");
  const lecteurpaieAmende = isEmpty(listeLecteurs)
    ? 0
    : listeLecteurs.filter((amende) => amende.Amende === "Oui");
  const dispatch = useDispatch();
  const dateAujourdHui = () => {
    let aujourdHui = new Date().toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return aujourdHui;
  };
  const [date, setDate] = useState(dateAujourdHui);
  useEffect(() => {
    setInterval(() => {
      setDate(dateAujourdHui);
    }, 1000);
  }, [date]);

  return (
    <div className="content">
      <Navigation />
      <div
        className="fondOpacite"
        style={{ display: apparition ? "block" : "none" }}
        onClick={() => {
          dispatch(apparitionOpacite(false));
          dispatch(apparitionConsultation(false));
          setIndispoConsult(false);
          setAmendeConsult(false);
        }}
      ></div>
      <div className="ensemble Home">
        <div className="leftHome">
          <span className="date">
            <FontAwesomeIcon icon={faCalendarTimes} /> {date}
          </span>
          <div className="totalContenu">
            <NavLink to="/lecteurs" className="total">
              <FontAwesomeIcon icon={faBookReader} />
              <h2>{listeLecteurs.length}</h2>
              <h5>Total lecteurs</h5>
            </NavLink>
            <NavLink to="/livres" className="total">
              <FontAwesomeIcon icon={faBook} />
              <h2>{listeLivres.length}</h2>
              <h5>Total livres</h5>
            </NavLink>
            <NavLink to="/prets" className="total">
              <FontAwesomeIcon icon={faHandHolding} />
              <h2>{listePrets.length}</h2>
              <h5>Total prêts</h5>
            </NavLink>
          </div>
          <div className="histogramme">
            <DoughnutChart />
          </div>
        </div>
        <div className="right">
          <div className="situations">
            <div
              className="situation"
              onClick={() => {
                dispatch(apparitionOpacite(true));
                dispatch(apparitionConsultation(true));
                setAmendeConsult(true);
              }}
            >
              <FontAwesomeIcon icon={faBookReader} />
              <h5>Lecteurs en amende</h5>
              <h2>{lecteurpaieAmende.length}</h2>
            </div>
            <div
              className="situation"
              onClick={() => {
                dispatch(apparitionOpacite(true));
                dispatch(apparitionConsultation(true));
                setIndispoConsult(true);
              }}
            >
              <FontAwesomeIcon icon={faBookReader} />
              <h5>Lecteurs indisponibles</h5>
              <h2>{lecteurIndisponible.length}</h2>
            </div>
          </div>
          <div className="etudiants">
            <span>Equipe de réalisation : </span>
            <div className="etudiant">
              <img src="./img/diamondra.jpg" alt="diamondra" />
              <div>
                <h5>Diamondra MANDIMBIARISATA</h5>
                <h6>Etudiante</h6>
                <h6>mandimbiarisatad@gmail.com</h6>
              </div>
            </div>
            <div className="etudiant">
              <img src="./img/safidy.JPG" alt="safidy" />
              <div>
                <h5>Manohisafidy ROBUSTE</h5>
                <h6>Etudiant</h6>
                <h6>robustemmanuel@gmail.com</h6>
              </div>
            </div>
            <div className="etudiant">
              <img src="./img/fitiavana.jpg" alt="fitiavana" />
              <div>
                <h5>Fitiavana CELESTIN</h5>
                <h6>Etudiant</h6>
                <h6>fanarenanafitiavana@gmail.com</h6>
              </div>
            </div>
          </div>
        </div>
        {apparitionConsultations && amendeConsult ? (
          <ConsultationAmende />
        ) : null}
        {apparitionConsultations && indispoConsult ? (
          <ConsultationIndisponible />
        ) : null}
        <div className="copyright">
          <h6>copyright © 2022</h6>
        </div>
      </div>
    </div>
  );
};

export default Home;
