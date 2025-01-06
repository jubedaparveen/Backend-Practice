import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);

  const [categories, setCategories] = useState([]);
  const [filepath, setFilepath] = useState('');
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [ifAllChecked, setAllChecked] = useState(false);

  const handleFetchCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}admin-panel/product-category/read-product-category`)
      .then((response) => {
        console.log(response.data);

        setCategories(response.data.data);
        setFilepath(response.data.filepath);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(
    () => {
      handleFetchCategories();
    }, []);

  const handleUpdateStatus = (e) => {
    // console.log(e.target.value, e.target.textContent);
    const status = e.target.textContent !== 'Active';
    axios.put(`${process.env.REACT_APP_API_URL}admin-panel/product-category/status-update-product-category/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data)

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Status updated",
          showConfirmButton: false,
          timer: 800
        });
        handleFetchCategories();
      })
      .catch((error) => {
        console.log(error);
      })
    // console.log(status)
  };

  const handleSingleDeleteCategory = (id) => {

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
        axios.delete(`${process.env.REACT_APP_API_URL}admin-panel/product-category/single-delete-product-category/${id}`)
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              title: "Deleted!",
              text: "Product Category has been deleted.",
              icon: "success"
            });
            handleFetchCategories();
          })
          .catch((error) => {
            console.log(error);
          })
      }
    });
    
  };

  const handleSingleCheckCategory = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedCategories([value, ...checkedCategories])
    } else {
      setCheckedCategories(checkedCategories.filter((cat) => cat !== value));
    }
  };

  const handleAllCheckCategory = (e) => {
    if (e.target.checked) {
      setCheckedCategories(categories.map((cat) => cat._id));
      setAllChecked(true);
    } else {
      setCheckedCategories([]);
      setAllChecked(false);
    }
  };

  useEffect(() => {
    setAllChecked(categories.length === checkedCategories.length && categories.length !== 0);
  }, [checkedCategories, categories]);

  const handleMultiDeleteCategory = (e) => {
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

        axios.put(`${process.env.REACT_APP_API_URL}admin-panel/product-category/multi-delete-product-category`, { checkedCategories })
          .then((response) => {
            handleFetchCategories();

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch((error) => {
            console.log(error);
          })
      }
    });
  }


  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block h-[40px] bg-slate-600  text-[20px] text-white uppercase font-bold p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button onClick={handleMultiDeleteCategory}
                  className="bg-slate-600 uppercase text-sm rounded-full px-3 py-1 text-white" > Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  className="accent-[#5351c9] ms-3"
                  onClick={handleAllCheckCategory}
                  checked={ifAllChecked} />
              </th>
              <th className="uppercase text-sm">Sno</th>
              {/* <th className="uppercase text-sm">Parent Category Name</th> */}
              <th className="uppercase text-sm">Category Name</th>
              <th className="uppercase text-sm">Image</th>
              <th className="uppercase text-sm">Description</th>
              <th className="uppercase text-sm">Action</th>
              <th className="uppercase text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="status-tooltip" />
            {
              categories.map((category, index) => (
                <tr className="border-b" key={index}>
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete1"
                      className="accent-[#5351c9] cursor-pointer"
                      value={category._id}
                      onClick={handleSingleCheckCategory}
                      checked={checkedCategories.includes(category._id)} />
                  </td>
                  <td>{index + 1}</td>
                  {/* <td>{category.parent_category}</td> */}
                  <td>{category.name}</td>
                  <td className="object-contain p-2">
                    <img
                      src={filepath + category.thumbnail}
                      alt="product men's t-shirt"
                      width={80}
                      height={80} />
                  </td>
                  <td className="w-[200px] flex-wrap p-1">
                    {category.description}
                    <span
                      onClick={() => setShow1(!show1)}
                      className={show1 === true ? "hidden" : "font-bold cursor-pointer"}>
                      ...Read
                    </span>
                    {show1 === false ? (" ") : (
                      <span>
                        Deserunt nam est delectus itaque sint harum architecto.
                      </span>
                    )}
                  </td>
                  <td>
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer inline"
                      onClick={() => { handleSingleDeleteCategory(category._id) }} /> |
                    <Link to={`/dashboard/products/update-category/${category._id}`}>
                      | <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>

                  <td>
                    <button
                      onClick={handleUpdateStatus}
                      value={category._id}
                      data-tooltip-id="status-tooltip"
                      data-tooltip-content={`Click to ${(category.status) ? ' Inactive' : ' Active'} `}
                      className={`p-[4px_10px] rounded-full text-white
                      ${(category.status) ? 'bg-green-500' : 'bg-red-500'}`} >
                      {(category.status) ? 'Active' : 'Inactive'}

                    </button>
                  </td>

                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;
