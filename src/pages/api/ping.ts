import type { NextApiRequest, NextApiResponse } from "next";

import { db, dbConnect } from "@lib/redis";

const ping = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });
    return;
  }
  await dbConnect();
  try {
    const ping = await db.execute(["PING"]);
    res.status(200).json({ message: ping });
  } catch (error) {
    console.log(error); ///eslint-disable-line no-console
    res.status(500).json(error);
  }
};

export default ping;
