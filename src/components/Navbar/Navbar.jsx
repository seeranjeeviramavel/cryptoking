import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";
import { CoinContext } from "../../context/CoinContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
  const { setCurrency } = useContext(CoinContext);
  function currencyHandler(event) {
    switch (event.target.value) {
      case "usd":
        setCurrency({
          name: "usd",
          symbol: "$",
        });
        break;
      case "euro":
        setCurrency({
          name: "eur",
          symbol: "€",
        });
        break;
      case "inr":
        setCurrency({
          name: "inr",
          symbol: "₹",
        });
        break;
      default:
        setCurrency({
          name: "usd",
          symbol: "$",
        });
        break;
    }
  }
  return (
    <div className="navbar">
      <img src={logo} className="logo" />
      <ul>
        <li onClick={()=>{navigate("/")}}>Home</li>
      </ul>

      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="euro">EURO</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Github
          <img src={arrow_icon} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
