
import React from 'react';
import { Link } from 'react-router-dom';

interface NavLink {
  name: string;
  path: string;
}

interface NavLinksProps {
  links: NavLink[];
  mobile?: boolean;
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ links, mobile = false, onClick }) => {
  return (
    <>
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.path}
          onClick={onClick}
          className={`${
            mobile 
              ? "text-xl font-medium text-navy-800 hover:text-bottle-500 transition-colors" 
              : "text-navy-800 hover:text-bottle-500 transition-colors font-medium"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
