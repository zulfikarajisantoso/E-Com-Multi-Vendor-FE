import axios from "axios";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import swal from "sweetalert";
import $, { error } from "jquery"; // Import jQuery

const ViewcategorySuper = () => {
  const [loading, setloading] = useState(true);
  const [listslug, setslug] = useState([]);
  const [idData, setidData] = useState("");
  const [categorylist, setcategorylist] = useState([]);
  const [checked, setchecked] = useState(false);
  const [name, setname] = useState("")
  const [desk, setdesk] = useState("")
  const [slugchoose, setslugchoose] = useState("");



  const getCat = () => {
    axios.get("/api/super-admin/view-category").then((res) => {
      // console.log(res.data.categorylist);
      if (res.data.status === 200) {
        setcategorylist(res.data.category);
      }
      setloading(false);
    });
  };

  const deletee = (e, id) => {
    e.preventDefault();
    const clik = e.currentTarget;
    clik.innerText = "Deleting";

    axios.delete(`/api/super-admin/delete-category/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Succes", res.data.message, "succes");
        clik.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        clik.innerText = "Delete";
      }
    });
  };

  const getListSlug = () => {
    axios.get(`/api/super-admin/allslug`).then((res) => {
      setslug(res.data.slug);
    });
  };

  const openModal = (id) => {
    setidData(id);
    axios
      .get(`/api/super-admin/edit-category/${id}`)
      .then((res) => {
        if (res.status === 200) {           
          setname(res.data.category.name)
          setdesk(res.data.category.desc)
          setchecked(res.data.category.status)
          setslugchoose(res.data.category.slug)
          console.log(res.data.category.status);
        }
        else{
          console.log(error);
        }
      });
    $("#modal-default").modal("show");
  };

  const onClose = () => {
    $("#modal-default").modal("hide");
  };

  const onSave = () => {
    const data = {
      name : name,
      desc : desk,
      slug : slugchoose,
      status : checked
    }
    axios
      .put(`/api/super-admin/update-category/${idData}`, data)
      .then((res) => {
        if (res.status === 200) {
          swal("Success", res.data.message, "success");
          getCat();
          $("#modal-default").modal("hide");
        }
        else{
          console.log(error);
        }
      });
  };


  useEffect(() => {
    getCat();
    getListSlug();
  }, []);
  return (
    <>
      <div className={`modal fade`} id="modal-default">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
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
              <form id="CATEGORY_FORM">
                <div className="card-body">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  ></ul>

                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane card-body border fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <div className="form-group mb-3">
                        <label>Select Category</label>
                        <select
                          name="slug"
                          onChange={(e) => setslugchoose(e.target.value)}
                          value={slugchoose}
                          className="form-control"
                        >
                          {listslug.map((item) => {
                            return (
                              <option value={item.id} key={item.id}>
                                {item.name_slug}
                              </option>
                            );
                          })}
                        </select>
                        {/* <small className='text-danger'>{error.category_id} </small> */}
                      </div>
                      <div className=" form-group mb-3">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => setname(e.target.value)}
                          value={name}
                          className="form-control"
                        />
                        {/* <span className="text-danger">
                          {categori.error_list.name}
                        </span> */}
                      </div>
                      <div className=" form-group mb-3">
                        <label>Descrption</label>
                        <textarea
                          name="desc"
                          onChange={(e) => setdesk(e.target.value)}
                          value={desk}
                          className="form-control"
                        ></textarea>
                      </div>
                      <div className=" form-group mb-3 d-flex align-items-center gap-3">
                        <h6>Status Showing</h6>
                        <div>
                          <input
                            type="checkbox"
                            name="status"
                            onChange={(e) => setchecked(e.target.checked)}
                            defaultChecked={checked === 1 ? true : false}
                            value={checked.status}
                          />{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-default"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-4">
        <div className="card mt-4">
          <div className="card-header text-center">
            <h4>View Category</h4>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {categorylist.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.name_slug}</td>
                    <td>{item.status === 1 ? 'Activated' : 'Unactivated'}</td>
                    <td>
                      <button
                        onClick={() => openModal(item.id)}
                        className=" btn btn-sm btn-success"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={(e) => deletee(e, item.id)}
                        className=" btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewcategorySuper;
