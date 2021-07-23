import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Header = () => {
  const { logout }: { logout: () => void } = useContext(AuthContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light blue">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Сокращение ссылок
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/create">
                  Создать
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/links">
                  Ссылки
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn" onClick={() => logout()}>
                  Выйти
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
