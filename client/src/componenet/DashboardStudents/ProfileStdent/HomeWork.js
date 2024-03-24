import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Languages from '../langs/languages';
function HomeWork() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >


      <Tab eventKey="التنشئة الإجتماعية	" title="التنشئة الإجتماعية	">
      التنشئة الإجتماعية	      </Tab>

      <Tab eventKey="التكنولوجيا" title="التكنولوجيا">
      التكنولوجيا      </Tab>

      <Tab eventKey="العلوم" title="العلوم">
      العلوم
      </Tab>



      <Tab eventKey="اللغات" title="اللغات
">
       <Languages/>

      </Tab>
     
    </Tabs>
  );
}

export default HomeWork;