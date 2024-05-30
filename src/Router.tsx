import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./defaultLayout";
import { Home } from "./pages/Home";
import { DeliveryAddress } from "./pages/DeliveryAddress";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/address" element={<DeliveryAddress />} />
            </Route>
        </Routes>
    )
}