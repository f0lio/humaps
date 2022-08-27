export const getCoordFromAddress = (address: string = "") => {
  //accuracy: -1 means that coordinates aren't set
  const loc = { longitude: 0, latitude: 0, accuracy: -1 };
  if (address.length == 0) loc.accuracy = -1;
  loc.longitude = 30;
  loc.latitude = -62;
  return loc;
};

export const isLocationValid = (location: any) => {
  return (
    location &&
    location.longitude !== null && // zero is valid
    location.latitude !== null
  );
};
