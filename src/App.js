import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        {/* <Route exact path="/meals/{id-da-receita" component={  } />
          <Route exact path="/drinks/{id-da-receita" component={  } />
          <Route exact path="/meals/{id-da-receita}/in-progress" component={  } />
          <Route exact path="/drinks/{id-da-receita}/in-progress;" component={  } /> */}
        <Route exact path="/profile" component={ Profile } />
        {/* <Route exact path="/done-recipes" component={  } />
          <Route exact path="/favorite-recipes" component={  } /> */}
      </Switch>
    </Provider>
  );
}

export default App;
