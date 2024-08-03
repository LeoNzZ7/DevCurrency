import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

export const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.container} >
            <h1><strong>404</strong> - Page Not Found</h1>
            <button onClick={() => navigate(-1)}>Página Home</button>
        </div>
    )
}