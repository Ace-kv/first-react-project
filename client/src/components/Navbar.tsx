import { useState } from "react"
import Logo from "../../public/assets/images/LogoH.png"
import Button from './Button.tsx'
import Bars from "../../public/assets/icons/hamburger-icon.svg?react"
import { Link } from "react-router-dom"                                // to navigate between routes without refreshing the page.
import './styles.css'

const transformStringToLC = (str: string) => {
    // Split the string into words
    const words = str.trim().split(/\s+/);
  
    if (words.length >= 2) {
      return words.join('-').toLowerCase();
    }
  
    return str.toLowerCase();
}

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
                        <Link to={transformStringToLC(link)}>
                            {link}
                        </Link>
                    ))}
                </div>
                <Button text="Register Now" image={true} />
            </div>
        </div>
    )
}

export default Navbar