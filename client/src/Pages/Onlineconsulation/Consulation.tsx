import React from "react";
import { Layout } from "../../Layout/Layout";
import axios from "axios";
import "./style.scss";

export const Consulation = () => {
  const [consulation, setConsulation] = React.useState({} as any);
  // const [appoitment, setAppoitment] = React.useState([] as any);

  const getConsulation = async () => {
    const { data } = await axios.get("api/consulation");
    console.log(data);
    if (data.success) {
      setConsulation({
        ...data.consulation,
      });
    }
  };
  // const getAppoitment = async () => {
  //   const { data } = await axios.get("/api/auth/appoitment");
  //   console.log(data);
  //   if (data.success) {
  //     setAppoitment([...data.appoitment]);
  //   }
  // };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getConsulation();
    // getAppoitment();
  }, []);
  return (
    <Layout>
      <div className="consulation-wrapper">
        <div className="consulation-container">
          <video
            controls
            autoPlay
            src={`/uploads/${consulation.video}`}
          ></video>
          <h4>{consulation.title}</h4>
          <div className="visit-us">
            <div className="items">
              <h5>हमें कॉल करें</h5>
              <a href={`tel:+91${consulation.callnumber}`}>
                {consulation.callnumber}
              </a>
            </div>
            <div className="items whatsapp">
              <h5>वाट्सऐप</h5>
              <a
                href={`https://api.whatsapp.com/send?phone=${consulation.whatsappnumber}`}
              >
                {consulation.whatsappnumber}
              </a>
            </div>
            <div className="items email">
              <h5>ईमेल</h5>
              <a href={`mailto:${consulation.email}`}>{consulation.email}</a>
            </div>
          </div>
        </div>
        {/* <div className="appoitment-container">
          {appoitment &&
            appoitment.map((a: any) => {
              return (
                <div className="items">
                  <h5>{a.hospitalname}</h5>
                  <h6>{a.address}</h6>
                  <h6>{a.timing}</h6>
                  <h6>{a.days}</h6>
                </div>
              );
            })}
        </div> */}
      </div>
    </Layout>
  );
};
