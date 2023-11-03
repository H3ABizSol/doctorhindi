import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Signin } from "../Pages/Signin/Signin";
import { Private } from "../Pages/Admin/Private/Private";
import { Dashboard } from "../Pages/Admin/Pages/Dashboard/Dashboard";
import AdminAbout from "../Pages/Admin/Pages/About/About";

import { Live } from "../Pages/Admin/Pages/Live/Live";
import { Appoitment } from "../Pages/Admin/Pages/Appoitment/Appoitment";
import { UserAppoitment } from "../Pages/Home/Components/Appoitment/Appoitment";
import { Consulation } from "../Pages/Onlineconsulation/Consulation";
import AdminConsulation from "../Pages/Admin/Pages/Consulation/Consulation";
import { Helathtopics } from "../Pages/Healthtopic/Helathtopics";
import Disease from "../Pages/Admin/Pages/Disease/Disease";
import HomeAbout from "../Pages/About/About";
import { Diseasedetails } from "../Pages/Diseasedetails/Diseasedetails";
import { Blog } from "../Pages/Admin/Pages/Blog/Blog";
import { Homeblog } from "../Pages/Blogs/Homeblog";
import { Blogdetails } from "../Pages/Blogdetails/Blogdetail";
import { Forgotpassword } from "../Pages/Forgotpassword/Forgotpassword";
import { Confirmforgot } from "../Pages/Forgotpassword/Confirmforgot";
import { Patientinfo } from "../Pages/Admin/Pages/Patientinfo/Patientinfo";
import Healthinformation from "../Pages/Healthinfo/Healthinfo";
import Patientifnormation from "../Pages/Patientinfo/Patientifno";
import { Healthinfo } from "../Pages/Admin/Pages/Healthinfo/Healthinfo";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/appoitment" element={<UserAppoitment />} />
      <Route path="/consulation" element={<Consulation />} />
      <Route
        path="/patientinformation/:name"
        element={<Patientifnormation />}
      />
      <Route path="/healthinformation/:name" element={<Healthinformation />} />

      <Route path="/about" element={<HomeAbout />} />
      <Route path="disease/:name" element={<Diseasedetails />} />
      <Route path="/:names" element={<Helathtopics />} />
      <Route path="/blogs" element={<Homeblog />} />
      <Route path="/blogs/:id" element={<Blogdetails />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />
      <Route path="/forgotpassword/:token" element={<Confirmforgot />} />

      <Route path="/admin" element={<Private />}>
        <Route path="" element={<Dashboard />} />
        <Route path="about" element={<AdminAbout />} />
        <Route path="patientinformation" element={<Patientinfo />} />
        <Route path="onlineconsulation" element={<AdminConsulation />} />
        <Route path="healthinformation" element={<Healthinfo />} />
        <Route path="live" element={<Live />} />
        <Route path="appoitment" element={<Appoitment />} />
        <Route path="disease" element={<Disease />} />
        <Route path="blog" element={<Blog />} />
      </Route>
    </Routes>
  );
};

export default routes;
