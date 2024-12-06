import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddSizes = () => {
  const Navigation = useNavigate();

  const handleAddSize = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}admin-panel/Sizes/add-sizes`, e.target)
      .then((response) => {
        console.log(response.data);

        let timerInterval;
        Swal.fire({
          title: " Added Sizes Successfully!",
          html: "You're Redirecting to View Sizes Page in <b></b> milliseconds.",
          timer: 600,
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
            Navigation('/dashboard/size/view-sizes');
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="w-[90%] my-[150px] mx-auto bg-white rounded-[10px] border">

      <span className="block bg-slate-600 uppercase h-[50px] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[25px] font-[700] text-white">
        Add Size
      </span>

      <form method="post" onSubmit={handleAddSize}>

        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2]">
            Size Name
          </label>
          <input
            type="text"
            name="name"
            id="size"
            placeholder="Size Name"
            className="w-full input rounded-[5px] p-2 border my-[10px]" />
        </div>

        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2]">
            Size Order
          </label>
          <input
            type="text"
            name="sizeorder"
            id="size_order"
            placeholder="Size Order"
            className="w-full input rounded-[5px] p-2 border my-[10px]" />
        </div>

        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2] mr-[30px]">
            Display
          </label>
          <input
            type="radio"
            name="status"
            id="size"
            value={true}
            placeholder="Size Name"
            className="my-[10px] mx-[20px] accent-[#5351c9]" />
          <span>Display</span>
          <input
            type="radio"
            name="status"
            id="size"
            value={false}
            placeholder="Size Name"
            className="my-[10px] mx-[20px] accent-[#5351c9]"/>
          <span>Hide</span>
        </div>

        <div className="w-full p-[8px_16px] my-[10px] ">
          <button className="bg-slate-600 rounded-md text-white w-[100px] h-[35px]">
            Add Size
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddSizes;
