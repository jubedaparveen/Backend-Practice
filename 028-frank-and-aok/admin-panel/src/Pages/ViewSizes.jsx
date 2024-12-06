import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";

const ViewSizes = () => {
  const [sizes, setSizes] = useState([]);

  

  const handeFatchSizesData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}admin-panel/Sizes/read-size`)
      .then((response) => {
        console.log(response.data.data);
        setSizes(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => { handeFatchSizesData(); }, []);

  const handleUpdateStatus = (e) =>{
    // e.tatget.value gives value of target field and e.target.textContent gives text inside the field
    // console.log(e.target.value, e.target.textContent);
    const status = e.target.textContent !== 'Active';
    axios.put(`${process.env.REACT_APP_API_URL}admin-panel/Sizes/update-size-status/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data)

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Status updated",
          showConfirmButton: false,
          timer: 800
        });
        
        handeFatchSizesData();
      })
      .catch((error) => {
        console.log(error);
      })
    console.log(status)
  };

  const handleSingleDeleteSize = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.REACT_APP_API_URL}admin-panel/Sizes/single-delete-size${id}`)
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your Category has been deleted.",
              icon: "success"
            });
            handeFatchSizesData();
          })
          .catch((error) => {
            console.log(error);
          })
      }
    });
  };

  return (
    <div className="w-[90%] bg-white mx-auto border rounded-[10px] my-[150px]">
      <span className="block border-b rounded-[10px_10px_0_0] bg-slate-600 uppercase text-white h-[50px] p-[8px_16px] text-[23px] font-bold">
        View Size
      </span>
      <div className="w-[90%] mx-auto">
        <table className="w-full my-[20px]">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  className="bg-slate-600 uppercase text-sm rounded-full px-3 py-1 text-white" > Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  className="m-[0_10px] accent-[#5351c9] cursor-pointer input" />
              </th>
              <th className="text-sm uppercase">Sno</th>
              <th className="text-sm uppercase">Size Name</th>
              <th className="text-sm uppercase">Size Order</th>
              <th className="text-sm uppercase">Action</th>
              <th className="text-sm uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
          <Tooltip id="status-tooltip" />
            {
              sizes.map((sizes, index) => (
                <tr className="border-b">
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      className="accent-[#5351c9] cursor-pointer input" />
                  </td>

                  <td>{index + 1}</td>
                  <td>{sizes.name}</td>
                  <td>{sizes.sizeorder}</td>
                  <td className="flex gap-[5px]">
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer"
                      onClick={() => { handleSingleDeleteSize(sizes._id) }} />
                    ||
                    <Link to="/dashboard/sizes/update-size">
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer" />
                    </Link>
                  </td>
                  <td>
                    <button 
                      onClick={handleUpdateStatus}
                      value={sizes._id}
                      data-tooltip-id="status-tooltip"
                      data-tooltip-content={`Click to ${(sizes.status) ? ' Inactive' : ' Active'} `}
                      className={`p-[4px_10px] rounded-full text-white 
                      ${(sizes.status) ? 'bg-green-500' : 'bg-red-500'}`}>
                      {(sizes.status) ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                </tr>
              ))

            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSizes;
