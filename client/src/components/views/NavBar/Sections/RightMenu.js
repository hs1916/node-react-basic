/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
// import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { USER_SERVER } from '../../../../Config';
import { useNavigate } from 'react-router-dom';


function RightMenu(props) {
  const user = useSelector(state => state.user)
  
  const navigate = useNavigate();


  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        // props.history.push("/login");
        navigate('/login', {replace: true});
      } else {
        alert('Log Out Failed')
      }
    });
  };

  console.log('RightMenu : ' + user)


  if (user.payload && !user.payload.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default RightMenu;