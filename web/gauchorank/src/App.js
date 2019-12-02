import React from 'react';
import Navbar from './components/Navbar.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>
          Hello World!
        </h1>
      </div>
    )
  }
}

export default App;
