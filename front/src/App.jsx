import { Routes, Route } from "react-router-dom";
import { Inicio } from "./pages/Inicio.jsx";
import Paciente from "./pages/Paciente.jsx";
import Odontologo from "./pages/Odontologo.jsx";
import Turno  from "./pages/Turno.jsx";
import Layout from "./layout/Layout.jsx";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/paciente" element={<Paciente />} />
          <Route path="/odontologo" element={<Odontologo />} />
          <Route path="/turno" element={<Turno />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
