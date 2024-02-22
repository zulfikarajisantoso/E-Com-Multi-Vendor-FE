import CIcon from '@coreui/icons-react'
import { CSpinner } from "@coreui/react";
import { cilToggleOn, cilToggleOff } from "@coreui/icons";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Customer = () => {
    const [loading, setloading] = useState(true);
    const [userList, setuserList] = useState([])
    const getAllCustomer = () => {
        axios.get('/api/super-admin/alluser').then(res => {
            setuserList(res.data.user)
            setloading(false)
        })
    }

    useEffect(() => {
        getAllCustomer()
    }, [])


    const Unactivated = (id) => {
     
        axios.put(`/api/super-admin/changestatususer/${id}`, { status: 0 }).then(res => {
          if(res.status === 200){
            getAllCustomer()
            // swal("Success", res.data.message, "success");
          }
          else{
            swal("Success", res.data.error, "success");
          }
        })
    }

    const activate =  async(id) => {     

        await axios.put(`/api/super-admin/changestatususer/${id}`, { status: 1 }).then(res => {
            if(res.status === 200){
                getAllCustomer()
                // swal("Success", res.data.message, "success");
              }
              else{
                swal("Success", res.data.error, "success");
              }
        })
    }
    var diplay_data = "";
    if (loading) {
        return <div className="w-100 justify-content-center align-items-center d-flex" style={{ minHeight: "60vh" }}>
            <CSpinner color="primary" />
        </div>
    } else {
        diplay_data = userList.map((item) => {

            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                        <img
                            src={`http://localhost:8000/${item.image}`}
                            alt={item.name}
                            width="50px"
                        />{" "}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>

                    <td>{
                        item.role === 2
                            ? "Super Admin"
                            : item.role === 1
                                ? "General Admin"
                                : "Customer"
                    }</td>

                    <td>{item.status === 0 ? 'Activate' : 'Unactivated'}</td>
                    {
                        item.status === 1 ? (
                            <td>
                                <div className='d-flex justify-content-center' onClick={() => Unactivated(item.id)} style={{ cursor: "pointer" }}>
                                    <CIcon

                                        icon={cilToggleOn}
                                        customClassName="nav-icon "
                                        style={{ width: "40px", color: "#000" }}
                                    />
                                </div>
                            </td>

                        ) : (
                            <td>
                                <div className='d-flex justify-content-center' onClick={() => activate(item.id)} style={{ cursor: "pointer" }}>
                                    <CIcon

                                        icon={cilToggleOff}
                                        customClassName="nav-icon "
                                        style={{ width: "40px", color: "#000" }}
                                    />
                                </div>
                            </td>

                        )
                    }


                </tr>
            );
        });
    }





    return (
        <div className="container-fluid">
            <div className="card ">
                <div className="card-header" style={{ background: "#003049", background: "#003049", color: "#ffff" }}>
                    <h4>
                        {" "}
                        Customer

                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{diplay_data}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customer