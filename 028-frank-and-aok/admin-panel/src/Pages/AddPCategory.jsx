import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddPCategory = () => {
  const Navigation = useNavigate();

  // Using this for creating retation between Parent-Category and Product-Category    
  const [activeParentCategory, setActiveParentCategory] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const fatchActiveParentCategoey = () => {
    axios.get(`${process.env.REACT_APP_API_URL}admin-panel/parent-category/active-parent-category`)
      .then((response) => { console.log(response.data); 
        setActiveParentCategory(response.data.data);
      })
      .catch((error)=>{console.error(error);})
  }
    useEffect(() => { fatchActiveParentCategoey(); }, []);


    const handleCreateProductCategory = (e) => {
      e.preventDefault();

      axios.post(`${process.env.REACT_APP_API_URL}admin-panel/product-category/create-Product-category`, e.target)
        .then((response) => {
          console.log(response.data);

          let timerInterval;
          Swal.fire({
            title: "Product Category added!",
            html: "Redirected to view Product Category page in <b></b> milliseconds.",
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
              Navigation('/dashboard/products/view-category');
            }
          });
        })
        .catch((error) => {
          console.error(error);
          if (error.status === 400) {
            Swal.fire({
              title: "Category already exists?",
              text: "Please enter a different category?",
              icon: "question"
            });
          }
        });
    };

    //this function for image Preview
    const handleImagePreview = (e) => {
      //this will give uploaded image file
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setImagePreview(imageUrl);
    };

    return (
      <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
        <span className="bg-slate-600 uppercase rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-white">
          Add Category
        </span>
        <div className="w-[90%] mx-auto my-[20px]">

          <form method="post" onSubmit={handleCreateProductCategory}>
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

            <div className="w-full my-[10px]">
              <label htmlFor="categoryImg" className="block text-[#303640]">
                Category Image
              </label>
              <input
                type="file"
                name="thumbnail"
                id="categoryImg"
                className="input border w-full rounded-[5px] my-[10px] category" onChange={handleImagePreview} />
            </div>
            {
              imagePreview && (
                <img src={imagePreview} className="w-40" alt="" />
              )
            }

            <div className="w-full my-[10px]">
              <label htmlFor="categoryImg" className="block text-[#303640]">
                Parent Category
              </label>
              <select name="parent_category" id="" className="border w-full p-[.5rem] rounded-[5px] my-[10px] category input">
                <option value='defult'>----Select Parent Category----</option>
                {
                  activeParentCategory.map((category, index) => 
                  (<option key={index} value={category._id}>
                    {category.name}</option>))
                }
              </select>
            </div>
            
            <div className="w-full my-[10px]">
              <label htmlFor="slug" className="block text-[#303640]">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                id="slug"
                placeholder="Category Name"
                className="input border p-1 w-full rounded-[5px] my-[10px]" />
            </div>
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
              <button type="submit" className="bg-slate-600 rounded-md text-white px-3 py-2">
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  
export default AddPCategory;