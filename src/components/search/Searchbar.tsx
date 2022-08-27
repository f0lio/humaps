import React from "react";

import cn from "classnames";
import { AiOutlineSearch } from "react-icons/ai";

import { useSearch } from "contexts";

const Searchbar = () => {
  const searchContext = useSearch();

  return (
    <form className="group relative max-w-max rounded-lg text-gray-600 shadow shadow-blue-200">
      <input
        className="h-12 rounded-lg bg-white px-4 pr-24 text-sm text-gray-400 
        duration-100 focus:text-gray-500 focus:shadow  focus:shadow-blue-300
        group-hover:text-gray-500 "
        name="search"
        placeholder="Search.."
        onChange={(e) => {
          searchContext.onTyping(e.target.value);
          // onChange(e.target.value)
        }}
      />
      <button
        className={cn("absolute top-3 right-3 cursor-default text-gray-400", {
          "cursor-pointer text-blue-500": searchContext.query?.length > 0,
        })}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          searchContext.onSubmit();
        }}
      >
        <AiOutlineSearch className="h-6 w-6 duration-200" />
      </button>
    </form>
  );
};

export default Searchbar;
