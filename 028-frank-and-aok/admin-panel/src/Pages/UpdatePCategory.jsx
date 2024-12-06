import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePCategory = () => {
  const { id } = useParams();
  // console.log(params)
  const Navigation = useNavigate();

  const [category, setCategory] = useState({});
  const [filepath, setFilePath] = useState('');
  const [imagePreview, setImagePreview] = useState(null);


  const fatchProductCategory = () => {
    axios.get(`${process.env.REACT_APP_API_URL}admin-panel/product-category/edit-read-product-category/${id}`)
      .then((response) => {
        console.log(response.data);
        setCategory(response.data.data);
        setFilePath(response.data.filepath)
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => { fatchProductCategory(); }, [id]);

  const handleeditUpdateCategory = (e) => {
    e.preventDefault();

    axios.put(`${process.env.REACT_APP_API_URL}admin-panel/product-category/edit-updata-product-category/${id}`, e.target)
      .then((response) => {
        console.log(response.data);

        let timerInterval;
        Swal.fire({
          title: "Product Category Updated!",
          html: "Redirecting to view Product category in <b></b> milliseconds.",
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
            Navigation('/dashboard/products/view-category');
          }
        });
      })
      .catch((error) => {
        console.log(error);
      })
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
        Update Product Category
      </span>

      <div className="w-[90%] mx-auto my-[20px]">

        <form method="post" onSubmit={handleeditUpdateCategory}>

          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              value={category.name}
              onChange={(e) => { setCategory({ ...category, name: e.target.value }) }}
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
              id="thumbnail"
              onChange={handleImagePreview}
              className="input border w-full rounded-[5px] my-[10px] category" />
          </div>
              <img src={imagePreview || filepath + category.thumbnail} className="w-40" alt="" />
          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              value={category.description}
              onChange={(e) => { setCategory({ ...category, description: e.target.value }) }}
              type="file"
              name="description"
              id="description"
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
              id="status"
              value="true"
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer" />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="status"
              value="false"
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer" />
            <span>Hide</span>
          </div>

          <div className="w-full my-[20px] ">
            <button className="bg-slate-600 rounded-md text-white px-3 py-2">
              Add Product Category
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdatePCategory;
