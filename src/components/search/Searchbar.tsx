/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";

import classNames from "classnames";
import { AiOutlineSearch } from "react-icons/ai";
// @ts-ignore
import Turnstone from "turnstone";
// @ts-ignore
import recentSearchesPlugin from "turnstone-recent-searches";

import { User } from "@interfaces/index";
import { search, useSearch } from "contexts";

const MAX_SUGGESTIONS = 8;

const styles = {
  input:
    "w-full h-12 border border-oldsilver-300 py-2 pl-10 pr-7 text-xl outline-none rounded",
  inputFocus:
    "w-full h-12 border-x-0 border-t-0 border-b border-crystal-500 py-2 pl-10 pr-7 text-xl outline-none sm:rounded sm:border",
  query: "text-oldsilver-800 placeholder-oldsilver-400",
  typeahead: "text-crystal-500 border-white",
  cancelButton: `absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 text-crystal-600 inline-flex sm:hidden`,
  clearButton:
    "absolute inset-y-0 right-0 w-8 inline-flex items-center justify-center text-crystal-500 hover:text-hotpink-300",
  listbox:
    "w-full bg-white border border-crystal-500 rounded text-left drop-shadow-xl",
  groupHeading:
    "cursor-default mt-2 mb-0.5 px-1.5 uppercase text-sm text-hotpink-300",
  item: "cursor-pointer overflow-ellipsis overflow-hidden text-oldsilver-700",
  highlightedItem:
    "cursor-pointer overflow-ellipsis overflow-hidden text-oldsilver-700 rounded bg-crystal-100",
  match: "font-semibold",
  noItems: "cursor-default text-center my-20",
};

const ListItem = ({ item }: { item: User }) => {
  return (
    <div className="flex cursor-pointer items-center p-2 text-gray-900 hover:bg-gray-100">
      <img
        className="mr-3 rounded-full object-cover"
        width={35}
        height={35}
        src={item.avatar || "/empty-avatar.png"}
        alt={item.full_name}
      />
      <p>{item.full_name}</p>
    </div>
  );
};

const Searchbar = () => {
  const [hasFocus, setHasFocus] = useState(false);
  const ctx = useSearch();

  const turnstoneRef = useRef();

  const listbox = {
    displayField: "full_name",
    data: async (query: string) => {
      const data = await search({
        count: MAX_SUGGESTIONS,
        query: query,
      });
      return data.users;
    },
    searchType: "startsWith",
    // searchType: "contains",
  };

  const onBlur = () => setHasFocus(false);
  const onFocus = () => setHasFocus(true);

  // const onSelect = (item: User) => {
  //   console.log(item);
  //   // turnstoneRef.current?.blur();
  //   turnstoneRef.current?.query(item?.full_name || "");
  //   ctx.selectUser(item);
  // };

  const onEnter = (query: string) => {
    ctx.onSubmit(query);
    // @ts-ignore
    turnstoneRef.current?.query(query);
    // @ts-ignore
    turnstoneRef.current?.blur();
    ctx.unSelectUser();
  };

  return (
    <div
      className={classNames(
        "relative block w-full h-full bg-white z-50 bg-transparent"
      )}
    >
      <span
        className={classNames(
          `absolute inset-y-0 left-0 z-10 h-12 w-10 items-center justify-center sm:inline-flex`,
          hasFocus
            ? "hidden text-crystal-600"
            : "inline-flex text-oldsilver-400"
        )}
      >
        <AiOutlineSearch type="search" className="h-6 w-6" />
      </span>
      <Turnstone
        ref={turnstoneRef}
        id="autocomplete"
        name="search"
        styles={styles}
        noItemsMessage="We couldn't find any character that matches your search"
        placeholder="Search by names, occupations, locations..."
        matchText={true}
        debounceWait={150}
        autoFocus={true}
        typeahead={true}
        clearButton={true}
        cancelButton={true}
        listboxIsImmutable={true}
        listbox={listbox}
        maxItems={MAX_SUGGESTIONS}
        Item={ListItem}
        onBlur={onBlur}
        onFocus={onFocus}
        // onSelect={onEnter}
        onEnter={onEnter}
        plugins={[recentSearchesPlugin]}
      />
    </div>
  );
};

export default Searchbar;
