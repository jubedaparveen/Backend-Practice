import React, { useEffect, useState, CSSProperties  } from "react";
import { RiFacebookFill } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position:'fixed',
  top:'50%',
  left:'50%',
  transform:'translate(-50%, -50%)',
};

function Profile() {
  const nav = useNavigate();

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [show, setShow] = useState(false);
  const [previews, setPreviews] = useState({});
  const [admin, setAdmin] = useState({});
  const [filepath, setFilePath] = useState('');
  const [ifOtp, setIfOtp] = useState(false);
  const [btnText, setBtnText] = useState('Genrate OTP')

  useEffect(() => {
    const cookiedata = JSON.parse(Cookies.get('admin_290_283'));


    setAdmin(cookiedata.data);
    // setFilePath(cookiedata.setFilePath);
  }, []);

  const handlePreview = (e) => {
    const { name, files } = e.target;
    const url = URL.createObjectURL(files[0]);
    setPreviews({ ...previews, [name]: url });
  }

  const handleGenrateOtp = () => {
    setLoading(true);

    axios.post(`${process.env.REACT_APP_API_URL}admin-panel/admin/genrate-otp`, { email: admin.email })
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        setIfOtp(true);

        let counter = 120;

        setBtnText(`Regenrate OTP in ${counter--}s`);

        const interval = setInterval(() => {
          setBtnText(`Regenrate OTP in ${counter--}s`);

          if (counter < 0) {
            clearInterval(interval);
            setIfOtp(false);
            setBtnText('Genrate OTP');
          }
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });


  };

  const handleUpdateEmail = ()=>{
    axios.put(`${process.env.REACT_APP_API_URL}admin-panel/admin/update-email`, { 
      email: admin.email,
      newemail: admin.newemail,
      otp: admin.otp
    })
    .then((response)=>{
      console.log(response.data);
      Cookies.remove('admin_290_283');
      nav('/');
    })
    .catch((error)=>{
      console.log(error);
    })
  }


  return (
    <div>
      <div className="w-[90%] mx-auto mt-[140px] mb-[20px] bg-white border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Profile
        </span>
        <div className="w-full grid grid-cols-[2fr_2fr]">
          <div className="p-[10px]">
            <form >
              <div className="flex flex-col justify-center p-[10px] box-border items-center gap-[10px] h-[400px]">
                <div className="border border-slate-300 w-[150px] h-[150px] rounded-[50%] object-contain">
                  <img
                    src={previews.thumbnail || filepath + admin.thumbnail || "/profile.jpg"}
                    alt="profile img"
                    className="w-full h-full rounded-[50%]"
                  />
                </div>
                <span className="block text-center">Profile Image</span>
                <input
                  type="file"
                  name="thumbnail"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlePreview}
                />
              </div>
              <div className="w-full ">
                <span className="block m-[15px_0]">Name</span>
                <input
                  type="text"
                  value={admin.name}
                  name="name"
                  onChange={(e) => { setAdmin({ ...admin, name: e.target.value }) }}
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
              </div>
              <div className="w-full ">
                <span className="block m-[15px_0]">Social Link</span>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <RiFacebookFill />
                  </span>
                  <input
                    type="text"
                    value={admin.facebook}
                    name="facebook"
                    onChange={(e) => { setAdmin({ ...admin, facebook: e.target.value }) }}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <CiInstagram />
                  </span>
                  <input
                    type="text"
                    value={admin.instagram}
                    name="instagram"
                    onChange={(e) => { setAdmin({ ...admin, instagram: e.target.value }) }}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaYoutube />
                  </span>
                  <input
                    type="text"
                    value={admin.youtube}
                    name="youtube"
                    onChange={(e) => { setAdmin({ ...admin, youtube: e.target.value }) }}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaXTwitter />
                  </span>
                  <input
                    type="text"
                    value={admin.twitter}
                    name="twitter"
                    onChange={(e) => { setAdmin({ ...admin, twitter: e.target.value }) }}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img src={previews.logo || filepath + admin.logo} alt="Logo" className="w-full h-full" />
                </div>
                <input
                  type="file"
                  name="logo"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlePreview}
                />
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Fav Icon</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    src={previews.favicon || filepath + admin.favicon}
                    alt="Logo"
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="favicon"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlePreview}
                />
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Footer Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    src={previews.footer_logo || filepath + admin.footer_logo}
                    alt="Logo"
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="footer_logo"
                  className="input border w-full m-[10px_0] category"
                  onChange={handlePreview}
                />
              </div>
              <div className="w-full my-[20px] relative ">
                <span className="block m-[15px_0]">Password</span>
                <input
                  type={show === false ? "password" : "text"}
                  value={admin.password}
                  name="password"
                  onChange={(e) => { setAdmin({ ...admin, password: e.target.value }) }}
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]"
                >
                  {show === false ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <button type="submit" className="w-[150px] h-[40px] rounded-md text-white bg-[#5351c9] my-[30px]">
                Update
              </button>
            </form>
          </div>

        </div>
      </div>
      <div className="mb-[80px] w-[90%] mx-auto border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Update Email
        </span>
        <div className="w-full p-[30px]">
        <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
          <form method="post">
            <div className="w-full mb-[10px]">
              <span className="block m-[15px_0]">Current Email</span>
              <input
                type="email"
                value={admin.email}
                name="email"
                readOnly
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
            </div>
            <div className={`w-full mb-[10px] ${(!ifOtp) ? 'hidden' : 'block'} `}>
              <span className="block m-[15px_0]">OTP</span>
              <input
                type="text"
                placeholder="Enter OTP"
                name='otp'
                onChange={(e)=>{setAdmin({...admin, otp: e.target.value})}}
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
              <input
                type="text"
                placeholder="Enter new email"
                name='newemail'
                onChange={(e)=>{setAdmin({...admin, newemail: e.target.value})}}
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
            </div>
            <button
              type="button"
              disabled={ifOtp}
              onClick={handleGenrateOtp}
              className={`px-2 bg-[#5351c9] h-[40px] rounded-md text-white  my-[30px]`}>
              {btnText}
            </button>

            <button

              type="button"
              onClick={handleUpdateEmail}
              className={`px-3 ${(!ifOtp) ? 'hidden' : 'block'}  h-[40px] rounded-md text-white bg-[#5351c9]  my-[30px]`}>
              Update Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
