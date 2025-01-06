import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";

const UpdateProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({ images: [] });
  const [filepath, setFilePath] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedColorsOption, setSelectedColorsOption] = useState(null);
  const [activeParentCategory, setActiveParentCategory] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
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

  const fatchProduct = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}admin-panel/products/edit-read-product/${id}`
      )
      .then((response) => {
        console.log("pre product =>", response.data);
        setProduct(response.data.data);
        setFilePath(response.data.filepath);

        // const newArrayColor = response.data.data.color.map((color) => ({
        //   ...color,
        //   value: color._id,
        //   label: color.color,
        // }));
        // setSelectedColorsOption(newArrayColor);

        // const newSizeArray = response.data.data.size.map((size) => ({
        //   ...size,
        //   value: size._id,
        //   label: size.name,
        // }));
        // setSelectedOption(newSizeArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(product);

  const fetchColors = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin-panel/Colors/active-colors`)
      .then((response) => {
        console.log(response.data);
        const newArr = response.data.data.map((color) => ({
          ...color,
          value: color._id,
          label: color.color,
        }));
        setColors(newArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSizes = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin-panel/Sizes/active-sizes`)
      .then((response) => {
        console.log(response.data);
        const newArr = response.data.data.map((size) => ({
          ...size,
          value: size._id,
          label: size.name,
        }));
        setSizes(newArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fatchActiveParentCategoey();
    fatchProduct();
    fetchColors();
    fetchSizes();
  }, [id]);

  const handleeditUpdateProduct = () => {};

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block border-b bg-slate-600 text-white text-[20px] font-bold p-[8px_16px] uppercase rounded-[10px_10px_0_0] tracking-widest">
        Update Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleeditUpdateProduct}>
          <div className="w-full my-[10px]">
            <label htmlFor="product_name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              value={product.name}
              onChange={(e) => {
                setProduct({ ...product, name: e.target.value });
              }}
              type="text"
              id="name"
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
              value={product.description}
              onChange={(e) => {
                setProduct({ ...product, description: e.target.value });
              }}
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
              value={product.short_description}
              onChange={(e) => {
                setProduct({ ...product, short_description: e.target.value });
              }}
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
              onChange={handleImagePreview}
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
       
            <img src={ filepath + product.thumbnail} className="w-40" alt="" />
    

          <div className="w-full my-[10px]">
            <label htmlFor="image_animation" className="block text-[#303640]">
              Image Animation
            </label>
            <input
              onChange={handleImagePreview}
              type="file"
              id="secondary_thumbnail"
              name="secondary_thumbnail"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          {imagePreview.secondary_thumbnail && (
            <img
              src={filepath + imagePreview.secondary_thumbnail}
              className="w-40"
              alt=""
            />
          )}

          <div className="w-full my-[10px]">
            <label htmlFor="product_gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            <input
              onChange={handleImagePreview}
              type="file"
              id="images"
              name="images"
              className="w-full input border rounded-[5px] my-[10px] category"
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
                value={product.price}
                onChange={(e) => {
                  setProduct({ ...product, price: e.target.value });
                }}
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
                value={product.mrp}
                onChange={(e) => {
                  setProduct({ ...product, mrp: e.target.value });
                }}
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
              id="parent_category"
              name="parent_category"
              onChange={fetchProductCategories}
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
              id="Product_Category"
              name="Product_Category"
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
                value={product.ifStock}
                onChange={(e) => {
                  setProduct({ ...product, ifStock: e.target.value });
                }}
                name="ifStock"
                id="ifStock"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value="default" selected disabled hidden>
                  --Select Stock--
                </option>
                <option value="inStock">In Stock</option>
                <option value="outStock">Out of Stock</option>
              </select>
            </div>
            <div>
              <label htmlFor="brand" className="block text-[#303640]">
                Brand Name
              </label>
              <input
                value={product.brand}
                onChange={(e) => {
                  setProduct({ ...product, brand: e.target.value });
                }}
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
              <label htmlFor="size" className="block text-[#303640]">
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
              <label htmlFor="color" className="block text-[#303640]">
                Color
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
            />
            <span>Hide</span>
          </div>
          <div className="w-full p-[8px_16px] my-[30px] ">
            <button className="bg-slate-600 rounded-md text-white px-3 py-2">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
