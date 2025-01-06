import axios from "axios";
import React, {  useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewStory = () => {
  const [story, setstory] = useState([]);
  const [filepath, setFilepath] = useState('');

  const FatchStoryData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}admin-panel/story/read-story`)
      .then((response) => {
        console.log(response.data.data);
        setstory(response.data.data);
        setFilepath(response.data.filepath);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => { FatchStoryData(); }, []);

  


  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block p-[8px_16px] text-[20px] text-white font-bold bg-slate-600 uppercase border-b rounded-[10px_10px_0_0]">
        View Stories
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b px-2 py-1">
              <th> <button className="bg-slate-600 uppercase text-sm rounded-full px-3 py-1 text-white me-2"> Delete </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAll"
                  className="accent-[#5351c9] cursor-pointer input"
                />
              </th>
              <th className="uppercase text-sm">Sno</th>
              <th className="uppercase text-sm">Story Name</th>
              <th className="uppercase text-sm">Image</th>
              <th className="uppercase text-sm">Banner</th>
              <th className="uppercase text-sm">Description</th>
              <th className="uppercase text-sm">Action</th>
              <th className="uppercase text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              story.map((story, index) =>(
                <tr className="border-b" key={index}>
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete"
                      className="accent-[#5351c9] cursor-pointer input"/>
                  </td>
                  <td>{index + 1}</td>
                  <td>{story.name}</td>
                  <td className="object-contain p-1">
                    <img
                      src={filepath + story.thumbnail}
                      alt="story img"
                      width={80}
                      height={80}
                      className="rounded-[5px]"/>
                  </td>
                  <td className="p-1 object-contain">
                    <img
                      src={filepath + story.bannerimg}
                      alt="story img"
                      width={150}
                      height={150}
                      className="rounded-[5px]"/>
                  </td>
                  <td className="w-[200px] p-2 text-justify tracking-tighter">
                    {story.description}
                  </td>
                  <td>
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to="/dashboard/stories/update-stories">
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>Display</td>
                </tr>
              ))
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStory;
