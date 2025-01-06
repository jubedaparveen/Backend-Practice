import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateSizes = () => {
  const {id} = useParams();
  const Navigate = useNavigate();
  const [sizeEdit, setSizeEdit] = useState({});

  const fatchSizeData = () =>{
    axios.get(`${process.env.REACT_APP_API_URL}admin-panel/Sizes/read-edit-size/${id}`)
    .then((response)=>{
      console.log(response);
      setSizeEdit(response.data.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  };

  useEffect(()=>{fatchSizeData();},[id])

  const handleUpdateSize = (e) =>{
    e.preventDefault();

    axios.put(`${process.env.REACT_APP_API_URL}admin-panel/Sizes/edit-update-size/${id}`, e.target)
    .then((response)=>{
      console.log(response.data)

      let timerInterval;
        Swal.fire({
          title: "Size Updated!",
          html: "Redirecting to view category in <b></b> milliseconds.",
          timer: 800,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            Navigate('/dashboard/size/view-sizes');
          }
        });

    })
    .catch((error)=>{
      console.log(error);
    })
  };

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] text-[20px] font-bold p-[8px_16px] text-[#303640] border-b rounded-[10px_10px_0_0]">
        Update Size
      </span>
      <div className="w-[95%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleUpdateSize}>
          <div>
            <label htmlFor="size" className="block text-[#252b36f2]">
              Size Name
            </label>
            <input
              type="text"
              id="size"
              value={sizeEdit.name}
              onChange={(e)=>{setSizeEdit({...sizeEdit, name:e.target.value})}}
              name="name"
              placeholder="Size Name"
              className="input p-2 border my-[20px] w-full rounded-[5px]"
            />
            <div className="w-full my-[10px] ">
              <label htmlFor="size" className="text-[#252b36f2] block">
                Size Order
              </label>
              <input
                type="text"
                name="sizeorder"
                value={sizeEdit.sizeorder}
                onChange={(e)=>{setSizeEdit({...sizeEdit, sizeorder:e.target.value})}}
                id="updated_size_order"
                placeholder="Size Order"
                className="w-full input rounded-[5px] p-2 border my-[10px]"/>
            </div>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="status" className="mr-[20px]">
              Status
            </label>
            <input
              type="radio"
              id="status"
              name="status"
              value={true}
              className="accent-[#5351c9] mx-[10px]"/>
            <span>Display</span>
            <input
              type="radio"
              id="status"
              name="status"
              value={false}
              className="accent-[#5351c9] mx-[10px]"/>
            <span>Hide</span>
          </div>
          <div className="w-full my-[30px]">
            <button className=" rounded-[10px] bg-slate-600 border-none cursor-pointer text-white py-2 px-5" >
              Update Size
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSizes;
