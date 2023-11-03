import { Link } from "react-router-dom";
import React from "react";
import "./style.scss";
import axios from "axios";
import { motion } from "framer-motion";

export const Consulation = () => {
  const [diseaseDetails, setDiseaseDetails] = React.useState([] as any);

  const getDiseaseDetails = async () => {
    const { data } = await axios.get("/api/auth/disease/get");
    setDiseaseDetails([...data.disease]);
  };
  React.useEffect(() => {
    getDiseaseDetails();
  }, []);
  return (
    <div className="consulation-wrapper">
      <div className="container">
        <motion.div
          className="counts"
          initial={{ opacity: 0, scale: 1.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {diseaseDetails &&
            diseaseDetails.slice(0, 4).map((d: any, index: number) => {
              return (
                <div className="items">
                  <h3>{index + 1}</h3>
                  <h5>{d.diseaseName}</h5>
                </div>
              );
            })}
        </motion.div>
        <motion.div
          className="paralax"
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="left"></div>
          <div className="right">
            <h2>ऑनलाइन परामर्श</h2>
            <p>डॉ. संतोष चौबे से ऑनलाइन परामर्श लें </p>
            <Link to="/consulation">
              <button>ऑनलाइन परामर्श</button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
