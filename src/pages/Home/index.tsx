import { useNavigate } from 'react-router-dom'

export function Home() {
    const navigate = useNavigate()

    return (
        <div >
            <section>
                <h2>Selecione ou cadastre um endereço para entrega</h2>

                <button onClick={() => navigate('/cadastro')}>
                   + Adicionar novo Endereço
                </button>
            </section>
        </div>
    )
}