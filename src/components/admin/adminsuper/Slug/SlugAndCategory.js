import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import CIcon from "@coreui/icons-react";

import $ from "jquery";
import { cilPlus, cilTrash, cilCut, cilChevronLeft } from "@coreui/icons";
import { CSpinner } from "@coreui/react";

function SlugAndCategory() {
  const [loading, setloading] = useState(true);
  const [sluglist, setsluglist] = useState([]);
  const [slug, setslug] = useState("");
  const [addSlug, setaddSlug] = useState(false);
  const [categoryName, setcategoryName] = useState("");
  const [idslug, setidslug] = useState("");
  const [idCategory, setidCategory] = useState("")
  const [EditNameCat, setEditNameCat] = useState("")
  const [categorylist, setcategorylist] = useState([]);
  const [LocationSlug, setLocationSlug] = useState("")

  const input = (e) => {
    e.preventDefault();
    axios.post("/api/super-admin/addslug", { name_slug: slug }).then((res) => {
      if (res.status === 200) {
        swal("Success", res.data.message, "success");
        setslug("");
        alldata();
      }
    });
  };
  const alldata = async () => {
    const res = await axios.get("/api/super-admin/allslug");
    if (res.status === 200) {
      setsluglist(res.data.slug);
      setloading(false)
    }
  };

  const getCategory = (id) => {
    setidslug(id);
    axios
      .get(`/api/super-admin/getCategoryBySlug/${id ? id : 1}`)
      .then((res) => {
        // console.log(res.data.categorylist);
        if (res.data.status === 200) {
          setcategorylist(res.data.category);
          setLocationSlug(res.data.category[0].name_slug);
        }
        setloading(false);
      });
  };

  const displayAddSlug = () => {
    setaddSlug(!addSlug);
  };

  const deletee = (id) => {
    axios.delete(`/api/super-admin/deleteSlug/${id}`).then((res) => {
      if (res.status === 200) {
        swal("Success", res.data.message, "success");
        alldata();
      }
    });
  };

  const addCategory = (e) => {
    e.preventDefault();
    const data = {
      slug: idslug,
      name: categoryName,
    };

    axios.post("/api/super-admin/addCategory", data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setcategoryName("");

        getCategory(idslug)

      } else if (res.data.status === 400) {
        console.log(res.data.errors);
      }
    });
  };

  const deleteCategory = (id) => {

    axios.delete(`/api/super-admin/deleteCategory/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        getCategory(idslug)
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");

      }
    });
  };


  const updateCat = () => {
    const data = {
      slug: idslug,
      name: EditNameCat,
    }
    console.log(data);
    axios
      .put(`/api/super-admin/updateCategory/${idCategory}`, data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          swal("Success", res.data.message, "success");
          getCategory(idslug)
          $("#modal-default").modal("hide");
        }
        else {
          console.log(error);
        }
      });
  }

  const openModal = (id) => {
    setidCategory(id)
    axios
      .get(`/api/super-admin/getOneCategory/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setEditNameCat(res.data.category.name)
        }
        else {
          console.log(error);
        }
      });
    $("#modal-default").modal("show");
  }
  const onClose = () => {
    $("#modal-default").modal("hide");
  };

  useEffect(() => {
    alldata();
    getCategory();
  }, []);

  if(loading) {
    return <div className="w-100 justify-content-center align-items-center d-flex" style={{ minHeight: "60vh" }}>
    <CSpinner color="primary" />
  </div>
  }

  return (
    <>
      <div className={`modal fade`} id="modal-default">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header "  style={{ background: "#003049", color:"#ffff"}}>
              <h4 className="modal-title">Edit Category</h4>
              <button
                type="button"
                className="close"
                onClick={onClose}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className=" w-100">
                <div className="card-body ">
                  <div className="form-group">
                    {/* <label for="exampleInputEmail1">Slug Name</label> */}
                    <input
                      type="text"
                      value={EditNameCat}
                      onChange={(e) => setEditNameCat(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Category"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer justify-content-end">
              <button
                type="button"
                className="btn btn-default"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn"
                style={{ background: "#003049", color:"#fff"}}
                onClick={updateCat}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="card " style={{ paddingBottom: "10px", minHeight: "100vh" }}>
          {/* <div className="card-header">
          <h6 className="card-title text-start ">Add Slug</h6>
        </div> */}
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex h-25 justify-content-between align-items-center ">
                <form className=" w-100 h-100   d-flex align-items-center  px-4">

                  {/* <label for="exampleInputEmail1">Slug Name</label> */}
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setslug(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Slug"
                  />


                </form>
                <div className=" w-25  d-flex align-items-center">
                  <button
                    onClick={input}
                    className=" px-4 py-2  btn"
                    style={{ fontSize: "5px", color: "#fff", background: "#003049", }}
                  >
                    {" "}
                    <CIcon
                      icon={cilPlus}
                      customClassName="nav-icon "
                      style={{ width: "15px", color: "#fff" }}
                    />
                  </button>
                </div>
              </div>

              <div className="w-100 mt-2 ">
                {sluglist.map((i) => (
                  <div
                    onClick={() => getCategory(i.id)}
                    key={i.id}
                    className="p-1 px-3 selectCol d-flex justify-content-between"
                  >
                    <div className="">
                      <h6 style={{ fontSize: "10px", fontWeight: "thin" }}>
                        {i.name_slug}
                      </h6>
                    </div>
                    <div className=" " onClick={() => deletee(i.id)}>
                      <CIcon
                        icon={cilTrash}
                        customClassName="nav-icon btn_rem"
                        style={{ width: "10px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex h-25 justify-content-between align-items-center  ">
                <form className=" w-100 h-100   d-flex align-items-center  px-4">

                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setcategoryName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Category"
                  />
                </form>
                <div className=" w-25 d-flex align-items-center ">
                  <button
                    onClick={addCategory}
                    className="btn  px-4 py-2 "
                    style={{ fontSize: "5px", color: "#fff", background: "#003049", }}
                  >
                    {" "}
                    <CIcon
                      icon={cilPlus}
                      customClassName="nav-icon "
                      style={{ width: "15px", color: "#fff" }}
                    />
                  </button>
                </div>
              </div>
              <div className="w-100 d-flex justify-content-end align-items-center ">
                <div className="p-2 gap-2 d-flex align-items-center">
                  <div className="">
                    <div style={{ color: "#003049", fontWeight: "bold" }} >{LocationSlug}</div>
                  </div >
                  <div>
                    <CIcon
                      icon={cilChevronLeft}
                      customClassName="nav-icon "
                      style={{ width: "20px" }}
                    />
                  </div>
                </div>


              </div>
              <div className="w-100 mt-2 ">
                {categorylist.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 selectCol d-flex justify-content-between"
                  >
                    <div className="">
                      <h6 style={{ fontWeight: "thin" }}>{item.name}</h6>
                    </div>
                    <div className="d-flex align-items-center gap-2 ">
                      <div onClick={() => openModal(item.id)}>
                        <CIcon

                          icon={cilCut}
                          customClassName="nav-icon btn_upd"
                          style={{ width: "15px" }}
                        />
                      </div>
                      <div>|</div>
                      <div onClick={() => deleteCategory(item.id)}>
                        {" "}
                        <CIcon

                          icon={cilTrash}
                          customClassName="nav-icon btn_rem"
                          style={{ width: "15px" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SlugAndCategory;
