import React from "react";
import "./style.scss";
import { Layout } from "../../Layout/Layout";
import axios from "axios";

const HomeAbout = () => {
  const [languageAboutDesc, setLanguageAboutDesc] = React.useState({} as any);

  const getAbout = async () => {
    // setSpin(true);
    const { data } = await axios.get("/api/about");
    console.log(data);
    if (data.success) {
      console.log(data);
      setLanguageAboutDesc({ ...data.allAbout[0] });
    }
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
    getAbout();
  }, []);

  return (
    <Layout>
      <div className="home-about-wrapper">
        <div className="container">
          <div className="left">
            <pre>{languageAboutDesc && languageAboutDesc.quote}</pre>

            {languageAboutDesc && (
              <div className="video-container">
                <video
                  controls
                  src={`/uploads/${languageAboutDesc?.video}`}
                ></video>
              </div>
            )}
          </div>
          <div className="right">
            <h2>Welcome</h2>
            <div className="about-content">
              <pre>{languageAboutDesc && languageAboutDesc.aboutdesc}</pre>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeAbout;
