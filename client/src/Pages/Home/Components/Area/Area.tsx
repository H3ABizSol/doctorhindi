import { Card } from "../Card/Card";
import "./style.scss";

export const Area = ({ healthTopics }: any) => {
  console.log(healthTopics);
  return (
    <div className="topics-wrapper">
      <h2>Area of focus</h2>
      <div className="topics-area">
        {healthTopics &&
          healthTopics.map((t: any) => {
            return <Card healthTopic={t} />;
          })}

        {/* <Card />
        <Card />
        <Card />
        <Card /> */}
      </div>
    </div>
  );
};
