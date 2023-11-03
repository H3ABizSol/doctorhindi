import React from "react";
// import doctor from "../../assets/doctor.avif";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";

export const Signin = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 25 }} spin />;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [spin, setSpin] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [type, setType] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpin(true);
    const { data } = await axios.post("/api/auth/login", {
      email,
      password,
    });
    if (data.success) {
      setSpin(false);
      setError(false);
      localStorage.setItem("user_token", data.token);
      navigate("/admin");
    } else {
      setError(true);
      setErrorMessage(data.message);
      setSpin(false);
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="container">
        <div className="left">
          {/* <figure>
            <img src={doctor} alt="" />
          </figure> */}
        </div>
        <div className="right">
          <form method="post" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p>{errorMessage}</p>}
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
              <label htmlFor="password">password</label>
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
            <div className="forgot-pass">
              <Link to="/forgotpassword">forgot password</Link>
            </div>
            <div className="btn-container">
              <button>
                Login{" "}
                {spin && (
                  <Spin indicator={antIcon} style={{ color: "black" }} />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
