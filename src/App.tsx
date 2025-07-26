import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstPage from './pages/first';
import SecondPage from './pages/second';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second" element={<SecondPage />} />
      </Routes>
    </BrowserRouter>
  );
}
