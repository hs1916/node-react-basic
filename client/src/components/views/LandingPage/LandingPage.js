import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {

    const navigate = useNavigate();

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success) {
                navigate('/login')
            } else {
                alert('logout Failed')
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            ,width: '100%', height: '100vh'
        }}>
            LandingPage
            <button onClick={onClickHandler}>
                Logout
            </button>
        </div>
  )
}

export default LandingPage