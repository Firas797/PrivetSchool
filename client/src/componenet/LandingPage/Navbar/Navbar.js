import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/LoginRegister/authSlice";
import { fetchUserNotifications } from "../../../redux/Notification/notificationSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBell, FaCalendarAlt, FaUser, FaSignOutAlt, FaChild } from "react-icons/fa";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const userName = user?.name || user?.parentName;

  const children = user?.children || [];
  
  // Get current child from URL path
  const getCurrentChild = () => {
    const pathParts = location.pathname.split('/');
    const childIdFromPath = pathParts[2]; // /student/childId or /student/childId/...
    
    if (childIdFromPath && children.length > 0) {
      return children.find(child => child._id === childIdFromPath);
    }
    return children[0]; // Return first child by default
  };

  const currentChild = getCurrentChild();
  const currentChildName = currentChild?.name;

  // Notifications from Redux
  const userNotifications = useSelector((state) => state.notifications.userNotifications);
  const unreadCount = userNotifications.filter(n => !n.read).length;

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserNotifications(user._id));
    }
  }, [dispatch, user?._id]);

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div>
      <div className="fables-navigation fables-main-background-color py-2 py-lg-0">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-md-8 col-lg-9">
              <nav className="navbar navbar-expand-lg btco-hover-menu py-lg-1">
                <Link className="navbar-brand pl-0 mr-4" to="/">
                  <h1>Logo</h1>
                </Link>

                <button
                  className="navbar-toggler border-0"
                  type="button"
                  data-toggle="collapse"
                  data-target="#fablesNavDropdown"
                  aria-controls="fablesNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="fables-iconmenu-icon text-white font-18" />
                </button>

                <div className="collapse navbar-collapse" id="fablesNavDropdown">
                  <ul className="navbar-nav mr-auto fables-nav">
                    <li className="nav-item">
                      <Link
                        className="nav-link d-flex align-items-center"
                        to="/evenements"
                      >
                        <FaCalendarAlt className="mr-2" style={{ fontSize: "16px" }} />
                        Événements
                      </Link>
                    </li>

                    {isLoggedIn && currentChildName && (
                      <li className="nav-item">
                        <Link 
                          className="nav-link d-flex align-items-center" 
                          to={currentChild?._id ? `/Emploi/${currentChild._id}` : "/Emploi"}
                        >
                          <FaChild className="mr-2" style={{ fontSize: "16px" }} />
                          Emploi
                        </Link>
                      </li>
                    )}

                    {/* Single child view */}
                    {isLoggedIn && children.length === 1 && (
                      <li className="nav-item">
                        <Link 
                          className="nav-link d-flex align-items-center" 
                          to={`/student/${children[0]._id}`}
                        >
                          <FaChild className="mr-2" style={{ fontSize: "16px" }} />
                          Espace de {children[0].name}
                        </Link>
                      </li>
                    )}

                    {/* Multiple children dropdown */}
                    {isLoggedIn && children.length > 1 && (
                      <li className="nav-item dropdown">
                        <Link
                          className="nav-link dropdown-toggle d-flex align-items-center"
                          to="#"
                          id="childrenDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <FaChild className="mr-2" style={{ fontSize: "16px" }} />
                          {currentChildName ? `Espace de ${currentChildName}` : 'Espaces Enfants'}
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="childrenDropdown">
                          {children.map((child) => (
                            <Link 
                              key={child._id} 
                              className="dropdown-item" 
                              to={`/student/${child._id}`}
                            >
                              Espace de {child.name}
                            </Link>
                          ))}
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </nav>
            </div>

            <div className="col-12 col-md-4 col-lg-3">
              <div className="d-flex align-items-center justify-content-end h-100 py-2 py-lg-0">
                {isLoggedIn && user ? (
                  <>
                    {/* Notification Icon */}
                    <Link
                      to="/notifications"
                      className="d-flex align-items-center text-white mx-2 position-relative text-decoration-none"
                      style={{ padding: "8px 12px" }}
                    >
                      <FaBell style={{ fontSize: "18px" }} />
                      {unreadCount > 0 && (
                        <span 
                          className="badge badge-danger position-absolute"
                          style={{ 
                            top: '-5px', 
                            right: '-1px', 
                            fontSize: '15px',
                            padding: '2px 4px'
                          }}
                        >
                          {unreadCount}
                        </span>
                      )}
                    </Link>

                    {/* User Profile */}
                    <Link
                      to="/profile"
                      className="d-flex align-items-center text-white mx-2 text-decoration-none"
                      style={{ padding: "8px 12px" }}
                    >
                      <FaUser className="mr-2" style={{ fontSize: "16px" }} />
                      <span className="d-none d-md-inline">{userName}</span>
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={handleLogOut}
                      className="btn btn-outline-light btn-sm mx-2 d-flex align-items-center"
                      style={{
                        border: "1px solid rgba(255,255,255,0.5)",
                        padding: "6px 12px",
                      }}
                    >
                      <FaSignOutAlt className="mr-1" style={{ fontSize: "14px" }} />
                      <span className="d-none d-md-inline">Déconnexion</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="btn btn-outline-light btn-sm mx-2"
                      style={{
                        border: "1px solid rgba(255,255,255,0.5)",
                        padding: "6px 16px",
                      }}
                    >
                      Connexion
                    </Link>

                    <Link
                      to="/register"
                      className="btn btn-light btn-sm mx-2 fables-second-hover-color"
                      style={{
                        background: "white",
                        color: "#667eea",
                        padding: "6px 16px",
                        fontWeight: "500",
                      }}
                    >
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;