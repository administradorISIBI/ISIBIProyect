import { Box, Grid2, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styles from "./FooterEnd.module.css";

const FooterEnd = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                // display: "flex",
                // flexDirection: "row",
                backgroundColor: theme.palette.footer.main,
                color: theme.palette.text.main
            }}
        >
            <Box
                sx={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <Grid2 container spacing={2} sx={{ p: "20px" }}>
                    <Grid2 size={{ xs: 6, md: 3 }}>
                        <div className={styles.datos}>
                            <div className={styles.dato}>
                                <a href="https://www.politecnicojic.edu.co/" target="_blank">
                                    <img
                                        src="https://www.politecnicojic.edu.co/images/logo/logo-poli-v.png"
                                        alt="Politécnico Colombiano Jaime Isaza Cadavid"
                                    />
                                </a>
                            </div>
                            <div className={styles.dato}>
                                <h4 className={styles.subtitle}>Sede Medellín</h4>
                                <ul>
                                    <li>Carrera 48 No. 7–151, El Poblado - Antioquia</li>
                                    <li>Código Postal: 050022</li>
                                    <li>PBX: 604 444 7654 - 604 319 7900</li>
                                    <li>Celular: 300 712 46 70</li>
                                    <li>Canal anticorrupción: denuncias@elpoli.edu.co</li>
                                    <li>NIT: 890980136-6</li>
                                </ul>
                            </div>
                            <div className={styles.dato}>
                                <h4 className={styles.subtitle}>Centro Regional Oriente</h4>
                                <ul>
                                    <li>Calle 41 50a-324, Rionegro - Antioquia</li>
                                    <li>Código Postal: 054040</li>
                                    <li>Tel: 604 561 5178</li>
                                    <li>oriente@elpoli.edu.co</li>
                                </ul>
                            </div>
                            <div className={styles.dato}>
                                <h4 className={styles.subtitle}>Centro Regional Urabá</h4>
                                <ul>
                                    <li>Corregimiento El Reposo, Antioquia</li>
                                    <li>Código Postal: 057840</li>
                                    <li>Tel: 604 829 6856</li>
                                    <li>uraba@elpoli.edu.co</li>
                                </ul>
                            </div>
                        </div>
                    </Grid2>
                    <Grid2 size={{ xs: 6, md: 3 }}>
                        <div className={styles.datos}>
                            <div className={styles.dato}>
                                <h4 className={styles.subtitle}>
                                    Centro de Laboratorios, Prácticas y Experimentación
                                </h4>
                                <ul>
                                    <li>Carrera 58 No. 27B–125, Bello - Antioquia</li>
                                    <li>Tel: 604 452 0999</li>
                                    <li>claboratorios@elpoli.edu.co</li>
                                </ul>
                            </div>
                            <div className={styles.dato}>
                                <h4 className={styles.subtitle}>
                                    Centro de Laboratorios de Riegos y Maquinaria Agrícola
                                </h4>
                                <ul>
                                    <li>Diagonal 49 A No. 32–121, Niquía - Antioquia</li>
                                    <li>Tel: 604 482 6007</li>
                                    <li>niquia@elpoli.edu.co</li>
                                </ul>
                            </div>
                            <div className={styles.dato}>
                                <h4 className={styles.subtitle}>Granja Román Gómez Gómez</h4>
                                <ul>
                                    <li>Marinilla, Antioquia</li>
                                    <li>Tel: 604 548 5843</li>
                                    <li>granjas@elpoli.edu.co</li>
                                </ul>
                            </div>
                            <div className={styles.dato}>
                                <h4 className={styles.subtitle}>
                                    Granja John Jairo González Torres
                                </h4>
                                <h4 className={styles.subtitle}>
                                    Centro de Producción y Experimentación Acuícola
                                </h4>
                                <ul>
                                    <li>San Jerónimo, Antioquia</li>
                                    <li>Tel: 604 858 2555</li>
                                    <li>granjas@elpoli.edu.co</li>
                                </ul>
                            </div>
                        </div>
                    </Grid2>
                    <Grid2 size={{ xs: 6, md: 3 }}>
                        <div className={styles.datos}>
                            <div className={styles.dato}>
                                <h4 className={styles.subtitle}>Oferta Académica</h4>
                                <ul>
                                    <li>
                                        <a href="https://www.politecnicojic.edu.co/tecnicos">
                                            Técnicos
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.politecnicojic.edu.co/tecnologias">
                                            Tecnológicos
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.politecnicojic.edu.co/profesionales">
                                            Profesionales
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.politecnicojic.edu.co/especializaciones">
                                            Especializaciones
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.politecnicojic.edu.co/maestrias">
                                            Maestrías
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.politecnicojic.edu.co/doctorados">
                                            Doctorados
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.politecnicojic.edu.co/talleres">
                                            Talleres
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.politecnicojic.edu.co/cursos">
                                            Cursos
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.politecnicojic.edu.co/diplomados">
                                            Diplomados
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.dato}>
                                <h4 className={styles.subtitle}>
                                    Relacionamiento con el Ciudadano
                                </h4>
                                <ul>
                                    <li>
                                        <a href="https://www.politecnicojic.edu.co/directorio-institucional">
                                            Directorio Institucional
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.politecnicojic.edu.co/notificaciones-judiciales">
                                            Notificaciones Judiciales
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.politecnicojic.edu.co/denuncias-de-posibles-actos-de-corrupcion">
                                            Denuncias
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.politecnicojic.edu.co/procedimiento-pqrsd">
                                            Sistema de PQRSD
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Grid2>
                    <Grid2 size={{ xs: 6, md: 3 }}>
                        <div className={styles.datos}>
                            <div className={styles.dato}>
                                <a href="https://www.antioquia.gov.co/" target="_blank">
                                    <img
                                        src="https://www.politecnicojic.edu.co/images/logosfooter/gobernacion-de-antioquia-f.png"
                                        alt="Gobernación de Antioquia"
                                    />
                                </a>
                                <a href="https://www.icontec.org/" target="_blank">
                                    <img
                                        src="https://www.politecnicojic.edu.co/images/logosfooter/registros.png"
                                        alt="Registros ICONTEC"
                                    />
                                </a>
                                <a href="https://achecks.org/checker/index.php?uri=referer&amp;gid=WCAG2-AA">
                                    <img
                                        src="https://achecks.org/images/icon_W2_aa.jpg"
                                        alt="WCAG 2.0 (Level AA)"
                                    />
                                </a>
                            </div>
                        </div>
                    </Grid2>
                </Grid2>

                <div className={styles.normasFooter}>
                    {/* <div className="enlace-normativo">
                        <a href="https://www.politecnicojic.edu.co/images/downloads/comunicaciones/terminos-y-condiciones-pcjic.pdf">
                            Términos y Condiciones
                        </a>{" "}
                        |
                        <a href="https://www.politecnicojic.edu.co/politica-de-tratamiento-y-proteccion-de-datos-personales">
                            Política de Tratamiento y Protección de Datos Personales
                        </a>{" "}
                        |
                        <a href="https://www.politecnicojic.edu.co/estatutos/category/315-estatuto-propiedad-intelectual">
                            Política de Propiedad Intelectual
                        </a>{" "}
                        |
                        <a href="https://www.politecnicojic.edu.co/mapa-del-sitio">
                            Mapa del Sitio
                        </a>
                    </div> */}
                    <div className="enlace-normativo">
                        <h4 className={styles.subtitle}>
                            Institución de Educación Superior de carácter pública y
                            departamental sujeta a inspección y vigilancia por parte del
                            Ministerio de Educación.
                        </h4>
                        <h4 className={styles.subtitle}>
                            © <script>document.write(new Date().getFullYear());</script>2024
                        </h4>
                    </div>
                </div>
            </Box>
        </Box>
    );
};

export default FooterEnd;
