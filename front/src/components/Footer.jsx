export function Footer() {
  return (
    <footer>
      <p>
        El objetivo de esta página es facilitar de forma visual la interacción
        con el back y que la navegación sea cómoda para su posterior evaluación.
        <br />
        Este proyecto ha sido desarrollado por Luisa García y Santiago Agarie.
      </p>
      <div className="container-foto">
        <a
          href="https://www.linkedin.com/in/luisa-garcía-854527244/"
          target="_blank"
        >
          <img className="foto-footer" src="../src/assets/Lu.jpeg" />
        </a>
        <a href="https://www.linkedin.com/in/santiago-agarie/" target="_blank">
          <img className="foto-footer" src="../src/assets/santi.png" />
        </a>
      </div>
    </footer>
  );
}
