import React from "react";
import "./style.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const Forgotpassword = () => {
  const [email, setEmail] = React.useState("");
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post(
      "/api/auth/forgotpassword",
      {
        email,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    if (data.success) {
      toast(data.message, {
        duration: 4000,
        position: "top-right",
        style: {
          fontSize: "1.6rem",
          background: "black",
          color: "white",
          height: "60px",
        },
        icon: "😊",
        iconTheme: {
          primary: "#bb0e0e",
          secondary: "#c12929",
        },
      });
    } else {
      toast(data.message, {
        duration: 4000,
        position: "top-right",
        style: {
          fontSize: "1.6rem",
          background: "black",
          color: "white",
          height: "60px",
        },
        icon: "😔",
        iconTheme: {
          primary: "#bb0e0e",
          secondary: "#c12929",
        },
      });
    }
  };
  return (
    <div className="forgot-wrapper">
      <div className="right">
        <form method="post" onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
          <div className="form-input">
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="email">email</label>
          </div>
          <div className="btn-container">
            <button>
              send{" "}
              {/* {spin && <Spin indicator={antIcon} style={{ color: "black" }} />} */}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};
