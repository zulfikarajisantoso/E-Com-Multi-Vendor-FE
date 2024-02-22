import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const Categoory = () => {
  const [listSlug, setlistSlug] = useState([]);
  const [categori, setcategori] = useState({
    slug: "",
    name: "",
    desc: "",
    status: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setcategori({ ...categori, [e.target.name]: e.target.value });
  };

  const inpuut = (e) => {
    e.preventDefault();
    const data = {
      slug: categori.slug,
      name: categori.name,
      desc: categori.desc,
      status: categori.status,
    };
    axios.post("/api/super-admin/store-category", data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        document.getElementById("CATEGORY_FORM").reset();
        setcategori({
          ...setcategori,
          slug: "",
          name: "",
          desc: "",
          status: "",
          meta_title: "",
          meta_keyword: "",
          meta_description: "",
          error_list: [],
        });
      } else if (res.data.status === 400) {
        setcategori({ ...categori, error_list: res.data.errors });
      }
    });
  };

  const getListSlug = () => {
    axios.get(`/api/super-admin/allslug`).then((res) => {
      setlistSlug(res.data.slug);
    });
  };

  useEffect(() => {
    getListSlug();
  }, []);

  // var dis_err = [];
  // if(dis_err.error_list)
  // {
  //     dis_err = [
  //         categori.error_list.slug,
  //         categori.error_list.name,
  //         categori.error_list.meta_title,

  //     ]
  // }

  return (
    <div className="container-fluid p-4">
      {/* {display_err.map((item, index) => {
                    return( 
                        <p key={item}>{item}</p>
                
                    )
                })
                } */}

      <div className="card card-primary" style={{ paddingBottom: "10px" }}>
        <div className="card-header">
          <h6 className="card-title text-start ">Add Category</h6>
        </div>
        <form onSubmit={inpuut} id="CATEGORY_FORM">
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
                    onChange={handleInput}
                    value={categori.slug}
                    className="form-control"
                  >
                    {listSlug.map((item) => {
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
                    onChange={handleInput}
                    value={categori.name}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {categori.error_list.name}
                  </span>
                </div>
                <div className=" form-group mb-3">
                  <label>Descrption</label>
                  <textarea
                    name="desc"
                    onChange={handleInput}
                    value={categori.desc}
                    className="form-control"
                  ></textarea>
                </div>
                <div className=" form-group mb-3 d-flex align-items-center gap-3">
                  <h6>Status Showing</h6>
                  <div>
                    <input
                      type="checkbox"
                      name="status"
                      onChange={handleInput}
                      value={categori.status}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary px-4 mt-2 float-end"
            >
              {" "}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Categoory;
