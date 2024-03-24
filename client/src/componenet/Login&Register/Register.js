import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/LoginRegister/authSlice';
import Navbar from '../LandingPage/Navbar/Navbar';

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [CIN, setCIN] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [childN, setChildN] = useState('');
  const [Ntel ,setNtel] = useState ('')
  const [classChild , setClassChild]= useState('')

  const handleNtel = (e) => {
    setNtel(e.target.value)
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCINChange = (e) => {
    setCIN(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleChildNChange = (e) => {
    setChildN(e.target.value);
  };

  const handleClassChange = (e)=>{
    setClassChild(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name,classChild, CIN, email, password, childN,Ntel }));
    setName('');
    setCIN('');
    setEmail('');
    setChildN('');
    setNtel('');
    classChild('')
  };

  return (
   <div>

<Navbar/>
  
  {/* /End Header */}
  {/* Start Breadcrumbs */}
  <div className="fables-light-background-color">
    <div className="container"> 
      <nav aria-label="breadcrumb">
        <ol className="fables-breadcrumb breadcrumb px-0 py-3">
          <li className="breadcrumb-item"><a href="#" className="fables-second-text-color">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">Register</li>
        </ol>
      </nav> 
    </div>
  </div>
  {/* /End Breadcrumbs */}
  {/* Start page content */}   
  <div className="container">
    <div className="row my-4 my-lg-5">
      <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3 text-center">
        <img src="assets/custom/images/signin-logo.png" alt="signin" className="img-fluid" />
        <p className="font-20 semi-font fables-main-text-color mt-4 mb-5">Create a new account</p>
        <form onSubmit={handleSubmit}>
          <div className="form-row form-group">
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <div className="input-icon">
                <span className="fables-iconuser-register fables-input-icon mt-2 font-13" />
                <input type="text" value={name} className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input" onChange={handleNameChange} placeholder="Nom de Parent" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="input-icon">
                <span className="fables-iconuser-register fables-input-icon mt-2 font-13" />
                <input type="text" className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input" value={childN}  onChange={handleChildNChange} placeholder="Nom de l'enfant" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="input-icon">
                <span className="fables-iconuser-register fables-input-icon mt-2 font-13" />
                <input type="text" className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input" value={classChild}  onChange={handleClassChange} placeholder="Class de l'enfant 1--6 " />
              </div>
            </div>


          </div>
  <div className="form-group"> 
            <div className="input-icon">
              <span className="fables-iconemail fables-input-icon mt-2 font-13" />
              <input  className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input"value={CIN}  onChange={handleCINChange} placeholder="CIN" /> 
            </div>
          </div>
          <div className="form-group"> 
            <div className="input-icon">
              <span className="fables-iconemail fables-input-icon mt-2 font-13" />
              <input  className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input"value={Ntel}  onChange={handleNtel} placeholder="Numéro de téléphone" /> 
            </div>
          </div>
          <div className="form-group"> 
            <div className="input-icon">
              <span className="fables-iconemail fables-input-icon mt-2 font-13" />
              <input type="email" className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input"value={email}  onChange={handleEmailChange} placeholder="Email" /> 
            </div>
          </div>

          <div className="form-group"> 
            <div className="input-icon">
              <span className="fables-iconpassword fables-input-icon font-19 mt-1" />
              <input type="password" className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input" value={password}  onChange={handlePasswordChange} placeholder="Password" />
            </div>
          </div> 
        
          <button type="submit" className="btn btn-block rounded-0 white-color fables-main-hover-background-color fables-second-background-color font-16 semi-font py-3">Register Now</button>
          <a href="#" className="fables-forth-text-color font-16 fables-second-hover-color underline mt-3 mb-4 mb-lg-5 d-block">Forgot Password ?</a>
          <p className="fables-forth-text-color">Already have an account ?  <a href="signin.html" className="font-16 semi-font fables-second-text-color underline fables-main-hover-color ml-2">Login</a></p>
        </form>
      </div>
    </div>
  </div>
  <div className="fables-header fables-after-overlay">
    <div className="container"> 
      <h2 href='/login' className="fables-page-title fables-second-border-color">Register</h2>
    </div>
  </div>  
</div>

  );
};

export default Register;
