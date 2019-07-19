import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import logomark from '../../assets/images/logomark.svg';

class Nav extends Component {
	render() {
		return (
			<header>
	      <nav>
        	<Link className="logo" to='/'>
            <img alt="logo" src={logomark} />
          </Link>
          <Link className="link-style" to='/'>
            <ul className="nav-links">
              <li>Heroes</li>
            </ul>
          </Link>
	      </nav>
			</header>
		)
	}
}

export default Nav;