import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import React, { Component, useEffect, useState } from "react";
import Dashboard from "react-native-dashboard";
import { FontAwesome } from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { create } from "apisauce";
import { Box, FlatList, Center, NativeBaseProvider } from "native-base";

const Icon = ({ icon, item, background }) => (
  <FontAwesome
    name={icon}
    size={40}
    color={
      item.iconColor || (!item.background || !background ? "#3498db" : "#fff")
    }
    style={item.styleIcon}
  />
);
// const data = [
//   {
//     name: "Total Claims",
//     background: "#3498db",
//     icon: (item, background) => Icon({ icon: "book", item, background }),
//     iconColor: "#0d47a1",
//     rippleColor: "#000",
//   },
//   {
//     name: "Total Facilities",
//     background: "#b71c1c",
//     icon: (item, background) => Icon({ icon: "building", item, background }),
//     styleIcon: { color: "#0d47a1" },
//   },
//   {
//     name: "Total Customers",
//     background: "#4caf50",
//     icon: (item, background) => Icon({ icon: "users", item, background }),
//     styleIcon: { color: "#0d47a1", fontWeight: "bold" },
//   },
//   {
//     name: "Claim Amount",
//     background: "#4caf50",
//     icon: (item, background) => Icon({ icon: "money", item, background }),
//     styleName: { color: "#0d47a1", fontWeight: "bold" },
//   },
//   {
//     name: "Paid Amount",
//     nameColor: "#3498db",
//     background: "#02cbef",
//     icon: (item, background) => Icon({ icon: "dollar", item, background }),
//     styleName: { color: "#0d47a1", fontWeight: "bold" },
//   },
// ];
export default function TabOneScreen() {
  const card = ({ name }) => console.log("Card: " + name);
  const [data, setData] = useState([]);
  const api = create({
    baseURL: "https://api.sampleapis.com/coffee",
  });
  const fetchData = () => {
    //make request to baseURL + 'hot'
    api
      .get("/hot")
      .then((response) => response.data)
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Dashboard
        data={data}
        background={true}
        card={card}
        keyExtractor={(item) => item.id.toString()}
        column={2}
        rippleColor={"#3498db"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
