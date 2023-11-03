import React from "react";
import { Adminlayout } from "../../Layout/Adminlayout";
import "./style.scss";
import axios from "axios";
import Liveadmin from "../../../Home/Components/Live/Live";
import { Loader } from "../../../../Loader/Loader";

export const Live = () => {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");
  const [image, setImage] = React.useState("");
  const [live, setLive] = React.useState({} as any);
  const [spin, setSpin] = React.useState(false);
  const [ok, setOk] = React.useState(false);

  const handleSubmit = async (e: any) => {
    setSpin(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("img", image);

    const { data } = await axios.post("/api/auth/live/create", formData, {
      headers: {
        token: localStorage.getItem("user_token"),
      },
    });
    if (data.success) {
      setSpin(false);
      setOk(true);
    }
  };

  const getLive = async () => {
    setSpin(true);
    const { data } = await axios.get("/api/auth/live");
    if (data.success) {
      setLive({
        ...data.live,
      });
      setTitle(data.live.title);
      setLink(data.live.link.toString());
      setImage(data.live.image);
    }
    setSpin(false);
  };

  React.useEffect(() => {
    getLive();
  }, []);

  if (ok) {
    return <Live />;
  }
  return (
    <Adminlayout>
      {spin ? (
        <Loader />
      ) : (
        <div className="live-section">
          <div className="form-container">
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
              </div>
              <div className="input-area">
                <input
                  type="file"
                  name="title"
                  id=""
                  placeholder="title"
                  onChange={(e: any) => {
                    setImage(e.target.files[0]);
                  }}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="links..."
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                  value={link}
                />
                <button>Create</button>
              </div>
            </form>
          </div>
          <div className="live-admin">
            <Liveadmin live={live} />
          </div>
        </div>
      )}
    </Adminlayout>
  );
};
