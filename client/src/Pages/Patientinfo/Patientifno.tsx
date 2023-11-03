import React from "react";
import { Layout } from "../../Layout/Layout";
import axios from "axios";
import "./style.scss";
import { useParams } from "react-router-dom";

export const Patientifno = () => {
  const [patientInfo, setPatientInfo] = React.useState([] as any);
  const params: any = useParams();

  const getPatientInfo = async () => {
    const { data } = await axios.get("/api/auth/patientinfo/get");
    if (params.name === "all") {
      setPatientInfo([...data.patientInformation]);
    } else {
      const filteData = data.patientInformation.filter((p: any) => {
        return p.disease.toLowerCase().includes(params.name.toLowerCase());
      });
      setPatientInfo([...filteData]);
    }
  };
  React.useEffect(() => {
    getPatientInfo();
  }, []);
  return (
    <Layout>
      <div className="patient-info-section">
        <h3>रोगी की जानकारी</h3>
        <div className="patient-content">
          {patientInfo &&
            patientInfo.map((i: any) => {
              return (
                <div className="items">
                  <h3>{i.disease}</h3>
                  <div className="links-wrapper">
                    {i.sublink?.map((l: any) => {
                      return (
                        <a href={l.link} target="_blank">
                          {l.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Patientifno;
