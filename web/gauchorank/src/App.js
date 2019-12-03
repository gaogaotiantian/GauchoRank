import React from 'react';
import Navbar from './components/Navbar.js';
import Index from './components/Index.js';
import ListPage from './components/ListPage.js';

import {
  BrowserRouter,
  Switch,
  Link,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />

        <Switch>

          <Route path="/lists/:id">
            <ListPage />
          </Route>
          
          <Route path="/">
            <Index />
          </Route>

        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
