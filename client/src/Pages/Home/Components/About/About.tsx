import React from "react";
import "./style.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const About = () => {
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
    getAbout();
  }, []);
  return (
    <>
      <div className="about-wrapper">
        <div className="container">
          <div className="left">
            <motion.pre
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
              initial={{ y: -40 }}
            >
              {languageAboutDesc && languageAboutDesc.quote}
            </motion.pre>

            {languageAboutDesc && (
              <motion.video
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                controls
                autoPlay
                src={`/uploads/${languageAboutDesc?.video}`}
              ></motion.video>
            )}
          </div>
          <div className="right">
            <motion.h2
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              स्वागत
            </motion.h2>
            <div className="about-content">
              <motion.pre
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {languageAboutDesc && languageAboutDesc.aboutdesc}
              </motion.pre>
            </div>

            <Link to="/about">
              <motion.button
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8 }}
              >
                अधिक
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
