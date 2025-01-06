import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const StoryDetails = () => {
  const Navigation = useNavigate();
  const [imagePreview, setImagePreview] = useState({});

  const handlestory = (e)=>{
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}admin-panel/story/create-story`, e.target)
      .then((Response) => {
        console.log(Response.data);

        let timerInterval;
        Swal.fire({
          title: "Story Added Successfully!",
          html: "You're Redirecting to View Page in <b></b> milliseconds.",
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
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            // console.log("I was closed by the timer");
            Navigation('/dashboard/stories/view-story');
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImagePreview = (e) =>{
    const { name, files } = e.target;
    console.log('thumbnail', e.target)
    const imagesPre = URL.createObjectURL(files[0]);
    console.log(imagesPre);
    setImagePreview({ ...imagePreview, [name]: imagesPre });
  }

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-slate-600 uppercase text-white border-b rounded-[10px_10px_0_0] p-[8px_16px] text-[20px] font-bold">
        Our Stories
      </span>
      <div className="w-[90%] mx-auto">
        <form method="post" onSubmit={handlestory}>
          <div className="w-full my-[10px] ">
            <label htmlFor="story_name" className="block text-[#303640]">
              Story Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Story Name"
              className="w-full input p-2 border my-[10px] rounded-[5px]"/>
          </div>

          <div className="w-full my-[10px] ">
            <label htmlFor="story_img" className="block text-[#303640]">
               Image
            </label>
            <input
              onChange={handleImagePreview}
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="w-full input category border my-[10px] rounded-[5px]"/>
          </div>
          {
              imagePreview.thumbnail && (
                <img src={imagePreview.thumbnail} className="w-40" alt="" />
              )
            }

          <div className="w-full my-[10px]">
            <label htmlFor="story_banner_img" className="block text-[#303640]">
              Banner Image
            </label>
            <input
              onChange={handleImagePreview}
              type="file"
              id="bannerImg"
              name="bannerimg"
              className="w-full input category border my-[10px] rounded-[5px]"/>
          </div>
          {
              imagePreview.bannerimg && (
                <img src={imagePreview.bannerimg} className="w-40" alt="" />
              )
            }

          <div className="w-full my-[10px]">
            <label
              htmlFor="story_desc"
              className="block text-[#303640]">
              Description
            </label>
            <textarea
              type="file"
              id="description"
              name="description"
              placeholder="Description"
              className="w-full input p-2 category border my-[10px] rounded-[5px]"/>
          </div>

          <div className="w-full my-[10px]">
            <label htmlFor="status" className="mr-[20px]">
              Status
            </label>
            <input
              type="radio"
              value={true}
              className="mx-[10px] accent-[#5351c9] cursor-pointer"/>
            <span>Display</span>
            <input
              type="radio"
              value={false}
              className="mx-[10px] accent-[#5351c9] cursor-pointer"/>
            <span>Hide</span>
          </div>

          <div className="w-full my-[30px] ">
            <button className="px-3 py-2 rounded-md bg-slate-600 text-white">
              Add Story
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default StoryDetails;
