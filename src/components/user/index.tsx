import React from "react";

import { User } from "interface";

import { CardHeader, CardDetails } from "./CardElements";

const UserCard = ({ user }: { user: User }) => {
  const header = {
    full_name: user.full_name,
    avatar: user.avatar,
    username: user.username,
    address: user.address,
    // stats: user.stats,
  };
  const details = {
    links: user.links,
    // stats: user.stats,
    bio: user.bio,
  };

  return (
    <article className="h-80 max-w-xs overflow-hidden rounded-lg p-2 ">
      <CardHeader {...header} />
      <CardDetails {...details} />
    </article>
  );
};

export default UserCard;
