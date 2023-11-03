import React from "react";
import { Layout } from "../../../Layout/Layout";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { MdOutlineTopic } from "react-icons/md";
import { SiAboutdotme } from "react-icons/si";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { BiLogoBlogger } from "react-icons/bi";
// import { FaDisease } from "react-icons/fa";
import "./style.scss";
import { Link } from "react-router-dom";

export const Adminlayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Layout>
      <div className="admin-layout">
        <div className="left-admin">
          <ul>
            {/* <Link to="/admin" className="link">
              <li>
                <AiOutlineHome size={20} />
                Dashboard
              </li>
            </Link> */}
            <Link to="/admin/about" className="link">
              <li>
                <SiAboutdotme size={20} />
                आपके बारे में
              </li>
            </Link>
            <Link to="/admin/patientinformation" className="link">
              <li>
                <MdOutlineTopic size={20} />
                उपयोगी वेबसाइटें
              </li>
            </Link>

            <Link to="/admin/healthinformation" className="link">
              <li>
                <AiOutlineFundProjectionScreen size={20} />
                रोग सूची
              </li>
            </Link>
            <Link to="/admin/onlineconsulation" className="link">
              <li>
                <BsFillPersonLinesFill size={20} />
                ऑनलाइन परामर्श
              </li>
            </Link>
            {/* <Link to="/admin/live" className="link">
              <li>
                <MdOutlineLiveTv size={20} />
                Add Live Details
              </li>
            </Link> */}
            {/* <Link to="/admin/appoitment" className="link">
              <li>
                <FaUserFriends size={20} />
                Appoitment
              </li>
            </Link> */}
            {/* <Link to="/admin/disease" className="link">
              <li>
                <FaDisease size={20} />
                Disease
              </li>
            </Link> */}
            <Link to="/admin/blog" className="link">
              <li>
                <BiLogoBlogger size={20} />
                ब्लॉग
              </li>
            </Link>
          </ul>
        </div>
        <div className="right-admin">
          <main>{children}</main>
        </div>
      </div>
    </Layout>
  );
};
