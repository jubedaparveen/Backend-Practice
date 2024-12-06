import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCategory = () => {
  const {id} = useParams();
  const nav = useNavigate();

const [editCategory, setEditCategory] = useState({});

const fetchEditParentCategory = () => {
  axios.get(`${process.env.REACT_APP_API_URL}admin-panel/parent-category/edit-read-parent-category/${id}`)
    .then((response) => {
      console.log(response.data);
      setEditCategory(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

useEffect(() => { fetchEditParentCategory(); }, [id]);

const handleeditUpdateCategory = (e) => {
  e.preventDefault();

  axios.put(`${process.env.REACT_APP_API_URL}admin-panel/parent-category/edit-updata-parent-category/${id}`,e.target)
    .then((response) => {
      console.log(response.data);

        let timerInterval;
        Swal.fire({
          title: "Category Updated!",
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
            nav('/dashboard/category/view-category');
          }
        });
      })
      .catch((error) => {
        console.log(error);
      })
  };


  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Update Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleeditUpdateCategory}> 
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              id="categoryName"
              placeholder="Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
              value={editCategory.name}
              onChange={(e) => { setEditCategory({ ...editCategory, name: e.target.value }) }} />
          </div>

          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              className="input border w-full rounded-[5px] my-[10px]"
              value={editCategory.description}
              onChange={(e) => { setEditCategory({ ...editCategory, description:e.target.value }) }} />
          </div>

          <div className="w-full my-[20px] ">
            <button className="bg-slate-600 rounded-lg text-white px-3 py-2">
              Update Category
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
