import React, { Children } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {logoutUser} from '../../../redux/LoginRegister/authSlice'
import logo from  '../Navbar/logo.png'

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
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="sub-nav1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Home
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="sub-nav1">
                    <li><a className="dropdown-item" href="home1.html">Home 1</a></li>
                    <li><a className="dropdown-item" href="home2.html">Home 2</a></li>
                    <li><a className="dropdown-item" href="home3.html">Home 3</a></li>
                    <li><a className="dropdown-item" href="home4.html">Home 4</a></li>
                  </ul>
                </li>
             
               
                <li className="nav-item dropdown">
                  <a className="nav-link " href="/Lprof" id="sub-nav7"  aria-haspopup="true" aria-expanded="false">
                    Les Profs
                  </a>
                 
                </li>
              
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/login" id="sub-nav6" >
                    Pages
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="sub-nav6">
                    <li><a className="dropdown-item" href="404.html">404</a></li>
                    <li><a className="dropdown-item" href="comming-soon.html">Comming Soon</a></li>
                    <li><a className="dropdown-item" href="gallery.html">Gallery</a></li>
                    <li><a className="dropdown-item" href="gallery-filter.html">Gallery Filter</a></li> 
                    <li><a className="dropdown-item" href="gallery-filter-masonry.html">Gallery Filter Masonry</a></li>
                    <li><a className="dropdown-item" href="gallery-history.html">Gallery History</a></li>
                    <li><a className="dropdown-item" href="gallery-history2.html">Gallery History 2</a></li>
                    <li><a className="dropdown-item" href="gallery-single.html">Gallery Single</a></li>
                    <li><a className="dropdown-item" href="gallery-timeline.html">Gallery Timeline </a></li>
                    <li><a className="dropdown-item" href="gallery-timeline2.html">Gallery Timeline 2</a></li>
                  </ul>
                </li> 
                {isLogedIn && children? ( <li className="nav-item dropdown">
                  <a className="nav-link " href="/Student" id="sub-nav7"  aria-haspopup="true" aria-expanded="false">
                 L'esapce de {children}
                  </a>
                 
                </li>  ):(<li className="nav-item dropdown">
                  <a className="nav-link " href="/login" id="sub-nav7"  aria-haspopup="true" aria-expanded="false">
                    Contact Us
                  </a>
                 
                </li>)}
               
              </ul> 
            </div>
          </nav>
        </div>
        {isLogedIn && userName ? ( <div className="col-12 col-md-2 col-lg-3 pr-md-0 icons-header-mobile">
      
           
      <a href="/login" className=" right px-3 px-md-2 px-lg-4  top-header-link max-line-height position-relative">
        <span onClick={handleLogOut} >Logout</span>
      </a>
      

   
    <a href="/register" className=" font-13 top-header-link px-3 px-md-2 px-lg-4 max-line-height"><span className="fables-iconuser" /> M {userName} </a>

</div>):

(    <div className="col-12 col-md-2 col-lg-3 pr-md-0 icons-header-mobile">
      
           
<a href="/login" className=" right px-3 px-md-2 px-lg-4  top-header-link max-line-height position-relative">
  <span>Login</span>
</a>


<a href="/register" className="  top-header-link px-3 px-md-2 px-lg-4 fables-second-hover-color border-0 max-line-height">
<span>Register</span>
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