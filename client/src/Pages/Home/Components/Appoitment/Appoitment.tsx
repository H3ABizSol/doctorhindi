import React from "react";
import { Layout } from "../../../../Layout/Layout";
import axios from "axios";
import "./Style.scss";
import toast, { Toaster } from "react-hot-toast";

export const UserAppoitment = () => {
  const [appoitment, setAppoitment] = React.useState([] as any);
  const [name, setname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [disease, setDisease] = React.useState("");
  const [message, setMessage] = React.useState("");

  const sendmail = async (e: any) => {
    e.preventDefault();
    if (!name || !email || mobile || !disease || !message) {
      toast("please include all fields", {
        duration: 4000,
        position: "top-right",
        style: {
          fontSize: "1.6rem",
          background: "black",
          color: "white",
          height: "60px",
        },
        icon: "✏️",
        iconTheme: {
          primary: "#bb0e0e",
          secondary: "#c12929",
        },
      });
    } else {
      const { data } = await axios.post("/api/auth/sendemail", {
        name,
        email,
        mobile,
        disease,
        message,
      });
      console.log(data);
      if (data.success) {
        toast("mail was sent", {
          duration: 4000,
          position: "top-right",
          style: {
            fontSize: "1.6rem",
            background: "black",
            color: "white",
            height: "60px",
          },
          icon: "💌",
          iconTheme: {
            primary: "#bb0e0e",
            secondary: "#c12929",
          },
        });
      } else {
        alert(data.message);
      }
    }
  };

  const getAppoitment = async () => {
    const { data } = await axios.get("/api/auth/appoitment");
    console.log(data);
    if (data.success) {
      setAppoitment([...data.appoitment]);
    }
  };

  React.useEffect(() => {
    getAppoitment();
  }, []);
  return (
    <Layout>
      <div className="user-appoitment">
        <div className="left">
          <div className="appoitment">
            {appoitment &&
              appoitment.map((a: any) => {
                return (
                  <div className="appoitment-items">
                    <h3 className="main-head">{a.hospitalname}</h3>
                    <h6>Address</h6>
                    <h4 className="address">{a.address}</h4>
                    <h6>Mobile</h6>
                    <div className="number">
                      {a.mobile.map((m: any) => {
                        return <a href={`tel:+${m}`}>{m}</a>;
                      })}
                    </div>
                    <div>
                      <h6>Timing</h6>
                      <h4>{a.timing}</h4>
                      <h4>{a.days}</h4>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="right">
          <form action="" onSubmit={sendmail}>
            <h3>Appoitment</h3>
            <div className="input-area">
              <input
                type="text"
                name=""
                id=""
                placeholder="name"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </div>
            <div className="input-area">
              <input
                type="text"
                name=""
                id=""
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input-area">
              <input
                type="text"
                placeholder="mobile"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
            </div>
            <div className="input-area">
              <input
                type="text"
                name=""
                id=""
                placeholder="disease"
                value={disease}
                onChange={(e) => {
                  setDisease(e.target.value);
                }}
              />
            </div>
            <div className="input-area">
              <textarea
                rows={10}
                id=""
                placeholder="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </div>
            <div className="input-area">
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};
