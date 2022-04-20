import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetPass } from '../actions/userAction';

function UpdateInfo(props) {
    const [password, setPassword]=useState('');
    const [cf_password,setCfPassword]=useState('');
    const [username,setUserName]=useState('');
    const userInfo = useSelector(state=>state.userSignin.userInfo);
    const userResetPass= useSelector(state=> state.userResetPass);
    const {error,loading}=userResetPass;  
    const dispatch = useDispatch();

    const handleResetPass= (e) =>{
        e.preventDefault();
        dispatch(resetPass( userInfo.email,username, cf_password,password ));
    }

  return <div className="form">
    <form  >
      <ul className="form-container">
        <li>
          <h2>Information</h2>
        </li>
        {loading && <div>Reset password Successfully </div>}
        <li>
          {error && <div>{error}</div>}
          <label>Email</label>
          <li className="update">{userInfo && userInfo.email}</li>
          <label>User name</label>
          <li className="update">{userInfo && userInfo.name}</li>
          <label >Update your usename</label>
          <input type="text" name="username" value={username} onChange={(e)=>setUserName(e.target.value)}/>
          <label htmlFor="password">Update your Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <label htmlFor="password">Confirm Password</label>
          <input type="password" id="cf_password" name="cf_password" value={cf_password} onChange={(e)=>setCfPassword(e.target.value)}/>
          <button onClick={handleResetPass} className="button primary">UPDATE</button>
        </li>
        
      </ul>
    </form>
  </div>
}
export default UpdateInfo;