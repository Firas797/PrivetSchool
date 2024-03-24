import React from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import {  FaBook, FaGamepad, FaUser, FaFlag, FaChalkboardTeacher } from 'react-icons/fa';


function languages() {
  return (
    <div>
          <Tab.Container id="right-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3} className="order-sm-2">
            <Nav variant="pills" className="flex-column custom-tabs">
              <Nav.Item>
                <Nav.Link eventKey="first">
                العربية <FaUser className="tab-icon" />
                </Nav.Link>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <Nav.Link eventKey="second">
                الفرنسية<FaBook className="tab-icon" />
                </Nav.Link>
              </Nav.Item>
              <hr />

              <Nav.Item>
                <Nav.Link eventKey="fifth">
                الأنجليزية <FaGamepad className="tab-icon" />
                </Nav.Link>
              </Nav.Item>
              <hr />
             
            </Nav>
          </Col>
          <Col sm={9} className="order-sm-1">
            <Tab.Content>
              <Tab.Pane eventKey="third">Third tab content</Tab.Pane>
              <Tab.Pane eventKey="fifth">Fifth tab content</Tab.Pane>
              <Tab.Pane eventKey="sixth">Sixth tab content</Tab.Pane>
              <Tab.Pane eventKey="seventh">Seventh tab content</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

    </div>
  )
}

export default languages