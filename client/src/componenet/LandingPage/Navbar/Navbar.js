import React, { Children } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {logoutUser} from '../../../redux/LoginRegister/authSlice'

function Navbar() {

const dispatch= useDispatch()
  const isLogedIn = useSelector((state)=>state.auth.isLogedIn)
  const userName = useSelector((state) => state.auth.user?.name);
const children = useSelector((state)=>state.auth.user?.childN)
  const handleLogOut = () =>{
    dispatch(logoutUser())
  }

  return (

    <div>
      
<div>
 
  <div className="fables-navigation fables-main-background-color py-3 py-lg-0">
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-10 col-lg-9 pr-md-0">   

          <nav className="navbar navbar-expand-md btco-hover-menu py-lg-2">
            <a className="navbar-brand pl-0" href="/"><img src="assets/custom/images/fables-logo.png" alt="Fables Template" className="fables-logo" /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#fablesNavDropdown" aria-controls="fablesNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="fables-iconmenu-icon text-white font-16" />
            </button>
            <div className="collapse navbar-collapse" id="fablesNavDropdown"> 
              <ul className="navbar-nav mx-auto fables-nav">   
                {isLogedIn && children? ( <li className="nav-item dropdown">
                  <a className="nav-link " href="/Student" id="sub-nav7"  aria-haspopup="true" aria-expanded="false">
                 L'esapce de {children}
                  </a>
                 
                </li>  ):(<li className="nav-item dropdown">
                  
                 
                </li>)}
               
              </ul> 
            </div>
          </nav>
        </div>
        {isLogedIn && userName ? ( <div className="col-12 col-md-2 col-lg-3 pr-md-0 icons-header-mobile">
      
           
      <a href="/login" className=" right px-3 px-md-2 px-lg-4  top-header-link max-line-height position-relative">
        <span onClick={handleLogOut} >Logout</span>
      </a>
      

   
    <a href="/" className=" font-13 top-header-link px-3 px-md-2 px-lg-4 max-line-height"><span className="fables-iconuser" /> M {userName} </a>

</div>):

(    <div className="col-12 col-md-2 col-lg-3 pr-md-0 icons-header-mobile">
      
           
<a href="/login" className=" right px-3 px-md-2 px-lg-4  top-header-link max-line-height position-relative">
  {/* <span>Login</span> */}
</a>


<a href="/register" className="  top-header-link px-3 px-md-2 px-lg-4 fables-second-hover-color border-0 max-line-height">
<span className='btn fables-second-background-color fables-second-border-color white-color rounded-0 mr-4 px-md-4 py-2 btn-bg-hover white-color-hover'>inscrivez vous</span>
</a>
<a href="/register" className=" font-13 top-header-link px-3 px-md-2 px-lg-4 max-line-height"><span className="fables-iconuser" /></a>

</div>)}
    
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Navbar