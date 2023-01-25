import React from 'react'
import '../unavailable/Unavailable.scss'
const Unavailable = ({message}) => {
  return (
    <div className='unavailable__container'>
        <h2>{message}</h2>
    </div>
  )
}

export default Unavailable