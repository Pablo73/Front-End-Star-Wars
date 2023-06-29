import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react';
import ApiRequestProvider from './context/ApiRequestProvider';
import vehicleStore from './stores/vehicleStore';

ReactDOM.render(
  <Provider vehicleStore={vehicleStore}>
    <ApiRequestProvider>
      <App />
    </ApiRequestProvider>
  </Provider>,
  document.getElementById('root')
);


