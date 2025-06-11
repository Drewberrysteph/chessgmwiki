import { BrowserRouter, Routes, Route } from "react-router-dom";
import GrandmastersList  from "../features/Grandmasters/components/GrandmastersList";
import GrandmasterProfile from '../features/Grandmasters/components/GrandmasterProfile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GrandmastersList />} />
        <Route path="/:username" element={<GrandmasterProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
