/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";

import Image from "next/image";

import { Octocat, TwitterIcon, WebsiteIcon } from "@assets/index";
import { useSearch } from "@contexts/index";
import { removeLastSlash } from "@lib/utils";

export const UserName = ({ username }: { username: string }) => (
  <div className="flex cursor-default gap-x-1">
    {/* <a className="flex gap-x-1" href={`${GITHUB_URL}/${username}`} target="blank"> */}
    {/* <img src={LinkIcon} className="w-4" /> */}
    <p className="border-b border-orange-400/0 text-sm font-light text-gray-400">
      @{username}
    </p>
  </div>
);

export const Address = ({
  address,
  onClick,
}: {
  address: string;
  onClick: () => void;
}) => {
  return (
    <div className="flex gap-x-1" onClick={onClick}>
      {/* <img src={PinIcon} className="w-4" /> */}
      <p className="text-sm font-light text-gray-400">{address}</p>
    </div>
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
  <li>
    <a
      href={link}
      className="flex items-center gap-x-2 "
      target="_blank"
      rel="noreferrer"
    >
      <Image width={16} height={16} src={icon} alt={name + " icon"} />
      <p className="pt-1 text-sm text-gray-500/90 hover:text-gray-500/100">
        {name}
      </p>
    </a>
  </li>
);

export const CardLinks = ({ links }: { links: any }) => {
  if (!links) return null;
  return (
    <ul className="">
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
          name={removeLastSlash(new URL(links.twitter).pathname.substring(1))}
          icon={TwitterIcon}
        />
      )}
      {links.github && (
        <CardLink
          link={links.github}
          name={removeLastSlash(new URL(links.github).pathname.substring(1))}
          icon={Octocat}
        />
      )}
      {/* {links.linkedin && (
        <CardLink
          link={links.linkedin}
          name={removeLastSlash(new URL(links.linkedin).pathname.substring(1))}
          icon={}
        />
      )} */}
    </ul>
  );
};

export const CardHeader = ({
  full_name,
  avatar,
  username,
  address,
}: {
  full_name: string;
  avatar: string;
  username: string;
  address: string;
}) => {
  const ctx = useSearch();
  return (
    <div className="flex h-full w-full">
      <div className="pr-1">
        <Image
          width={160}
          height={160}
          layout="fixed"
          className="max-h-full w-40 cursor-pointer rounded-lg duration-200 hover:scale-105"
          src={avatar || "/empty-avatar.png"}
          onClick={() => ctx.setShowPictureModal(true)}
        />
      </div>
      <div className="mb-1 flex-col border-l px-3 py-2">
        <h1 className="flex flex-col gap-y-1 break-words text-lg font-semibold">
          {full_name}
        </h1>
        <UserName username={username} />
        <Address address={address} onClick={() => {}} />
      </div>
    </div>
  );
};

export const CardDetails = ({ bio, links }: { bio: string; links: any }) => {
  return (
    <div className="flex-col items-center justify-center break-words py-1">
      <div className="border-b py-2">
        <p className="text-lg">{bio}</p>
      </div>
      <div className="py-2">
        <CardLinks links={links} />
      </div>
    </div>
  );
};
