// import axios from "axios";
import axios from 'axios';
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const AddCategory = () => {
  const nav = useNavigate();

  const handleParentCategory = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}admin-panel/parent-category/create-Parent-Category`, e.target)
      .then((Response) => {
        console.log(Response.data);

        let timerInterval;
        Swal.fire({
          title: "Parent Category Added Successfully!",
          html: "You're Redirecting to View Page in <b></b> milliseconds.",
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
            // console.log("I was closed by the timer");
            nav('/dashboard/category/view-category');
          }
        });
      })
      .catch((error) => {
        console.log(error);

        if(error.status === 400){
          Swal.fire({
            title: "Category already exists?",
            text: "Please enter a different category?",
            icon: "question"
          });
        }

      });
  }

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#7e7e7f] uppercase rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-white">
        Add Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">

        <form method="post" onSubmit={handleParentCategory}>

          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              id="categoryName"
              placeholder="Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]" />
          </div>

          {/* <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Category Image
            </label>
            <input
              type="file"
              name="thumbnail"
              id="categoryImg"
              className="input border w-full rounded-[5px] my-[10px] category"
            />
          </div> */}

          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              className="input border w-full rounded-[5px] my-[10px]" />
          </div>

          <div className="w-full my-[10px]">
            <label
              htmlFor="categoryStatus"
              className=" text-[#303640] mr-[20px]">
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={true}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer" />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={false}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer" />
            <span>Hide</span>
          </div>

          <div className="w-full my-[20px] ">
            <button className="bg-slate-600 px-3 py-2 rounded-lg text-white ">
              Add Category
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AddCategory;