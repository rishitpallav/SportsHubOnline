import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
const Viewonmap = ({ latitude, longitude, name }) => {
  console.log("Latitude:", Number(latitude));
  console.log("Longitude:", Number(longitude));
  return (
    <div>
      <APIProvider apiKey={"AIzaSyBJ0yaS3yc3UA3pVhVYQKNzY1-Sv2baUJA"}>
        <div style={{ height: "70vh" }}>
          <Map
            viewState={{
              latitude: Number(latitude),
              longitude: Number(longitude),
              zoom: 12,
            }}
            mapId={"7106467ae866b182"}
          >
            <AdvancedMarker
              position={{ lat: Number(latitude), lng: Number(longitude) }}
            >
              <Pin background={"Red"} glyphColor={"Black"}>
                <h9>{name}</h9>
              </Pin>
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};
export default Viewonmap;
