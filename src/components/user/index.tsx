/* eslint-disable @next/next/no-img-element */
import React from "react";

import { useSearch } from "@contexts/index";
import { User } from "@interfaces/index";

import { CardHeader, CardDetails } from "./CardElements";

export const UserMiniCard = ({ user }: { user: User }) => {
  const ctx = useSearch();
  return (
    <div
      className="h-20 w-full cursor-pointer border-b border-blue-100 py-3 px-2 hover:bg-gray-50"
      onClick={() => {
        ctx.selectUser(user);
      }}
    >
      <div className="flex h-full w-fit cursor-pointer items-center  gap-x-4">
        <img
          className="h-full rounded-full"
          src={user.avatar}
          alt={user.full_name + " avatar"}
        />
        <div className="flex flex-col justify-center">
          <p className="text-lg">{user.full_name}</p>
          <p className="text-sm text-gray-500">
            {user.bio.substring(0, 40) + (user.bio.length > 40 ? "..." : "")}
          </p>
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ user }: { user: User }) => {
  const header = {
    full_name: user.full_name,
    avatar: user.avatar,
    username: user.username,
    address: user.address,
  };
  const details = {
    links: {
      website: user.website,
      twitter: user.twitter,
      linkedin: user.linkedin,
      github: user.github,
      phone: user.phone,
    },
    bio: user.bio,
  };

  return (
    <article className="min-h-[360px] w-full max-w-full overflow-hidden rounded-lg border p-2">
      <CardHeader {...header} />
      <CardDetails {...details} />
    </article>
  );
};

export default UserCard;
