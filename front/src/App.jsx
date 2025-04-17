import { Routes, Route } from "react-router-dom";
import { Inicio } from "./pages/Inicio.jsx";
import { Paciente } from "./pages/Paciente.jsx";
import { Odontologo } from "./pages/Odontologo.jsx";
import { Turno } from "./pages/Turno.jsx";
import { Header } from "./components/Header.jsx";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/paciente" element={<Paciente />} />
        <Route path="/odontologo" element={<Odontologo />} />
        <Route path="/turno" element={<Turno />} />
      </Routes>
    </div>
  );
}

export default App;
