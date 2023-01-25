import React, { useEffect, useState } from 'react'
import '../navbar/Navbar.scss'
import {FiSearch} from 'react-icons/fi'
import {IoIosNotifications} from 'react-icons/io'
import {IoMdArrowDropdown} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { Link, Navigate, useNavigate } from 'react-router-dom'
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
        <img className='nav__logo'  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158" alt="" />
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
        navigate('/login')}} className='nav__profileicon'  src={user?.profilePic ? user.profilePic : 
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACHCAMAAAALObo4AAAAYFBMVEUNfoD///8Ae30AdngAcnT5/Pzx9/cAbW+Htrfq8/Nfn6DI3d4Aam3e6+u21NXV4+MpiIpypaaEsLFqoaI9jpCuz9CUwMFRmJq+2Nl1ra6nyss0h4hGjpBmp6iPurunw8MaAKz9AAACNklEQVR4nO3Z6ZLqIBAFYNKdkAVNUMnqMu//loPjlqgVoWTudarO98typD0sJoERAgAAAAAAAAAA4MOQ9d8LEutVti4EB0vBYpNlG8FeUdjUMoqiJM9EmDEh3cjEVpSN9ijIbR6ddUFykK4uBSv3IKSjGxViaji/Fczdm3WjHFH//ohQMy44OPaMzLhVpN7PofNxQbl1a8XZJEe0ezcItdOCe7eCcTdt1r6bg/tpwYPbxHxKjl+fF8eVf9ds+WYKaztZp4lx7Vg1buY4inNoGBcsXWNMfrhV6OuYdL+gci+vMZwHcQ7dbhR54dExbtWp1RDoPse6PE+K8RpfikX/9bXnYPd9iskW7EXs2y9i9ntWcKoYtCAAAADAX/IZD0PEu6ELdbZzqhgfHzl92+j6eCgU4AThWtKoKFHG5wmWqb1snNfBgtDPlk82W8cjQPuxXiWXPUwTaonQ5lxTDjp9OSjEqRmW461qqPGg1WjjmZmZHQZxLIpmHMK2CJTC2spRXVllO010H8a+QWK375bJJEVS+hxdvsDraGqpmrXmRRqfpQsyq0bdZThuLFvvLd1sEKHuv+FnF12p0lJV/uyvUV57Hii/RlSoh87OSvK1CXxkf0rCbemRpNw8rKBwSeLeaVDyukiDLosHLEyv8pksiVwOhevl7h32DmqvEOXThSnVsDG/Nh3PssRprFeHoe5UZamuHg4rw4uY/8FI3Ieh63+cji9CH+MAAAAAAAAAAAAAAADAn/MNZQ4UAdq9Rq4AAAAASUVORK5CYII="} alt="" />
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