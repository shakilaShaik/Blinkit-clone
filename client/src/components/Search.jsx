import React from "react";
import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from "react-type-animation";
const Search = () => {
  return (
    <div
      className="w-full min-w-[300px] lg:min-[420px] h-12 rounded
     border overflow-hidden flex text-neutral-600 bg-slate-100"
    >
      <button className="flex justify-center items-center h-full p-3">
        <IoSearch size={22} />
      </button>
      <div className="flex justify-center items-center ">
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
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
    </div>
  );
};

export default Search;
