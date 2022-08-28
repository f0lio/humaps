/* eslint-disable @next/next/no-img-element */
import React from "react";

import {
  Octocat as defaultAvatar,
  TwitterIcon,
  WebsiteIcon,
} from "@assets/index";

const GITHUB_URL = "https://github.com";

export const UserName = ({ username }: { username: string }) => (
  <a className="flex gap-x-1" href={`${GITHUB_URL}/${username}`} target="blank">
    {/* <img src={LinkIcon} className="w-4" /> */}
    <p className="border-b border-orange-400/0 text-sm font-light text-gray-400 hover:border-orange-400/100">
      @{username}
    </p>
  </a>
);

export const Location = ({ location }: { location: string }) => {
  return (
    <a className="flex gap-x-1">
      {/* <img src={PinIcon} className="w-4" /> */}
      <p className="text-sm font-light text-gray-400">{location}</p>
    </a>
  );
};

export const CardLinks = ({ links }: { links: any }) => {
  if (!links) return null;
  return (
    <ul>
      {links.website && (
        <CardLink
          link={links.website}
          name={links.website}
          icon={WebsiteIcon}
        />
      )}
      {links.twitter && (
        <CardLink
          link={links.twitter}
          name={"@" + new URL(links.twitter).pathname.substring(1)}
          icon={TwitterIcon}
        />
      )}
    </ul>
  );
};

export const CardLink = ({
  link,
  name,
  icon,
}: {
  link: string;
  name: string;
  icon: any;
}) => (
  <li className="py-1">
    <a href={link} className="flex gap-x-1" target="_blank" rel="noreferrer">
      <img className="h-5 py-1" src={icon} alt={name + " icon"} />
      <p className="border-b border-gray-200/0 text-sm text-gray-400 hover:border-gray-200/100">
        {name}
      </p>
    </a>
  </li>
);

export const StatsElement = ({ name, value, icon }) => (
  <li className="flex gap-x-1">
    {icon && <img src={icon} className="w-4" />}
    <p className="w-16 font-thin">{name}</p>
    <span>:</span>
    <p className="text-right font-bold">{normalizeValue(value)}</p>
  </li>
);

export const CardHeader = ({ name, avatar, username, location, stats }) => (
  <div className="">
    <div className="grid h-full w-full grid-cols-2 border-b">
      <img className="h-full max-h-full p-1 " src={avatar || defaultAvatar} />
      <div className="mb-1 flex-col border-l px-3 py-2">
        <h1 className="break-words text-lg font-semibold">{name}</h1>
        <UserName username={username} />
        <Location location={location} />
      </div>
    </div>
  </div>
);

export const CardDetails = ({ bio, links, stats }) => {
  return (
    <div className="h-3/5 flex-col items-center justify-center break-words p-2">
      <p className="text-sm ">{bio}</p>
      {/* <CardStats stats={stats} /> */}
      <CardLinks links={links} />
    </div>
  );
};
