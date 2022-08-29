import { useMemo } from "react";

import Image from "next/image";
import { default as MapGL, Marker, NavigationControl } from "react-map-gl";

import { useSearch } from "@contexts/index";
import { User } from "@interfaces/index";
import { getCoordFromAddress, isLocationValid } from "@lib/utils";

import "mapbox-gl/dist/mapbox-gl.css";

const formatLocation = (user: User) => {
  if (isLocationValid(user.location)) return user.location;
  else return getCoordFromAddress(user.address);
};

const UserPin = ({ user }: { user: User }) => (
  <div className=" cursor-pointer duration-200 hover:scale-125">
    <Image
      width={38}
      height={38}
      layout="fixed"
      className="h-full w-full rounded-full"
      src={user.avatar}
      alt={user.full_name || ""}
    />
  </div>
);

const Map = () => {
  const ctx = useSearch();

  const users = useMemo(
    () =>
      ctx.results?.map((user, index) => {
        const loc = formatLocation(user);
        return (
          <Marker
            key={`marker-${index}`}
            longitude={loc.longitude}
            latitude={loc.latitude}
            anchor="bottom"
            onClick={() => ctx.selectUser(user)}
          >
            <UserPin user={{ ...user, location: loc }} />
          </Marker>
        );
      }),
    [ctx]
  );
  // console.count("MAP");
  return (
    <MapGL
      initialViewState={{
        latitude: 30.959144,
        longitude: 3.14,
        zoom: 2,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.NEXT_MAPBOX_PUBLIC_TOKEN ?? ""}
    >
      <NavigationControl position="top-right" />
      {users}
    </MapGL>
  );
};

export default Map;
