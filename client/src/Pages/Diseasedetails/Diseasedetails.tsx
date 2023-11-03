import React from "react";
import { Layout } from "../../Layout/Layout";
import "./style.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Diseasedetails = () => {
  const [diseaseDetails, setDiseaseDetails] = React.useState({} as any);
  // const [appoitment, setAppoitment] = React.useState([] as any);

  const params: any = useParams();

  const getDiseaseDetails = async () => {
    const { data } = await axios.get("/api/auth/disease/get");
    console.log(data);
    const filterData = data.disease.filter((d: any) => {
      return d.diseaseName.toLowerCase() === params.name.toLowerCase();
    });
    setDiseaseDetails({
      ...filterData[0],
    });
  };
  // const getAppoitment = async () => {
  //   const { data } = await axios.get("/api/auth/appoitment");
  //   console.log(data);
  //   if (data.success) {
  //     setAppoitment([...data.appoitment]);
  //   }
  // };

  React.useEffect(() => {
    getDiseaseDetails();
    // getAppoitment();
  }, []);

  console.log(diseaseDetails);
  return (
    <Layout>
      <div className="disease-details-wrapper">
        <div className="disease-container">
          <h3>{diseaseDetails?.diseaseName}</h3>
          <pre>{diseaseDetails?.diseaseDesc}</pre>
        </div>
        {/* <div className="appoitment-container">
          {appoitment.length > 0 &&
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
