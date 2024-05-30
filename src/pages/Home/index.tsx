import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DeliveryContext } from '../../contexts/DeliveryContext'
import { DeliveryContent, DeliveryInformation, HomeContainer, HomeContent } from './styles'

export function Home() {
    const navigate = useNavigate()
    const { addresses } = useContext(DeliveryContext)

    function handleUpdateDeliveryAddress(event: React.MouseEvent<HTMLSpanElement>) {

        const target = event.currentTarget as HTMLSpanElement;
        const deliveryWorld = target.getAttribute('deliveryworld')
        if (deliveryWorld === 'Marte') {
            const industryName = target.getAttribute('industryname')
            const marsCode = target.getAttribute('marscode')
            navigate(`/address?d=${deliveryWorld}&i=${industryName}&m=${marsCode}`)
        } else {
            const industryName = target.getAttribute('industryname')
            const zipCode = target.getAttribute('zipCode')
            const street = target.getAttribute('street')
            const neighborhood = target.getAttribute('neighborhood')
            const city = target.getAttribute('city')
            const state = target.getAttribute('state')
            const country = target.getAttribute('country')
            navigate(`/address?d=${deliveryWorld}&i=${industryName}&z=${zipCode}&s=${street}&n=${neighborhood}&c=${city}&s=${state}&c=${country}`)
        }

    }

    return (
        <HomeContainer >
            <HomeContent>
                <div>
                    <h2>Selecione ou cadastre um endereço para entrega</h2>

                    <button onClick={() => navigate('/address')}>
                        cadastrar endereço
                    </button>
                </div>
                <DeliveryContent>
                    <h2>
                        Lista de endereços
                    </h2>
                    {addresses && addresses.map((address) => (
                        <>
                            {address.deliveryWorld === 'Marte' ? (
                                <div key={address.industryName}>
                                    <DeliveryInformation>
                                        <img src="/images/mars.jpg" alt="" />
                                        <div>
                                            <span>
                                                {address.deliveryWorld}
                                            </span>
                                            <h3>{address.industryName}</h3>
                                            <p>{address.marsCode}</p>
                                        </div>
                                    </DeliveryInformation>
                                    <div className='addressActions'>
                                        <span {...address} onClick={handleUpdateDeliveryAddress}>Editar endereço</span> <span>Deletar Endereço</span>
                                    </div>
                                </div>
                            ) : (
                                <div key={address.industryName}>
                                    <DeliveryInformation>
                                        <img src="/images/earth.jpg" alt="" />
                                        <div>
                                            <span>
                                                {address.deliveryWorld}
                                            </span>
                                            <h3>{address.industryName}</h3>
                                            <p>{address.zipCode}</p>
                                            <div>
                                                {address.street} {' '}
                                                {address.neighborhood} {' '}
                                                {address.city} {' '}
                                                {address.state} {' '}
                                                {address.country} {' '}
                                            </div>
                                        </div>
                                    </DeliveryInformation>
                                    <div className='addressActions'>
                                        <span {...address} onClick={handleUpdateDeliveryAddress}>Editar endereço</span> <span>Deletar Endereço</span>
                                    </div>
                                </div >
                            )}
                        </>
                    ))}
                </DeliveryContent>
            </HomeContent>
        </HomeContainer >
    )
}