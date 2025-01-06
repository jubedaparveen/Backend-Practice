import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { CiLock } from "react-icons/ci";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const ResetPassword = () => {

    const Navigate = useNavigate();
    const {_id} = useParams();
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [admin, setAdmin] = useState({});
    

    const handleUpdatePassword = () => {
      console.log(admin);
      // return;
      if(admin.confirmpassword != admin.newpassword) return alert('password and confirm password not matched');
        axios
          .put(
            `${process.env.REACT_APP_API_URL}admin-panel/forget-Password/password-update`,
            {
              _id,
              newpassword: admin.newpassword,
              otp: admin.otp,
            }
          )
          .then((response) => {
            console.log(response.data);
            
            
            let timerInterval;
            Swal.fire({
              title: "Password Updated Successfully!",
              html: "Redirected to Home Page in <b></b> milliseconds.",
              timer: 800,
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
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                // console.log("I was closed by the timer");
                // Cookies.remove("admin_290_283");
                Navigate("/");
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <div className="mx-auto my-[100px] bg-white rounded-[10px] w-[40%] px-8 py-6 border">
          <h1 className="text-[#303640] font-semibold text-[30px] uppercase  ">
            Reset Password
          </h1>
    
          <form method="post">
            
            <div className={`  w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border relative`}>
              <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
                <CiLock />
              </span>
              <input
                name="newpassword"
                id="new_password"
                placeholder="New password"
                className="p-[10px] border-l input rounded-[0_5px_5px_0]"
                type={show1 === false ? "password" : "text"}
                onChange={(e) => {
                  setAdmin({ ...admin, newpassword: e.target.value });
                }}
              />
              <span
                className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]"
                onClick={() => setShow1(!show1)}
              >
                {show1 === false ? <FaEye /> : <FaEyeSlash />}
              </span> 
            </div>
    
            <div className={` w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border relative`}>
              <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
                <CiLock />
              </span>
              <input
                name="confirmpassword"
                id="confirm_password"
                placeholder="Confirm password"
                className="p-[10px] border-l input rounded-[0_5px_5px_0]"
                type={show === false ? "password" : "text"}
                
                onChange={(e) => {
                  setAdmin({ ...admin, confirmpassword: e.target.value });
                }}
              />
              <span
                className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]"
                onClick={() => setShow(!show)}
              >
                {show === false ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
    
           
    
            <div className="w-full my-[30px] flex justify-between items-center">
              
                {/* <Link to={"/ResetPassword"}> */}
                  <button
                    onClick={handleUpdatePassword}
                    type="button"
                    className={` px-8 bg-slate-600 uppercase font-semibold text-white py-2 rounded-[5px]`}
                  >
                    Update Password
                  </button>
                {/* </Link> */}
             
              <Link to={"/"}>
                <button
                  type="button"
                  className="px-8 bg-slate-600 uppercase font-semibold text-white py-2 rounded-[5px]"
                >
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
  )
}

export default ResetPassword;
