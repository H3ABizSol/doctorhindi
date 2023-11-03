import React from "react";
import { Layout } from "../../Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.scss";

export const Blogdetails = () => {
  const [blogs, setBlogs] = React.useState([] as any);
  const params = useParams();

  const getBlogs = async () => {
    const { data } = await axios.get(`/api/auth/blog/get/${params.id}`);
    console.log(data);
    if (data.success) {
      setBlogs({ ...data.singleBlog });
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getBlogs();
  }, []);
  return (
    <Layout>
      <div className="blog-details">
        <div className="blog-container">
          <h3>{blogs.title}</h3>
          <div className="img-container">
            <figure>
              <img src={`${blogs.image}`} alt="" />
            </figure>
          </div>
          <pre>{blogs.blogdesc}</pre>
        </div>
      </div>
    </Layout>
  );
};
