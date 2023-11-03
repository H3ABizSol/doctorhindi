import React from "react";
import "./style.scss";
import { Adminlayout } from "../../Layout/Adminlayout";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Loader } from "../../../../Loader/Loader";
import { Link } from "react-router-dom";

const Disease = () => {
  const [diseaseName, setDiseaseName] = React.useState("");
  const [diseaseDesc, setDiseaseDisc] = React.useState("");
  const [disease, setDisease] = React.useState([] as any);
  const [open, setOpen] = React.useState(false);
  const [spin, setSpin] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [updateId, setUpdateId] = React.useState("");

  const handleSubmit = async (e: any) => {
    setSpin(true);
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("hospitalname", hospitalname);
    // formData.append("mobile", mobile);
    // formData.append("address", address);
    // formData.append("days", days);
    // formData.append("timing", timing);

    const { data } = await axios.post(
      "/api/auth/disease/create",
      {
        diseaseName,
        diseaseDesc,
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
    } else {
      setSpin(false);
      alert(data.message);
    }
  };

  const handleSubmitUpdate = async (e: any) => {
    setSpin(true);
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("hospitalname", hospitalname);
    // formData.append("mobile", mobile);
    // formData.append("address", address);
    // formData.append("days", days);
    // formData.append("timing", timing);

    const { data } = await axios.put(
      `/api/auth/disease/update/${updateId}`,
      {
        diseaseName,
        diseaseDesc,
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
    } else {
      setSpin(false);
      alert(data.message);
    }
  };

  const deleteDisease = async (d: any) => {
    const confirm = window.confirm("are you sure");
    if (confirm) {
      setSpin(true);
      const { data } = await axios.delete(`/api/auth/disease/delete/${d._id}`, {
        headers: {
          token: localStorage.getItem("user_token"),
        },
      });
      if (data.success) {
        setSpin(false);
        setOk(true);
      }
    }
  };

  const getDisease = async () => {
    const { data } = await axios.get("/api/auth/disease/get");
    if (data.success) {
      setDisease([...data.disease]);
    }
  };

  React.useEffect(() => {
    getDisease();
  }, []);

  if (ok) {
    return <Disease />;
  }
  return (
    <Adminlayout>
      {spin ? (
        <Loader />
      ) : (
        <div className="disease-wrapper">
          <div className="form-container">
            <form action="" onSubmit={handleSubmit}>
              <div className="input-area">
                <input
                  type="text"
                  name="title"
                  placeholder="disease name"
                  onChange={(e) => {
                    setDiseaseName(e.target.value);
                  }}
                  value={diseaseName}
                />
              </div>
              <div className="input-area">
                <textarea
                  name="title"
                  placeholder="disease desc"
                  rows={10}
                  onChange={(e) => {
                    setDiseaseDisc(e.target.value);
                  }}
                  value={diseaseDesc}
                />
              </div>

              <div className="input-area">
                <button>Create</button>
              </div>
            </form>
          </div>
          <div className="disease">
            {disease &&
              disease.map((a: any) => {
                return (
                  <div className="items">
                    <div className="btn-container">
                      <AiOutlineDelete
                        size={25}
                        className={"icon"}
                        onClick={() => {
                          deleteDisease(a);
                        }}
                      />
                      <AiOutlineEdit
                        size={25}
                        className={"icon"}
                        onClick={() => {
                          document.body.style.overflow = "hidden";
                          setUpdateId(a._id);
                          setOpen(true);
                          setDiseaseName(a.diseaseName);
                          setDiseaseDisc(a.diseaseDesc);
                        }}
                      />
                    </div>
                    <h2>{a.diseaseName}</h2>
                    <pre>{`${a.diseaseDesc}`}</pre>
                    <Link to={`/disease/${a.diseaseName}`}>
                      <button>Readmore</button>
                    </Link>
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
                    setOpen(false);
                    setDiseaseName("");
                    setDiseaseDisc("");
                  }}
                >
                  X
                </h5>
                <form action="" onSubmit={handleSubmitUpdate}>
                  <div className="input-area">
                    <input
                      type="text"
                      name="title"
                      placeholder="disease name"
                      onChange={(e) => {
                        setDiseaseName(e.target.value);
                      }}
                      value={diseaseName}
                    />
                  </div>
                  <div className="input-area">
                    <textarea
                      name="title"
                      placeholder="disease desc"
                      rows={10}
                      onChange={(e) => {
                        setDiseaseDisc(e.target.value);
                      }}
                      value={diseaseDesc}
                    />
                  </div>

                  <div className="input-area">
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

export default Disease;
