import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "@interfaces/index";
import { dbConnect, dbDisconnect } from "@lib/redis";
import { createUser } from "@lib/user.service";

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
      const user = generateUser();
      const newUser = await createUser(user);
      requests.push(newUser);
    }

    const promises = await Promise.all(requests);
    // console.log({ promises });
    // console.log(requests.length);
    const createdRecords = requests.length;

    res.status(200).json({ message: `created ${createdRecords} user(s)` });
  } catch (error) {
    // console.log(error);
    await dbDisconnect();
    res.status(500).json(error);
  }
};

const generateUser = (): User => {
  const user: User = {
    full_name: faker.name.fullName(),

    bio: faker.name.jobTitle(),
    address: faker.address.streetAddress(true),
    phone: faker.phone.number(),
    username: "",
    github: "",
    linkedin: "",
    twitter: "",
    website: "",

    /*
     ** [/redis-om/dist/index.js:1301:15] throw error when
     ** if (Math.abs(latitude) > 85.05112878 || Math.abs(longitude) > 180)
     */
    location: {
      latitude: Number(faker.address.latitude(85, -85, 4)),
      longitude: Number(faker.address.longitude(180, -180, 4)),
    },
    avatar: faker.internet.avatar(), //https://cloudflare-ipfs.com
    dob: faker.date.birthdate({ min: 13, max: 144, mode: "age" }),
  };

  const first_name = user.full_name.split(" ")[0];
  const last_name = user.full_name.split(" ")[1];
  user.username = faker.internet.userName(first_name, last_name);
  user.github = `https://www.github.com/${user.username}`;
  user.linkedin = `https://www.linkedin.com/in/${user.username}`;
  user.twitter = `https://www.twitter.com/${user.username}`;
  user.website = `https://www.${user.username.replace(".", "-")}.me`;

  return user;
};

export default seedplz;
