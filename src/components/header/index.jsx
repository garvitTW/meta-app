import "./style.scss";
import { Dropdown } from "react-bootstrap";
import Notification from "../../assests/images/header/Notification.png";
import User from "../../assests/images/header/user.png";
import More from "../../assests/images/header/More.png";
import { useLocation } from "react-router-dom";
import headerNames from "./headerNames";
import { useContext } from "react";
import { Store } from "../../store/Store";
function Header() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const { pathname } = useLocation();
  const isPathinHeaderNames = Object.keys(headerNames).includes(pathname);
  const page = isPathinHeaderNames
    ? headerNames[pathname]
    : pathname.split("/")[1] || "";

  return (
    <div>
      <div className="header_menu">
        <div className="header_submenu">
          <ul className="d-inline-block">
            <li>home</li>
            <li className="pe-3 ps-3 arrow-icon"></li>
            <li>{page}</li>
          </ul>
          <div className="text-right d-inline-block">
            <ul className="right_menu">
              <li>
                <img src={Notification} alt="Notification" />
              </li>
              <li>
                <div className="d-inline-block ps-3">
                  <img src={userInfo?.img || User} alt="User" />
                </div>
                <div className="profile-name d-inline-block ps-3">
                  <h3>{userInfo?.name}</h3>
                  <p>{userInfo?.email}</p>
                </div>
              </li>
              <li>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <img src={More} alt="More" />
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
  );
}

export default Header;
