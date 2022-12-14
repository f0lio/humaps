import type { NextApiRequest, NextApiResponse } from "next";

import { dbConnect } from "@lib/redis";
import { createUser } from "@lib/user.service";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const { pass } = req.query;
  if (!process.env.POST_PASS || pass !== process.env.POST_PASS) {
    res.status(401).json({ message: "la" });
    return;
  }
  await dbConnect();
  try {
    const users = await createUser(req.body);
    // console.log("users", users);
    res.status(200).json({ res: users });
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500).json(error);
  }
};

export default create;
