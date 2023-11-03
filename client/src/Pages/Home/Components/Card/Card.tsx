import { Link } from "react-router-dom";
import "./style.scss";

export const Card = ({ healthTopic }: any) => {
  return (
    <div className="items">
      <figure>
        <img src={`/uploads/${healthTopic.img}`} alt="" />
      </figure>
      <Link to={`/${healthTopic.name}`}>
        <p>{healthTopic.name}</p>
      </Link>
    </div>
  );
};
