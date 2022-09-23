import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          {/* <Route exact path="/meals" component={  } />
          <Route exact path="/drinks" component={  } />
          <Route exact path="/meals/{id-da-receita" component={  } />
          <Route exact path="/drinks/{id-da-receita" component={  } />
          <Route exact path="/meals/{id-da-receita}/in-progress" component={  } />
          <Route exact path="/drinks/{id-da-receita}/in-progress;" component={  } />
          <Route exact path="/profile" component={  } />
          <Route exact path="/done-recipes" component={  } />
          <Route exact path="/favorite-recipes" component={  } /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
