import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react';
import ApiRequestProvider from './context/ApiRequestProvider';
import vehicleStore from './stores/vehicleStore';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Container root does not exsit')
}
const root = createRoot(container);
root.render(
    <Provider vehicleStore={vehicleStore}>
      <ApiRequestProvider>
        <App />
      </ApiRequestProvider>
    </Provider>
);
