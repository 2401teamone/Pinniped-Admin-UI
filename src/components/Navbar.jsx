import { useState } from "react";
import styled from "styled-components";

import { Link, useLocation } from "wouter";

import { useAuthContext } from "../hooks/useAuth";

import ActionIcon from "./utils/ActionIcon";

import { LINKS } from "../constants/constants.js";

import pinnipedIcon from "../assets/images/pinniped_icon.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Database, BarChart, Settings } from "react-feather";

export default function Navbar() {
  const [hovering, setHovering] = useState("");

  const location = useLocation();
  const baseLocation = [...location][0];

  const { logout } = useAuthContext();

  return (
    <NavbarWrapper>
      <div className="brand-icon">
        <img src={pinnipedIcon} alt="logo" width="45px" height="45px" />
      </div>
      <LinkWrapper
        className={`
      link 
      ${baseLocation === "/_/data" ? "active" : ""} 
      ${
        hovering === LINKS.data && baseLocation !== LINKS.data ? "hovering" : ""
      }`}
        onMouseOver={() => setHovering(LINKS.data)}
        onMouseLeave={() => setHovering("")}
      >
        <Link to="/_/data">
          <Database size={15} />
        </Link>
      </LinkWrapper>
      <LinkWrapper
        className={`
          link 
          ${baseLocation === "/_/observability" ? "active" : ""} 
          ${
            hovering === LINKS.observability &&
            baseLocation !== LINKS.observability
              ? "hovering"
              : ""
          }
        `}
      >
        <Link
          to="/_/observability"
          onMouseOver={() => setHovering(LINKS.observability)}
          onMouseLeave={() => setHovering("")}
        >
          <BarChart size={15} />
        </Link>
      </LinkWrapper>
      <LinkWrapper
        className={`
            link 
            ${baseLocation === "/_/settings" ? "active" : ""}
            ${
              hovering === LINKS.settings && baseLocation !== LINKS.settings
                ? "hovering"
                : ""
            }
          `}
      >
        <Link
          to="/_/settings"
          onMouseOver={() => setHovering(LINKS.settings)}
          onMouseLeave={() => setHovering("")}
        >
          <Settings size={15} />
        </Link>
      </LinkWrapper>

      <LogoutButton onClick={logout}>
        <ActionIcon>
          <FontAwesomeIcon icon="fa-regular fa-sign-out" />
        </ActionIcon>
      </LogoutButton>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav`
  grid-area: navbar;
  top: 0;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  gap: 20px;
  border-right: 1px solid var(--light-gray);
  background-color: white;
`;

const LinkWrapper = styled.div`
  font-size: 1.5rem;
  padding: 10px;
  border-radius: var(--radius);
  text-decoration: none;
  cursor: pointer;

  &.hovering {
    background-color: var(--hover);
  }

  &.active {
    border: 2px solid var(--foreground);
  }

  & svg {
    color: black;
  }
`;

const LogoutButton = styled.div`
  padding-top: 20px;
  border-top: 1px solid var(--light-gray);
`;
