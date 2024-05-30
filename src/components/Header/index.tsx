import { HeaderContainer } from "./styles";
import { Link, useLocation } from "react-router-dom";

export function Header() {
    const { pathname } = useLocation()

    return (
        <HeaderContainer>
            {pathname.includes('address') ? (<Link to="/"> return </Link>) : ''}
            <h1>
                Delivery Beyond Worlds
            </h1>
        </HeaderContainer>
    )
}