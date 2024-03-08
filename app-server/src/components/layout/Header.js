import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsDark, setIsThemaOpen } from "../../store/mainSlice";
import { useEffect, useState } from "react";

function Header({ logOut }) {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.mainSlice.isDark);
  const thema = useSelector((state) => state.mainSlice.thema);
  const isThemaOpen = useSelector((state) => state.mainSlice.isThemaOpen);
  const [isMenu, setMenu] = useState();
  const name = useSelector((state) => state.loginSlice.name);
  const is_signed = useSelector((state) => state.loginSlice.is_signed);
  const is_manager = useSelector((state) => state.loginSlice.is_manager);

  const menuToggle = () => {
    setMenu(!isMenu);
  };
  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <>
      <header className="header-area container">
        <div className="row">
          <div className="main-nav col-12">
            <Link to="/" className="logo">
              <img
                className="logo_mark"
                src={`/assets/images/logo/logo_mark_mycolor${thema}.png`}
                alt=""
              />
              <img
                className="logo_name logo_off"
                src={`/assets/images/logo/logo_name_mycolor${thema}-hover.png`}
                alt=""
              />
              <img
                className="logo_hover logo_on"
                src={`/assets/images/logo/logo_name_mycolor${thema}.png`}
                alt=""
              />
            </Link>
            <ul className="nav">
              <li className="ripple">
                <Link to="/">홈</Link>
              </li>
              <li className="ripple">
                <Link to="/capture">카드 만들기</Link>
              </li>
              <li className="ripple">
                <Link to="/list">카드 목록</Link>
              </li>
              <li className="ripple">
                <Link to="/notice">공지</Link>
              </li>
            </ul>
            <Link className="menu-trigger" onClick={menuToggle}>
              <span>Menu</span>
            </Link>

            {/* <DarkToggle
                  valueRef={isDark}
                  setValueRef={(e) => {
                    dispatch(setIsDark({ newIsDark: e }));
                  }}
                  options={["light", "dark"]}
                /> */}
            <div
              className={`myThema ${isThemaOpen ? "open" : "closed"} a${thema}`}
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setIsThemaOpen({ newIsThemaOpen: false }));
              }}
            >
              <div className="myThemaIn"></div>
            </div>
            {/* <ThemaToggle
                  options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  colorToggle={true}
                /> */}
          </div>
        </div>
      </header>
      <div>
        <div className={isMenu ? "menu" : "menu isMenu"}>
          <div className="menu_bg" onClick={closeMenu}></div>
          <ul className="nav_mobile">
            <li id="mobile_thema_color">
              {/* <ThemaToggle
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                colorToggle={true}
              /> */}
            </li>
            <li className="ripple">
              <Link to="/" onClick={closeMenu}>
                홈
              </Link>
            </li>
            <li className="ripple">
              <Link to="/capture" onClick={closeMenu}>
                카드만들기
              </Link>
            </li>
            <li
              className="ripple"
              style={is_manager ? {} : { display: "none" }}
            >
              <Link to="/list" onClick={closeMenu}>
                카드 목록
              </Link>
            </li>
            <li className="ripple">
              <Link to="/notice" onClick={closeMenu}>
                공지
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
