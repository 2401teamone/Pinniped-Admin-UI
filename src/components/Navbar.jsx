import { useState } from "react";

import { Link, useLocation } from "wouter";

import { useAuthContext } from "../hooks/useAuth";

import ActionIcon from "./utils/ActionIcon";

import { LINKS } from "../constants/constants.js";

import pinnipedIcon from "../assets/images/pinniped_icon.png";

export default function Navbar() {
  const [hovering, setHovering] = useState("");

  const location = useLocation();
  const path = [...location][0].split("/");
  const baseLocation = path[0] + "/" + path[1];

  const { logout } = useAuthContext();

  const LINKS_WITH_BASE = {};
  Object.values(LINKS).forEach((val) => {
    LINKS_WITH_BASE[val] = `_${val}`;
  });

  return (
    <nav className="navbar">
      <div className="brand-icon">
        <img src={pinnipedIcon} alt="logo" width="45px" height="45px" />
      </div>
      <Link
        to="/_/data"
        className={`
          link 
          ${path === "/_/data" ? "active" : ""} 
          ${
            hovering === LINKS.data && baseLocation !== LINKS.data
              ? "hovering"
              : ""
          }`}
        onMouseOver={() => setHovering(LINKS.data)}
        onMouseLeave={() => setHovering("")}
      >
        <i className="fa-regular fa-database"></i>
      </Link>
      <Link
        to="/_/observability"
        className={`
          link 
          ${baseLocation === LINKS_WITH_BASE.observability ? "active" : ""} 
          ${
            hovering === LINKS.observability &&
            baseLocation !== LINKS.observability
              ? "hovering"
              : ""
          }
        `}
        onMouseOver={() => setHovering(LINKS.observability)}
        onMouseLeave={() => setHovering("")}
      >
        <i className="fa-regular fa-chart-line"></i>
      </Link>
      <Link
        to="/_/settings"
        className={`
          link 
          ${baseLocation === LINKS_WITH_BASE.settings ? "active" : ""}
          ${
            hovering === LINKS.settings && baseLocation !== LINKS.settings
              ? "hovering"
              : ""
          }
        `}
        onMouseOver={() => setHovering(LINKS.settings)}
        onMouseLeave={() => setHovering("")}
      >
        <i className="fa-regular fa-gear"></i>
      </Link>

      <div className="logout" onClick={logout}>
        <ActionIcon>
          <i className="fa-regular fa-sign-out"></i>
        </ActionIcon>
      </div>
    </nav>
  );
}
