import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";

const AddProduct = () => {
  const Navigation = useNavigate();
  const [activeParentCategory, setActiveParentCategory] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedColorsOption, setSelectedColorsOption] = useState(null);
  const [imagePreview, setImagePreview] = useState({ images: [] });

  const handleImagePreview = (e) => {
    const { name, files } = e.target;

    if (name === "images") {
      const images = Array.from(files).map((file) => URL.createObjectURL(file));
      console.log(images);
      setImagePreview({ ...imagePreview, images: images });
      return;
    }

    const preImage = URL.createObjectURL(files[0]);
    setImagePreview({ ...imagePreview, [name]: preImage });
    console.log(preImage);
  };

  const fatchActiveParentCategoey = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}admin-panel/parent-category/active-parent-category`
      )
      .then((response) => {
        console.log(response.data);
        setActiveParentCategory(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchProductCategories = (e) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}admin-panel/product-category/product-by-parent-category/${e.target.value}`
      )
      .then((response) => {
        console.log(response.data);
        setProductCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchColors = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin-panel/Colors/active-colors`)
      .then((response) => {
        // console.log(response.data);
        const newArr = response.data.data.map((color) => ({
          ...color,
          value: color._id,
          label: color.color,
        }));
        console.log("colors =>", newArr);
        setColors(newArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(color, 'colors');

  const fetchSizes = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin-panel/Sizes/active-sizes`)
      .then((response) => {
        console.log(response.data);
        const newArr = response.data.data.map((sizes) => ({
          ...sizes,
          value: sizes._id,
          label: sizes.name,
        }));
        setSizes(newArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fatchActiveParentCategoey();
    fetchColors();
    fetchSizes();
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_API_URL}admin-panel/products/create-product`,
        e.target
      )
      .then((response) => {
        console.log(response.data);
        let timerInterval;
        Swal.fire({
          title: "Product added!",
          html: "Redirected to view Product View page in <b></b> milliseconds.",
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
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            Navigation("/dashboard/products/view-product");
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block border-b bg-slate-600 text-white uppercase text-[20px] font-bold p-[8px_16px] rounded-[10px_10px_0_0]">
        Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleAddProduct}>
          <div className="w-full my-[10px]">
            <label htmlFor="product_name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Product Name"
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>

          <div className="w-full my-[10px]">
            <label htmlFor="product_desc" className="block text-[#303640]">
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows={3}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>

          <div className="w-full my-[10px]">
            <label
              htmlFor="product_short_desc"
              className="block text-[#303640]"
            >
              Short Description
            </label>
            <textarea
              id="short_description"
              name="short_description"
              placeholder="Short Description"
              rows={2}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>

          <div className="w-full my-[10px]">
            <label htmlFor="product_img" className="block text-[#303640]">
              Product Image
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="w-full input border rounded-[5px] my-[10px] category"
              onChange={handleImagePreview}
            />
          </div>
          {imagePreview.thumbnail && (
            <img src={imagePreview.thumbnail} className="w-40" alt="" />
          )}

          <div className="w-full my-[10px]">
            <label htmlFor="image_animation" className="block text-[#303640]">
              Image Animation
            </label>
            <input
              type="file"
              id="secondary_thumbnail"
              name="secondary_thumbnail"
              className="w-full input border rounded-[5px] my-[10px] category"
              onChange={handleImagePreview}
            />
          </div>
          {imagePreview.secondary_thumbnail && (
            <img
              src={imagePreview.secondary_thumbnail}
              className="w-40"
              alt=""
            />
          )}
          <div className="w-full my-[10px]">
            <label htmlFor="product_gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              className="w-full input border rounded-[5px] my-[10px] category"
              onChange={handleImagePreview}
            />
          </div>
          <div className="grid grid-cols-7 gap-4 ">
            {imagePreview.images.map((img) => (
              <div className="border border-slate-400 shadow-md">
                <img src={img} className="w-40 h-40" alt="" />
              </div>
            ))}
          </div>
          <div className="w-full my-[10px] grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="product_price" className="block text-[#303640]">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Product Price"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
            <div>
              <label htmlFor="product_mrp" className="block text-[#303640]">
                MRP
              </label>
              <input
                type="text"
                id="mrp"
                name="mrp"
                placeholder="Product MRP"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
          </div>

          <div className="w-full my-[10px]">
            <label htmlFor="parent_category" className="block text-[#303640]">
              Select Parent Category
            </label>
            <select
              onChange={fetchProductCategories}
              id="parent_category"
              name="parent_category"
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
            >
              <option value="defult">----Select Parent Category----</option>
              {activeParentCategory.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full my-[10px]">
            <label htmlFor="product_category" className="block text-[#303640]">
              Select Product Category
            </label>
            <select
              id="product_category"
              name="product_category"
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
            >
              <option value="defult">----Select Product Category----</option>
              {productCategories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="stock" className="block text-[#303640]">
                Manage Stock
              </label>
              <select
                name="stock"
                id="stock"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value="default" selected disabled hidden>
                  --Select Stock--
                </option>
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
              </select>
            </div>

            <div>
              <label htmlFor="brand" className="block text-[#303640]">
                Brand Name
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Brand"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="size" className="block mb-3 text-[#303640]">
                {" "}
                Size
              </label>
              <Select
                name="sizes"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={sizes}
                isMulti
              />
            </div>

            <div>
              <label htmlFor="color" className="block mb-3 text-[#303640]">
                Color{" "}
              </label>
              <Select
                name="color"
                defaultValue={selectedColorsOption}
                onChange={setSelectedColorsOption}
                options={colors}
                isMulti
              />
            </div>
          </div>

          <div className="w-full my-[10px]">
            <label htmlFor="status" className="text-[#252b36f2] mr-[30px]">
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="status"
              value={true}
              className="my-[10px] mx-[20px] accent-[#5351c9]"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="status"
              value={false}
              className="my-[10px] mx-[20px] accent-[#5351c9]"
            />
            <span>Hide</span>
          </div>

          <div className="w-full p-[8px_16px] my-[30px] ">
            <button className="bg-slate-600 rounded-md text-white px-3 py-2">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
