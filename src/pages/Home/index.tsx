import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'

export function Home() {
    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <section className={styles.content}>
                <h2>Selecione ou cadastre um endereço para entrega</h2>

                <button onClick={() => navigate('/cadastro')}>
                   + Adicionar novo Endereço
                </button>
            </section>
        </div>
    )
}