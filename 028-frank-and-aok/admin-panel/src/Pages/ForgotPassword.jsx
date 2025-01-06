import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { IoKey } from "react-icons/io5";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
// import Cookies from "js-cookie";

function ForgotPassword() {
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [admin, setAdmin] = useState({});
  const [otp, setOtp] = useState({});
  const [ifOtpGenrate, setIfOtpGenrate] = useState(false);
  const [otpBtuText, setOtpBtuText] = useState("Genrate OTP");

  const handleGenrateOtp = () => {
    // return console.log(admin);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}admin-panel/forget-Password/forget-password-genrate-otp`,
        { email: admin.email }
      )
      .then((response) => {
        console.log(response.data);
        setIfOtpGenrate(true);

        let counter = 120;

        setOtpBtuText(`Regenrate OTP in ${counter--}s`);

        const interval = setInterval(() => {
          setOtpBtuText(`Regenrate OTP in ${counter--}s`);

          if (counter < 0) {
            clearInterval(interval);
            setIfOtpGenrate(false);
            setOtpBtuText("Genrate OTP");
          }
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleVerifyOtp = () =>{
    axios
    .post(
      `${process.env.REACT_APP_API_URL}admin-panel/forget-Password/verify-otp`,
      {
        email: admin.email,
        otp: admin.otp,
      }
    )
    .then((response) => {
      console.log(response.data);

      let timerInterval;
      Swal.fire({
        title: "OTP Verify Successfully!",
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
          Navigate(`/resetpassword/${response.data._id}`);
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
        Forgot Password
      </h1>

      <form method="post">
        <div className="w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border">
          <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
            <HiOutlineMail />
          </span>
          <input
            name="email"
            id="name"
            type="email"
            placeholder="Email"
            className="p-[10px] border-l input rounded-[0_5px_5px_0]"
            value={admin.email}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
          />
        </div>
        
        {/* <div className={` ${(admin !== otp) ? 'block' : 'hidden'} w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border relative`}>
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
        </div> */}

        {/* <div className={`${(ifOtpGenrate) ? 'block' : 'hidden'} w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border relative`}>
          <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
            <CiLock />
          </span>
          <input
            name="confirmpassword"
            id="confirm_password"
            placeholder="Confirm password"
            className="p-[10px] border-l input rounded-[0_5px_5px_0]"
            type={show === false ? "password" : "text"}
            onChange={(e)=>{}}
            // onChange={(e) => {(admin.password === newpassword) ? setAdmin({...admin, newpassword: e.target.value }) : 'Password Not Matched'
            //   ;
            // }}
          />
          <span
            className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]"
            onClick={() => setShow(!show)}
          >
            {show === false ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div> */}

        <div className={` ${(ifOtpGenrate) ? 'block' : 'hidden'} w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border`}>
          <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
            <IoKey />
          </span>
          <input
            name="otp"
            id="otp"
            type="number"
            onChange={(e) => {
              setAdmin({ ...admin, otp: e.target.value });
            }}
            placeholder="OTP"
            min={0}
            className="p-[10px] border-l input rounded-[0_5px_5px_0] number"
          />
        </div>

        <div className="w-full my-[30px] flex justify-between items-center">
          {ifOtpGenrate ? (
            <Link to={"/ResetPassword"}>
              <button
                onClick={handleVerifyOtp}
                type="button"
                className={`${
                  ifOtpGenrate ? "block" : "hidden"
                } px-8 bg-slate-600 uppercase font-semibold text-white py-2 rounded-[5px]`}
              >
                Verify OTP
              </button>
            </Link>
          ) : (
            <button
              type="button"
              className="px-5 bg-slate-600 uppercase font-semibold text-white md:text-sm md:px-3  py-2 rounded-[5px]"
              disabled={ifOtpGenrate}
              onClick={handleGenrateOtp}
            >
              {otpBtuText}
            </button>
          )}
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
  );
}

export default ForgotPassword;
