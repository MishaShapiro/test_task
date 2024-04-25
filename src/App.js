import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import CartsTables from './components/CartsTables';
import EditCart from './components/EditCart';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/cart/:cartID" element={<EditCart />} />
          <Route path="/" element={<CartsTables />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
