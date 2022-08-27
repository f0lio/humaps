import {
  default as MapGL,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useSearch } from "@contexts/index";

import { useMemo, useState } from "react";

import { getCoordFromAddress, isLocationValid } from "@lib/utils";
import { User } from "interface";

const formatLocation = (user: User) => {
  if (isLocationValid(user.location)) return user.location;
  else return getCoordFromAddress(user.address);
};

const UserPin = ({ user }: { user: User }) => (
  <div className="h-9 w-9">
    <img src={user.avatar} className="h-full w-full rounded-full" />
  </div>
);

const Map = () => {
  const searchContext = useSearch();

  // const onHover = useCallback(event => {
  //   const {
  //     features,
  //     point: {x, y}
  //   } = event;
  //   const hoveredFeature = features && features[0];

  //   // prettier-ignore
  //   setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  // }, []);

  const [userInfo, setUserInfo] = useState<User>({});

  const users = useMemo(
    () =>
      searchContext.results?.map((user, index) => {
        const loc = formatLocation(user);
        return (
          <Marker
            key={`marker-${index}`}
            longitude={loc.longitude}
            latitude={loc.latitude}
            anchor="bottom"
            onClick={(e) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              setUserInfo({ ...user, location: loc });
            }}
          >
            <UserPin user={{ ...user, location: loc }} />
          </Marker>
        );
      }),
    [searchContext.results]
  );
  console.count("MAP");
  return (
    <MapGL
      initialViewState={{
        latitude: 30.959144,
        longitude: 3.14,
        zoom: 2,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.NEXT_MAPBOX_PUBLIC_TOKEN ?? ""}
      // interactiveLayerIds={['data']}
      // onMouseMove={onHover}
    >
      <NavigationControl position="top-right" />

      {/* <Source type="geojson" data={data}>
        <Layer {...dataLayer} />
      </Source> */}

      {users}

      {userInfo && (
        <Popup
          anchor="top"
          // longitude={Number(userInfo.location?.longitude)}
          // latitude={Number(userInfo.location?.latitude)}
          longitude={30}
          latitude={30}
          onClose={() => setUserInfo({})}
          // className="popup-custom"
        >
          <img src={userInfo.avatar} className="h-full rounded-full" />
          <div className="border border-red-600 bg-green-400 p-3">
            {userInfo.first_name} {userInfo.last_name}
          </div>
        </Popup>
      )}
    </MapGL>
  );
};

export default Map;
