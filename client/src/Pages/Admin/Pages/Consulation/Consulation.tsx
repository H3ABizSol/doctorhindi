import React from "react";
import "./style.scss";
import { Adminlayout } from "../../Layout/Adminlayout";
import axios from "axios";
import { Loader } from "../../../../Loader/Loader";

const Consulation = () => {
  const [title, setTitle] = React.useState("");
  const [video, setVideo] = React.useState("");
  const [callnumber, setCallNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [whatsappnumber, setWhatsappNumber] = React.useState("");
  const [consulation, setConsulation] = React.useState({} as any);

  const [ok, setOk] = React.useState(false);
  const [spin, setSpin] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpin(true);
    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("callnumber", callnumber);
    formData.append("whatsappnumber", whatsappnumber);
    formData.append("email", email);

    const { data } = await axios.post("/api/consulation/create", formData, {
      headers: {
        token: localStorage.getItem("user_token"),
      },
    });
    if (data.success) {
      setSpin(false);
      setOk(true);
    }
  };

  // const deleteTopic = async (e: any) => {
  //   setSpin(true);
  //   const { data } = await axios.put(
  //     `http://localhost:8080/api/education/delete/${e._id}`,
  //     {
  //       img: e.img,
  //     },
  //     {
  //       headers: {
  //         token: localStorage.getItem("user_token"),
  //       },
  //     }
  //   );
  //   console.log(data);
  //   if (data.success) {
  //     setSpin(false);
  //     setOk(true);
  //   }
  // };

  // const getEducationTopics = async () => {
  //   const { data } = await axios.get("http://localhost:8080/api/education");
  //   if (data.success) {
  //     setAllTopics([...data.allTopics?.topics]);
  //   }
  // };

  const getConsulation = async () => {
    const { data } = await axios.get("/api/consulation");
    if (data.success) {
      setConsulation({
        ...data.consulation,
      });
      setTitle(data.consulation.title);
      setVideo(data.consulation.video);
      setCallNumber(data.consulation.callnumber);
      setWhatsappNumber(data.consulation.whatsappnumber);
      setEmail(data.consulation.email);
    }
  };

  React.useEffect(() => {
    getConsulation();
  }, []);

  if (ok) {
    return <Consulation />;
  }

  console.log(consulation);
  return (
    <Adminlayout>
      {spin ? (
        <Loader />
      ) : (
        <div className="create-consulation-wrapper">
          <h2>Create</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="input-area">
              <input
                type="text"
                name="title"
                placeholder="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
              <input
                type="file"
                accept="video/*"
                onChange={(e: any) => {
                  setVideo(e.target.files[0]);
                }}
              />
            </div>
            <div className="input-area">
              <input
                type="text"
                name=""
                placeholder="call us number"
                onChange={(e) => {
                  setCallNumber(e.target.value);
                }}
                value={callnumber}
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="whatspp number"
                onChange={(e) => {
                  setWhatsappNumber(e.target.value);
                }}
                value={whatsappnumber}
              />
            </div>
            <div className="input-area">
              <input
                type="text"
                name=""
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>

            <div className="input-area">
              <button>Create</button>
            </div>
          </form>
          <div className="display-consulation">
            <h2>{consulation && consulation.title}</h2>
            {consulation && (
              <div className="video">
                <video controls src={`/uploads/${consulation?.video}`}></video>
              </div>
            )}

            <div className="visit-us">
              <div className="items">
                <h3>Call us</h3>
                <a href={`tel:+${consulation?.callnumber}`}>
                  {consulation?.callnumber}
                </a>
              </div>
              <div className="items whatsapp">
                <h3>whatsApp</h3>
                <a
                  href={`https://api.whatsapp.com/send?phone=${consulation?.whatsappnumber}`}
                >
                  {consulation?.whatsappnumber}
                </a>
              </div>
              <div className="items email">
                <h3>Email</h3>
                <a href={`mailto:${consulation.email}`}>{consulation?.email}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </Adminlayout>
  );
};

export default Consulation;
