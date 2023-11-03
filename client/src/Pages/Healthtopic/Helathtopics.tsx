import React from "react";
import { Layout } from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import "./style.scss";
import axios from "axios";

export const Helathtopics = () => {
  const [topic, setTopic] = React.useState({} as any);
  const params: any = useParams();
  const getTopicContent = async () => {
    const { data } = await axios.get("/api/topic/get");
    const filterData = data.topichealth.filter((t: any) => {
      return t.topic.toLowerCase().includes(params.names.toLowerCase());
    });
    setTopic({
      ...filterData[0],
    });
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getTopicContent();
  }, []);
  return (
    <Layout>
      <div className="health-topic-wrapper">
        <div className="paralax">
          <div>
            <h2>{topic.heading}</h2>
            <p>{topic.desc}</p>
          </div>
        </div>
        <div className="content">
          <div className="left">
            <figure>
              {topic && <img src={`/uploads/${topic?.image}`} alt="" />}
            </figure>
          </div>
          <div className="right">
            <h2>{topic.heading2}</h2>
            <pre>{topic.desc2}</pre>
          </div>
        </div>
      </div>
    </Layout>
  );
};
