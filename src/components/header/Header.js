import { useEffect } from "react";
import logo from "../../assets/img/logoe.png";
import { isAuth } from "../../util/Util";
import { TopMenu } from "../menu/TopMenu";
import "./Header.css";

export const Header = () => {
  useEffect(() => { }, []);
  return (
    <div>
      <div className="flex text-center">
        <img className="logo" src={logo} alt="logo" />
      </div>
      {isAuth() ? <TopMenu /> : ""}
    </div>
  );
};
