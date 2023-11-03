import React from "react";
import { Layout } from "../../Layout/Layout";
import "./style.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
const Healthinfo = () => {
  const [groupWord, setGroupWord] = React.useState({} as any);
  const [groupWordSearch, setGroupWordSearch] = React.useState({} as any);
  const [isSearch, setIsSearch] = React.useState(false);
  const params = useParams();

  const search = (e: any) => {
    Object.keys(groupWord).map((i: any) => {
      groupWord[i].find((f: any) => {
        if (
          f.diseaseName.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          setIsSearch(true);
          setGroupWordSearch({ [i]: [f] });
        }
      });
    });
    if (e.target.value === "") {
      setIsSearch(false);
    }
    // const patieninfo = patientInfo.filter((p: any) => {
    //   if (p.disease.toLowerCase().includes(e.target.value.toLowerCase())) {
    //     setSerachBool(true);
    //     return p;
    //   }
    // });
  };

  const getHealthInfo = async () => {
    const { data } = await axios.get("/api/auth/healthinfo/get");
    const groupedWords: any = {};
    data.healthInformation.forEach((word: any) => {
      const firstLetter = word.diseaseName[0].toUpperCase();
      if (!groupedWords[firstLetter]) {
        groupedWords[firstLetter] = [];
      }
      groupedWords[firstLetter].push(word);
    });
    setGroupWord(groupedWords);

    if (params.name === "all") {
    } else {
      Object.keys(groupedWords).map((i: any) => {
        groupedWords[i].find((f: any) => {
          if (f.diseaseName.toLowerCase().includes(params.name)) {
            setIsSearch(true);
            setGroupWordSearch({ [i]: [f] });
          }
        });
      });
    }
  };

  React.useEffect(() => {
    document.body.style.overflow = "";
    getHealthInfo();
  }, []);

  return (
    <Layout>
      <div className="health-info-wrapper">
        <div className="search-wrapper">
          <input
            type="serach"
            placeholder="serach..."
            id=""
            onKeyUp={(e) => {
              search(e);
            }}
          />
        </div>
        <div className="health-contents">
          {!isSearch &&
            Object.keys(groupWord).map((i: any) => {
              return (
                <div key={i}>
                  <h4>{i}</h4>
                  {groupWord[i].map((c: any) => {
                    return (
                      <div className="items">
                        <h3>{c.diseaseName}</h3>
                        <ul className="links-wrapper">
                          {c.sublink?.map((l: any) => {
                            return (
                              <a href={l.link} target="_blank">
                                <li>{l.name} Pdf</li>
                              </a>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              );
            })}

          {isSearch &&
            Object.keys(groupWordSearch).map((i: any) => {
              return (
                <div key={i}>
                  <h4>{i}</h4>
                  {groupWord[i].map((c: any) => {
                    return (
                      <div className="items">
                        <h3>{c.diseaseName}</h3>
                        <ul className="links-wrapper">
                          {c.sublink?.map((l: any) => {
                            return (
                              <a href={l.link} target="_blank">
                                <li>{l.name} Pdf</li>
                              </a>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Healthinfo;

{
  /* <div className="items">
  <h3>{i.disease}</h3>
  <ul className="links-wrapper">
    {i.sublink?.map((l: any) => {
      return (
        <a href={l.link} target="_blank">
          <li>{l.name}</li>
        </a>
      );
    })}
  </ul>
</div>; */
}
