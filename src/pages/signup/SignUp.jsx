import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../features/auth/authSlice';
import '../signup/SignUp.scss'
const SignUp = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    imageUrl: "",
})
const onchange = (e) =>{
    setFormData((prevState) => ({
        ...prevState,[e.target.name]: e.target.value
    }))   
}
const {username, email, password, imageUrl} = formData;
  
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(signup({
        username,
        email, 
        password, 
        imageUrl
    }))
    setFormData({
      username: "",
      email: "",
      password: "",
      imageUrl: ""
     })
    if(user) {
     navigate('/')
     }
  
  }
  return (
    <div className='login__container'>
        <div className='nav__container'>    
            <img className='nav__logo'  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158" alt="" />
            <Link to={'/login'}>
            <p className='signup__btn'>Log In</p>
            </Link>
        </div>
        
            <div className='signin__container'>
                <h1 className='title'>Sign Up</h1>
                <form action="">
                    <input onChange={onchange} value={email} name='email' type="emal" placeholder='e-mail address'  />
                    <input onChange={onchange} value={password} name='password' type="password" placeholder='password'  />
                    <input onChange={onchange} value={username} name='username' type="text" placeholder='username'  />
                    <input onChange={onchange} value={imageUrl} name='imageUrl' type="text" placeholder='Image url'  />
                    <p type='submit' onClick={handleRegister} className='signin__btn'>sign up</p>
                </form>
                <p style={{ color: 'gray', fontSize: 13, fontWeight: 500}}>Already have an account? <span onClick={()=> navigate('/login')} style={{ cursor: 'pointer', marginLeft: 5, color: 'white', fontSize: 13, fontWeight: 500,}}>Log in</span></p>
            </div>

    </div>
  )
}

export default SignUp