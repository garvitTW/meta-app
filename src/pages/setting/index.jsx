import { Row, Col,Form } from "react-bootstrap";
import "./style.scss";
function Settings() {
  return (
    <>
      <div className="setting_page">
        <Row>
          <Col md={12}>
            <h1>Notification settings</h1>
          </Col>
          <Col md={12}>
            <Row className="border-bottomrow">
                <Col md={4}>
                    <h4>Email Notifications</h4>
                    <p>These are notifications for comments on your posts and replies to your comments.</p>
                </Col>
                <Col md={8}>
                <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Push"
                    checked
                    
                />
                </Form>
                <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Email"
                    checked
                />
                </Form>
                <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="SMS"
                    
                />
                </Form>
                </Col>
            </Row>
            <Row className="border-bottomrow">
                <Col md={4}>
                    <h4>Pending Documents Review</h4>
                    <p>These are notifications for when someone tags you in a comment, post or story.</p>
                </Col>
                <Col md={8}>
                <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Push"
                    checked
                />
                </Form>
                <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Email"
                    
                />
                </Form>
                <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="SMS"
                    
                />
                </Form>
                </Col>
            </Row>
            <Row className="border-bottomrow">
                <Col md={4}>
                    <h4>Reminders</h4>
                    <p>These are notifications to remind you of updates you might have missed.</p>
                </Col>
                <Col md={8}>
                <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Push"
                    
                />
                </Form>
                <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Email"
                    
                />
                </Form>
                <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="SMS"
                    
                />
                </Form>
                </Col>
            </Row>
            <Row className="border-bottomrow">
                <Col md={4}>
                    <h4>More activity about you</h4>
                    <p>These are notifications for posts on your profile, likes and other reactions to your posts, and more.</p>
                </Col>
                <Col md={8}>
                <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Push"
                    
                />
                </Form>
                <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Email"
                    
                />
                </Form>
                <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Sms"
                    
                />
                </Form>
                </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Settings;
