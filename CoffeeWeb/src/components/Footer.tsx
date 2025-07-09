import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-4">Coffee</h5>
            <p>
              Premium coffee blends sourced directly from farms. 
              Freshly roasted and delivered to your doorstep.
            </p>
            <div className="social-icons mt-3">
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-cup-hot fs-5"></i> {/* Alternative to Yelp */}
              </a>
            </div>
          </div>

                {/* Contact Info - Right-aligned container with aligned content */}
        <div className="col-md-4 mb-4 ms-auto">
        <div style={{ 
            marginLeft: 'auto',
            maxWidth: '100%',
            width: 'fit-content'
        }}>
            <h5 className="text-uppercase mb-4">Contact Us</h5>
            <ul className="list-unstyled">
            <li className="mb-3">
                <i className="bi bi-geo-alt-fill me-2"></i>
                123 Coffee Street
            </li>
            <li className="mb-3">
                <i className="bi bi-telephone-fill me-2"></i>
                +90 123 456 7890
            </li>
            <li className="mb-3">
                <i className="bi bi-envelope-fill me-2"></i>
                info@coffee.com
            </li>
            <li>
                <i className="bi bi-clock-fill me-2"></i>
                Mon-Fri: 8AM - 6PM
            </li>
            </ul>
        </div>
        </div>
        </div>

        <hr className="mb-4" />

        {/* Copyright */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">
              <i className="bi bi-c-circle me-1"></i>
              {new Date().getFullYear()}Coffee. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <Link to="/privacy" className="text-white text-decoration-none me-3">
              <i className="bi bi-shield-lock me-1"></i>Privacy
            </Link>
            <Link to="/terms" className="text-white text-decoration-none">
              <i className="bi bi-file-text me-1"></i>Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}