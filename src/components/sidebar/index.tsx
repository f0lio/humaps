import React from "react";

import Searchbar from "@components/search/Searchbar";
import SearchList from "@components/search/SearchList";

const Sidebar = () => {
  return (
    <aside className="h-full w-full max-w-max p-3">
      <Searchbar />
      <SearchList />
    </aside>
  );
};

export default Sidebar;
