import React, { useEffect, useState } from "react";
import { RiFacebookFill } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function Profile() {
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({});
  const [admin, setAdmin] = useState({});
  const [filepath, setFilePath] = useState('');
  const [ifOtpGenrate, setIfOtpGenrate] = useState(false);
  const [otpBtuText, setOtpBtuText] = useState('Genrate OTP')

  useEffect(() => {
    const cookiedata = JSON.parse(Cookies.get('admin_1283'));

    setAdmin(cookiedata.data);
  }, []);

  const handleimagePreview = (e) => {
    const { name, files } = e.target;
    const imageUrl = URL.createObjectURL(files[0]);
    setImagePreviews({ ...imagePreviews, [name]: imageUrl });
  }

  const handleGenrateOtp = () => {
    // setLoading(true);

    axios.post(`${process.env.REACT_APP_API_URL}admin-panel/admin-login/genrate-otp`, { email: admin.email })
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

  const handleUpdateEmail = () => {
    axios.put(`${process.env.REACT_APP_API_URL}admin-panel/admin-login/update-email-verify-otp`, {
      email: admin.email,
      newemail: admin.newemail,
      otp: admin.otp
    })
      .then((response) => {
        console.log(response.data);


        let timerInterval;
        Swal.fire({
          title: "Email Updated Successfully!",
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
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            // console.log("I was closed by the timer");
            Cookies.remove('admin_290_283');
            Navigate('/');
          }
        });



      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="bg-white">
      <div className="w-[90%] mx-auto mt-[140px] mb-16 bg-slate-100 border border-slate-300 rounded-[10px] ">

        <span className="block text-white bg-slate-600 rounded-[10px_10px_0_0] px-7 py-3 box-border font-bold text-[25px] border-b uppercase">
          Profile
        </span>

        <div className="w-full py-[30px]">
          <div className="px-8 ">

            <form method="post" className="flex flex-row gap-4">

              <div className="basis-1/2">
                <div className="w-full ">
                  <span className="block m-[15px_0]">Name</span>
                  <input
                    type="text"
                    name="name"
                    className="w-full border h-[35px] rounded-[5px] p-2 input" />
                </div>

                <div className="w-full ">

                  <span className="block m-[15px_0]">Social Link</span>

                  <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                    <span className="w-full h-full text-[20px] p-[8px] ">
                      <RiFacebookFill />
                    </span>
                    <input
                      type="text"
                      name="facebook"
                      className="w-full border h-[35px] rounded-[5px] ms-3 p-2 input" />
                  </div>

                  <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                    <span className="w-full h-full text-[20px] p-[8px]"> <CiInstagram /> </span>
                    <input
                      type="text"
                      name="instagram"
                      className="ms-3 w-full border h-[35px] rounded-[5px] p-2 input" />
                  </div>

                  <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                    <span className="w-full h-full text-[20px] p-[8px]">
                      <FaYoutube />
                    </span>
                    <input
                      type="text"
                      name="youtube"
                      className="ms-3 w-full border h-[35px] rounded-[5px] p-2 input" />
                  </div>

                  <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                    <span className="w-full h-full text-[20px] p-[8px]">
                      <FaXTwitter />
                    </span>
                    <input
                      type="text"
                      name="twitter"
                      className="ms-3 w-full border h-[35px] rounded-[5px] p-2 input" />
                  </div>

                </div>

                <div className="w-full my-[20px]">
                  <span className="block m-[15px_0]">Logo</span>
                  <div className="w-[50px] h-[50px] object-fill">
                    <img src={imagePreviews.logo || filepath + admin.logo}
                      alt="Logo" className="w-full h-full" />
                  </div>
                  <input
                    type="file"
                    name="logo"
                    className="input border w-full m-[10px_0] category" onChange={handleimagePreview} />
                </div>

                <div className="w-full my-[20px]">
                  <span className="block m-[15px_0]">Fav Icon</span>
                  <div className="w-[50px] h-[50px] object-fill">
                    <img
                      src={imagePreviews.favicon || filepath + admin.favicon}
                      alt="Logo"
                      className="w-full h-full" />
                  </div>
                  <input
                    type="file"
                    name="favicon"
                    className="input border w-full m-[10px_0] category" onChange={handleimagePreview} />
                </div>

                <div className="w-full my-[20px]">
                  <span className="block m-[15px_0]">Footer Logo</span>
                  <div className="w-[50px] h-[50px] object-fill">
                    <img
                      src={imagePreviews.footer_logo || filepath + admin.footer_logo}
                      alt="Logo"
                      className="w-full h-full" />
                  </div>
                  <input
                    type="file"
                    name="footer_logo"
                    className="input border w-full m-[10px_0] category" onChange={handleimagePreview} />
                </div>

                <div className="w-full my-[20px] relative ">
                  <span className="block m-[15px_0]">Password</span>
                  <input
                    type={show === false ? "password" : "text"}
                    name="password"
                    className="w-full border h-[35px] rounded-[5px] p-2 input" />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]">
                    {show === false ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <button type="submit" className="w-[150px] h-[40px] rounded-md text-white bg-slate-600 my-[30px]">
                  Update
                </button>
              </div>

              <div className="basis-1/2 justify-center text-center">
                <div className=" flex flex-col justify-center p-[10px] box-border items-center gap-[10px] h-[400px]">
                  <div className="border border-slate-300 w-[200px] h-[200px] rounded-[50%] object-contain">
                    <img
                      src="/bgimg.jpg"
                      alt="profile img"
                      className="w-full h-full rounded-[50%]" />
                  </div>
                  <div className="w-full ps-8 text-center">
                    <span className="my-4 text-lg font-semibold block text-center">Profile Image</span>
                    <div className="w-[50px] h-[50px] object-fill">
                      <img
                        src={imagePreviews.thumbnail || filepath + admin.thumbnail}
                        alt="Logo"
                        className="w-full h-full" />
                    </div>
                    <input
                      type="file"
                      name="thumbnail"
                      onChange={handleimagePreview}
                      className="input border w-full m-[10px_0] category" />
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>

      <div className="mb-[80px] w-[90%] mx-auto border border-slate-300 bg-slate-100 rounded-[10px] mt-8 ">
        <span className="block text-white bg-slate-600 rounded-[10px_10px_0_0]  p-4 box-border font-bold text-[25px] border-b uppercase">
          Update Email
        </span>

        <div className="w-full p-[30px]">
          <form method="post">

            <div className="w-full mb-[10px]">
              <span className="block m-[15px_0]">Current Email</span>
              <input
                type="email"
                value={admin.email}
                className="w-full border rounded-[5px] p-2 input" />
            </div>

            <div className={`w-full mb-[10px] ${(ifOtpGenrate) ? 'block' : 'hidden'}`}>
              <span className="block m-[15px_0]">OTP</span>
              <input
                type="text"
                placeholder="Enter OTP"
                name='otp'
                onChange={(e) => { setAdmin({ ...admin, otp: e.target.value }) }}
                className="w-full border mb-4 rounded-[5px] p-2 input" />
                
              <input
                type="text"
                placeholder="Enter new email"
                name='newemail'
                onChange={(e) => { setAdmin({ ...admin, newemail: e.target.value }) }}
                className="w-full border rounded-[5px] p-2 input" />
            </div>

            <button
              disabled={ifOtpGenrate}
              onClick={handleGenrateOtp}
              type="button"
              className={`px-4 py-2 rounded-md text-white bg-slate-600 my-8`}>
              {otpBtuText}
            </button>

            <button
              type="button"
              onClick={handleUpdateEmail}
              className={`${(ifOtpGenrate) ? 'block' : 'hidden'} px-4 py-2 rounded-md text-white bg-slate-600  `}>
              Update Email
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
