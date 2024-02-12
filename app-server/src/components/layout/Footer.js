import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Footer() {
  const copyTextUrl = function () {
    navigator.clipboard
      .writeText(process.env.REACT_APP_MY_EMAIL_ADDRESS)
      .then(() => {
        toast.success(`이메일 주소를 복사했습니다.`);
      });
  };
  return (
    <footer>
      <div className="container">
        <div className="col-lg-12">
          <p>
            Copyright © 2023 ALOA Team &nbsp;&nbsp;{" "}
            <Link onClick={copyTextUrl}>문의하기</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
