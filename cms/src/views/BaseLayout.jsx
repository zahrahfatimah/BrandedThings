import { Outlet } from "react-router-dom"
import Nav from "../component/Navbar"



export default function BaseLayout() {
    return (
        <>
            <Nav/>
            <Outlet />
        </>
    )
}