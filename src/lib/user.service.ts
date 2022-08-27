import { Entity, Schema } from "redis-om";

import { Point } from "interface";

import { db, dbConnect } from "./redis";

class User extends Entity {}

const schema = new Schema(User, {
  first_name: { type: "string" },
  middle_name: { type: "string" },
  last_name: { type: "string" },
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

export const searchUser = async (query: string) => {
  if (query.length === 0) return [];
  const repo = await getUserRepo();
  const users = await repo
    .search()
    .where("first_name")
    .equals(query)
    .or("last_name")
    .equals(query)
    .or("middle_name")
    .equals(query)
    .or("username")
    .equals(query)
    .or("bio")
    .matches(query)
    .returnAll();
  // console.log('searchUser():', users);
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
