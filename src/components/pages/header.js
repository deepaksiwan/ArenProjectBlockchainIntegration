import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";


import "../css/style.css";
import "../css/responsive.css";

import logo from "../images/logo.png";
import burger from "../images/burger.png";
import crosss from "../images/crosss.png";
import { useNavigate } from "react-router-dom";
import { useConnectModal,useAccountModal } from '@rainbow-me/rainbowkit';
import { useAccount, useContractRead, useProvider, useContract, usePrepareContractWrite, useContractWrite,useDisconnect } from 'wagmi'
import { Button } from "@mui/material";
import orderl from "../images/orderl.svg";
import orderr from "../images/orderr.svg";
import { textTransform } from "@mui/system";

const Header = () => {
  const navigate = useNavigate();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { address, isConnected } = useAccount();
  // const { disconnect } = useDisconnect()


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


  const Mynfthandler = () => {
    navigate("/Mynft")

  }

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
                    <Link to="#about">List Nft</Link>
                  </li>
                  <li>
                    <Link to="/Mynft">My Nft</Link>
                  </li>
                  <li>
                    <Link to="/">Marketplace</Link>
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
                    {address && isConnected ? (
                      <p onClick={openAccountModal}>{address.substring(0, 6) +
                      "..." +
                      address.substring(address.length - 4)}</p>)
                      :(

                      <p className="connect-btn-link" onClick={openConnectModal}>
                       
                      Connect
                      </p>
                    )
                    }
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