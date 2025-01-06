import axios from "axios";
import React, { useEffect, useState } from "react";

const Order = () => {
  const [order, setOrder] = useState([]);
  const [filepath, setFilepath] = useState("");

  const handleFetchOrder = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin-panel/Order/read-order`)
      .then((response) => {
        console.log(response.data);
        setOrder(response.data.data);
        setFilepath(response.data.filepath);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleFetchOrder();
  }, []);


  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="block bg-slate-600 text-white uppercase text-[20px] font-bold p-[8px_16px] rounded-[10px_10px_0_0] border-b">
        Orders
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th>
                <button className="bg-slate-600 cursor-pointer text-white px-3 py-1 rounded-full mr-[5px] font-[400]">
                  {" "}
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAll"
                  className="input accent-[#5351c9] cursor-pointer ms-2"
                />
              </th>
              <th className="uppercase text-sm">Sno</th>
              <th className="uppercase text-sm">User Id</th>
              <th className="uppercase text-sm">Product Id</th>
              <th className="uppercase text-sm">Image</th>
              <th className="uppercase text-sm">Address</th>
              <th className="uppercase text-sm">Date</th>
              <th className="uppercase text-sm">Price</th>
              <th className="uppercase text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order, index) => (
              <tr className="border-b">
                <td>
                  <input
                    type="checkbox"
                    name="deleteAll"
                    id="deleteAll"
                    className="input accent-[#5351c9] cursor-pointer"
                  />
                </td>
                <td>{index + 1}</td>
                <td>{order.user}</td> {/*Product Name not Display  */}
                <td>{}</td>{/*Product Id not Display  */}
                <td className="p-2 object contain">
                  <img
                    src={filepath + order.thumbnail} 
                    alt="t-shirt img" width={80} height={80} className="rounded-[5px]"
                  />{/*Product image not Display  */}
                </td>
                <td className="p-2 tracking-tighter w-[200px]">
                 {}{/*Product Description not Display  */}
                </td>
                <td>{}</td> {/*Date not Display  */}
                <td>&#8377;{order.amount}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
