import { Layout } from "../../Layout/Layout";
import { About } from "./Components/About/About";
import { Consulation } from "./Components/Consulation/Consulation";
import React from "react";
import axios from "axios";

export const Home = () => {
  // const [live, setLive] = React.useState({} as any);
  // const [allTopics, setAllTopics] = React.useState([] as any);

  const getLive = async () => {
    const { data } = await axios.get("/api/auth/live");
    if (data.success) {
      // setLive({
      //   ...data.live,
      // });
    }
  };

  const getTopics = async () => {
    const { data } = await axios.get("/api/topic");
    console.log(data);
    if (data.success) {
      // setAllTopics([...data.allTopics?.topics]);
    }
  };
  React.useEffect(() => {
    getLive();
    getTopics();
  }, []);
  return (
    <Layout>
      <About />
      {/* <Live live={live} /> */}
      {/* <Area healthTopics={allTopics} /> */}
      <Consulation />
    </Layout>
  );
};
