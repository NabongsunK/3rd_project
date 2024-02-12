import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";

import { setIsThemaOpen } from "../../store/mainSlice";
import { signin, signout } from "../../store/loginSlice";

function Layout() {
  const isDark = useSelector((state) => state.mainSlice.isDark);
  const thema = useSelector((state) => state.mainSlice.thema);
  const dispatch = useDispatch();
  const is_signed = useSelector((state) => state.loginSlice.is_signed);
  const is_manager = useSelector((state) => state.loginSlice.is_manager);
  const name = useSelector((state) => state.loginSlice.name);

  // 기존 쿠키 저장
  const [cookies, setCookies, removeCookies] = useCookies(["id"]);

  const logOut = function () {
    dispatch(signout());
    removeCookies("is_signed");
    removeCookies("name");
    removeCookies("is_manager");
    setCookies("is_signed", false, { path: "/" });
  };

  useEffect(() => {
    if (cookies.is_signed && cookies.name) {
      dispatch(
        signin({
          newUser: { name: cookies.name, is_manager: cookies.is_manager },
        })
      );
    }
  }, []);

  useEffect(() => {
    if (is_signed) {
      setCookies("is_signed", true, { path: "/" });
      setCookies("is_manager", is_manager, { path: "/" });
      setCookies("name", name, { path: "/" });
    }
  }, [is_signed]);

  return (
    <div
      className={`App ${isDark} a${thema}`}
      onClick={() => {
        dispatch(setIsThemaOpen({ newIsThemaOpen: true }));
      }}
    >
      <Header logOut={logOut} />
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={6000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        // closeOnClick={true} // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss={false} // 화면을 벗어나면 알람 정지
        draggable={false} // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="light"
        // limit={1} // 알람 개수 제한
      />
      <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;
