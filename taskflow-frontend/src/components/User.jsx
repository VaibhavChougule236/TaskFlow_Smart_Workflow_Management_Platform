import React from 'react'
import './User.css'

function User(props) {
    return (
        <>
        <h1 className='Vaibhav'> Hello {props.age}</h1>
        </>
    )
}

export default User;