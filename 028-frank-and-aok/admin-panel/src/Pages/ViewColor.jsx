import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const ViewColor = () => {
  const [colors, setColors] = useState([]);
  const [checkedBox, setCheckedBox] = useState([]);
  const [ifAllChecked, setAllChecked] = useState(false);

  const handleFatchColorData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}admin-panel/Colors/read-color`)
      .then((response) => {
        console.log(response.data);
        setColors(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => { handleFatchColorData(); }, [])

  const handleSingleDeleteColor = (id) => {

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
        axios.delete(`${process.env.REACT_APP_API_URL}admin-panel/Colors/single-delete-color${id}`)
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your Category has been deleted.",
              icon: "success"
            });
            handleFatchColorData();
          })
          .catch((error) => {
            console.log(error);
          })
      }
    });
  };

  const handleUpdateStatus = (e) =>{

    const status = e.target.textContent !== 'Active';
    axios.put(`${process.env.REACT_APP_API_URL}admin-panel/Colors/update-color-status/${e.target.value}`, { status })
    .then((response)=>{
      console.log(response.data)

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Status updated",
        showConfirmButton: false,
        timer: 800
      });
      handleFatchColorData();     
    })
    .catch((error)=>{
      console.log(error);
    })
  };

   const handleSingleCheckBox = (e) => {
      const { value, checked } = e.target;
      if (checked) {
        setCheckedBox([value, ...checkedBox])
      } else {
        setCheckedBox(checkedBox.filter((cat) => cat !== value));
      }
    };
  
    const handleAllCheckBox = (e) => {
      if (e.target.checked) {
        setCheckedBox(colors.map((cat) => cat._id));
        setAllChecked(true);
      } else {
        setCheckedBox([]);
        setAllChecked(false);
      }
    };
  
    useEffect(() => {
        setAllChecked(colors.length === checkedBox.length && colors.length !== 0);
      }, [checkedBox, colors]);

  const handleMultiDeleteColor = (e) =>{
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

        axios.put(`${process.env.REACT_APP_API_URL}admin-panel/Sizes/multi-delete-color`, { checkedBox })
          .then((response) => {
            handleFatchColorData();

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch((error) => {
            console.log(error);
          })
      }
    });
  };
 
  return (
    <div className="w-[90%] bg-white rounded-[10px] border mx-auto my-[150px]">
      <span className="block border-b rounded-[10px_10px_0_0] bg-slate-600  text-white p-[8px_16px] text-[20px]">
        View Color
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex p-2">
                <button onClick={handleMultiDeleteColor}
                  className="bg-slate-600 uppercase text-sm rounded-full px-3 py-1 text-white" > Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  onClick={handleAllCheckBox}
                  checked={ifAllChecked}
                  className="ms-4 cursor-pointer accent-[#5351c9] input"/>
              </th>
              <th className="p-2 uppercase text-sm">Sno.</th>
              <th className="p-2 uppercase text-sm">Color Name</th>
              <th className="p-2 uppercase text-sm">Color</th>
              <th className="p-2 uppercase text-sm">Action</th>
              <th className="p-2 uppercase text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="status-tooltip" />
            {
              colors.map((colors, i) => (
                <tr className="border-b">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      name="delete"
                      value={colors._id}
                      onClick={handleSingleCheckBox}
                      checked={checkedBox.includes(colors._id)}
                      className="cursor-pointer accent-[#5351c9] input" />
                  </td>
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{colors.color}</td>
                  <td className="p-2">
                    <div className="w-[90%] mx-auto h-[20px] bg-red-500 border" 
                    style={{ backgroundColor:colors.colorcode }}></div>
                  </td>
                  <td className="p-2">
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" 
                    onClick={() => { handleSingleDeleteColor(colors._id) }}/>
                    ||
                    <Link to={`/dashboard/color/update-colors/${colors._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>
                    <button 
                    onClick={handleUpdateStatus}
                    value={colors._id}
                    data-tooltip-id="status-tooltip"
                    data-tooltip-content={`Click to ${(colors.status) ? ' Inactive' : ' Active'} `}
                    className={`p-[4px_10px] text-white font-light rounded-md
                      ${(colors.status) ? 'bg-green-600' : 'bg-red-600'}`}>
                      {(colors.status) ? 'Active' : 'Inactive'}
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

export default ViewColor;
