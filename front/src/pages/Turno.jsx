import { Crud } from "../components/Crud";
import { Footer } from "../components/Footer";

export function Turno() {
  return (
    <>
      <div className="container-entidad">
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
