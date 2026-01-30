import Navbar from "./Navbar/navbar"
import Search from "./searchBar/search"
import Logo from "./logo/logo";
import "./header.css"

function Header() {

    return (
        <>
            <div className="logo">
                <Logo/>
            </div>
            <div className="navbar">
                <Navbar/>
            </div>
            <div className="search">
                <Search/>
            </div>
        </>
    )
}
export default Header;