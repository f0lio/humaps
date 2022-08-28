import { useState, createContext, useContext } from "react";

import { Point, User } from "interface";

interface SearchPayload {
  query?: string;
  geoQuery?: Point;
  offset?: number;
  count?: number;
}

interface ISearchContext {
  query: string;
  geoQuery?: Point;
  results: User[];
  selectedUser: User;
  showSingleCard: boolean;
  onTyping: (_: string) => void;
  onSubmit: () => void;
  setQuery: (_: string) => void;
  selectUser: (_: User) => void;
}

const SearchContext = createContext<ISearchContext>({
  query: "",
  results: [],
  selectedUser: {},
  showSingleCard: false,
  onTyping: (_: string) => {},
  onSubmit: () => {},
  setQuery: (_: string) => {},
  selectUser: (_: User) => {},
});

const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(`useSearch must be used within a SearchProvider`);
  }
  return context;
};

//: Promise<User[]>
export async function search(payload: SearchPayload) {
  try {
    const resp = await fetch("/api/search", {
      method: "POST",
      mode: "cors",
      // cache: "no-cache",
      // credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = resp.json();
    // console.log('HERE', data);
    return data;
  } catch (error) {
    console.log(error); //eslint-disable-line no-console
  }
  return [];
}

const SearchProvider = (props) => {
  const [query, setQuery] = useState("");
  const [geoQuery, setGeoQuery] = useState<Point>({});
  const [results, setResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>({});
  const [showSingleCard, setShowSingleCard] = useState(false);

  const [suggestions, setSuggestions] = useState<User[]>([]);

  const onTyping = (query: string) => {
    setQuery(query);
    async function fetchData() {
      const data = search({
        query,
        count: 5,
      });
      // console.log(data);
      setSuggestions(data?.users || []);
    }
    fetchData();
  };

  const onSubmit = async () => {
    if (query.length === 0) return;
    async function fetchData() {
      const data = await search({
        query,
      });
      // console.log(data);
      // console.count("onSubmit");
      setResults(data?.users || []);
    }
    fetchData();
  };

  const selectUser = (user: User) => {
    setSelectedUser(user);
    setShowSingleCard(true);
  }

  return (
    <SearchContext.Provider
      value={{
        query: query,
        geoQuery: geoQuery,
        onTyping: onTyping,
        onSubmit: onSubmit,
        setQuery: setQuery,
        results: results,
        selectedUser: selectedUser,
        selectUser: selectUser,
        showSingleCard: showSingleCard,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export { SearchProvider, useSearch };
