import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import { signup, signin } from '../../features/auth/authSlice'
import '../login/Login.scss'
const Login = () => {
  const dispatch = useDispatch();
  const [signIn, setSignIn] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
})
const onchange = (e) =>{
    setFormData((prevState) => ({
        ...prevState,[e.target.name]: e.target.value
    }))   
}
const {email, password} = formData;
  const handleSignIn = () => {

    dispatch(signin({
        email, 
        password, 
    }))
    setFormData({
        email: "",
        password: "",
    })
    navigate('/')
  }
  
  return (
    <div className='login__container'>
        <div className='nav__container'>    
            <img className='nav__logo'  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158" alt="" />
            <Link to={'/signup'}>
            <p className='signup__btn'>sign up</p>
            </Link>
        </div>
        { !signIn ? <div className='getstarted__container'>
            <h1>Unlimited films, TV programmes and more</h1>
            <h3>Watch anywhere. Cancel at any time</h3>
            <p>Ready to watch? Enter your email to create or restart your membership</p>
            <form action="">
                <input type="text" placeholder='Email Address'  />
                <button onClick={() => {
                    setSignIn(true)               
                }} className='getstarted__btn'>get started</button>
            </form>
        </div> : 
            <div className='signin__container'>
                <h1 className='title'>Sign In</h1>
                <form action="">
                    <input onChange={onchange} value={email} name='email' type="emal" placeholder='e-mail address'  />
                    <input onChange={onchange} value={password} name='password' type="password" placeholder='password'  />
                    <p onClick={() => {
                        setSignIn(false)
                        handleSignIn() }} className='signin__btn'>sign in</p>
                </form>
                <p style={{ color: 'gray', fontSize: 13, fontWeight: 500}}>New to Netflix? <span onClick={()=> navigate('/signup')} style={{ cursor: 'pointer', marginLeft: 5, color: 'white', fontSize: 13, fontWeight: 500,}}>Sign up now</span></p>
            </div>}

    </div>
  )
}

export default Login