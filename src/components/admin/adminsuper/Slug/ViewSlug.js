import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import $ from "jquery"; // Import jQuery

function ViewSlug() {
  const [sluglist, setsluglist] = useState([]);
  const [slug, setslug] = useState("");
  const [idData, setidData] = useState("")

  const alldata = async () => {
    const res = await axios.get("/api/super-admin/allslug");
    if (res.status === 200) {
      setsluglist(res.data.slug);
    }
  };
  const deletee = (id) => {
    axios.delete(`/api/super-admin/deleteslug/${id}`).then((res) => {
      if (res.status === 200) {
        swal("Success", res.data.message, "success");
        alldata();
      }
    });
  };

  const openModal = (id) => {
    setidData(id)
    axios.get(`/api/super-admin/getoneslug/${id}`).then((res) => {
      if (res.status === 200) {
        setslug(res.data.slug.name_slug);
      }
    });
    $("#modal-default").modal("show"); // Trigger the modal's show method using jQuery
  };
  const onClose = () => {
    $("#modal-default").modal("hide");
  };
  const onSave = () => {
    axios.put(`/api/super-admin/updateslug/${idData}`, {name_slug : slug}).then((res) => {
      if (res.status === 200) {
        swal("Success", res.data.message, "success");
        alldata();
        $("#modal-default").modal("hide");
      }
    });
  };

  useEffect(() => {
    alldata();
  }, []);
  return (
    <>
      <div className={`modal fade`} id="modal-default" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Slug</h4>
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
              <div className="form-group">
                <label for="exampleInputEmail1">Slug Name</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setslug(e.target.value)}
                  className="form-control mt-2"
                  placeholder="Enter Your Slug"
                />
              </div>
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
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header text-center">
            <h4>View Category</h4>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Slug</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sluglist.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name_slug}</td>
                      <td className="">
                        <button
                          onClick={() => openModal(item.id)}
                          className=" btn btn-sm btn-success"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          style={{ marginLeft: "10px" }}
                          onClick={() => deletee(item.id)}
                          className=" btn btn-sm btn-danger "
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewSlug;
