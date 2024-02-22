import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import no from '../../images/a.png'
import { cilCloudUpload } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import swal from "sweetalert";

const Profile = () => {
  const [datanya, setdatanya] = useState({
    name: "",
    role_as: "",
    email: "",
    password: ""
  });

  const [picture, setpic] = useState([]);
  const [image, setImage] = useState(null);
  const [activate, setactivate] = useState(false)

  const getOneUser = () => {
    axios
      .get(`/api/super-admin/getgetoneeuser/${Cookies.get("mycooke")}`)
      .then((res) => {
        const data = res.data.user;
        console.log(data);
        setdatanya({
          ...datanya,
          name: data.name,
          role_as: data.role_as,
          email: data.email,
        });
        setImage(data.image)

      });
  };

  const inputt = (e) => {
    e.persist();
    setdatanya({ ...datanya, [e.target.name]: e.target.value });
  };

  //image

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  const handleImage = (file) => {
    setpic({ image: file });
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImage(file);

  };
  const handleDropZoneClick = () => {
    document.getElementById("fileInput").click();
  };


  const SendChange = (e) => {
    e.preventDefault();
    console.log(datanya);

    const formdata = new FormData();
    formdata.append("image", picture.image);
    formdata.append("name", datanya.name)
    formdata.append("email", datanya.email)
    formdata.append("password", datanya.password)
    

    axios.post(`/api/super-admin/changeuser/${Cookies.get("mycooke")}`, formdata).then(res => {
      if(res.status === 200) {
        getOneUser();
        setdatanya({...datanya,
          password: ""
        })
        swal("Success", res.data.message, "success");
        setactivate(false)
      }
    }
    )
  }

  useEffect(() => {
    getOneUser();
  }, []);

  console.log(image);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="p-4">
          <div className="row">
            {
              activate ? (
                <>
                  <div className="col-md-6 ">
                    <div className="W-100 ">
                      <h6>Username</h6>
                      <div className="w-100">
                        <input placeholder="Your Name" className="w-100 p-2" name="name" value={datanya.name} onChange={inputt} style={{ outline: "none", borderRadius: "5px" }} />
                      </div>
                    </div>
                    <div className="W-100 mt-2">
                      <h6>Email</h6>
                      <div className="w-100">
                        <input placeholder="Your Email" className="w-100 p-2" name="email" type="email" value={datanya.email} onChange={inputt} style={{ outline: "none", borderRadius: "5px" }} />
                      </div>
                    </div>

                    <div className="W-100 mt-2">
                      <h6>New Password </h6>
                      <div className="w-100">
                        <input placeholder="Your Role" className="w-100 p-2" name="password" type="password" value={datanya.password} onChange={inputt} style={{ outline: "none", borderRadius: "5px" }} />
                      </div>
                    </div>

                    <div className="W-100 mt-2">
                      <h6>Role </h6>
                      <div className="w-100">
                        <input placeholder="Your Role" className="w-100 p-2" name="role" disabled value={datanya.role_as === 2 ? "Super Admin" : datanya.role_as === 1 ? "Admin" : "Customer"} onChange={inputt} style={{ outline: "none", borderRadius: "5px" }} />
                      </div>
                    </div>

                    <div className="mt-2 d-flex justify-content-between">
                      <button className="p-2" onClick={() => setactivate(false)} style={{ width: '130px', background: "rgba(173, 170, 170, 0.27)", borderRadius: '20px', fontWeight: "normal", color: "#000", border: "none" }} >Back</button>
                      <button className="p-2" onClick={SendChange} style={{ width: '130px', background: "#003049", borderRadius: '20px', fontWeight: "bold", color: "white" }} >Save</button>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <div >
                      <div
                        className=""
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onClick={handleDropZoneClick}
                      >
                         <div className="p-3 py-3">
                            <div className="d-flex justify-content-center " style={{ position: "relative" }}>
                              <img src={no} alt="asfa" className="w-100" />
                              <div className=" w-100  h-100 justify-content-center d-flex flex-column align-items-center" style={{ position: "absolute", background: "rgba(123, 123, 123, 0.55)" }}>
                                <CIcon
                                  icon={cilCloudUpload}
                                  customClassName="nav-icon "
                                  style={{ width: "40px", color: "#fff" }}
                                />
                                <h6 style={{ fontSize: "14px", color: "#fff" }}>Drag or Click Here to Change Image</h6>
                              </div>
                            </div>
                          </div>
                      </div>
                      <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                      {/* <img src={no} alt="asfa " style={{ borderRadius: "50%" }} /> */}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 ">
                    <div className="W-100 ">
                      <h6>Username</h6>
                      <div className="w-100">
                        <input placeholder="Your Name" className="w-100 p-2" name="name" disabled value={datanya.name} style={{ outline: "none", borderRadius: "5px" }} />
                      </div>
                    </div>
                    <div className="W-100 mt-2">
                      <h6>Email</h6>
                      <div className="w-100">
                        <input placeholder="Your Email" className="w-100 p-2" name="email" disabled value={datanya.email} style={{ outline: "none", borderRadius: "5px" }} />
                      </div>
                    </div>

                    <div className="W-100 mt-2">
                      <h6>Role </h6>
                      <div className="w-100">
                        <input placeholder="Your Role" className="w-100 p-2" name="role" disabled value={datanya.role_as === 2 ? "Super Admin" : datanya.role_as === 1 ? "Admin" : "Customer"} style={{ outline: "none", borderRadius: "5px" }} />
                      </div>
                    </div>

                    <div className="mt-2 d-flex justify-content-between">

                      <button className="p-2" onClick={() => setactivate(true)} style={{ width: '130px', background: "#003049", borderRadius: '20px', fontWeight: "bold", color: "white", border: "none" }} >Change user</button>
                    </div>
                  </div>

                  <div className="col-md-6 d-flex justify-content-center">
                    <div className="d-flex justify-content-center " style={{ position: "relative" }}>
                      <img src={`http://localhost:8000/${image}`} alt="a" className="w-100" />

                    </div>
                  </div>

                </>

              )
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
