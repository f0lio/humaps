import type { NextApiRequest, NextApiResponse } from "next";

import { dbConnect } from "@lib/redis";
import { searchUser, searchUserByGeo } from "@lib/user.service";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log("BODY:", req.body);
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  } else if (!req.body.geoQuery && !req.body.query) {
    res.status(401).send({ message: "empty query" });
    return;
  }
  await dbConnect();
  const offset = req.body.offset || 0;
  const count = req.body.count || 30;
  try {
    let users = [];
    if (req.body.geoQuery)
      users = await searchUserByGeo(req.body.geoQuery, req.body.query);
    else users = await searchUser(req.body.query, offset, count);
    // console.log("users", users);
    res.status(200).json({ users: users, events: [] });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

  //   console.log("0", req.headers);
  //   console.log("1", req.body);

  //   const res = await db.search();

  //   try {
  //     for (let index = 0; index < 100; index++) {
  //       const ping = await redis.ping();
  // 	  const res = await redis.set(index, index * index)
  //       console.log(`${index}:`, ping);
  //     }
  //   } catch (error) {}
  //   res.status(200).json({ res: users });
};

export default search;
