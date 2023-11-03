import React from "react";
import { Adminlayout } from "../../Layout/Adminlayout";
import "./style.scss";
import axios from "axios";
import { Loader } from "../../../../Loader/Loader";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

export const Blog = () => {
  const [title, setTitle] = React.useState("");
  const [blogDesc, setBlogDesc] = React.useState("");
  const [image, setImage] = React.useState("");
  const [blogs, setBlogs] = React.useState([] as any);
  const [spin, setSpin] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [updateId, setUpdateId] = React.useState("");

  const handleSubmit = async (e: any) => {
    setSpin(true);
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("blogdesc", blogDesc);
    // formData.append("img", image);

    const { data } = await axios.post(
      "/api/auth/blog/create",
      {
        title,
        blogdesc: blogDesc,
        image,
      },
      {
        headers: {
          token: localStorage.getItem("user_token"),
        },
      }
    );
    if (data.success) {
      setSpin(false);
      toast("Created successfully", {
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

  const uploadImage = async (e: any) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "doctor");
    formData.append("cloud_name", "dwm6lgmsc");
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dwm6lgmsc/image/upload",
      formData
    );
    setImage(data.secure_url);
  };

  const handleSubmitUpdate = async (e: any) => {
    setSpin(true);
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("blogdesc", blogDesc);
    // formData.append("img", image);

    const { data } = await axios.put(
      `/api/auth/blog/update/${updateId}`,
      { title, blogdesc: blogDesc, image },
      {
        headers: {
          token: localStorage.getItem("user_token"),
        },
      }
    );
    if (data.success) {
      setSpin(false);
      toast("update successfully", {
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
      setOk(true);
    }
  };

  const deleteBlog = async (d: any) => {
    const confirm = window.confirm("are you sure");
    if (confirm) {
      setSpin(true);
      const { data } = await axios.delete(`/api/auth/blog/delete/${d._id}`, {
        headers: {
          token: localStorage.getItem("user_token"),
        },
      });
      console.log(data);
      if (data.success) {
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
          icon: "😔",
          iconTheme: {
            primary: "#bb0e0e",
            secondary: "#c12929",
          },
        });
        setOk(true);
      }
    }
  };

  const getBlogs = async () => {
    const { data } = await axios.get("/api/auth/blog/get");
    if (data.success) {
      setBlogs([...data.allBlogs]);
    }
  };

  React.useEffect(() => {
    document.body.style.overflow = "";
    getBlogs();
  }, []);

  if (ok) {
    return <Blog />;
  }

  return (
    <Adminlayout>
      {spin ? (
        <Loader />
      ) : (
        <div className="blog-wrapper">
          <div className="form-container">
            <form action="" onSubmit={handleSubmit}>
              <div className="input-area">
                <input
                  type="text"
                  name="title"
                  placeholder="blog title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
                <input
                  type="file"
                  name="title"
                  onChange={(e: any) => {
                    setImage(e.target.files[0]);
                    uploadImage(e);
                  }}
                />
              </div>
              <div className="input-area">
                <textarea
                  rows={15}
                  name="blogdesc"
                  placeholder="blod description"
                  onChange={(e) => {
                    setBlogDesc(e.target.value);
                  }}
                  value={blogDesc}
                />
              </div>

              <div className="input-area">
                <button>Create</button>
              </div>
            </form>
          </div>
          <div className="blog-container">
            {blogs &&
              blogs.map((b: any) => {
                return (
                  <div className="blog-items">
                    <div className="content">
                      <div className="left">
                        <figure>
                          <img src={`${b.image}`} alt="" />
                        </figure>
                      </div>
                      <div className="right">
                        <h3>{b.title}</h3>
                        <pre>{b.blogdesc}</pre>
                        <Link to={`/blogs/${b._id}`}>
                          <button>More</button>
                        </Link>
                      </div>
                    </div>
                    <div className="btn-container">
                      <AiOutlineDelete
                        size={25}
                        className="icon"
                        onClick={() => {
                          deleteBlog(b);
                        }}
                      />
                      <AiOutlineEdit
                        size={25}
                        className="icon"
                        onClick={() => {
                          setOpen(true);
                          setUpdateId(b._id);
                          document.body.style.overflow = "hidden";
                          setTitle(b.title);
                          setBlogDesc(b.blogdesc);
                          setImage(b.image);
                        }}
                      />
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
                  }}
                >
                  X
                </h5>
                <form action="" onSubmit={handleSubmitUpdate}>
                  <div className="input-area">
                    <input
                      type="text"
                      name="title"
                      placeholder="blog title"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      value={title}
                    />
                    <input
                      type="file"
                      name="title"
                      onChange={(e: any) => {
                        // setImage(e.target.files[0]);
                        uploadImage(e);
                      }}
                    />
                  </div>
                  <div className="input-area">
                    <textarea
                      rows={15}
                      name="blogdesc"
                      placeholder="blod description"
                      onChange={(e) => {
                        setBlogDesc(e.target.value);
                      }}
                      value={blogDesc}
                    />
                  </div>

                  <div className="input-area">
                    <button>Create</button>
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
