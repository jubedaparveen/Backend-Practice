import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const ViewProduct = () => {
  const [product, setProduct] = useState([]);
  const [filepath, setFilepath] = useState('');

  const handleFetchProduct = () => {
    
    axios.get(`${process.env.REACT_APP_API_URL}admin-panel/products/read-product`)
    .then((response) => {
      console.log(response.data);
      setProduct(response.data.data);
      setFilepath(response.data.filepath);
    })
    .catch((error) =>{
      console.log(error);
    });
  };

  useEffect(() => {handleFetchProduct();}, [])

  const handleUpdateStatus = (e) =>{
    const status = e.target.textContent !== 'Active';
    axios.put(`${process.env.REACT_APP_API_URL}admin-panel/products/update-status-product/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data)

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Status updated",
          showConfirmButton: false,
          timer: 800
        });
        handleFetchProduct();
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleSingleDeleteProduct = (id) =>{
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
        axios.delete(`${process.env.REACT_APP_API_URL}admin-panel/products//single-delete-product/${id}`)
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted.",
              icon: "success"
            });
            handleFetchProduct();
          })
          .catch((error) => {
            console.log(error);
          })
      }
    });
  };

  return (
    <div className="w-[90%] mx-auto my-[150px] rounded-[10px] bg-white border">
      <span className="block bg-slate-600 text-[20px] text-white font-bold p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Product
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex gap-[5px]">
                <button className="bg-slate-600 uppercase text-sm rounded-full px-3 py-1 text-white">
                  {" "}
                  Delete
                </button>
                <input
                  type="checkbox"
                  id="deleteAll"
                  name="delete"
                  className="input accent-[#5351c9] cursor-pointer h-[fit-content] m-[5px]"
                />
              </th>
              <th className="uppercase text-sm">Sno</th>
              <th className="uppercase text-sm">Product Name</th>
              <th className="uppercase text-sm">Description</th>
              <th className="uppercase text-sm">Short Description</th>
              <th className="uppercase text-sm">Thumbnail</th>
              <th className="uppercase text-sm">Action</th>
              <th className="uppercase text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="status-tooltip" />
            {product.map((product, index) => ( 
              <tr className="border-b">
              <td>
                <input
                  type="checkbox"
                  id="delete"
                  name="delete"
                  className="input accent-[#5351c9] cursor"/>
              </td>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td className="w-[200px] p-2">
                {product.description}
              </td>
              <td className="w-[200px] p-2">
               {product.short_description}
              </td>
              <td className="object-contain">
                <img
                  src={filepath + product.thumbnail}
                  alt="men's t-shirt"
                  width={80}
                  height={80}
                  className="rounded-[5px]"
                />{" "}
              </td>
              <td>
                <MdDelete className="my-[5px] text-red-500 cursor-pointer inline"  
                onClick={() => { handleSingleDeleteProduct(product._id) }}/>
                |
                <Link to={`/dashboard/products/update-product/${product._id}`}>
                  <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                </Link>
              </td>
              <td>
                <button
                  onClick={handleUpdateStatus}
                  value={product._id}
                  data-tooltip-id="status-tooltip"
                  data-tooltip-content={`Click to ${
                    product.status ? " Inactive" : " Active"
                  } `}
                  className={`p-[4px_10px] rounded-full text-white
                      ${product.status ? "bg-green-500" : "bg-red-500"}  `}>
                  {product.status ? "Active" : "Inactive"}
                </button>
              </td>
            </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProduct;
