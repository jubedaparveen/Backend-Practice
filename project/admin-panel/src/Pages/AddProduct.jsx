import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select';

const AddProduct = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedColors, setSelectedColors ] = useState(null);




  const fetchParentCategories = () => {
    
    axios.get(`${process.env.REACT_APP_API_URL}admin-panel/parent-category/active-categories`)
      .then((response) => {
        setParentCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const fetchProductCategories = (e) => {

    axios.get(`${process.env.REACT_APP_API_URL}admin-panel/product-category/category-by-parent-category/${e.target.value}`)
      .then((response) => {
        console.log(response.data);
        setProductCategories(response.data.data);

      })
      .catch((error) => {
        console.log(error)
      })
  };

  const fetchColors = () => {
    axios.get(`${process.env.REACT_APP_API_URL}admin-panel/colors/active-colors`)
      .then((response) => {
        console.log(response.data);
        const newArr = response.data.data.map((color) => ({ ...color, value: color._id, label: color.name }))
        setColors(newArr);


      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchSizes = () => {
    axios.get(`${process.env.REACT_APP_API_URL}admin-panel/sizes/active-sizes`)
      .then((response) => {
        console.log(response.data);
        const newArr = response.data.data.map((size) => ({ ...size, value: size._id, label: size.name }))
        setSizes(newArr);

      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchParentCategories();
    fetchColors();
    fetchSizes();
  }, []);

  const handleAddProduct = (e)=>{
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}admin-panel/products/create-product`, e.target)
    .then((response)=>{
      console.log(response.data);
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block border-b bg-[#f8f8f9] text-[#303640] text-[20px] font-bold p-[8px_16px] h-[40px] rounded-[10px_10px_0_0]">
        Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method='post' onSubmit={handleAddProduct}>
          <div className="w-full my-[10px]">
            <label htmlFor="product_name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="name"
              placeholder="Name"
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_desc" className="block text-[#303640]">
              Product Description
            </label>
            <textarea
              id="product_desc"
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
              id="product_short_desc"
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
              id="product_img"
              name="thumbnail"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="image_animation" className="block text-[#303640]">
              Image Animation
            </label>
            <input
              type="file"
              id="image_animation"
              name="secondary_thumbnail"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            <input
              type="file"
              id="product_gallery"
              name="images"
              multiple
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px] grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="product_price" className="block text-[#303640]">
                Price
              </label>
              <input
                type="text"
                id="product_price"
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
                id="product_mrp"
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
            <select name="parent_category" onChange={fetchProductCategories} id="" className="border w-full p-2 rounded-[5px] my-[10px] category input">
              <option value='deafult' >--Select Parent Category--</option>
              {
                parentCategories.map((category, index) => (
                  <option key={index} value={category._id} >{category.name}</option>
                ))
              }
            </select>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_category" className="block text-[#303640]">
              Select Product Category
            </label>
            <select name="product_category" id="" className="border w-full p-2 rounded-[5px] my-[10px] category input">
              <option value='deafult' >--Select Product Category--</option>
              {
                productCategories.map((category, index) => (
                  <option key={index} value={category._id} >{category.name}</option>
                ))
              }
            </select>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="stock" className="block text-[#303640]">
                Manage Stock
              </label>
              <select
                name="ifStock"
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
                Size
              </label>
              <Select
                name='sizes'
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={sizes}
                isMulti
              />
            </div>
            <div>
              <label htmlFor="color" className="block mb-3 text-[#303640]">
                Color
              </label>
              <Select
                name='colors'
                defaultValue={selectedColors}
                onChange={setSelectedColors}
                options={colors}
                isMulti
              />
            </div>
          </div>
          <div className="w-full my-[10px] ">
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
              checked
            />
            <span>Hide</span>
          </div>
          <div className="w-full p-[8px_16px] my-[30px] ">
            <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
