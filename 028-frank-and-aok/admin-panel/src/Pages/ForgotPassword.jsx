import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { IoKey } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";


function ForgotPassword() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [admin, setAdmin] = useState({});
  const [ifOtpGenrate, setIfOtpGenrate] = useState(false);
  const [otpBtuText, setOtpBtuText] = useState('Genrate OTP')

  // useEffect(() => {
  //   const cookiedata = JSON.parse(Cookies.get('admin_1283'));
  //   setAdmin(cookiedata.data);
  // }, []);


  const handleGenrateOtp = () =>{

    axios.post(`${process.env.REACT_APP_API_URL}admin-panel/forget-Password/forget-password-genrate-otp`, { email: admin.email })
      .then((response) => {
        //     setLoading(false);
        console.log(response.data);
        setIfOtpGenrate(true);

        let counter = 120;

        setOtpBtuText(`Regenrate OTP in ${counter--}s`);

        const interval = setInterval(() => {
          setOtpBtuText(`Regenrate OTP in ${counter--}s`);

          if (counter < 0) {
            clearInterval(interval);
            setIfOtpGenrate(false);
            setOtpBtuText('Genrate OTP');
          }
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });

  };
  
  return (
    <div className="mx-auto my-[100px] bg-white rounded-[10px] w-[40%] px-8 py-6 border">
      <h1 className="text-[#303640] font-semibold text-[30px] uppercase  ">  Forgot Password </h1>
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
            value={admin.email}/>
        </div>
        <div className="w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border relative">
          <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
            <CiLock />
          </span>
          <input
            name="newpassword"
            id="new_password"
            placeholder="New password"
            className="p-[10px] border-l input rounded-[0_5px_5px_0]" 
            type={show1 === false ? "password" : "text"}
            onChange={(e) => { setAdmin({ ...admin, newpassword: e.target.value }) }}
            />
          <span
            className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]"
            onClick={() => setShow1(!show1)}>
            {show1 === false ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <div className="w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border relative">
          <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
            <CiLock />
          </span>
          <input
            name="confirmpassword"
            id="confirm_password"
            placeholder="Confirm password"
            className="p-[10px] border-l input rounded-[0_5px_5px_0]" 
            type={show === false ? "password" : "text"}
            onChange={(e) => { setAdmin({ ...admin, confirmpassword: e.target.value }) }}
            />
          <span
            className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]"
            onClick={() => setShow(!show)}>

            {show === false ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <div className="w-full my-[10px] grid grid-cols-[40px_auto] rounded-[5px] border">
          <span className="bg-[#f8f8f9] text-[#303640cd] text-[25px] p-[10px_6px] rounded-[5px_0_0_5px]">
            <IoKey />
          </span>
          <input
            name="otp"
            id="otp"
            type="number"
            onChange={(e) => { setAdmin({ ...admin, otp: e.target.value }) }}
            placeholder="OTP"
            min={0}
            className="p-[10px] border-l input rounded-[0_5px_5px_0] number" />
        </div>

        <div className="w-full my-[30px] flex justify-between items-center">
          {(ifOtpGenrate) ?
            <Link to={"/dashboard"}>
              <button
                type="submit"
                className={`${(ifOtpGenrate) ? 'block' : 'hidden'} px-8 bg-slate-600 uppercase font-semibold text-white py-2 rounded-[5px]`}>
                Next
              </button>
            </Link>
            :
            <button
              type="button"
              className="px-5 bg-slate-600 uppercase font-semibold text-white md:text-sm md:px-3  py-2 rounded-[5px]"
              // disabled={ifOtpGenrate} 
              onClick={handleGenrateOtp}>
              {otpBtuText}
            </button>
          }
          <Link to={"/"}>
            <button
              type="button"
              className="px-8 bg-slate-600 uppercase font-semibold text-white py-2 rounded-[5px]">
              Back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
