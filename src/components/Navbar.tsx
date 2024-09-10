import { useState } from "react"
import Logo from "../../assets/images/LogoH.png"
import Button from './Button.tsx'
import Bars from "../../assets/icons/hamburger-icon.svg?react"
import './styles.css'

const Navbar = () => {
    const links = ['Home', 'Features', 'Community', 'Blog', 'Pricing']
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="nav">
            <a href="/">
                <img 
                    src={Logo}
                    alt="logo"
                    width={120}
                />
            </a>
            <div className="hamburger-icon">
                <button onClick={toggleMenu}>
                    <Bars 
                        width={30}
                        height={30}
                    />
                </button>
            </div>
            <div className={`links-and-btn ${isOpen ? 'block' : 'hidden'} lg:flex`}>
                <div className="links">
                    {links.map((link: string) => (
                        <a href="#">
                            {link}
                        </a>
                    ))}
                </div>
                <Button text="Register Now" image={true} />
            </div>
        </div>
    )
}

export default Navbar