import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import './Student.css';
import imgHeader from './smile.jpg';
import ProfilePage from './ProfileStdent/ProfileStudent';
import { FaSpaceShuttle, FaBook, FaGamepad, FaUser, FaFlag, FaChalkboardTeacher } from 'react-icons/fa'; // Import the Font Awesome icons
import HomeWork from './ProfileStdent/HomeWork';
import StoryClasses from './Storys/StoryClasses';
import { useDispatch, useSelector } from 'react-redux';

function RightTabsExample() {
  const [activeTab, setActiveTab] = useState('first');
  const [showAllTabs, setShowAllTabs] = useState(false); // Start with false
  const [selectedTab, setSelectedTab] = useState('');

  const classes = useSelector((state)=>state.auth.user?.class)


  const handleTabChange = (key) => {
    setActiveTab(key);
    setSelectedTab(key);
    setShowAllTabs(false);
  };

  const handleShowAllTabs = () => {
    setShowAllTabs(true);
  };

  
  return (
    <div className='App'>
      <div className="header">
        <a href="/"> - الصفحة الرئيسية للموقع -</a>
         
        <div className="header-right">
        <a href="#default" className="logo">{classes} تلميذ ألسنة  </a>

        </div>
      </div>
      <div>
        <img
          className="header-image"
          src={imgHeader}
          alt="Header"
        />
      </div>
      <br />
      <Tab.Container id="right-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3} className="order-sm-2">
            <Nav variant="pills" className="flex-column custom-tabs">
              {showAllTabs ? (
                <>
                  <Nav.Item>
                    <Nav.Link eventKey="first" onClick={() => handleTabChange("first")}>
                      فضائي الخاص <FaUser className="tab-icon" />
                    </Nav.Link>
                  </Nav.Item>
                  <hr />

                  <Nav.Item>
                    <Nav.Link eventKey="second" onClick={() => handleTabChange("second")}>
                      الدروس المنزلية <FaBook className="tab-icon" />
                    </Nav.Link>
                  </Nav.Item>
                  <hr />

                  <Nav.Item>
                    <Nav.Link eventKey="third" onClick={() => handleTabChange("third")}>
                    إختبارات سابقة <FaFlag className="tab-icon" />
                    </Nav.Link>
                  </Nav.Item>
                  <hr />

                  <Nav.Item>
                <Nav.Link onClick={() => handleTabChange("fourth")} eventKey="fourth">
                  قصص <FaUser className="tab-icon" />
                </Nav.Link>
              </Nav.Item>
              <hr />

              <Nav.Item>

                <Nav.Link eventKey="fifth">
                  ألعاب <FaGamepad className="tab-icon" />
                </Nav.Link>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <Nav.Link onClick={() => handleTabChange("sixth")} eventKey="sixth">
                  ثقافة <FaChalkboardTeacher className="tab-icon" />
                </Nav.Link>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <Nav.Link onClick={() => handleTabChange("seventh")} eventKey="seventh">
                  اساتذتي <FaUser className="tab-icon" />
                </Nav.Link>
              </Nav.Item>
              <br/>
              <br/>   <br/>
                </>
              ) : (
                <Nav.Item>
                  <button onClick={handleShowAllTabs}>أظهر البقية </button>
                </Nav.Item>
              )}
              
            </Nav>
          </Col>
          <Col sm={9} className="order-sm-1">
            <Tab.Content>
              <Tab.Pane eventKey="first"> <ProfilePage /> </Tab.Pane>
              <Tab.Pane eventKey="second"> <HomeWork /> </Tab.Pane>
              <Tab.Pane eventKey="fourth"> <StoryClasses/> </Tab.Pane>
              <Tab.Pane eventKey="fifth">Fifth tab content</Tab.Pane>
              <Tab.Pane eventKey="sixth">Sixth tab content</Tab.Pane>
              <Tab.Pane eventKey="seventh">Seventh tab content</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default RightTabsExample;
