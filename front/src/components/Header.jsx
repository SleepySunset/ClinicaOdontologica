import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <img src="./img/logo2.png" alt="Logo OdontoSalud"/>
      <nav>
        <ul>
          <li>
            <Link to="/" className="link">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/paciente" className="link">
              Paciente
            </Link>
          </li>
          <li>
            <Link to="/odontologo" className="link">
              Odontólogo
            </Link>
          </li>
          <li>
            <Link to="/turno" className="link">
              Turno
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
