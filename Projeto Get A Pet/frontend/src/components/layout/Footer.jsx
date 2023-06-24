// Importando css footer
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span className="bold">Get a Pet by Caio Henrique &copy; 2023</span> 
        <span className={styles.desc}>Meu primeiro projeto desenvolvido com API's e ReactJS.</span>
      </p>
    </footer>
  );
};

export default Footer;
