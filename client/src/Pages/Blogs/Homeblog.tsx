import React from "react";
import { Layout } from "../../Layout/Layout";
import "./style.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export const Homeblog = () => {
  const [blogs, setBlogs] = React.useState([] as any);
  const [searchBlogs, setSearchBlogs] = React.useState([] as any);
  const [isSearch, setIsSearch] = React.useState(false);

  const search = (e: any) => {
    const filterData = blogs.filter((b: any) => {
      if (b.title.toLowerCase().includes(e.target.value.toLowerCase())) {
        setIsSearch(true);
        return b;
      }
    });
    setSearchBlogs([...filterData]);
  };

  const getBlogs = async () => {
    const { data } = await axios.get("/api/auth/blog/get");
    if (data.success) {
      setBlogs([...data.allBlogs]);
    }
  };

  React.useEffect(() => {
    getBlogs();
  }, []);
  return (
    <Layout>
      <div className="home-blog-wrapper">
        <div className="search-container">
          <input
            type="text"
            name=""
            id=""
            placeholder="ब्लॉग खोजें"
            onKeyUp={(e) => {
              search(e);
            }}
          />
          {/* <div className="search-content">
            <ul>
              <li>List</li>
              <li>List</li>
              <li>List</li>
              <li>List</li>
            </ul>
          </div> */}
        </div>
        {!isSearch && (
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
                  </div>
                );
              })}
          </div>
        )}

        {isSearch && (
          <div className="blog-container">
            {searchBlogs.length > 0 &&
              searchBlogs.map((b: any) => {
                return (
                  <div className="blog-items">
                    <div className="content">
                      <div className="left">
                        <figure>
                          <img src={`/uploads/${b.image}`} alt="" />
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
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </Layout>
  );
};
