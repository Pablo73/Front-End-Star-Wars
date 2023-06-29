import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Vehicles from './pages/Vehicles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Vehicles />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
