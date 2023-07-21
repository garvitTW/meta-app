import "./style.scss";
import { Dropdown } from "react-bootstrap";
import Notification from "../../assests/images/header/Notification.png";
import User from "../../assests/images/header/user.png";
import More from "../../assests/images/header/More.png";
function Header() {
  return (
    <>
      <div>
        <div className="header_menu">
          <div className="header_submenu">
            <ul className="d-inline-block">
              <li>home</li>
              <li className="pe-3 ps-3"></li>
              <li>Patients</li>
            </ul>
            <div className="text-right d-inline-block">
              <ul className="right_menu">
                <li>
                  <img src={Notification} />
                </li>
                <li>
                  <div className="d-inline-block ps-3">
                    <img src={User} />
                  </div>
                  <div className="d-inline-block ps-3">
                    <h3>Armia Abado</h3>
                    <p>Administrator</p>
                  </div>
                </li>
                <li>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <img src={More} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
