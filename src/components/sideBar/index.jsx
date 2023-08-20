import "./style.scss";
import Logo from "../../assests/images/sidebar/logo.png";
import Setting from "../../assests/images/sidebar/setting.png";
import Logout from "../../assests/images/sidebar/logout.png";
import { useLocation, useNavigate } from "react-router-dom";
import SettingHover from "../../assests/images/sidebar/settin-hover.png";
import LogoutHover from "../../assests/images/sidebar/logout-hover.png";
import sideBarItems from "./sideBarItems";
import URL from "../../constants/routesURL";
import { authService } from "../../services/auth.service";

function SideBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const Currentpage = pathname.split("/")[1] || "";

  const acitveItem = (itemNavigation) => {
    const itemPage = itemNavigation.split("/")[1] || "";
    const isOrganisationPage = Currentpage === itemPage;
    return pathname === itemNavigation || isOrganisationPage
      ? "active_menu"
      : "";
  };
  return (
    <>
      <div>
        <div className="Sidebar_menu">
          <div className="logo-border">
            <img src={Logo} alt="logo" />
          </div>
          <ul>
            {sideBarItems.map((item) => (
              <li
                className={acitveItem(item.navigate)}
                key={item.id}
                onClick={() => navigate(item.navigate)}
              >
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
            <li onClick={() => navigate(URL.SETTINGS)} className={acitveItem(URL.SETTINGS)}>
              <span>
                <img src={Setting} alt="setting" className="image-first"/>
                <img src={SettingHover} alt="setting"className="image-hover d-none" />
              </span>
              <span>Settings</span>
            </li>
            <li>
              <span>
                <img src={Logout} alt="logout"className="image-first" />
                <img src={LogoutHover} alt="logout" className="image-hover d-none"/>
              </span>
              <span onClick={()=>{authService.logout()
              navigate(URL.LOGIN)}}>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
