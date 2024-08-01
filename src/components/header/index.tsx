import styles from "./header.module.scss"
import logo from "../../assets/logo.svg"
import { Link } from "react-router-dom"

export const Header = () => (
    <header className={styles.container} >
        <Link to="/" >
            <img src={logo} alt="logo Cripto App" />
        </Link>
    </header>
)