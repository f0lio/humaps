/* eslint-disable @next/next/no-img-element */
import React from "react";

import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";

import BaseModal from "@components/modals";
import UserCard, { UserMiniCard } from "@components/user";
import { useSearch } from "@contexts/index";

const SearchList = () => {
  const ctx = useSearch();

  // console.log(ctx)
  return (
    <section className="h-full w-full  overflow-scroll scrollbar-hide">
      {ctx.selectedUser && ctx.showSingleCard ? (
        <div className="flex flex-col items-center justify-center px-2">
          <div className="flex w-full justify-start py-2">
            <button
              className="rounded-full border text-gray-500 hover:border-gray-600 hover:text-gray-800"
              onClick={() => ctx.unSelectUser()}
            >
              <BsArrowLeftShort className="h-8 w-8" />
            </button>
          </div>
          <UserCard user={ctx.selectedUser} />
        </div>
      ) : (
        ctx?.results?.map((user, index) => (
          <UserMiniCard key={index} user={user} />
        ))
      )}
      {ctx.showPictureModal && ctx.selectedUser && (
        <BaseModal
          isOpen={ctx.showPictureModal}
          onClose={() => ctx.setShowPictureModal(false)}
        >
          <div className="flex flex-col items-center justify-center">
            <Image
              className="object-cover"
              src={ctx.selectedUser.avatar || "/empty-avatar.png"}
              layout="fixed"
              width={600}
              height={600}
              alt={`cover for ${ctx.selectedUser.full_name}`}
            />
          </div>
        </BaseModal>
      )}
    </section>
  );
};

export default SearchList;
