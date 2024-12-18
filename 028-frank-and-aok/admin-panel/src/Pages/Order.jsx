import React, { useState } from "react";

const Order = () => {
  let [showDesc1, setShowDesc1] = useState(false);
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="block bg-[#f8f8f9] text-[#303640] text-[20px] font-bold p-[8px_16px] rounded-[10px_10px_0_0] border-b">
        Orders
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th>
                <button className="bg-slate-600 cursor-pointer text-white px-3 py-1 rounded-full mr-[5px] font-[400]"> Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAll"
                  className="input accent-[#5351c9] cursor-pointer ms-2"
                />
              </th>
              <th className="uppercase text-sm">Sno</th>
              <th className="uppercase text-sm">Order Name</th>
              <th className="uppercase text-sm">Product Id</th>
              <th className="uppercase text-sm">Image</th>
              <th className="uppercase text-sm">Description</th>
              <th className="uppercase text-sm">Quantity</th>
              <th className="uppercase text-sm">Price</th>
              <th className="uppercase text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAll"
                  className="input accent-[#5351c9] cursor-pointer"
                />
              </td>
              <td>1</td>
              <td>Mens' wear</td>
              <td>12345</td>
              <td className="p-2 object contain">
                <img
                  src="/CollarPocketsT-shirt1.webp"
                  alt="t-shirt img"
                  width={80}
                  height={80}
                  className="rounded-[5px]"
                />
              </td>
              <td className="p-2 tracking-tighter w-[200px]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum,
                itaque.{" "}
                <span
                  className={
                    showDesc1 === false ? "font-bold cursor-pointer" : "hidden"
                  }
                  onClick={() => setShowDesc1(!showDesc1)}
                >
                  ...Read
                </span>
                {showDesc1 === false ? (
                  ""
                ) : (
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur laborum veritatis distinctio, eius veniam sequi
                    facere dicta dolorum cum error a pariatur, repellat ex
                    rerum! Distinctio obcaecati error facilis nobis!
                  </span>
                )}
              </td>
              <td>1</td>
              <td>&#8377; 1550 </td>
              <td>Processing...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
