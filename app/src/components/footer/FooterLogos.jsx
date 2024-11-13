import { Box, Grid2, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styles from "./FooterSection.module.css";

const FooterLogos = () => {
  const theme = useTheme();
  return (
    <>
      <div className={styles.footerLogo}>
        <div className={styles.customFooterLogos}>
          <a href="https://petro.presidencia.gov.co/" target="_blank" className="link-container">
            <img
              src="/images/logosfooter/presidencia.jpg"
              alt="Presidencia de Colombia"
              className={styles.footerm}
            />
          </a>
          <a href="https://gobiernodigital.mintic.gov.co/portal/" target="_blank" className="link-container">
            <img
              src="/images/logosfooter/gobierno-digital.png"
              alt="Gobierno Digital"
              className={styles.footerm}
            />
          </a>
          <a href="https://www.mintic.gov.co/portal/604/w3-channel.html" target="_blank" className="link-container">
            <img
              src="/images/logosfooter/mintic.png"
              alt="TIC"
              className={styles.footerm}
            />
          </a>
          <a href="https://www.mineducacion.gov.co/1759/w3-channel.html" target="_blank">
            <img
              src="/images/logosfooter/mineducacion.png"
              alt="Eduación"
              className={styles.footerm}
            />
          </a>
          <a href="https://minciencias.gov.co/" target="_blank">
            <img
              src="/images/logosfooter/minciencias.png"
              alt="Ciencias"
              className={styles.footerm}
            />
          </a>
          <a href="https://www.minagricultura.gov.co/paginas/default.aspx" target="_blank">
            <img
              src="/images/logosfooter/minagricultura.png"
              alt="Agricultura"
              className={styles.footerm}
            />
          </a>
          <a href="https://www.agronet.gov.co/ridac/Paginas/default.aspx" target="_blank">
            <img
              src="/images/logosfooter/ridac.png"
              alt="RIDAC"
              className={styles.footerm}
            />
          </a>
          <a href="https://www.serviciodeempleo.gov.co/inicio" target="_blank">
            <img
              src="/images/logosfooter/servicio-de-empleo.png"
              alt="Servicio de Empleo"
              className={styles.footerm}
            />
          </a>
          <a href="https://www.icfes.gov.co/" target="_blank">
            <img
              src="/images/logosfooter/icfes.png"
              alt="ICFES"
              className={styles.footerm}
            />
          </a>
          <a href="https://web.icetex.gov.co/portal" target="_blank">
            <img
              src="/images/logosfooter/icetex.png"
              alt="icetex"
              className={styles.footerm}
            />
          </a>
          <a href="https://www.cnsc.gov.co/" target="_blank">
            <img
              src="/images/logosfooter/cnsc.png"
              alt="Comisión Nacional del Servicio Civil"
              className={styles.footerm}
            />
          </a>
          <a href="https://www.epm.com.co/site/comunidadymedioambiente/comunidad-y-medio-ambiente/comunidad/acceso-a-la-educacion/fondo-epm" target="_blank">
            <img
              src="/images/logosfooter/fondo-epm.png"
              alt="Fondo EPM"
              className={styles.footerm}
            />
          </a>
          <a href="https://www.cis.org.co/" target="_blank">
            <img
              src="/images/logosfooter/cis.png"
              alt="CIS"
              className={styles.footerm}
            />
          </a>
          <a href="https://www.universia.net/co/home.html" target="_blank">
            <img
              src="/images/logosfooter/universia.png"
              alt="Universia"
              className={styles.footerm}
            />
          </a>
          <a href="http://www.mbies.info/" target="_blank">
            <img
              src="/images/logosfooter/mesa-de-bibliotecas.png"
              alt="Mesa de Bibliotecas"
              className={styles.footerm}
            />
          </a>
          <a href="https://www.renata.edu.co/" target="_blank">
            <img
              src="/images/logosfooter/renata.png"
              alt="Renata"
              className={styles.footerm}
            />
          </a>
          <a href="https://www.redttu.edu.co/es/" target="_blank">
            <img
              src="/images/logosfooter/redttu.png"
              alt="REDTTU"
              className={styles.footerm}
            />
          </a>
          <a href="http://www.turnitin.com/" title="Turnitin" target="_blank">
            <img
              src="/images/logosfooter/turntin.png"
              alt="Turnitin"
              className={styles.footerm}
            />
          </a>
          <a href="http://redcolsi.org/" title="Red COLSI" target="_blank">
            <img
              src="/images/logosfooter/red-colsi.png"
              alt="Red COLSI"
              className={styles.footerm}
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default FooterLogos;
