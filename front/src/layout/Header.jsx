import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <nav>
        <Link to="/" className="imageLink">
          <img src="./img/logo2.png" alt="Logo OdontoSalud" />
        </Link>
        <ul>
          <Link to="/" className="link">
            Inicio
          </Link>

          <Link to="/paciente" className="link">
            Paciente
          </Link>

          <Link to="/odontologo" className="link">
            Odontólogo
          </Link>

          <Link to="/turno" className="link">
            Turno
          </Link>
        </ul>
      </nav>
    </header>
  );
}
