import { Link } from "react-router-dom";

export function Inicio() {
  return (
    <>
      <div className="mainContainer">
        <img className="logobg" src="./img/logo1.png" alt="Logo OdontoSalud" />

        <div className="auxContainer">
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
          <div className="imgContainer">
            <img src="./img/edit.png" alt="Logo de Create" className="logo" />
            <img src="./img/file.png" alt="Logo de Read"  className="logo"/>
            <img src="./img/changes.png" alt="Logo de Update" className="logo" />
            <img src="./img/delete.png" alt="Logo de Delete"  className="logo"/>
          </div>
        </div>
        <div className="auxContainer">
          <div className="texto-links">
            <p>
              El backend de la aplicación se desarrolló en Node haciendo uso de
              Express y el front se desarrolló con React y se estilizó con Sass.
            </p>
          </div>
          <div className="imgContainer">
            <img src="/img/node.png"  alt="Logo de Node" className="logo"/>
            <img src="/img/express.png" alt="Logo de Express" className="logo"/>

            <img src="/img/react.png" alt="Logo de React" className="logo"/>
            <img src="/img/sass.png" alt="Logo de Sass" className="logo"/>
          </div>
        </div>
      </div>
    </>
  );
}
