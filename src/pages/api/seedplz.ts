import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

import { dbConnect, dbDisconnect } from "@lib/redis";
import { createUser } from "@lib/user.service";
import { User } from "interface";

const seedplz = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pass, count } = req.query;
  if (pass !== "plz") {
    res.status(401).json({ message: "la" });
    return;
  } else if (count === undefined || Number(count) < 1 || Number(count) > 1e4) {
    res.status(401).json({ message: `invalid count ${count}` });
    return;
  }

  try {
    await dbConnect();
    const limit = Number(count);
    const requests = [];
    for (let i = 0; i < limit; i++) {
      const user = generateUser(i);
      const newUser = await createUser(user);
      requests.push(newUser);
    }

    const promises = await Promise.all(requests);
    // console.log({ promises });
    // console.log(requests.length);
    const createdRecords = requests.length;

    res.status(200).json({ message: `created ${createdRecords} user(s)` });
  } catch (error) {
    console.log(error);
    await dbDisconnect();
    res.status(500).json(error);
  }
};

const generateUser = (index: number): User => {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    middle_name: faker.name.middleName(),
    username: faker.internet.userName(),
    bio: `[${index}] ${faker.name.jobTitle()}`,
    address: faker.address.streetAddress(true),
    /*
     ** [/redis-om/dist/index.js:1301:15] throw error when
     ** if (Math.abs(latitude) > 85.05112878 || Math.abs(longitude) > 180)
     */
    location: {
      latitude: Number(faker.address.latitude(85, -85, 4)),
      longitude: Number(faker.address.longitude(180, -180, 4)),
    },
    avatar: faker.internet.avatar(), //https://cloudflare-ipfs.com
    dob: new Date(faker.date.birthdate({ min: 13, max: 144, mode: "age" })),
  };
};

export default seedplz;
