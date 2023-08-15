// import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './presentation/app/app';
import { Provider } from 'react-redux';
import store from './presentation/state/reducers/rootReducer';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
