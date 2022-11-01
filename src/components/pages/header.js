import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

import "../css/style.css";
import "../css/responsive.css";

import logo from "../images/logo.png";
import burger from "../images/burger.png";
import crosss from "../images/crosss.png";

const Header = () => {
  useEffect(() => {
    changePickupStoreMenu();

    function changePickupStoreMenu() {
      var body = $("body"),
        mask = $('<div class="mask"></div>'),
        toggleSlideRight = document.querySelector(".toggle-slide-right"),
        slideMenuRight = document.querySelector(".slide-menu-right"),
        activeNav = "";
      $("body").append(mask);

      /* slide menu right */
      toggleSlideRight.addEventListener("click", function () {
        $("body").addClass("smr-open");
        $(".mask").fadeIn();
        activeNav = "smr-open";
      });

      /* hide active menu if close menu button is clicked */
      $(document).on("click", ".close-menu", function (el, i) {
        $("body").removeClass(activeNav);
        activeNav = "";
        $(".mask").fadeOut();
      });
    }
  }, []);

  return (
    <div className="border-b">
      <div className="container-fluid">
        <div className="header-box">
          <div className="header-c2">
            <ul className="menu-list-d">
              <li>
                <ul className="nav-list nav-listbg-l">
                  <li>
                    <Link to="/">Story</Link>
                  </li>
                  <li>
                    <Link to="#about">Overview</Link>
                  </li>
                  <li>
                    <Link to="#overview">NFT</Link>
                  </li>
                  <li>
                    <Link to="#community">Marketplace</Link>
                  </li>
                </ul>
              </li>
            </ul>

            <div className="header-c1">
              <div className="logo-box">
                <Link to="/">
                  <img src={logo} />
                </Link>
              </div>
            </div>

            <ul className="menu-list-d">
              <li>
                <ul className="nav-list nav-listbg-r">
                  <li>
                    <Link to="#exchange">Roadmap</Link>
                  </li>
                  <li>
                    <Link to="#staking">Whitepaper</Link>
                  </li>
                  <li>
                    <Link to="#casino">Team</Link>
                  </li>
                  <li>
                    <Link to="#docs">Play Now</Link>
                  </li>
                </ul>
              </li>
            </ul>

            <div className="burger-area">
              <a href="#" className="burgers toggle-slide-right">
                {" "}
                <img src={burger} />
              </a>
            </div>
          </div>
        </div>

        <div className="menu slide-menu-right menu-list-wrp">
          <button class="close-menu">
            <img src={crosss} className="img-close" />
          </button>
          <ul className="menu-list2">
            <li>
              <ul className="nav-list">
                <li>
                  <Link class="close-menu" to="/">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link class="close-menu" to="#about">
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link class="close-menu" to="#overview">
                    OVERVIEW
                  </Link>
                </li>
                <li>
                  <Link class="close-menu" to="#community">
                    COMMUNITY
                  </Link>
                </li>
                <li>
                  <Link class="close-menu" to="#exchange">
                    Exchange
                  </Link>
                </li>
                <li>
                  <Link class="close-menu" to="#stakeing">
                    STAKING
                  </Link>
                </li>
                <li>
                  <Link class="close-menu" to="#casino">
                    CASINO
                  </Link>
                </li>
                <li>
                  <Link class="close-menu" to="#docs">
                    DOCS
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;