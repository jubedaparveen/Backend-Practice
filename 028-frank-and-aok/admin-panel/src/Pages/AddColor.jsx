import axios from "axios";
// import { color } from "chart.js/helpers";
import React from "react";
// import { ColorPicker } from "react-color-palette";
// import ColorPicker from "@rc-component/color-picker";
// import "@rc-component/color-picker/assets/index.css";
import { useColor } from "react-color-palette";
import "react-color-palette/css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function AddColor() {
  const Navigation = useNavigate();

  let [color, setColor] = useColor("#651ecb");

  const setImage = () => {
    let imageFileInput = document.querySelector("#image_src");
    let imagePreview = document.querySelector("#image_preview");
    let colorCode = document.querySelector("#color_code");
    let color_picker = document.querySelector("#color_picker");
    imageFileInput.addEventListener("change", function () {
      const file = this.files[0];
      console.log(file);
      if (!file) return;

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        imagePreview.src = this.result;
      });
      reader.readAsDataURL(file);

      const colorPicker = new window.EyeDropper();
      const colorSelector = document.querySelector("#colorPicker");
      colorSelector.addEventListener("click", () => {
        colorPicker
          .open()
          .then((res) => {
            colorCode.value = res.sRGBHex;
            color_picker.value = res.sRGBHex;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  const handleAddColor = (e) => {
    e.preventDefault();
    

    axios.post(`${process.env.REACT_APP_API_URL}admin-panel/Colors/add-Color`, {
      color: e.target.color.value,
      colorcode: e.target.colorcode.value
    })
      .then((response) => {
        console.log(response.data);

        let timerInterval;
        Swal.fire({
          title: "Color Added Successfully!",
          html: "You're Redirecting to View Color Page in <b></b> milliseconds.",
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
            Navigation('/dashboard/color/view-colors');
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-[90%] bg-white mx-auto rounded-[10px] border my-[150px]">
      <div className=" bg-slate-600 uppercase h-[50px] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[25px] font-[700] text-white">
        Add Colors
      </div>
      <form method="post" onSubmit={handleAddColor}>
        <div className="w-full p-[20px]">

          <div className="w-full p-[8px_16px] my-[10px] ">
            <label htmlFor="color">Color Name</label> <br />
            <input
              type="text"
              name="color"
              id="color"
              className="w-full p-[10px] focus:outline-none border my-[10px] rounded-[5px]"
              placeholder="Color Name" />
          </div>

          <div className="w-full p-[8px_16px] my-[10px] ">
            <label htmlFor="color_code">Color Code</label> <br />
            <input
              type="text"
              name="colorcode"
              id="color_code"
              className="w-full p-[10px] focus:outline-none border my-[10px] rounded-[5px]"
              placeholder="Color Code" />
          </div>

          <div className="w-full p-[8px_16px] my-[10px] ">
            <label htmlFor="color">Color Picker</label> <br />
            <input
              type="color"
              name="color_picker"
              id="color_picker"
              className="focus:outline-none border  rounded-[5px]" />
          </div>

          <div className="w-[300px] p-[8px_16px] my-[10px]">
            <span color={color} onChange={setColor} height={200} />
            <span className="w-full h-[200px] object-contain mt-[10px]">
              <img
                src=""
                alt="Select product"
                id="image_preview"
                width={300}
                height={200} />
            </span>
            <input
              type="file"
              name="image"
              id="image_src"
              className="category w-full border input rounded-[5px]"
              onClick={() => setImage()} />
            <span
              id="colorPicker"
              className="bg-slate-600 text-white cursor-pointer py-2 text-center rounded-[5px] box-border my-[30px] block border">
              Pick Color
            </span>
          </div>

          <div className="w-[300px] p-[8px_16px] my-[10px] ">
            <button className="bg-slate-600 text-white rounded-[5px] px-3 py-2 " >
              Add Color
            </button>
          </div>

        </div>

      </form>

    </div>
  );
}

export default AddColor;
