import React, { useEffect, useState } from 'react'
import '../navbar/Navbar.scss'
import {FiSearch} from 'react-icons/fi'
import {IoIosNotifications} from 'react-icons/io'
import {IoMdArrowDropdown} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import netflix from '../../assets/Netflix.png'
import profile from '../../assets/profile.png'
const Navbar = () => {
  const [scroll, setScroll] = useState(0);
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  window.onscroll = () => {
    setScroll(window.pageYOffset === 0 ? false : true )
    
  }

  
  return (
    <nav className={`${scroll ? 'nav__container scroll' : 'nav__container'} `}>
      
      <div className="nav__container__left">
      <div >
        <img className='nav__logo'  src={netflix} alt="" />
      </div>
      <ul className='nav__links'>
         <Link to={'/'}>
          <li className='nav__link'>home</li>
         </Link>
         <Link to={'/tv'}>
          <li className='nav__link'>Series</li>
         </Link>
         <Link to={'/movie'}>
          <li className='nav__link'>movies</li>
         </Link>
         <Link to={'/mylist'}>
          <li className='nav__link'>MyList</li>
         </Link>
      </ul>

      </div>
      <div className="nav__container__right">
        {/* <FiSearch fontSize={24} />
        <p>Kid</p>
        <IoIosNotifications fontSize={24} /> */}
        <img onClick={()=> {dispatch(logout())
        navigate('/login')}} className='nav__profileicon'  src={user?.profilePic ? user.profilePic : profile} alt="" />
        {/* <div className='more__options'>
          <IoMdArrowDropdown fontSize={24} />
          <div className='options'>
            <span>settings</span>
            <span>logout</span>
          </div>
        </div> */}
      </div>
    </nav>
  )
}

export default Navbar