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
    addresses: DeliveryAddressData[]
    createDeliveryAddressInformation: (data: DeliveryAddressData) => void
    updateDeliveryAddressInformation: (data: DeliveryAddressData) => void
    deleteDeliveryAddressInformation: (industryname: string) => void
}


interface childrenProps {
    children: ReactNode
}

export const DeliveryContext = createContext({} as DeliveryContextProviderProps)


export function DeliveryContextProvider({ children }: childrenProps) {
    const [addresses, setAddresses] = useState<DeliveryAddressData[]>([])
    console.log(addresses)

    function createDeliveryAddressInformation(data: DeliveryAddressData) {
        setAddresses((state) => [...state, data])
    }

    function updateDeliveryAddressInformation(data: DeliveryAddressData) {
        const foundAddressIndex = addresses.findIndex((address) => data.industryName === address.industryName)

        console.log(foundAddressIndex)
        if (foundAddressIndex !== -1) {
            const updatedAddresses = [...addresses];
            updatedAddresses[foundAddressIndex] = data
            setAddresses(updatedAddresses)
        }
    }

    function deleteDeliveryAddressInformation(industryname: string) {
        const addressWithoutDeletedOne = addresses.filter((address) => industryname !== address.industryName)
        setAddresses(addressWithoutDeletedOne)
    }

    return (
        <DeliveryContext.Provider value={{ createDeliveryAddressInformation, addresses, updateDeliveryAddressInformation, deleteDeliveryAddressInformation }}>
            {children}
        </DeliveryContext.Provider>
    )
}