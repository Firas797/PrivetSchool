import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/LoginRegister/authSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../LandingPage/Navbar/Navbar';


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the navigate function

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    setEmail('');
    setPassword('');
    navigate('/'); // Navigate to '/'

  };

  return (
    <div>

<Navbar/>


<div className="fables-light-background-color">
  <div className="container"> 
    <nav aria-label="breadcrumb">
      <ol className="fables-breadcrumb breadcrumb px-0 py-3">
        <li className="breadcrumb-item"><a href="#" className="fables-second-text-color">Home</a></li>
        <li className="breadcrumb-item"><a href="LoginProf" className="fables-second-text-color">Sign In Prof</a></li>
      </ol>
    </nav> 
  </div>
</div>

    <div className="container">
  <div className="row my-4 my-lg-5">
    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-center">
      <img src="assets/custom/images/signin-logo.png" alt="signin" className="img-fluid" />
      <p className="font-20 semi-font fables-main-text-color mt-4 mb-4 mb-lg-5">Sign In Fables</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> 
          <div className="input-icon">
            <span className="fables-iconemail fables-input-icon mt-2 font-13" />
            <input type="email"
             className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input" 
             value={email} placeholder="Email"
              onChange={handleEmailChange} /> 
          </div>
        </div>
        <div className="form-group"> 
          <div className="input-icon">
            <span className="fables-iconpassword fables-input-icon font-19 mt-1" />
            <input type="password"
             className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input"
              value={password} placeholder="Password"
               onChange={handlePasswordChange} />
          </div>
        </div> 
        <button type="submit" className="btn btn-block rounded-0 white-color fables-main-hover-background-color fables-second-background-color font-16 semi-font py-3">Sign in</button>
        <a href="#" className="fables-forth-text-color font-16 fables-second-hover-color underline mt-3 mb-4 m-lg-5 d-block">Forgot Password ?</a>
        <p className="fables-forth-text-color">Dont have an account ?  <a href="register.html" className="font-16 semi-font fables-second-text-color underline fables-main-hover-color ml-2">Register</a></p>
      </form>
    </div>
  </div>
</div>
<div className="fables-header fables-after-overlay">
  <div className="container"> 
    <h2 className="fables-page-title fables-second-border-color">Signin</h2>
  </div>
</div>
    </div>
    
  );
};

export default Login;
