import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg">
        <ul class="navbar-nav">
          <li><a href="/" class="nav-link">Home</a></li>
          <li><a href="#" class="nav-link">NavItem2</a></li>
          <li><a href="#" class="nav-link">NavItem3</a></li>
        </ul>
      </nav>
    )
  }
}

export default Navbar;
