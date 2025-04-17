import { Crud } from "../components/Crud";
import { Footer } from "../components/Footer";

export function Odontologo() {
  return (
    <>
      <div className="container-entidad">
        <Crud
          entidad={"odontologo"}
          textoRegistro={"Registrar odontólogo"}
          textoBuscarTodos={"Ver todos los odontólogos existentes"}
        />
      </div>
      <Footer />
    </>
  );
}
