import PokemonList from "../pokemon/PokemonList";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className='row'>
        <div className='col'>
          <PokemonList />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
