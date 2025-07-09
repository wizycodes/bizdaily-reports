import './Footer.css';
import facebook from '../Assets/facebook.png'
import twitter from '../Assets/twitter.png'
import website from '../Assets/website.png'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-left">
        <h3>Bizdaily Reports</h3>
        <p>Daily Business News That Matters</p>
      </div>

      <div className="footer-center">
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
          <img src={twitter} alt="Twitter" />
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src={facebook} alt="Facebbok" />
        </a>
        <a href="https://bizdaily-reports.vercel.app/" target="_blank" rel="noopener noreferrer">
          <img src={website} alt="Website" />
        </a>
      </div>

      <div className="footer-right">
        <p>© {currentYear} Bizdaily Reports. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
