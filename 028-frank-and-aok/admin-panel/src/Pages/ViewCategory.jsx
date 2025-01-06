import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import Swal from "sweetalert2";

const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);
  let [show3, setShow3] = useState(false);
  let [show4, setShow4] = useState(false);

  // useState for fatching parent Category
  const [readParentCategory, setReadParentCategory] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [ifAllChecked, setAllChecked] = useState(false);

  const handleFatchParentCategory = () => {
    axios.get(`${process.env.REACT_APP_API_URL}admin-panel/parent-category/read-parent-category`)
      .then((response) => {
        // console.log(response.data);
        setReadParentCategory(response.data.data)
        // console.log(readParentCategory)
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => {
    handleFatchParentCategory();
  }, []);

  const handleUpdateStatus = (e) => {
    // e.tatget.value gives value of target field and e.target.textContent gives text inside the field
    // console.log(e.target.value, e.target.textContent);
    const status = e.target.textContent !== 'Active';
    axios.put(`${process.env.REACT_APP_API_URL}admin-panel/parent-category/status-update-parent-category/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data)

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Status updated",
          showConfirmButton: false,
          timer: 800
        });
        
        handleFatchParentCategory();
      })
      .catch((error) => {
        console.log(error);
      })
    console.log(status)
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
        axios.delete(`${process.env.REACT_APP_API_URL}admin-panel/parent-category/single-delete-parent-category${id}`)
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your Category has been deleted.",
              icon: "success"
            });
            handleFatchParentCategory();
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
      setCheckedCategories(readParentCategory.map((cat) => cat._id));
      setAllChecked(true);
    } else {
      setCheckedCategories([]);
      setAllChecked(false);
    }
  };

  useEffect(() => {
    setAllChecked(readParentCategory.length === checkedCategories.length && readParentCategory.length !== 0);
  }, [checkedCategories, readParentCategory]);

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

        axios.put(`${process.env.REACT_APP_API_URL}admin-panel/parent-category/multi-delete-parent-category`, { checkedCategories })
          .then((response) => {
            handleFatchParentCategory();

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
      <span className="block  bg-slate-600 uppercase text-[20px] text-white p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="">

                <button onClick={handleMultiDeleteCategory}
                  className="bg-slate-600 uppercase rounded-full px-3 py-1 text-white" > Delete
                </button>

                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  className="accent-[#5351c9] mx-3 "
                  onClick={handleAllCheckCategory}
                  checked={ifAllChecked} />
              </th>
              <th className="uppercase">Sno</th>
              <th className="uppercase">Category Name</th>
              <th className="uppercase">Description</th>
              <th className="uppercase">Action</th>
              <th className="uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="status-tooltip" />
            {
              readParentCategory.map((category, index) => (
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
                  <td>{category.name}</td>
                  <td className="w-[200px] flex-wrap p-1">
                    {category.description}
                    <span
                      onClick={() => setShow1(!show1)}
                      className={
                        show1 === true ? "hidden" : "font-bold cursor-pointer"
                      }>
                      ...Read
                    </span>
                    {show1 === false ? (
                      " "
                    ) : (
                      <span>
                        Deserunt nam est delectus itaque sint harum architecto.
                      </span>
                    )}
                  </td>
                  <td>
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer inline"
                      onClick={() => { handleSingleDeleteCategory(category._id) }} />{" "}
                    |{" "}
                    <Link to={`/dashboard/category/update-category/${category._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={handleUpdateStatus}
                      value={category._id}
                      data-tooltip-id="status-tooltip"
                      data-tooltip-content={`Click to ${(category.status) ? ' Inactive' : ' Active'} `}
                      className={`p-[4px_10px] rounded-full text-white 
                      ${(category.status) ? 'bg-green-500' : 'bg-red-500'}`}>
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
