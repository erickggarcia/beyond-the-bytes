import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { useForm } from "react-hook-form"
import { ButtonContainer, DeliveryForm, FormContainer } from "./styles"
import earth from '/images/earth.jpg'
import mars from '/images/mars.jpg'

export function DeliveryAddress() {
    const [remetentWorld, setRemententWorld] = useState('')
    const deliveryWorldRef = useRef<HTMLInputElement>(null)

    const addressFormSchema = zod.object({
        deliveryWorld: zod.string(),
        industryName: zod.string().min(4),
        marsCode: zod.number().min(4, 'O código deve conter no mínimo 4 digitos'),
        zipCode: zod.string(),
        country: zod.string(),
        state: zod.string(),
        city: zod.string(),
    })

    const { register, handleSubmit, setValue, formState } = useForm({
        resolver: zodResolver(addressFormSchema),
        defaultValues: {
            industryName: '',
            deliveryWorld: '',
            marsCode: 0o0,
            zipCode: '',
            country: '',
            state: '',
            city: ''
        }
    })

    const { errors } = formState


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
                setValue('marsCode', 0o0)
                setValue('deliveryWorld', 'Terra')
            }
        }
    }

    function handleSubmitAddressForm(data: FormDataProps) {
        const { deliveryWorld, industryName, marsCode, zipCode, country, state, city } = data

        if (remetentWorld === 'marte') {
            console.log({
                deliveryWorld,
                industryName,
                zipCode,
                country,
                state,
                city
            })
        } else {
            console.log({
                deliveryWorld,
                industryName,
                marsCode
            })
        }
    }

    console.log(errors)

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
                        <label htmlFor="deliveryWorld">* Mundo do destinatário:</label>
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

                    <div className={`deliveryFormData ${remetentWorld === 'marte' ? ' active' : remetentWorld === 'terra' ? ' inactive' : ''}`}>
                        <label htmlFor="country">* País:</label>
                        <input
                            type="text"
                            placeholder="País"
                            {...register("country")}
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
                </div>

                <ButtonContainer>
                    <button type="submit">Enviar</button>
                </ButtonContainer>
            </DeliveryForm>
        </FormContainer>
    )
}
