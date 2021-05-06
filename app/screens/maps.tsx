import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Screen from "../components/Screen";

const OrderDelivery = ({}): any => {
  const mapView: any = useRef();
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [fromLocation, setFromLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [toLocation, setToLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    let fromLoc = {
      latitude: 30.06656622226988,
      longitude: 31.01826904076431,
    };

    let toLoc = {
      latitude: 30.076742828798714,
      longitude: 31.017343848723375,
    };
    const mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };
    setRegion(mapRegion);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
  }, []);
  const destinationMarker = () => (
    <Marker coordinate={toLocation}>
      <Image
        source={require("../assets/icons/pin.png")}
        style={{
          width: 35,
          height: 35,
        }}
      />
    </Marker>
  );
  const carIcon = () => (
    <Marker coordinate={fromLocation} anchor={{ x: 0.5, y: 0.5 }} flat={true}>
      <Image
        source={require("../assets/icons/courier.png")}
        style={{
          width: 45,
          height: 45,
        }}
      />
    </Marker>
  );

  function renderMap() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{ flex: 1 }}
        >
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey={(process.env.GOOGLE_KEY as string) || "any"}
            strokeWidth={5}
            strokeColor={"orange"}
            optimizeWaypoints={true}
            onReady={(resutlt) => {
              console.log(resutlt);
            }}
          />
          {destinationMarker()}
          {carIcon()}
        </MapView>
      </View>
    );
  }

  return <Screen style={styles.screen}>{renderMap()}</Screen>;
};
const styles = StyleSheet.create({
  screen: {
    paddingTop: 0,
    flex: 1,
  },
});
export default OrderDelivery;
