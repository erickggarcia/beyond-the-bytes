import { HeaderContainer } from "./styles";
import { Link, useLocation } from "react-router-dom"
import backNavigation from '/icons/backNavigation.png'


export function Header() {
    const { pathname } = useLocation()

    return (
        <HeaderContainer>
            {pathname.includes('address') ? (<Link to="/">
                <img src={backNavigation} alt="retorno a página principal" />
            </Link>) : ''}
            <h1>
                Delivery Beyond Worlds
            </h1>
        </HeaderContainer>
    )
}