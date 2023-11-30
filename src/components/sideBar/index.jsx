import "./style.scss";
import { memo, useContext } from "react";
import Logo from "../../assests/images/sidebar/logo.png";
import Setting from "../../assests/images/sidebar/setting.svg";
import Logout from "../../assests/images/sidebar/logout.svg";
import { useLocation, useNavigate } from "react-router-dom";
import SettingHover from "../../assests/images/sidebar/settin-hover.svg";
import LogoutHover from "../../assests/images/sidebar/logout-hover.svg";
import sideBarItems from "./sideBarItems";
import URL from "../../constants/routesURL";
import { authService } from "../../services/auth.service";
import { Store } from "../../store/Store";

function SideBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const Currentpage = pathname.split("/")[1] || "";
  const { state } = useContext(Store);
  const { userInfo } = state;

  const visibleSideBarItems = sideBarItems.filter(({ roles }) =>
    roles.includes(userInfo?.user_type)
  );

  const acitveItem = (itemNavigation) => {
    const itemPage = itemNavigation.split("/")[1] || "";
    const isOrganisationPage = Currentpage === itemPage;
    return pathname === itemNavigation || isOrganisationPage
      ? "active_menu"
      : "";
  };
  return (
    <div>
      <div className="Sidebar_menu Scroll">
        <div className="logo-border">
          <img src={Logo} alt="logo" />
        </div>
        <ul className="top-list">
          {visibleSideBarItems.map((item) => (
            <li
              className={acitveItem(item.navigate)}
              key={item.id}
              onClick={() => navigate(item.navigate)}
            >
              <span>
                <img src={item.image} className="image-first" alt={item.name} />
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
        <div className="BottomMenu">
          <p>ACCOUNT</p>
          <ul>
            <li
              onClick={() => navigate(URL.SETTINGS)}
              className={acitveItem(URL.SETTINGS)}
            >
              <span>
                <img src={Setting} alt="setting" className="image-first" />
                <img
                  src={SettingHover}
                  alt="setting"
                  className="image-hover d-none"
                />
              </span>
              <span>Settings</span>
            </li>
            <li>
              <span>
                <img src={Logout} alt="logout" className="image-first" />
                <img
                  src={LogoutHover}
                  alt="logout"
                  className="image-hover d-none"
                />
              </span>
              <span
                onClick={() => {
                  authService.logout();
                  navigate(URL.LOGIN);
                }}
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default memo(SideBar);
