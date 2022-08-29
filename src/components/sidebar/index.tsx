import React from "react";

import Searchbar from "@components/search/Searchbar";
import SearchList from "@components/search/SearchList";

const Sidebar = () => {
  return (
    <aside className="relative h-full max-h-full w-[460px] overflow-hidden py-2">
      <div className="p-2">
        <Searchbar />
      </div>
      <SearchList />
    </aside>
  );
};

export default Sidebar;
