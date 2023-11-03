import React from "react";
import { Adminlayout } from "../../Layout/Adminlayout";
import "./style.scss";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Loader } from "../../../../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

export const Project = () => {
  const [allTopics, setAllTopics] = React.useState([] as any);
  const [allEducation, setAllEducation] = React.useState([] as any);
  const [Topics, setTopics] = React.useState([] as any);
  const [heading, setHeading] = React.useState("");
  const [heading2, setHeading2] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [desc2, setDesc2] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [topicContent, setTopicContent] = React.useState([] as any);
  const [image, setImage] = React.useState("" as any);
  const [open, setOpen] = React.useState(false);
  const [spin, setSpin] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [updateId, setUpdateId] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpin(true);
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("topic", topic);
    formData.append("heading", heading);
    formData.append("desc", desc);
    formData.append("heading2", heading2);
    formData.append("desc2", desc2);
    formData.append("img", image);

    const { data } = await axios.post(
      "/api/topic/create/topichealth",
      formData,
      {
        headers: {
          token: localStorage.getItem("user_token"),
        },
      }
    );
    if (data.success) {
      setSpin(false);
      toast("Created successfully 😊", {
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
      setOk(true);
    } else {
      setSpin(false);
      toast(data.message, {
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
    }
  };

  const select = (e: any) => {
    if (e.target.value === "1") {
      setTopics([...allTopics]);
      setSubject("health");
    }
    if (e.target.value === "2") {
      setTopics([...allEducation]);
      setSubject("education");
    }
  };

  const getTopics = async () => {
    const { data } = await axios.get("/api/topic");
    if (data.success) {
      setAllTopics([...data.allTopics?.topics]);
    }
  };

  const getEducationTopics = async () => {
    const { data } = await axios.get("/api/education");
    if (data.success) {
      setAllEducation([...data.allTopics?.topics]);
    }
  };

  const getTopicContent = async () => {
    const { data } = await axios.get("/api/topic/get");
    setTopicContent([...data.topichealth]);
  };

  const deleteTopicContent = async (c: any) => {
    const confim = window.confirm("are you sure");
    if (confim) {
      setSpin(true);
      const { data } = await axios.delete(`/api/topic/deletecontent/${c._id}`);
      if (data.success) {
        setSpin(false);
        toast(`${data.message}😔`, {
          duration: 4000,
          position: "top-right",
          style: {
            fontSize: "1.6rem",
            background: "black",
            color: "white",
            height: "60px",
          },
          iconTheme: {
            primary: "#bb0e0e",
            secondary: "#c12929",
          },
        });
        setOk(true);
      }
    }
  };

  const handleSubmitUpdate = async (e: any) => {
    setSpin(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("topic", topic);
    formData.append("heading", heading);
    formData.append("desc", desc);
    formData.append("heading2", heading2);
    formData.append("desc2", desc2);
    formData.append("img", image);
    const { data } = await axios.put(
      `/api/topic/updatecontent/${updateId}`,
      formData,
      {
        headers: {
          token: localStorage.getItem("user_token"),
        },
      }
    );
    if (data.success) {
      setSpin(false);
      toast("updated successfully", {
        duration: 4000,
        position: "top-right",
        style: {
          fontSize: "1.6rem",
          background: "black",
          color: "white",
          height: "60px",
        },
        icon: "😉",
        iconTheme: {
          primary: "#bb0e0e",
          secondary: "#c12929",
        },
      });
      setOk(true);
    }
  };

  React.useEffect(() => {
    document.body.style.overflow = "";

    getTopics();
    getEducationTopics();
    getTopicContent();
  }, []);

  if (ok) {
    return <Project />;
  }

  return (
    <Adminlayout>
      {spin ? (
        <Loader />
      ) : (
        <div className="project-wrapper">
          <h2>Create Project</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="input-area">
              <select
                name=""
                id=""
                onChange={(e) => {
                  select(e);
                }}
              >
                <option value="0">Select</option>
                <option value="1">Health</option>
              </select>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
              >
                <option value="">Select Topics</option>
                {Topics &&
                  Topics.map((t: any) => {
                    return <option>{t.name}</option>;
                  })}
              </select>

              <input
                type="file"
                onChange={(e: any) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="input-area">
              <input
                type="text"
                name=""
                id=""
                placeholder="heading"
                onChange={(e) => {
                  setHeading(e.target.value);
                }}
                value={heading}
              />
            </div>

            <div className="input-area">
              <textarea
                placeholder="description"
                rows={12}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                value={desc}
              />
            </div>
            <div className="input-area">
              <input
                type="text"
                name=""
                id=""
                placeholder="add heading"
                onChange={(e) => {
                  setHeading2(e.target.value);
                }}
                value={heading2}
              />
            </div>
            <div className="input-area">
              <textarea
                placeholder="description"
                rows={12}
                onChange={(e) => {
                  setDesc2(e.target.value);
                }}
                value={desc2}
              />
            </div>
            <div className="btn-container">
              <button>Create</button>
            </div>
          </form>
          <div className="content">
            {topicContent &&
              topicContent.map((c: any) => {
                return (
                  <div className="items">
                    <div className="btn-container">
                      <AiOutlineDelete
                        size={25}
                        onClick={() => {
                          deleteTopicContent(c);
                        }}
                      />
                      <AiOutlineEdit
                        size={25}
                        onClick={() => {
                          setOpen(true);
                          document.body.style.overflow = "hidden";
                          setUpdateId(c._id);
                          setOpen(true);
                          setSubject(c.subject);
                          setTopic(c.topic);
                          setHeading(c.heading);
                          setDesc(c.desc);
                          setHeading2(c.heading2);
                          setDesc2(c.desc2);
                          setImage(c.image);
                        }}
                      />
                    </div>
                    <h2>{c.heading}</h2>
                    <Link to={`/${c.topic}`}>
                      <figure>
                        <img src={`/uploads/${c.image}`} alt="" />
                      </figure>
                    </Link>
                    <h4>{c.desc}</h4>
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
                    setSubject("");
                    setTopic("");
                    setHeading("");
                    setDesc("");
                    setHeading2("");
                    setDesc2("");
                  }}
                >
                  X
                </h5>
                <form action="" onSubmit={handleSubmitUpdate}>
                  <div className="input-area">
                    <select
                      value={subject}
                      onChange={(e) => {
                        select(e);
                      }}
                    >
                      <option value="0">Select</option>
                      <option value="1">Health</option>
                    </select>
                    <select
                      value={topic}
                      onChange={(e) => {
                        setTopic(e.target.value);
                      }}
                    >
                      <option value="">Select Topics</option>
                      {Topics &&
                        Topics.map((t: any) => {
                          return <option>{t.name}</option>;
                        })}
                    </select>

                    <input
                      type="file"
                      onChange={(e: any) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="input-area">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="heading"
                      onChange={(e) => {
                        setHeading(e.target.value);
                      }}
                      value={heading}
                    />
                  </div>

                  <div className="input-area">
                    <textarea
                      placeholder="description"
                      rows={12}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      value={desc}
                    />
                  </div>
                  <div className="input-area">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="add heading"
                      onChange={(e) => {
                        setHeading2(e.target.value);
                      }}
                      value={heading2}
                    />
                  </div>
                  <div className="input-area">
                    <textarea
                      placeholder="description"
                      rows={12}
                      onChange={(e) => {
                        setDesc2(e.target.value);
                      }}
                      value={desc2}
                    />
                  </div>
                  <div className="btn-container">
                    <button>update</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      <Toaster />
    </Adminlayout>
  );
};
