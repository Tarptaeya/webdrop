import React from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    color: 'white',
    background: 'mediumseagreen',
  },
  title: {
    textTransform: 'lowercase',
    padding: '8px 22px',
  }
};

function Navbar() {
  return <div style={styles.container}>
    <nav style={styles.nav}>
      <h1 style={styles.title}>#WebDrop</h1>
    </nav>
  </div>;
}

export default Navbar;