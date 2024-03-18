import { useState } from 'react';

import { Link, useLocation } from 'wouter';

import { LINKS } from '../constants/constants.js';

import pinnipedIcon from '../assets/images/pinniped_icon.png';

export default function Navbar() {
  const [hovering, setHovering] = useState('');

  const location = useLocation();
  const baseLocation = [...location][0].split('/')[1];

  return (
    <nav className="navbar">
      <div className="brand-icon">
        <img src={pinnipedIcon} alt="logo" width="45px" height="45px" />
      </div>
      <Link
        to="/data"
        className={`
          link 
          ${baseLocation === LINKS.data ? 'active' : ''} 
          ${
            hovering === LINKS.data && baseLocation !== LINKS.data
              ? 'hovering'
              : ''
          }`}
        onMouseOver={() => setHovering(LINKS.data)}
        onMouseLeave={() => setHovering('')}
      >
        <i className="fa-regular fa-database"></i>
      </Link>
      <Link
        to="/observability"
        className={`
          link 
          ${baseLocation === LINKS.observability ? 'active' : ''} 
          ${
            hovering === LINKS.observability &&
            baseLocation !== LINKS.observability
              ? 'hovering'
              : ''
          }
        `}
        onMouseOver={() => setHovering(LINKS.observability)}
        onMouseLeave={() => setHovering('')}
      >
        <i className="fa-regular fa-chart-line"></i>
      </Link>
      <Link
        to="/settings"
        className={`
          link 
          ${baseLocation === LINKS.settings ? 'active' : ''}
          ${
            hovering === LINKS.settings && baseLocation !== LINKS.settings
              ? 'hovering'
              : ''
          }
        `}
        onMouseOver={() => setHovering(LINKS.settings)}
        onMouseLeave={() => setHovering('')}
      >
        <i className="fa-regular fa-gear"></i>
      </Link>
    </nav>
  );
}
