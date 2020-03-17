import React from 'react';
import './header.scss';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';

const Header = props => {
  return (
    <header>
      <div className='wrap'>
        <Logo />
      </div>
    </header>
  );
};

export default Header;
