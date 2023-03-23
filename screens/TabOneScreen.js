import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import React, { Component, useEffect, useState } from "react";
import Dashboard from "react-native-dashboard";
import { FontAwesome } from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { create } from "apisauce";
import {
  Box,
  FlatList,
  Center,
  NativeBaseProvider,
  Container,
} from "native-base";
import axios from "axios";
import CurrencyFormatter from "react-native-currency-formatter";

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

export default function TabOneScreen() {
  const card = ({ name }) => console.log("Card: " + name);
  let responseValue = 0;
  const [facility, setFacility] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [totalClaim, setTotalClaim] = useState(0);
  const [claimAmount, setClaimAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const fetchFacility = async () => {
    const resp = await fetch("http://20.62.171.46:4001/facility/count");
    const data = await resp.json();
    setFacility(data);
  };
  const fetchCustomer = async () => {
    const resp = await fetch("http://20.62.171.46:4002/customer/count");
    const data = await resp.json();
    setCustomer(data);
  };
  const fetchTotalClaim = async () => {
    const resp = await fetch("http://20.62.171.46:4000/claims/claimscount");
    const data = await resp.json();
    setTotalClaim(data);
  };
  const fetchClaimAmount = async () => {
    const resp = await fetch(
      "http://20.62.171.46:4000/claims/totalclaimamount"
    );
    const data = await resp.json();
    setClaimAmount(data);
  };
  const fetchPaidAmount = async () => {
    const resp = await fetch("http://20.62.171.46:4000/claims/totalpaidamount");
    const data = await resp.json();
    setPaidAmount(data);
  };
  console.log(facility, "facility");
  useEffect(() => {
    fetchFacility();
    fetchCustomer();
    fetchTotalClaim();
    fetchClaimAmount();
    fetchPaidAmount();
  }, []);
  const data = [
    {
      name: `Total Claims - ${totalClaim} `,
      background: "#3498db",
      icon: (item, background) => Icon({ icon: "book", item, background }),
      iconColor: "#0d47a1",
      rippleColor: "#000",
    },
    {
      name: `Total Facilities - ${facility} `,
      background: "#b71c1c",
      icon: (item, background) => Icon({ icon: "building", item, background }),
      styleIcon: { color: "#0d47a1" },
    },
    {
      name: `Total Customers -${customer}`,
      background: "yellow",
      icon: (item, background) => Icon({ icon: "users", item, background }),
      styleName: { color: "#0d47a1", fontWeight: "bold" },
      styleIcon: { color: "#0d47a1", fontWeight: "bold" },
    },
    {
      name: `Claimed Amount - $${claimAmount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}.00`,
      background: "#4caf50",
      icon: (item, background) => Icon({ icon: "money", item, background }),
      styleIcon: { color: "#0d47a1", fontWeight: "bold" },
    },
    {
      name: `Paid Amount - $${paidAmount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}0`,
      background: "white",
      icon: (item, background) => Icon({ icon: "dollar", item, background }),
      styleIcon: { color: "#0d47a1", fontWeight: "bold" },
      styleName: { color: "#0d47a1", fontWeight: "bold" },
    },
  ];
  //console.log(totalFacilities);
  return (
    <SafeAreaView style={styles.container}>
      <Dashboard
        data={data}
        background={true}
        card={card}
        column={2}
        rippleColor={"#3498db"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 1,
    backgroundColor: "black",
  },
});
