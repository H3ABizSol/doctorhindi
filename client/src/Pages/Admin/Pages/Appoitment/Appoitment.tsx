import React from "react";
import "./style.scss";
import { Adminlayout } from "../../Layout/Adminlayout";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Loader } from "../../../../Loader/Loader";

export const Appoitment = () => {
  const [hospitalname, setHospitalName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [days, setDays] = React.useState("");
  const [timing, setTiming] = React.useState("");
  const [appoitment, setAppoitment] = React.useState([] as any);
  const [open, setOpen] = React.useState(false);
  const [spin, setSpin] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [updateId, setUpdateId] = React.useState("");

  const handleSubmit = async (e: any) => {
    setSpin(true);
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("hospitalname", hospitalname);
    // formData.append("mobile", mobile);
    // formData.append("address", address);
    // formData.append("days", days);
    // formData.append("timing", timing);

    const { data } = await axios.post(
      "/api/auth/appoitment/create",
      {
        hospitalname,
        mobile,
        address,
        days,
        timing,
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
    } else {
      setSpin(false);
      alert(data.message);
    }
  };

  const handleSubmitUpdate = async (e: any) => {
    setSpin(true);
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("hospitalname", hospitalname);
    // formData.append("mobile", mobile);
    // formData.append("address", address);
    // formData.append("days", days);
    // formData.append("timing", timing);

    const { data } = await axios.put(
      `/api/auth/appoitment/update/${updateId}`,
      {
        hospitalname,
        mobile,
        address,
        days,
        timing,
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
    } else {
      setSpin(false);
      alert(data.message);
    }
  };

  const deleteAppoitment = async (d: any) => {
    const confirm = window.confirm("are you sure");
    if (confirm) {
      setSpin(true);
      const { data } = await axios.delete(
        `/api/auth/appoitment/delete/${d._id}`,
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
    }
  };

  const getAppoitment = async () => {
    const { data } = await axios.get("/api/auth/appoitment");
    console.log(data);
    if (data.success) {
      setAppoitment([...data.appoitment]);
    }
  };

  React.useEffect(() => {
    document.body.style.overflow = "";
    getAppoitment();
  }, []);
  if (ok) {
    return <Appoitment />;
  }

  return (
    <Adminlayout>
      {spin ? (
        <Loader />
      ) : (
        <div className="appoitment-section">
          <div className="form-container">
            <form action="" onSubmit={handleSubmit}>
              <div className="input-area">
                <input
                  type="text"
                  name="title"
                  placeholder="hospital name"
                  onChange={(e) => {
                    setHospitalName(e.target.value);
                  }}
                  value={hospitalname}
                />
                <input
                  type="text"
                  name="title"
                  placeholder="mobile"
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                  value={mobile}
                />
              </div>
              <div className="input-area">
                <input
                  type="text"
                  name="title"
                  placeholder="address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={address}
                />
              </div>
              <div className="input-area">
                <input
                  type="text"
                  name="title"
                  placeholder="days eg Mon - Fri"
                  onChange={(e) => {
                    setDays(e.target.value);
                  }}
                  value={days}
                />
                <input
                  type="text"
                  name="title"
                  placeholder="time eg 9am - 11pm"
                  onChange={(e) => {
                    setTiming(e.target.value);
                  }}
                  value={timing}
                />
              </div>
              <div className="input-area">
                <button>Create</button>
              </div>
            </form>
          </div>
          <div className="appoitment">
            {appoitment &&
              appoitment.map((a: any) => {
                return (
                  <div className="appoitment-items">
                    <div className="btn-container">
                      <AiOutlineDelete
                        size={25}
                        className={"icon"}
                        onClick={() => {
                          deleteAppoitment(a);
                        }}
                      />
                      <AiOutlineEdit
                        size={25}
                        className={"icon"}
                        onClick={() => {
                          document.body.style.overflow = "hidden";
                          setUpdateId(a._id);
                          setOpen(true);
                          setHospitalName(a.hospitalname);
                          setAddress(a.address);
                          setMobile(a.mobile.toString());
                          setTiming(a.timing);
                          setDays(a.days);
                        }}
                      />
                    </div>
                    <h3 className="main-head">{a.hospitalname}</h3>
                    <h6>Address</h6>
                    <h4 className="address">{a.address}</h4>
                    <h6>Mobile</h6>
                    <div className="number">
                      {a.mobile.map((m: any) => {
                        return <a href={`tel:+${m}`}>{m}</a>;
                      })}
                    </div>
                    <div>
                      <h6>Timing</h6>
                      <h4>{a.timing}</h4>
                      <h4>{a.days}</h4>
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
                    document.body.style.overflow = "";
                    setOpen(false);
                    setHospitalName("");
                    setAddress("");
                    setMobile("");
                    setTiming("");
                    setDays("");
                  }}
                >
                  X
                </h5>
                <form action="" onSubmit={handleSubmitUpdate}>
                  <div className="input-area">
                    <input
                      type="text"
                      name="title"
                      placeholder="hospital name"
                      onChange={(e) => {
                        setHospitalName(e.target.value);
                      }}
                      value={hospitalname}
                    />
                    <input
                      type="text"
                      name="title"
                      placeholder="mobile"
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                      value={mobile}
                    />
                  </div>
                  <div className="input-area">
                    <input
                      type="text"
                      name="title"
                      placeholder="address"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      value={address}
                    />
                  </div>
                  <div className="input-area">
                    <input
                      type="text"
                      name="title"
                      placeholder="days eg Mon - Fri"
                      onChange={(e) => {
                        setDays(e.target.value);
                      }}
                      value={days}
                    />
                    <input
                      type="text"
                      name="title"
                      placeholder="time eg 9am - 11pm"
                      onChange={(e) => {
                        setTiming(e.target.value);
                      }}
                      value={timing}
                    />
                  </div>
                  <div className="input-area">
                    <button>update</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </Adminlayout>
  );
};
