import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Student.css';
import imgHeader from './smile.png';
import ProfilePage from './ProfileStdent/ProfileStudent';
import { 
  FaSpaceShuttle, 
  FaBook, 
  FaGamepad, 
  FaUser, 
  FaFlag, 
  FaChalkboardTeacher, 
  FaHome, 
  FaGraduationCap,
  FaChevronLeft
} from 'react-icons/fa';
import StoryClasses from './Storys/StoryClasses';
import ConclusionsList from './conclu/ConclusionsList';
import HomeWorks from './Homeworks/HomeWorks';
import Quizes from './Quizes/Quizes';
import Culture from './Culture/Culture';
import Cours from './Cours/Cours';
import Exams from './Exams/StudentExams';

function RightTabsExample() {
  const [activeTab, setActiveTab] = useState('first');
  const [showAllTabs, setShowAllTabs] = useState(false);
  const { childId } = useParams();
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.auth.user);
  const children = user?.children || [];
  
  // Get current child data
  const getCurrentChild = () => {
    if (childId && children.length > 0) {
      const child = children.find(c => c._id === childId);
      if (child) return child;
    }
    return children[0] || null; // Return first child by default
  };

  const currentChild = getCurrentChild();
  const childClass = currentChild?.class;
  const childName = currentChild?.name;

  // Redirect if childId is invalid but children exist
  useEffect(() => {
    if (children.length > 0 && !currentChild && childId) {
      // Invalid childId, redirect to first child
      navigate(`/student/${children[0]._id}`, { replace: true });
    }
  }, [children, currentChild, childId, navigate]);

  // If no children, show message
  if (children.length === 0) {
    return (
      <div className="App">
        <div className="header">
          <a href="/" className="home-link">
            <FaHome className="home-icon" />
            الصفحة الرئيسية
          </a>
        </div>
        <div className="text-center py-5">
          <h3>لا يوجد أطفال مسجلين</h3>
          <p>يرجى الاتصال بالإدارة لإضافة أطفال إلى حسابك</p>
        </div>
      </div>
    );
  }

  const handleTabChange = (key) => {
    setActiveTab(key);
    setShowAllTabs(false);
  };

  const handleShowAllTabs = () => {
    setShowAllTabs(true);
  };

  const tabConfig = [
    { key: 'first', icon: FaUser, label: 'فضائي الخاص', component: <ProfilePage child={currentChild} /> },
    { key: 'nineth', icon: FaUser, label: 'دروس الدعم', component: <div className="text-center py-5"><p><Cours child={currentChild} /></p></div> },
    { key: 'tenth', icon: FaBook, label: ' الفروض المنزلية ', component: <Exams/> },
    { key: 'second', icon: FaBook, label: 'الدروس المنزلية', component: <HomeWorks child={currentChild} /> },
    { key: 'third', icon: FaFlag, label: 'ماذا درسنا اليوم', component: <ConclusionsList child={currentChild} /> },
    { key: 'fourth', icon: FaSpaceShuttle, label: 'قصص', component: <StoryClasses child={currentChild} /> },
    { key: 'fifth', icon: FaGamepad, label: 'ألعاب', component: <Quizes child={currentChild} /> },
    { key: 'sixth', icon: FaChalkboardTeacher, label: 'ثقافة', component: <div className="text-center py-5"><Culture child={currentChild} /> </div> },
    { key: 'seventh', icon: FaUser, label: 'اساتذتي', component: <div className="text-center py-5"><h3>👨‍🏫 أساتذتي</h3><p>معلومات عن الأساتذة قريباً...</p></div> },
  ];

  return (
    <div className='App'>
      {/* Header */}
      <div className="header">
        <a href="/" className="home-link">
          <FaHome className="home-icon" />
          الصفحة الرئيسية
        </a>
        <div className="header-right">
          <a href="#default" className="logo">
            <FaGraduationCap className="logo-icon" />
            {childClass} تلميذ ألسنة - {childName}
          </a>
          
          {/* Child switcher for multiple children */}
          {children.length > 1 && (
            <select 
              className="child-switcher ml-3"
              value={currentChild?._id || ''}
              onChange={(e) => navigate(`/student/${e.target.value}`)}
              style={{
                padding: '5px 10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: 'white'
              }}
            >
              {children.map(child => (
                <option key={child._id} value={child._id}>
                  {child.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Header Image */}
      <div className="header-image-container">
        <img
          className="header-image"
          src={imgHeader}
          alt="Student Dashboard"
        />
      </div>

      {/* Main Content */}
      <div className="tab-container">
        <Tab.Container id="right-tabs-example" activeKey={activeTab}>
          <Row className="main-row">
            {/* Main Content Area */}
            <Col xs={12} lg={9} className="content-col">
              <div className="tab-content-area">
                <Tab.Content>
                  {tabConfig.map((tab) => (
                    <Tab.Pane key={tab.key} eventKey={tab.key}>
                      <div className="tab-pane-content">
                        {tab.component}
                      </div>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </div>
            </Col>

            {/* Sidebar Tabs */}
            <Col xs={12} lg={3} className="sidebar-col">
              <Nav variant="pills" className="flex-column custom-tabs">
                {showAllTabs ? (
                  <>
                    <div className="sidebar-header">
                      <h4>القائمة الرئيسية</h4>
                      <button 
                        className="collapse-btn"
                        onClick={() => setShowAllTabs(false)}
                      >
                        <FaChevronLeft />
                      </button>
                    </div>
                    
                    {tabConfig.map((tab) => (
                      <React.Fragment key={tab.key}>
                        <Nav.Item>
                          <Nav.Link 
                            eventKey={tab.key} 
                            onClick={() => handleTabChange(tab.key)}
                            className={`nav-tab-item ${activeTab === tab.key ? 'active' : ''}`}
                          >
                            <tab.icon className="tab-icon" />
                            <span className="tab-label">{tab.label}</span>
                          </Nav.Link>
                        </Nav.Item>
                        <hr className="tab-divider" />
                      </React.Fragment>
                    ))}
                  </>
                ) : (
                  <div className="collapsed-sidebar">
                    <Nav.Item>
                      <button className="show-more-btn" onClick={handleShowAllTabs}>
                        🎓 أظهر القائمة الكاملة
                      </button>
                      <Nav.Link 
                        eventKey="first" 
                        onClick={() => handleTabChange("first")} 
                        className="nav-tab-item primary-tab"
                      >
                        <FaUser className="tab-icon" />
                        <span className="tab-label">فضائي الخاص</span>
                      </Nav.Link>
                    </Nav.Item>
                    
                    {/* Quick access to other main tabs in collapsed mode */}
                    <div className="quick-tabs">
                      <button 
                        className="quick-tab"
                        onClick={() => handleTabChange("second")}
                      >
                        <FaBook />
                      </button>
                      <button 
                        className="quick-tab"
                        onClick={() => handleTabChange("third")}
                      >
                        <FaFlag />
                      </button>
                      <button 
                        className="quick-tab"
                        onClick={() => handleTabChange("fourth")}
                      >
                        <FaSpaceShuttle />
                      </button>
                    </div>
                  </div>
                )}
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}

export default RightTabsExample;