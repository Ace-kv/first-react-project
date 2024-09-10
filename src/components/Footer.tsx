import Instagram from '../assets/icons/instagram-icon.svg?react'
import Web from '../assets/icons/web-icon.svg?react'
import Twitter from '../assets/icons/twitter-icon.svg?react'
import Youtube from '../assets/icons/youtube-icon.svg?react'
import SendBtn from '../assets/icons/send.svg?react'

const  transformString = (str: string) => {
    // Split the string into words
    const words = str.trim().split(/\s+/);
  
    if (words.length >= 2) {
      return words.join('-').toLowerCase();
    }
  
    return str.toLowerCase();
}

const Footer = () => {
    const companyLinks = ['About us', 'Blog', 'Contact us', 'Pricing', 'Testimonials']
    const transfCompanyLinks = companyLinks.map(transformString)

    const supportLinks = ['Help center', 'Terms of service', 'Legal', 'Privacy policy', 'Status']
    const transfSupportLinks = supportLinks.map(transformString)

    return (
        <footer className="footer">
            <div className="footer-ls">
                <a href="/">
                    <img 
                        src="/src/assets/images/LogoF.png" 
                        alt="footer-logo" 
                        width={170}
                    />
                </a>
                <div className="copyright">
                    <p className="footer-text">Copyright © 2020 Landify UI Kit.</p>
                    <p className="footer-text">All rights reserved</p>
                </div>
                <div className="footer-social-links">
                    <a href="#">
                        <Instagram width={30} height={30} />
                    </a>
                    <a href="#">
                        <Web width={30} height={30} />
                    </a>
                    <a href="#">
                        <Twitter width={30} height={30} />
                    </a>
                    <a href="#">
                        <Youtube width={30} height={30} />
                    </a>
                </div>
            </div>
            <div className="footer-rs">
                <div className="company-links">
                    <h4 className='footer-h4'>Company</h4>
                    <ul>
                        {companyLinks.map((link, index) => (
                            <a 
                                href={`${transfCompanyLinks[index]}`}
                            >
                                <li className='footer-text footer-links'>{link}</li>
                            </a>
                        ))}
                    </ul>
                </div>
                <div className="support-links">
                    <h4 className='footer-h4'>Support</h4>
                    <ul>
                        {supportLinks.map((link, index) => (
                            <a 
                                href={`${transfSupportLinks[index]}`}
                            >
                                <li className='footer-text footer-links'>{link}</li>
                            </a>
                        ))}
                    </ul>
                </div>
                <div className="newsltr">
                    <h4 className='footer-h4'>Stay up to date</h4>
                    <input 
                        type="email"
                        placeholder='Your email address'
                        className='newsltr-input'
                    />
                    <button aria-label="Subscribe">
                        <SendBtn 
                            width={20} 
                            height={20}
                            className='newsltr-input-btn'
                        />
                    </button> 
                </div>
            </div>
        </footer>
    )
}

export default Footer