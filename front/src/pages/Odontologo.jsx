import { Crud } from "../components/Crud";
import { Titulo } from "../components/Titulo";
import { Footer } from "../components/Footer";

export function Odontologo() {
  return (
    <>
      <div className="container-entidad">
        <Titulo texto="Interfaz de Odontólogo" />
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
