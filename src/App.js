import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";
import ScrollToTop from "./utils/ScrollToTop";
import { PokedataProvider } from "./context/pokedata";

function App() {
  return (
    <>
      <div className='container'>
        <PokedataProvider>
          <Routes>
            <Route exact path='/' element={<Dashboard />} />
            <Route path='/pokemon/:index' element={<Pokemon />} />
          </Routes>
        </PokedataProvider>
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
