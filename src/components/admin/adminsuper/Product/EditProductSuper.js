import CIcon from "@coreui/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { cilLowVision } from "@coreui/icons";
import Cookies from 'js-cookie';

const EditProductSuper = () => {
    const history = useHistory()
    const [categorylist, setcategorylist] = useState([]);
    const [picture, setpic] = useState([]);
    const [error, SetError] = useState([]);
    const [image, setImage] = useState(null);
    const [imagedb, setImagedb] = useState(null);
    const { id } = useParams();


    const [prodinput, setprodinput] = useState({
        category_id: "",
        name: "",
        description: "",

        original_price: "",
        selling_price: "",
        qty: "",

        popular: "",
        status: "",
    });


    const getOneData = () => {
        axios.get(`/api/super-admin/edit-product/${id}`).then(res => {
            console.log(res);
            setprodinput({
                ...setprodinput,
                category_id: res.data.product.category_id,
                name: res.data.product.name,
                description: res.data.product.description,
                original_price: res.data.product.original_price,
                selling_price: res.data.product.selling_price,
                qty: res.data.product.qty,
                popular: res.data.product.popular === 1 ? true : false,
                status: res.data.product.status === 1 ? true : false,
            });
            setImagedb(res.data.product.image)
        })
    }


    const inputtCheck = (e) => {
        e.persist();
        setprodinput({ ...prodinput, [e.target.name]: e.target.checked });
    };

    const inputt = (e) => {
        e.persist();
        setprodinput({ ...prodinput, [e.target.name]: e.target.value });
    };

    const subproduct = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("image", picture.image);
        formdata.append("category_id", prodinput.category_id);
        formdata.append("name", prodinput.name);
        formdata.append("description", prodinput.description);
        formdata.append("selling_price", prodinput.selling_price);
        formdata.append("original_price", prodinput.original_price);
        formdata.append("qty", prodinput.qty);
        formdata.append("popular", prodinput.popular === true ? 1 : 0);
        formdata.append("status", prodinput.status === true ? 1 : 0);
        formdata.append("users_id", Cookies.get("mycooke"));

        axios.post(`/api/super-admin/update-product/${id}`, formdata).then((res) => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setprodinput({
                    ...setprodinput,
                    category_id: "",
                    name: "",
                    description: "",

                    original_price: "",
                    selling_price: "",
                    qty: "",

                    popular: "",
                    status: "",
                });
                setpic("")
                setImage("")
                history.push("/admin/products")

                SetError([]);
            } else if (res.data.status === 422) {
                SetError(res.data.errors);
            }
        });
    };

    // drag and drop

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


    // onmounted

    useEffect(() => {
        getOneData()
        axios.get("/api/super-admin/all-category").then((res) => {
            if (res.data.status === 200) {
                setcategorylist(res.data.category);
            }
        });
    }, []);



    return (
        <div className="contaner-fluid pb-3 ">
            <div className="card">
                <div
                    className="card-header"
                    style={{ background: "#003049", color: "#fff" }}
                >
                    <h4>
                        {" "}
                        Edit Product
                        <Link
                            to="/admin/products"
                            className="btn  float-end bg-white d-flex align-items-center"
                        >
                            <CIcon
                                icon={cilLowVision}
                                customClassName="nav-icon "
                                style={{ width: "15px", color: "#000" }}
                            />
                        </Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane card-body border fade show active"
                                id="home"
                                role="tabpanel"
                                aria-labelledby="home-tab"
                            >
                                <div className="form-group mb-3">
                                    <label>Select Category</label>
                                    <select
                                        name="category_id"
                                        onChange={inputt}
                                        value={prodinput.category_id}
                                        className="form-control"
                                    >
                                        {categorylist.map((item) => {
                                            return (
                                                <option value={item.id} key={item.id}>
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <small className="text-danger">{error.category_id} </small>
                                </div>

                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        onChange={inputt}
                                        value={prodinput.name}
                                        className="form-control"
                                    />
                                    <small className="text-danger">{error.name} </small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        onChange={inputt}
                                        value={prodinput.description}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card mt-2 ">
                <div className="w-100  px-4 py-4 ">
                    <div style={{ fontWeight: "bolder" }}>PRICE</div>
                </div>
                <div className="card-body">
                    <form>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane card-body border fade show active"
                                id="home"
                                role="tabpanel"
                                aria-labelledby="home-tab"
                            >
                                <div className="form-group mb-3">
                                    <label>Original Price</label>
                                    <input
                                        name="original_price"
                                        type="number"
                                        onChange={inputt}
                                        value={prodinput.original_price}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Selling Price </label>
                                    <input
                                        name="selling_price"
                                        type="number"
                                        onChange={inputt}
                                        value={prodinput.selling_price}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Qty</label>
                                    <input
                                        name="qty"
                                        type="number"
                                        onChange={inputt}
                                        value={prodinput.qty}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card mt-2 ">
                <div className="w-100  px-4 py-4 ">
                    <div style={{ fontWeight: "bolder" }}>Image</div>
                </div>
                <div className="card-body">
                    <div
                        className="w-100 d-flex align-items-center justify-content-center "
                        style={{
                            background: "#e5e5e5",
                            height: "",
                            border: "1px solid #8d99ae",
                            borderRadius: "10px",
                        }}
                    >
                        <div
                            className=""
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onClick={handleDropZoneClick}
                        >

                            {
                                imagedb ? (
                                    image ? (<img
                                        src={image}
                                        alt="Uploaded"
                                        className="image-preview w-100"
                                    />) : (<img
                                        src={`http://localhost:8000/${imagedb}`}
                                        alt="Uploaded"
                                        className="image-preview w-100"
                                    />)
                                ) : (
                                    <div className="p-3 py-3">
                                        <h6>Drag & Drop an image here, or click to select one</h6>
                                    </div>
                                )
                            }

                        </div>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            </div>

            <div className="card mt-2 d-flex ">
                <div className="card-body d-flex gap-2 align-items-center">
                    <div style={{ fontWeight: "bolder" }}>Status : </div>
                    <div className="d-flex align-items-center gap-2">
                        <div>Popular</div>
                        <input
                            type="checkbox"
                            name="popular"
                            onChange={inputtCheck}
                            checked={prodinput.popular}
                            className="h-50 w-50"
                        />

                        <div>Activation </div>
                        <input
                            type="checkbox"
                            name="status"
                            onChange={inputtCheck}
                            checked={prodinput.status}
                            className="h-50 w-50"
                        />
                    </div>
                </div>
            </div>
            <div className="card mt-2 d-flex " onClick={subproduct}>
                <button className="btn text-white " style={{ background: "#003049" }}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default EditProductSuper;
