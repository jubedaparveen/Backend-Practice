"use client"
import { BsArrowLeft } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchCart } from "@/app/redux/slices/cartSlice";
export default function Cart({ cartStatus, setCartStatus }) {

  const [cart, setCart] = useState([]);
  const [filepath, setFilepath] = useState('');
  const [items, setItems] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  const childFunction = () => {
    console.log('child funciton called');
  }

  const cartData = useSelector((state) => state.cart.value);

  useEffect(() => {
    if (cartData.data) setCart(cartData.data);
    if (cartData.filepath) setFilepath(cartData.filepath);

    if (cartData.data) {
      let total = 0;

      cartData.data.forEach(item => {
        total += item.product.price * item.quantity;
      });

      // console.log('proce total', total)

      setItems(cartData.data.length);
      setTotalPrice(total);
    }
  }, [cartData])
  return (
    <>
      <section className={`${cartStatus ? "opacity-100 visible" : "opacity-0 invisible"} duration-500`}>
        <div className="bg-[rgba(0,0,0,0.6)] border border-red-700 fixed top-0 z-[9999999] w-full min-h-screen">
          <div className='lg:w-[38%] w-full  fixed top-0 right-0 z-[999999] bg-white'>
            <div onClick={() => setCartStatus(!cartStatus)} className='py-3 px-6 flex items-center gap-2 bg-[#F9F9F9] cursor-pointer'>
              <BsArrowLeft className='font-bold' />
              <div className='text-sm font-semibold'>Contine Shopping</div>
            </div>
            <div className=' bg-black text-white text-[12px] text-center font-bold py-1.5'>Free shipping on orders $99+ and free returns</div>
            <div className='md:px-8 px-4 pb-[200px] lg:h-screen h-full overflow-y-scroll'>
              {
                cart.map((product, index) => (
                  <CartProducts key={index} product={product} filepath={filepath} />
                ))
              }


            </div>
            <div className="sticky bottom-0 px-8 bg-[#f9f9f9] py-4">
              <div className="flex items-center justify-between">
                <div className="text-[18px] font-semibold">Subtotal <span className="text-[14px] font-semibold text-customGray">({items} items)</span></div>
                <div className="text-[18px] font-semibold">₹ {totalPrice}</div>
              </div>
              <Link href="/checkouts">
                <button className="text-[20px] hover:shadow-[5px_5px_0px_0px_#DDD] font-semibold flex justify-center items-center gap-2 text-white bg-black p-3 w-full mt-5">Secure Checkout <IoLockClosedOutline size={20} /></button>
              </Link>
            </div>
            <div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function CartProducts({filepath, product}) {
  const dispatch = useDispatch();

  const handleDeleteCart = (id)=>{
    axios.delete(`http://localhost:4800/api/website/cart/delete-cart/${id}`)
    .then((response)=>{
      console.log(response.data);
      dispatch(fetchCart(product.user._id));
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  const handleUpdateQuantity = (e)=>{
    console.log(e.target.value, e.target.textContent);

    const quantity = (e.target.textContent === '+') ? product.quantity + 1 : product.quantity - 1;

    axios.put(`http://localhost:4800/api/website/cart/update-cart/${e.target.value}`, {quantity})
    .then((response)=>{
      console.log(response.data);
      dispatch(fetchCart(product.user._id));
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className='grid grid-cols-[25%_auto] gap-3 py-5 border-b border-customBorder'>
      <img className='w-full' src={filepath + product.product.thumbnail} alt="" />
      <div className='flex flex-col justify-between'>
        <div>
          <div className='flex items-center justify-between'>
            <h5 className='text-sm font-semibold'>{product.product.name}</h5>
            <MdClose onClick={()=>{handleDeleteCart(product._id)}} size={20} />
          </div>
          <div className='font-semibold text-[12px] text-customGray'>Size: {product.size.name}</div>
          <div className='text-[12px] mt-1.5 text-customGray font-medium flex items-center gap-1 underline underline-offset-2'>Move to Wishlist <CiHeart size={16} /></div>
        </div>
        <div className='flex items-center justify-between'>
          <div className=''>
            <button disabled={product.quantity <= 1} className='px-2.5 py-0.5 text--[20px] border border-customBorder' value={product._id} onClick={handleUpdateQuantity}>-</button>
            <button className='px-2.5 py-0.5 border border-customBorder'>{product.quantity}</button>
            <button className='px-2.5 py-0.5 text--[20px] border border-customBorder'  value={product._id} onClick={handleUpdateQuantity}>+</button>
          </div>
          <div className='text-[15px] font-semibold'>
            <span>{product.product.price} x </span>
            <span>{product.quantity } = </span>
            <span>₹ {product.product.price * product.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
