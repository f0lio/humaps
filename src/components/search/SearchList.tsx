import React from "react";

import { useSearch } from "@contexts/index";
import { User } from "interface";

const UserCard = ({ user }: { user: User }) => (
  <div className="flex h-14 w-full cursor-pointer items-center gap-x-4 border-b border-blue-100 p-2">
    <img src={user.avatar} className="h-full rounded-full" />
    <p>{user.first_name}</p>
  </div>
);

const SearchList = () => {
  const searchContext = useSearch();
  // console.log(searchContext)
  return (
    <section className="h-full w-full overflow-scroll pt-4 scrollbar-hide">
      {searchContext?.results?.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </section>
  );
};

export default SearchList;
