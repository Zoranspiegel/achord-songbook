import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
    </Routes>
  );
}
