
import { useState } from 'react';
import Navbar from './Components/Navbar';
import NewsBoard from './Components/NewsBoard';
import './index.css';

const App = () => {
  const [category, setCategory] = useState("technology");

  return (
    <div>
      <Navbar setCategory={setCategory} />
      <NewsBoard category={category} />
    </div>
  );
};

export default App;
