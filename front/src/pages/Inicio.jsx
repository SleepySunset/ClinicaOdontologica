import { Link } from "react-router-dom";

export function Inicio() {
  return (
    <>
      <div className="container-inicio">
        <img className="logobg" src="./img/logo1.png" alt="Logo OdontoSalud" />

        <div className="crud">
          <div className="texto-links">
            <p>
              OdontoSalud es una clínica odontológica desarrollada como
              ejercitación para el curso de BackEnd de DigitalHouse. En esta web
              encontrarás 3 diferentes entidades:{" "}
              <Link to="/paciente" className="link">
                Paciente
              </Link>
              ,{" "}
              <Link to="/odontologo" className="link">
                Odontólogo
              </Link>{" "}
              y{" "}
              <Link to="/turno" className="link">
                Turno
              </Link>
              , las cuales tienen su propio CRUD al que podrás realizar
              solicitudes simples gracias a la conexión con nuestra base de
              datos.
            </p>
          </div>
          <div>
            <img src="./img/edit.png" alt="Logo de Create"/>
            <img src="./img/file.png" alt="Logo de Read" />
            <img src="./img/changes.png"  alt="Logo de Update"/>
            <img src="./img/delete.png" alt="Logo de Delete"/>
          </div>
        </div>
        <div className="tecnologias">
          <div className="texto-links">
            <p>
              El backend de la aplicación se desarrolló en Node haciendo uso de
              Express y el front se desarrolló con React y se estilizó con
              Sass.
            </p>
          </div>
          <div>
          <img src="/img/node.png" />
            <img src="/img/express.png" />
            
            <img src="/img/react.png" />
            <img src="/img/sass.png" />
          </div>
        </div>
      </div>
    </>
  );
}
