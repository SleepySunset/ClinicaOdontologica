import { Crud } from "../components/Crud";
import { Titulo } from "../components/Titulo";
import { Footer } from "../components/Footer";

export function Turno() {
  return (
    <>
      <div className="container-entidad">
        <Titulo texto="Interfaz de Turno" />
        <Crud
          entidad={"turno"}
          textoRegistro={"Registrar turno"}
          textoBuscarTodos={"Ver todos los turnos existentes"}
        />
      </div>
      <Footer />
    </>
  );
}
