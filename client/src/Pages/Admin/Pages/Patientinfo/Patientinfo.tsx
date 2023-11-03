import React from "react";
import { Adminlayout } from "../../Layout/Adminlayout";
import "./style.scss";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Loader } from "../../../../Loader/Loader";

export const Patientinfo = () => {
  const [disease, setDisease] = React.useState("");
  const [subDisease, setSubDisease] = React.useState("");
  const [link, setLink] = React.useState("");
  const [patientInfo, setPatientInfo] = React.useState([] as any);
  const [open, setOpen] = React.useState(false);
  const [updateId, setUpdateId] = React.useState("");
  const [spin, setSpin] = React.useState(false);
  const [ok, setOk] = React.useState(false);

  const handleSubmit = async (e: any) => {
    setSpin(true);
    e.preventDefault();
    const { data } = await axios.post(
      "/api/auth/patientinfo/create",
      {
        disease,
        subDisease,
        link,
      },
      {
        headers: {
          token: localStorage.getItem("user_token"),
        },
      }
    );
    console.log(data);
    if (data.success) {
      setSpin(false);
      setOk(true);
    }
  };

  const handleSubmitUpdate = async (e: any) => {
    setSpin(true);
    e.preventDefault();
    const { data } = await axios.put(
      `/api/auth/patientinfo/update/${updateId}`,
      {
        disease,
        subDisease,
        link,
      },
      {
        headers: {
          token: localStorage.getItem("user_token"),
        },
      }
    );
    if (data.success) {
      setSpin(false);
      setOk(true);
    }
  };

  const updatePatientInfo = async (d: any) => {
    setUpdateId(d._id);
    document.body.style.overflow = "hidden";
    const linkname: any = [];
    const links: any = [];
    d.sublink.map((i: any) => {
      linkname.push(i.name);
      links.push(i.link);
    });
    setOpen(true);
    setDisease(d.disease);
    setSubDisease(linkname.toString());
    setLink(links.toString());
  };

  const deletePatientInfo = async (d: any) => {
    const confirm = window.confirm("are you sure");
    if (confirm) {
      setSpin(true);
      const { data } = await axios.delete(
        `/api/auth/patientinfo/delete/${d._id}`
      );
      if (data.success) {
        setSpin(false);
        setOk(true);
      }
    }
  };

  const getPatientInfo = async () => {
    const { data } = await axios.get("/api/auth/patientinfo/get");
    console.log(data);
    if (data.success) {
      setPatientInfo([...data.patientInformation]);
    }
  };

  React.useEffect(() => {
    document.body.style.overflow = "";
    getPatientInfo();
  }, []);

  if (ok) {
    return <Patientinfo />;
  }

  return (
    <Adminlayout>
      {spin ? (
        <Loader />
      ) : (
        <div className="patient-info-section">
          <div className="form-container">
            <form action="" onSubmit={handleSubmit}>
              <div className="input-area">
                <input
                  type="text"
                  name="title"
                  placeholder="disease"
                  onChange={(e) => {
                    setDisease(e.target.value);
                  }}
                  value={disease}
                />
              </div>
              <div className="input-area">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="sub disease link name"
                  onChange={(e) => {
                    setSubDisease(e.target.value);
                  }}
                  value={subDisease}
                />
              </div>
              <div className="input-area">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="links"
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                  value={link}
                />
                <button>Create</button>
              </div>
            </form>
          </div>
          <div className="patient-content">
            {patientInfo &&
              patientInfo.map((i: any) => {
                return (
                  <div className="items">
                    <div className="actions">
                      <AiOutlineEdit
                        size={22}
                        onClick={() => {
                          updatePatientInfo(i);
                        }}
                      />
                      <AiOutlineDelete
                        size={22}
                        onClick={() => {
                          deletePatientInfo(i);
                        }}
                      />
                    </div>
                    <h3>{i.disease}</h3>
                    <div className="links-wrapper">
                      {i.sublink?.map((l: any) => {
                        return (
                          <a href={l.link} target="_blank">
                            {l.name}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
          {open && (
            <div className="modal">
              <div className="form-container">
                <h5
                  onClick={() => {
                    setOpen(false);
                    document.body.style.overflow = "";
                    setDisease("");
                    setSubDisease("");
                    setLink("");
                  }}
                >
                  X
                </h5>
                <form action="" onSubmit={handleSubmitUpdate}>
                  <div className="input-area">
                    <input
                      type="text"
                      name="title"
                      placeholder="disease"
                      onChange={(e) => {
                        setDisease(e.target.value);
                      }}
                      value={disease}
                    />
                  </div>
                  <div className="input-area">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="sub disease link name"
                      onChange={(e) => {
                        setSubDisease(e.target.value);
                      }}
                      value={subDisease}
                    />
                  </div>
                  <div className="input-area">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="links"
                      onChange={(e) => {
                        setLink(e.target.value);
                      }}
                      value={link}
                    />
                    <button>update</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </Adminlayout>
  );
};
