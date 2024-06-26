import { useState, useRef, useContext, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { useForm } from "react-hook-form"
import { ButtonContainer, DeliveryForm, FormContainer } from "./styles"
import earth from '/images/earth.jpg'
import mars from '/images/mars.jpg'
import { DeliveryContext } from "../../contexts/DeliveryContext"
import { useSearchParams, useNavigate } from "react-router-dom"

export function DeliveryAddress() {
    const [remetentWorld, setRemententWorld] = useState('')
    const deliveryWorldRef = useRef<HTMLInputElement>(null)

    const [seachParams] = useSearchParams()
    const navigate = useNavigate()

    const { createDeliveryAddressInformation, updateDeliveryAddressInformation } = useContext(DeliveryContext)


    const addressFormSchema = zod.object({
        deliveryWorld: zod.string(),
        industryName: zod.string().min(4),
        marsCode: zod.number()
            .min(1000, 'O código deve conter no mínimo 4 digitos')
            .max(9999, 'O código deve conter no máximo 4 digitos'),
        zipCode: zod.string(),
        street: zod.string(),
        neighborhood: zod.string(),
        country: zod.string(),
        state: zod.string(),
        city: zod.string(),
    })

    const { register, handleSubmit, setValue, formState, reset } = useForm({
        resolver: zodResolver(addressFormSchema),
        defaultValues: {
            industryName: '',
            deliveryWorld: '',
            marsCode: 1000,
            zipCode: '',
            street: '',
            neighborhood: '',
            country: '',
            state: '',
            city: ''
        }
    })

    const { errors } = formState

    useEffect(() => {
        if (seachParams.size > 0) {
            const selection = document.getElementById('selectWorld') as HTMLSelectElement
            const industryName = seachParams.get('i')!.toString()

            if (seachParams.get('d') === 'Marte') {
                const marsCode = Number(seachParams.get('m'))
                selection.value = 'terra'
                setRemententWorld('terra')
                deliveryWorldRef.current!.value = 'Marte'
                setValue('marsCode', marsCode)
                setValue('industryName', industryName)

            } else if (seachParams.get('d') === 'Terra') {
                const zipCode = seachParams.get('z')!.toString()
                const street = seachParams.get('s')!.toString()
                const neighborhood = seachParams.get('n')!.toString()
                const country = seachParams.get('c')!.toString()
                const state = seachParams.get('y')!.toString()
                const city = seachParams.get('o')!.toString()

                selection.value = 'marte'
                setRemententWorld('marte')
                deliveryWorldRef.current!.value = 'Terra'
                setValue('industryName', industryName)
                setValue('zipCode', zipCode)
                setValue('street', street)
                setValue('neighborhood', neighborhood)
                setValue('country', country)
                setValue('state', state)
                setValue('city', city)
            }
        }

    }, [seachParams, setValue])


    type FormDataProps = zod.infer<typeof addressFormSchema>

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const target = event.currentTarget.value
        setRemententWorld(target)

        if (deliveryWorldRef.current) {
            if (target === 'terra') {
                deliveryWorldRef.current.value = 'Marte'
                setValue('deliveryWorld', 'Marte')
            } else {
                deliveryWorldRef.current.value = 'Terra'
                setValue('marsCode', 1000)
                setValue('deliveryWorld', 'Terra')
            }
        }
    }

    function handleSubmitAddressForm(data: FormDataProps) {
        const { deliveryWorld, industryName, marsCode, zipCode, street, country, state, city, neighborhood } = data

        if (seachParams.size <= 0) {
            if (remetentWorld === 'marte') {
                createDeliveryAddressInformation({
                    deliveryWorld,
                    industryName,
                    zipCode,
                    neighborhood,
                    street,
                    country,
                    state,
                    city
                })
                reset()
                navigate('/')
            } else {
                createDeliveryAddressInformation({
                    deliveryWorld,
                    industryName,
                    marsCode
                })
                reset()
                navigate('/')
            }
        } else {
            if (remetentWorld === 'marte') {
                updateDeliveryAddressInformation({
                    deliveryWorld: seachParams.get('d')!.toString(),
                    industryName,
                    zipCode,
                    neighborhood,
                    street,
                    country,
                    state,
                    city
                })
                reset()
                navigate('/')
            } else {
                updateDeliveryAddressInformation({
                    deliveryWorld: seachParams.get('d')!.toString(),
                    industryName,
                    marsCode
                })
                reset()
                navigate('/')

            }
        }
    }


    return (
        <FormContainer>
            <div className="maxSelectContainer">
                <section>
                    <label htmlFor="selectWorld">* Selecione o mundo onde você se encontra:</label>
                    <select name="" id="selectWorld" onChange={handleChange} defaultValue="selected">
                        <option value="selected" disabled>Selecione sua localização</option>
                        <option value="terra">Terra</option>
                        <option value="marte">Marte</option>
                    </select>
                </section>
            </div>

            <div className={`imageContainer ${remetentWorld ? 'active' : ''}`}>
                <img src={`${remetentWorld === 'terra' ? mars : remetentWorld === 'marte' ? earth : ''}`} alt="" />
            </div>

            <DeliveryForm onSubmit={handleSubmit(handleSubmitAddressForm)} >
                <div className="maxFormContainer">
                    <div className="deliveryFormData">
                        <label htmlFor="deliveryWorld">Mundo do destinatário:</label>
                        <input
                            type="text"
                            placeholder="Mundo de destino"
                            {...register("deliveryWorld")}
                            ref={deliveryWorldRef}
                            required
                            disabled
                        />
                    </div>

                    <div className="deliveryFormData" >
                        <label htmlFor="industryName">* Industria do destinatário:</label>
                        <input
                            type="text"
                            minLength={4}
                            placeholder="Nome da industria destinatária"
                            {...register("industryName")}
                            required
                        />
                    </div>

                    <div
                        className={`deliveryFormData ${remetentWorld === 'terra' ? ' active' : remetentWorld === 'marte' ? ' inactive' : ''}`}
                    >
                        <label htmlFor="marsCode">* Código do lote:</label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <input
                                type="number"
                                placeholder="lote"
                                {...register("marsCode", { valueAsNumber: true })}
                                required={remetentWorld === 'terra'}
                            />
                            {errors.marsCode && <span style={{ color: 'red', fontSize: '10px' }}>{errors.marsCode.message}</span>}
                        </div>
                    </div>

                    <div
                        className={`deliveryFormData ${remetentWorld === 'marte' ? ' active' : remetentWorld === 'terra' ? ' inactive' : ''}`}>
                        <label htmlFor="zipCode">*Cep:</label>
                        <input
                            type="text"
                            placeholder="cep"
                            {...register("zipCode")}
                            required={remetentWorld === 'marte'}
                        />
                    </div>

                    <div
                        className={`deliveryFormData ${remetentWorld === 'marte' ? ' active' : remetentWorld === 'terra' ? ' inactive' : ''}`}>
                        <label htmlFor="zipCode">*Rua:</label>
                        <input
                            type="text"
                            placeholder="Rua"
                            {...register("street")}
                            required={remetentWorld === 'marte'}
                        />
                    </div>

                    <div
                        className={`deliveryFormData ${remetentWorld === 'marte' ? ' active' : remetentWorld === 'terra' ? ' inactive' : ''}`}>
                        <label htmlFor="neighborhood">*Bairro:</label>
                        <input
                            type="text"
                            placeholder="Bairro"
                            {...register("neighborhood")}
                            required={remetentWorld === 'marte'}
                        />
                    </div>

                    <div className={`deliveryFormData ${remetentWorld === 'marte' ? ' active' : remetentWorld === 'terra' ? ' inactive' : ''}`}>
                        <label htmlFor="state">* Estado:</label>
                        <input
                            type="text"
                            placeholder="Estado"
                            {...register("state")}
                            required={remetentWorld === 'marte'}
                        />
                    </div>

                    <div className={`deliveryFormData ${remetentWorld === 'marte' ? ' active' : remetentWorld === 'terra' ? ' inactive' : ''}`}>
                        <label htmlFor="city">* Cidade:</label>
                        <input
                            type="text"
                            placeholder="Cidade"
                            {...register("city")}
                            required={remetentWorld === 'marte'}
                        />
                    </div>

                    <div className={`deliveryFormData ${remetentWorld === 'marte' ? ' active' : remetentWorld === 'terra' ? ' inactive' : ''}`}>
                        <label htmlFor="country">* País:</label>
                        <input
                            type="text"
                            placeholder="País"
                            {...register("country")}
                            required={remetentWorld === 'marte'}
                        />
                    </div>
                </div>

                <ButtonContainer>
                    <button type="submit">Enviar</button>
                </ButtonContainer>
            </DeliveryForm>
        </FormContainer>
    )
}
