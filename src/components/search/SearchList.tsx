/* eslint-disable @next/next/no-img-element */
import React from "react";

import UserCard from "@components/user";
import { useSearch } from "@contexts/index";
import { User } from "interface";

const UserMiniCard = ({ user }: { user: User }) => (
  <div className="flex h-14 w-full cursor-pointer items-center gap-x-4 border-b border-blue-100 p-2">
    <img
      className="h-full rounded-full"
      src={user.avatar}
      alt={user.full_name + " avatar"}
    />
    <p>{user.full_name}</p>
  </div>
);

const SearchList = () => {
  const ctx = useSearch();
  // console.log(ctx)
  return (
    <section className="h-full w-full overflow-scroll pt-4 scrollbar-hide">
      {ctx.selectedUser && ctx.showSingleCard ? (
        <UserCard user={ctx.selectedUser} />
      ) : (
        ctx?.results?.map((user, index) => (
          <UserMiniCard key={index} user={user} />
        ))
      )}
    </section>
  );
};

export default SearchList;
