import React from "react";
import { Adminlayout } from "../../Layout/Adminlayout";
import "./style.scss";
import axios from "axios";
import { Loader } from "../../../../Loader/Loader";

const About = () => {
  const [video, setVideo] = React.useState("");
  const [quote, setQuote] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [spin, setSpin] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [aboutDesc, setAboutDesc] = React.useState([] as any);
  const [languageAboutDesc, setLanguageAboutDesc] = React.useState({} as any);

  const handleSubmit = async (e: any) => {
    if (quote.length > 102) {
      alert("words not more than 102 character");
    } else {
      setSpin(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append("quote", quote);
      formData.append("aboutdesc", about);
      formData.append("video", video);
      const { data } = await axios.post("/api/about/create", formData, {
        headers: {
          token: localStorage.getItem("user_token"),
        },
      });
      if (data.success) {
        // setSpin(false);
        setOk(true);
      }
    }
  };

  const getAbout = async () => {
    // setSpin(true);
    const { data } = await axios.get("/api/about");
    if (data.success) {
      console.log(data);
      setLanguageAboutDesc({ ...data.allAbout[0] });
      setAboutDesc([...data.allAbout]);
      setQuote(data.allAbout[0].quote);
      setAbout(data.allAbout[0].aboutdesc);
      setVideo(data.allAbout[0].video);
    }
    setSpin(false);
  };

  React.useEffect(() => {
    getAbout();
  }, []);

  if (ok) {
    return <About />;
  }

  return (
    <Adminlayout>
      {spin ? (
        <Loader />
      ) : (
        <div className="about-wrapper">
          <h3>About Your Self</h3>
          <div className="about-form-container">
            <form action="" onSubmit={handleSubmit}>
              <div className="form-field">
                <input
                  type="file"
                  name=""
                  id=""
                  accept="video/*"
                  onChange={(e: any) => {
                    setVideo(e.target.files[0]);
                  }}
                />
              </div>
              <div className="form-field">
                <textarea
                  rows={4}
                  placeholder="describe quote"
                  value={quote}
                  onChange={(e) => {
                    setQuote(e.target.value);
                  }}
                />
              </div>
              <div className="form-field">
                <textarea
                  rows={12}
                  placeholder="describe yourself"
                  value={about}
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                />
              </div>
              <div className="btn-container">
                <button>{aboutDesc.quote ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
          <div className="admin-about-preview">
            <div className="quote">
              <h4>{languageAboutDesc && languageAboutDesc.quote}</h4>
            </div>
            <div className="about-content">
              <pre>{languageAboutDesc && languageAboutDesc.aboutdesc}</pre>
            </div>
            <div className="video">
              {languageAboutDesc.video && (
                <video controls>
                  <source src={`/uploads/${languageAboutDesc?.video}`} />
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </Adminlayout>
  );
};

export default About;
