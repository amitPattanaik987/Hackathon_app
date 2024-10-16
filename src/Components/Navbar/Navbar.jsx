import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import user_img from "../../assets/user.png";
import { loadStripe } from '@stripe/stripe-js';

export default function Navbar() {
  const navigate = useNavigate();
  const [hover, sethover] = useState(false);
  const [login, setlogin] = useState(false);
  const [prime, setprime] = useState(false);

  const homeclicked = () => {

    if (localStorage.getItem("token")) {
      navigate("/home")
    }
    else {
      alert("User Authentication Required");
      location.reload();
    }
  }

  const aboutclicked = () => {
    if (localStorage.getItem("token")) {
      navigate("/about")
    }
    else {
      alert("User Authentication Required");
      location.reload();
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setlogin(true);
    }
    else {
      setlogin(false);
    }
  }, [])


  const loginclicked = () => {
    navigate("/");
  }

  const logoutclicked = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    location.reload();
  }

  const makepayment = async () => {
    const stripe = await loadStripe('pk_test_51Pt1NCGwu7WfDqJU4OlQm0xrOJf6W63Ccg20CjPUZe7xKkISIHmL6RMvneFf3rCl31roSBf1gUJdzgqO4iJIJq9T00KcqVqEXY');

    console.log("stripe funct");

    const body = {
      Amount: 100
    }
    console.log(body);

    const headers = {
      "Content-Type": "application/json"
    }
    const response = await fetch("http://localhost:3000/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) {
      console.log(result.error);

    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/getprime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({email:localStorage.getItem("email")})
    }).then((response)=>response.json()).then((data)=>{
      if(data.success){
        setprime(true);
      }
      else{
        setprime(false);
      }
    })
  }, [])


  return (
    <div className='navbar'>
      <img src={logo} alt="" />
      <ul>
        <li onClick={() => homeclicked()}>HOME</li>
        <li onClick={() => aboutclicked()}>ABOUT</li>
        <li>CONTACT US</li>
      </ul>
      <div className='flex gap-[60px]'>
        {!prime && <button className='text-white rounded-xl px-3 bg-gradient-to-r to-pink-500 from-blue-500' onClick={() => makepayment()}>BE A PRIME-MEMBER</button>}
        <a className="navbar-brand" href="#" onMouseEnter={() => sethover(true)} onMouseLeave={() => sethover(false)}>
          <img src={user_img} alt="Avatar Logo" style={{ width: "40px" }} className="rounded-pill" />
        </a>
        {
          hover && <div className='absolute z-10 right-[90px] top-[50px] bg-slate-300 p-[20px] rounded-lg' onMouseEnter={() => sethover(true)} onMouseLeave={() => sethover(false)}>
            {login ? <p className='m-0 font-bold cursor-pointer' onClick={() => logoutclicked()}>log out</p> : <p className='m-0 font-bold cursor-pointer' onClick={() => loginclicked()}>log in</p>}
          </div>
        }
      </div>
    </div>
  )
}
