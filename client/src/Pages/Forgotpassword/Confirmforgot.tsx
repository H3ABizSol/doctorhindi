import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import { useParams } from "react-router-dom";

export const Confirmforgot = () => {
  const [password, setPassword] = React.useState("");
  const [newpassword, setNewPassword] = React.useState("");
  const params = useParams();

  const [type, setType] = React.useState(false);

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newpassword !== password) {
      alert("password not match");
    } else {
      const { data } = await axios.post(
        `/api/auth/changeforgotpassword/${params.token}`,
        {
          password,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
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
    }
  };
  return (
    <div className="forgot-wrapper">
      <div className="right">
        <form method="post" onSubmit={handleSubmit}>
          <h2>Reset Password</h2>

          <div className="form-input">
            <input
              type={type ? "text" : "password"}
              name="password"
              id="password"
              // placeholder="password"
              value={newpassword}
              required
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <label htmlFor="password">new password</label>
            <div
              className="show-hide-pass"
              onClick={() => {
                if (password) {
                  setType(!type);
                }
              }}
            >
              {type ? (
                <AiOutlineEye size={25} />
              ) : (
                <AiFillEyeInvisible size={25} />
              )}
            </div>
          </div>

          <div className="form-input">
            <input
              type={type ? "text" : "password"}
              name="password"
              id="password"
              // placeholder="password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="password">confrim password</label>
            <div
              className="show-hide-pass"
              onClick={() => {
                if (password) {
                  setType(!type);
                }
              }}
            >
              {type ? (
                <AiOutlineEye size={25} />
              ) : (
                <AiFillEyeInvisible size={25} />
              )}
            </div>
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
