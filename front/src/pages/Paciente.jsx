import { Titulo } from "../components/Titulo";
import { Crud } from "../components/Crud";
import { Footer } from "../components/Footer";

export function Paciente() {
  return (
    <>
      <div className="container-entidad">
        <Titulo texto="Interfaz de paciente" />
        <Crud
          entidad={"paciente"}
          textoRegistro={"Registrar paciente"}
          textoBuscarTodos={"Ver todos los pacientes existentes"}
        />
      </div>
      <Footer />
    </>
  );
}
