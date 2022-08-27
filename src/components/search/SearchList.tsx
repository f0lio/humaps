import React from "react";

import { useSearch } from "@contexts/index";
import { User } from "interface";

const UserCard = ({ user }: { user: User }) => (
  <div className="h-14 w-full bg-blue-100 p-2">{user.first_name}</div>
);

const SearchList = () => {
  const searchContext = useSearch();
  // console.log(searchContext)
  return (
    <section className="h-full w-full pt-4">
      <p className="text-2xl font-semibold text-red-400">Section</p>
      {searchContext?.results?.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </section>
  );
};

export default SearchList;
