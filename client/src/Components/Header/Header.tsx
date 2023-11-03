import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineClose, AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
// import Healthinfo from "../../Pages/Healthinfo/Healthinfo";

export const Header = () => {
  // const [diseaseDetails, setDiseaseDetails] = React.useState([] as any);
  const [blogs, setBlogs] = React.useState([] as any);

  const [patientInfo, setPatientInfo] = React.useState([] as any);
  const [healthInfo, setHealthInfo] = React.useState([] as any);

  const [serachBool, setSerachBool] = React.useState(false);
  const [patientInfoSerachVal, setPatientInfoSearachVal] = React.useState(
    [] as any
  );

  const [menu, setMenu] = React.useState(false);

  const search = (e: any) => {
    const patieninfo = patientInfo.filter((p: any) => {
      if (p.disease.toLowerCase().includes(e.target.value.toLowerCase())) {
        setSerachBool(true);
        return p;
      }
      p.sublink.find((i: any) => {
        if (i.name.toLowerCase().includes(e.target.value.toLowerCase())) {
          setSerachBool(true);
          return i;
        }
      });
    });
    const bloginfo = blogs.filter((b: any) => {
      if (b.title.toLowerCase().includes(e.target.value.toLowerCase())) {
        return b;
      }
    });
    const healthinfo = healthInfo.filter((h: any) => {
      if (h.diseaseName.toLowerCase().includes(e.target.value.toLowerCase())) {
        return h;
      }
    });

    setPatientInfoSearachVal([...patieninfo, ...bloginfo, ...healthinfo]);
    if (e.target.value == "") {
      setSerachBool(false);
    }
  };

  // const getDiseaseDetails = async () => {
  //   const { data } = await axios.get("/api/auth/disease/get");
  //   setDiseaseDetails([...data.disease]);
  // };

  const getPatientInfo = async () => {
    const { data } = await axios.get("/api/auth/patientinfo/get");
    console.log(data);
    if (data.success) {
      setPatientInfo([...data.patientInformation]);
    }
  };

  const getBlogs = async () => {
    const { data } = await axios.get("/api/auth/blog/get");
    if (data.success) {
      setBlogs([...data.allBlogs]);
    }
  };

  const getHealthInfo = async () => {
    const { data } = await axios.get("/api/auth/healthinfo/get");
    setHealthInfo([...data.healthInformation]);
    // const groupedWords: any = {};
    // data.healthInformation.forEach((word: any) => {
    //   const firstLetter = word.disease[0].toUpperCase();
    //   if (!groupedWords[firstLetter]) {
    //     groupedWords[firstLetter] = [];
    //   }
    //   groupedWords[firstLetter].push(word);
    // });
    // setGroupWord(groupedWords);
  };

  React.useEffect(() => {
    // getDiseaseDetails();
    getPatientInfo();
    getBlogs();
    getHealthInfo();
  }, []);

  console.log(patientInfoSerachVal);

  return (
    <header>
      <nav>
        <div className="left">
          <div className="logo-container">
            <Link to="/" className="link">
              <h2>
                <AiOutlineHome className="home-icon" /> डॉ. संतोष चौबे,
                एफआरएसीपी (एंडोक्रिनोलॉजी)@ThePracticalDoctor.Com
              </h2>
            </Link>
          </div>
          <div
            className="ham-burger"
            onClick={() => {
              setMenu(!menu);
            }}
          >
            {menu ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </div>
        </div>
        <div className="bottom">
          <div className="mid">
            <ul>
              {/* <li style={{ color: "#551A8B" }}>
              Health Topics
              <ul className="sub-menu-ul">
                {allTopics &&
                  allTopics.map((t: any) => {
                    return (
                      <a href={`/${t.name}`} className="link">
                        <li>{t.name}</li>
                      </a>
                    );
                  })}
              </ul>
            </li> */}
              <a href="/patientinformation/all" className="link">
                <li>उपयोगी वेबसाइटें</li>
              </a>{" "}
              {/* <li style={{ color: "#551A8B" }}>
                Diseases
                <ul className="sub-menu-ul">
                  {diseaseDetails.length > 0 &&
                    diseaseDetails.map((d: any) => {
                      return (
                        <a href={`/disease/${d.diseaseName}`} className="link">
                          <li style={{ fontSize: "1.2rem" }}>
                            {d.diseaseName}
                          </li>
                        </a>
                      );
                    })}
                </ul>
              </li> */}
              <Link to="/blogs" className="link">
                <li>ब्लॉग</li>
              </Link>
              <a href="/healthinformation/all" className="link">
                <li>रोग सूची</li>
              </a>{" "}
              <Link to="/consulation" className="link">
                <li>ऑनलाइन परामर्श</li>
              </Link>{" "}
            </ul>
          </div>
          <div className="right">
            <input
              type="text"
              name=""
              id=""
              placeholder="खोजें...."
              onKeyUp={(e) => {
                search(e);
              }}
            />
            {serachBool && (
              <div className="search-content">
                <ul>
                  {patientInfoSerachVal &&
                    patientInfoSerachVal.map((p: any) => {
                      return (
                        <>
                          {p.diseaseName && (
                            <a href={`/healthinformation/${p.diseaseName}`}>
                              <li>{p.diseaseName}</li>
                            </a>
                          )}
                          {p.disease && (
                            <a href={`/patientinformation/${p.disease}`}>
                              <li>{p.disease}</li>
                            </a>
                          )}
                          {p.title && (
                            <a href={`/blogs/${p._id}`}>
                              <li>{p.title}</li>
                            </a>
                          )}
                        </>
                      );
                    })}
                </ul>
              </div>
            )}

            <div>
              <a href="https://www.thepracticaldoctor.com/">
                <button>English</button>
              </a>
            </div>
          </div>
        </div>
      </nav>
      {menu && (
        <div className="mobile-navbar">
          <ul>
            {/* <li style={{ color: "#551A8B" }}>
              Health Topics
              <ul className="sub-menu-ul">
                {allTopics &&
                  allTopics.map((t: any) => {
                    return (
                      <a href={`/${t.name}`} className="link">
                        <li>{t.name}</li>
                      </a>
                    );
                  })}
              </ul>
            </li> */}
            <a href="/patientinformation/all" className="link">
              <li>उपयोगी वेबसाइटें</li>
            </a>{" "}
            {/* <li style={{ color: "#551A8B" }}>
                Diseases
                <ul className="sub-menu-ul">
                  {diseaseDetails.length > 0 &&
                    diseaseDetails.map((d: any) => {
                      return (
                        <a href={`/disease/${d.diseaseName}`} className="link">
                          <li style={{ fontSize: "1.2rem" }}>
                            {d.diseaseName}
                          </li>
                        </a>
                      );
                    })}
                </ul>
              </li> */}
            <Link to="/blogs" className="link">
              <li>ब्लॉग</li>
            </Link>
            <a href="/healthinformation/all" className="link">
              <li>रोग सूची</li>
            </a>{" "}
            <Link to="/consulation" className="link">
              <li>ऑनलाइन परामर्श</li>
            </Link>{" "}
          </ul>
        </div>
      )}
    </header>
  );
};
