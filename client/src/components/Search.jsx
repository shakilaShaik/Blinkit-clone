import React, { use, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useLocation } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  const redirectToSearchPage = () => {
    navigate("/search");
  };
  const location = useLocation();
  console.log(location, "location");
  const [isSearchPage, setIsSearchPage] = useState(false);
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);
  console.log(isSearchPage, "isSearchPage");

  return (
    <div
      className="w-full min-w-[300px] lg:min-[420px] h-12 rounded
     border overflow-hidden flex text-neutral-600 bg-slate-100 group focus-within:border-primary-200 "
    >
      <button className="flex justify-center items-center h-full p-3  group-focus-within:text-primary-200 bg-white rounded-full shadow-md">
        <IoSearch size={22} />
      </button>
      <div className="flex w-full  items-center">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage} className="w-full h-full flex items-center"

          >
            <TypeAnimation
              sequence={[

                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "Lays"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          // {in the search page}
          <div className="w-full h-full" >
            <input type="text " placeholder="Search for Atta, dal"
              autoFocus
              className="bg-transparent w-full h-full outline-none" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
