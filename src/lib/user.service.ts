import { Entity, Schema } from "redis-om";

import { Point } from "interface";

import { db, dbConnect } from "./redis";

// This interface is for avoiding: [Property does not exist on type 'User'.ts(2339)]
interface User {
  full_name: string;
  username: string;
  bio: string;
  address: string;
  location: string;
  avatar: string;
  dob: string;
}

class User extends Entity {}

const schema = new Schema(User, {
  full_name: { type: "text" }, //searchablity?
  username: { type: "string" },
  bio: { type: "text" },
  address: { type: "text" },
  location: { type: "point" },
  avatar: { type: "string" },
  dob: { type: "date" },
});

const getUserRepo = async () => {
  await dbConnect();
  const repo = db.fetchRepository(schema);
  await repo.createIndex();
  return repo;
};

export const searchUserByGeo = async (geoQuery: Point, query: string = "") => {
  // console.log("searchUserByGeo()", geoQuery, query);
  return [];
};

export const searchUser = async (
  query: string,
  offset: number = 0,
  count: number = 30
) => {
  if (query.length === 0) return [];
  const repo = await getUserRepo();
  const users = await repo
    .search()
    .where("username")
    .equals(query)
    .or("full_name")
    .matches(query)
    .or("bio")
    .matches(query)
    .page(offset, count);
  // .returnAll({
  //   pageSize: limit,
  // });
  // console.log('searchUser():', users);
  // users[0].first_name = "hh";
  return users || [];
};

export const createUser = async (user: User) => {
  // console.count("createUser()");
  const repo = await getUserRepo();
  // console.log({ repo });
  const newUser = await repo.createAndSave(user);
  // console.log({ newUser });
  return newUser;
};
