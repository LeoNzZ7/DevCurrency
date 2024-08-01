import { BsSearch } from 'react-icons/bs'
import styles from './home.module.css'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <main className={styles.container} >
            <form className={styles.form}>
                <input type="search" placeholder='Digite o nome da moeda... Ex: Bitcoin' />
                <button type="submit">
                    <BsSearch size={30} color="#FFF" />
                </button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th scope='col' >Moeda</th>
                        <th scope='col' >Valor de mercado</th>
                        <th scope='col' >Preço</th>
                        <th scope='col' >Volume</th>
                        <th scope='col' >Mudança 24</th>
                    </tr>
                </thead>
                <tbody id='tbody' >
                    <tr className={styles.tr} >
                        <td className={styles.tdLabel} data-label="Moeda" >
                            <div className={styles.name} >
                                <Link to="/details/bitcoin">
                                    <span>bitcoin</span> | BTC
                                </Link>
                            </div>
                        </td>
                        <td className={styles.tdLabel} data-label="Valor de mercado" >
                            1T
                        </td>
                        <td className={styles.tdLabel} data-label="Preço" >
                            66432$
                        </td> <td className={styles.tdLabel} data-label="Volume" >
                            2b
                        </td>
                        <td className={styles.tdProfit} data-label="Mudança 24" >
                            <span>1.20</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}