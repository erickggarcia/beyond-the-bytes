import { ReactNode, createContext, useState } from "react";

interface DeliveryAddressData {
    deliveryWorld?: string
    industryName?: string
    marsCode?: number
    zipCode?: string
    street?: string
    neighborhood?: string
    country?: string
    state?: string
    city?: string
}

interface DeliveryContextProviderProps {
    createDeliveryAddressInformation: (data: DeliveryAddressData) => void
    addresses: DeliveryAddressData[]
}


interface childrenProps {
    children: ReactNode
}

export const DeliveryContext = createContext({} as DeliveryContextProviderProps)


export function DeliveryContextProvider({ children }: childrenProps) {
    const [addresses, setAddresses] = useState<DeliveryAddressData[]>([])

    function createDeliveryAddressInformation(data: DeliveryAddressData) {
        setAddresses((state) => [...state, data])
    }

    return (
        <DeliveryContext.Provider value={{ createDeliveryAddressInformation, addresses }}>
            {children}
        </DeliveryContext.Provider>
    )
}