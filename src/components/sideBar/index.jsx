import "./style.scss";
import Logo from "../../assests/images/sidebar/logo.png";
import Setting from "../../assests/images/sidebar/setting.png";
import Logout from "../../assests/images/sidebar/logout.png";
import { useNavigate } from "react-router-dom";
import sideBarItems from "./sideBarItems";
import URL from "../../constants/routesURL";

function SideBar() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="Sidebar_menu">
          <div className="logo-border">
            <img src={Logo} alt="logo" />
          </div>
          <ul>
            {sideBarItems.map((item) => (
              <li className="active_menu" key={item.id} onClick={() => navigate(item.navigate)}>
                <span>
                  <img
                    src={item.image}
                    className="image-first"
                    alt={item.name}
                  />
                  <img
                    src={item.hoverIamge}
                    className="image-hover d-none"
                    alt={item.name}
                  />
                </span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
          <p>ACCOUNT</p>
          <ul>
            <li onClick={()=>navigate(URL.SETTINGS)}>
              <span>
                <img src={Setting} alt="setting" />
              </span>
              <span>Settings</span>
            </li>
            <li>
              <span>
                <img src={Logout} alt="logout" />
              </span>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
