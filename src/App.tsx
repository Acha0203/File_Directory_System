import React from 'react';

import { Provider } from 'react-redux';

import Background from './components/Background';
import store from './store/intex';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Background />
      </div>
    </Provider>
  );
}

export default App;
