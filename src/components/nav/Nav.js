import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import logomark from '../../assets/images/logomark.svg';

class Nav extends Component {
	render() {
		return (
			<header>
	      <nav className="menu">
        	<Link className="menu__logo" to='/'>
            <img alt="logo" src={logomark} />
          </Link>
          
          <ul className="menu__links">
            <Link className="menu__link-style" to='/'>
            	<li>Heroes</li>
            </Link>
          </ul>
	      </nav>
			</header>
		)
	}
}

export default Nav;