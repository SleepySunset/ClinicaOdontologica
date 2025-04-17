import { Footer } from "../components/Footer";
import GuardarPaciente from "../components/GuardarPaciente";

export function Paciente() {
  return (
    <>
      <div className="container-entidad">
        <h1>Interfaz de paciente</h1>
        <GuardarPaciente />
      </div>
      <Footer />
    </>
  );
}
