import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function App() {
  const [show, setShow] = useState(false);
  const Navigation = useNavigate();

  useEffect(() => {
    const cookiedata = Cookies.get('admin_1283');
    if (cookiedata) Navigation('/dashboard');
  }, []);

  const hahdleLogin = (e) => {

    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}admin-panel/admin-login/login`, e.target)
      .then((response) => {
        console.log(response.data);

        Cookies.set('admin_1283', JSON.stringify(response.data));

        Navigation('/dashboard');

      })
      .catch((error) => {
        if (error.status === 401) {
          Swal.fire({
            title: "Invalid credentials?",
            text: 'Email or password in incorrect',
            icon: "question"
          });
        }
        console.log(error);
      })
  };


  return (
    <div className="mx-auto my-[100px] bg-white rounded-[10px] w-[40%] h-[400px] p-[20px] border border-slate-300 shadow-lg">

      <h1 className="text-[#303640] uppercase tracking-widest font-semibold text-[40px] mt-[30px] p-[0_10px]">
        Login
      </h1>

      <h3 className="text-[#303640c2] text-[14px] p-[0_10px] mb-[30px]">
        Sign-in to your account
      </h3>

      <form method="post" onSubmit={hahdleLogin}>

        <div className="w-full  grid grid-cols-[20%_auto] my-[10px]">
          <label htmlFor="name" className="py-[8px] px-[10px] text-[#303640]">
            User Name
          </label>
          <input
            name="email"
            id="name"
            type="text"
            placeholder="Enter your email"
            className="w-full p-[10px] rounded-[5px] border input" />
        </div>

        <div className="w-full  grid grid-cols-[20%_auto] my-[10px] relative">
          <label htmlFor="password" className="w-full py-[8px] px-[10px] text-[#303640]">
            Password
          </label>
          <input
            type={show === false ? "password" : "text"}
            name="password"
            placeholder="Enter your Password"
            className="w-full border h-[35px] rounded-[5px] p-2 input" />
              <span
                className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]"
                onClick={() => setShow(!show)}>
                
                {show === false ? <FaEye /> : <FaEyeSlash />}
              </span>
          
        </div>



        <div className="w-full my-[50px] flex justify-between items-center">
          {/* <Link to='/dashboard'> */}
          <button
            type="submit"
            className="bg-slate-600 text-white 
            px-6 py-1 rounded-md text-xl font-bold uppercas tracking-[.1rem] uppercase">
            Login
          </button>

          <Link to="/reset-password">
            <span className="text-slate-500 uppercase mr-[50px] text-sm tracking-widest">Forgot password?</span>
          </Link>

        </div>
      </form>
    </div>
  );
}

export default App;
