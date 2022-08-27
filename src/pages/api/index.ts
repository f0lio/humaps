import { db, dbConnect } from "@lib/redis";

const getAll = async () => {
  await dbConnect();

  const x = await db.set("me-name", "hola");

  const res = await db.get("me-name");
  console.log({ res });
  //   try {
  //     for (let index = 0; index < 100; index++) {
  //       const ping = await redis.ping();
  // 	  const res = await redis.set(index, index * index)
  //       console.log(`${index}:`, ping);
  //     }
  //   } catch (error) {}
  return JSON.stringify({
    name: "Hi",
  });
};

export default getAll;
