import { useRef } from "react";
import { Link } from "react-router-dom";
import useGlobalContext from "../../hooks/globalContext";
import pokeball from "../../assets/pokeball.png";

const Navbar = () => {
  const { handleSearch, homePage } = useGlobalContext();

  const inputRef = useRef([]);

  const handleSubmit = (e) => e.preventDefault();

  return (
    <>
      <nav className='navbar container fixed-top rounded-bottom'>
        <div className='row container-fluid align-items-center'>
          <div className='col ms-3'>
            <Link
              to='/'
              style={{ textDecoration: "none", marginLeft: "6px" }}
              onClick={() => {
                homePage();
                document.getElementById("search").value = "";
              }}
            >
              <img
                src={pokeball}
                alt='Pokeball'
                className='pokeball rounded mx-auto'
                style={{ width: "2rem", height: "2rem" }}
              />
            </Link>
          </div>
          <div className='col'>
            <h3 style={{ color: "#003A70" }} className='text-center'>
              Pokédex
            </h3>
          </div>
          <div className='col'>
            <div className='searchBox float-end'>
              <form className='d-flex' onSubmit={handleSubmit}>
                <input
                  type='text'
                  id='search'
                  ref={inputRef}
                  value={inputRef.current.value || ""}
                  spellCheck='false'
                  className='searchText'
                  aria-label='search'
                  placeholder="Catch 'em all..."
                  onChange={handleSearch}
                  autoComplete='off'
                />
                <button
                  href='#'
                  className='searchBtn'
                  aria-label='submitSearch'
                >
                  <i className='fa-solid fa-magnifying-glass'></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
