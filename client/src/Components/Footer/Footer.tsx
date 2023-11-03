import { Link } from "react-router-dom";
import "./Footer.scss";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoYoutube,
} from "react-icons/bi";

export const Footer = () => {
  return (
    <>
      <footer>
        <div className="social-icon-wrapper">
          <ul>
            <ul>
              <li>
                <a href="tel:+">
                  <BiLogoFacebook size={40} />
                </a>
              </li>
              <li>
                <a href="tel:+">
                  <BiLogoInstagram size={40} />
                </a>
              </li>
              <li>
                <a href="tel:+">
                  <BiLogoLinkedin size={40} />
                </a>
              </li>
              <li>
                <a href="tel:+">
                  <BiLogoYoutube size={40} />
                </a>
              </li>
            </ul>
          </ul>
        </div>
        <div className="footer-details">
          <ul>
            <ul>
              <Link to="/consulation" className="link">
                <li>ऑनलाइन परामर्श</li>
              </Link>{" "}
              <a href="/patientinformation/all" className="link">
                <li>उपयोगी वेबसाइटें</li>
              </a>{" "}
              <Link to="/healthinformation/all" className="link">
                <li>रोग सूची</li>
              </Link>{" "}
              {/* <li style={{ color: "#551A8B" }}>
                Diseases
                <ul className="sub-menu-ul">
                  {diseaseDetails.length > 0 &&
                    diseaseDetails.map((d: any) => {
                      return (
                        <a href={`/disease/${d.diseaseName}`} className="link">
                          <li style={{ fontSize: "1.2rem" }}>
                            {d.diseaseName}
                          </li>
                        </a>
                      );
                    })}
                </ul>
              </li> */}
              <Link to="/blogs" className="link">
                <li>ब्लॉग</li>
              </Link>
            </ul>
          </ul>
        </div>
        <div className="copyright">
          <p>
            © कॉपीराइट 2023, सर्वाधिकार सुरक्षित एच3ए बिजनेस सॉल्यूशंस प्राइवेट
            लिमिटेड
          </p>
        </div>
      </footer>
    </>
  );
};
