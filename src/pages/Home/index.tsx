import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DeliveryContext } from '../../contexts/DeliveryContext'
import { DeliveryContent, DeliveryInformation, HomeContainer, HomeContent } from './styles'
import emptyImage from '/images/empty.png'

export function Home() {
    const navigate = useNavigate()
    const { addresses, deleteDeliveryAddressInformation } = useContext(DeliveryContext)

    function handleUpdateDeliveryAddress(event: React.MouseEvent<HTMLSpanElement>) {

        const target = event.currentTarget as HTMLSpanElement;
        const deliveryWorld = target.dataset.deliveryworld
        if (deliveryWorld === 'Marte') {
            const industryName = target.dataset.industryname
            const marsCode = target.dataset.marscode
            navigate(`/address?d=${deliveryWorld}&i=${industryName}&m=${marsCode}`)
        } else {
            const industryName = target.dataset.industryname
            const zipCode = target.dataset.zipcode
            const street = target.dataset.street
            const neighborhood = target.dataset.neighborhood
            const city = target.dataset.city
            const state = target.dataset.state
            const country = target.dataset.country

            navigate(`/address?d=${deliveryWorld}&i=${industryName}&z=${zipCode}&s=${street}&n=${neighborhood}&o=${city}&y=${state}&c=${country}`)

        }
    }

    function handleDeleteAddress(event: React.MouseEvent<HTMLSpanElement>) {
        const target = event.currentTarget as HTMLSpanElement;
        const industryname = target.dataset.industryname
        if (industryname) {
            deleteDeliveryAddressInformation(industryname)
        }
    }

    return (
        <HomeContainer >
            <HomeContent>
                {addresses.length > 0 ? (
                    <>
                        <div>
                            <h2>Selecione ou cadastre um endereço para entrega</h2>
                            <button onClick={() => navigate('/address')}>
                                cadastrar endereço
                            </button>
                        </div>
                        <DeliveryContent>
                            <h2>Lista de endereços</h2>
                            {addresses.map((address, index) => (
                                <div key={index}>
                                    {address.deliveryWorld === 'Marte' ? (
                                        <>
                                            <DeliveryInformation>
                                                <img src="/images/mars.jpg" alt="" />
                                                <div>
                                                    <span className='destinyWorld'>
                                                        {address.deliveryWorld}
                                                    </span>
                                                    <h3>{address.industryName}</h3>
                                                    <p>{address.marsCode}</p>
                                                </div>
                                            </DeliveryInformation>
                                            <div className='addressActions'>
                                                <span
                                                    data-deliveryworld={address.deliveryWorld}
                                                    data-industryname={address.industryName}
                                                    data-marscode={address.marsCode}
                                                    onClick={handleUpdateDeliveryAddress}>
                                                    Editar endereço
                                                </span>
                                                <span
                                                    data-industryname={address.industryName}
                                                    onClick={handleDeleteAddress}>
                                                    Deletar Endereço
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <DeliveryInformation>
                                                <img src="/images/earth.jpg" alt="" />
                                                <div>
                                                    <span className='destinyWorld'>
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
                                                <span
                                                    data-deliveryworld={address.deliveryWorld}
                                                    data-industryname={address.industryName}
                                                    data-zipcode={address.zipCode}
                                                    data-street={address.street}
                                                    data-neighborhood={address.neighborhood}
                                                    data-city={address.city}
                                                    data-state={address.state}
                                                    data-country={address.country}
                                                    onClick={handleUpdateDeliveryAddress}>
                                                    Editar endereço
                                                </span>
                                                <span
                                                    data-industryname={address.industryName}
                                                    onClick={handleDeleteAddress}>
                                                    Deletar Endereço
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </DeliveryContent>
                    </>
                ) : (
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                            <h3>Você ainda não possui nenhum endereço cadastrado</h3>
                            <img src={emptyImage} style={{ display: 'block', maxWidth: '200px' }} alt="" />
                            <button onClick={() => navigate('/address')}>
                                cadastrar endereço
                            </button>
                        </div>

                    </div>
                )}
            </HomeContent>
        </HomeContainer >
    )
}