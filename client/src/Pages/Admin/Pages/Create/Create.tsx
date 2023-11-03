import React from "react";
import "./style.scss";
import { Adminlayout } from "../../Layout/Adminlayout";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { Loader } from "../../../../Loader/Loader";

export const Create = () => {
  const [topics, setTopics] = React.useState("");
  const [allTopics, setAllTopics] = React.useState([] as any);
  const [ok, setOk] = React.useState(false);
  const [spin, setSpin] = React.useState(false);

  const inputElement = React.useRef("" as any);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpin(true);
    const { data } = await axios.post(
      "/api/topic/create",
      {
        topics,
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

  const deleteTopic = async (e: any) => {
    const confim = window.confirm("are you sure");
    if (confim) {
      setSpin(true);
      const { data } = await axios.put(
        `/api/topic/delete/${e._id}`,
        {
          img: e.img,
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
    }
  };

  const uploadImage = async (e: any, img: any) => {
    setSpin(true);
    const formData = new FormData();
    formData.append("img", img);
    const { data } = await axios.put(`/api/topic/upload/${e._id}`, formData, {
      headers: {
        token: localStorage.getItem("user_token"),
      },
    });
    if (data.success) {
      setSpin(true);
      setOk(true);
    }
  };

  const getTopics = async () => {
    const { data } = await axios.get("/api/topic");
    console.log(data);
    if (data.success) {
      setAllTopics([...data.allTopics?.topics]);
    }
  };

  React.useEffect(() => {
    getTopics();
  }, []);
  console.log(topics);

  if (ok) {
    return <Create />;
  }

  return (
    <Adminlayout>
      {spin ? (
        <Loader />
      ) : (
        <div className="create-topic-wrapper">
          <h2>Create</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="input-area">
              <input
                type="text"
                name=""
                placeholder="topic eg; gut health ,brain health"
                onChange={(e) => {
                  setTopics(e.target.value);
                }}
                value={topics}
              />
              <button>Create</button>
            </div>
          </form>
          <div className="display-topics">
            <ul>
              {allTopics.map((t: any) => {
                return (
                  <li>
                    <p>
                      {t.name}{" "}
                      <AiOutlineDelete
                        size={15}
                        className="icon"
                        onClick={() => {
                          deleteTopic(t);
                        }}
                      />
                    </p>
                    {/* <AiOutlineUpload
                    size={15}
                    onClick={() => {
                      inputElement.current.click();
                    }}
                  /> */}
                    <input
                      type="file"
                      name=""
                      ref={inputElement}
                      onChange={(e: any) => {
                        uploadImage(t, e.target.files[0]);
                      }}
                    />
                    <img width={120} src={`/uploads/${t.img}`} alt="" />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </Adminlayout>
  );
};
