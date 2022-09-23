import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppReceitasContext from './AppReceitasContext';

function Provider({ children }) {
  const [user, setUser] = useState([]);
  const contextValue = { user, setUser };

  return (
    <AppReceitasContext.Provider value={ contextValue }>
      { children }
    </AppReceitasContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
