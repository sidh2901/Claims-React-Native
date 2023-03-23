import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import moment from "moment";
import DateRangePicker from "rnv-date-range-picker";

export default function TabThreeScreen() {
  const [selectedRange, setRange] = useState({});
  const [shouldShow, setShouldShow] = useState(false);
  const [piedata, setPiedata] = useState([]);
  const fetchPieData = async () => {
    await fetch("http://20.62.171.46:4000/claims/analytics").then((response) =>
      response.json().then((responseJson) => setPiedata(responseJson))
    );
  };
  let startDate = selectedRange.firstDate;
  let endDate = selectedRange.secondDate;
  const fetchFilteredPieData = async () => {
    const url = `http://20.62.171.46:4000/claims/analytics?startDate=${startDate}&endDate=${endDate}`;
    await fetch(url)
      .then((response) => response.json())
      .then((responseJson) => setPiedata(responseJson));
    console.log(url);
    console.log(piedata);
  };
  console.log(piedata);
  useEffect(() => {
    fetchPieData();
    fetchFilteredPieData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {/*It is an Example of Pie Chart*/}
          {/* <Text
            style={{
              fontSize: 20,
              color: "#3373ff",
            }}>
            Start Date: {selectedRange.firstDate}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "#3373ff",
            }}>
            End Date: {selectedRange.secondDate}
          </Text> */}
          <PieChart
            data={[
              {
                name: "Approved",
                population: parseInt(piedata.map((item) => item.Approved)) || 0,
                color: "#0000CC",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
              {
                name: "Cancelled",
                population:
                  parseInt(piedata.map((item) => item.Cancelled)) || 0,
                color: "#66FFFF",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
              {
                name: "Closed",
                population: parseInt(piedata.map((item) => item.Closed)) || 0,
                color: "#FF8000",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
              {
                name: "Denied",
                population:
                  parseInt(piedata.map((item) => item["Closed - Denied"])) || 0,
                color: "#62f518",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
              {
                name: "In-Progress",
                population:
                  parseInt(piedata.map((item) => item["In Progress"])) || 0,
                color: "#FF6666",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
              {
                name: "Queued",
                population:
                  parseInt(piedata.map((item) => item["Invoice Queued"])) || 0,
                color: "#009900",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
              {
                name: "Rejected",
                population: parseInt(piedata.map((item) => item.Rejected)) || 0,
                color: "#FF1111",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
            ]}
            width={Dimensions.get("window").width}
            height={260}
            chartConfig={{
              backgroundGradientFrom: "#1E2923",
              backgroundGradientTo: "#08130D",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              decimalPlaces: 2,
              style: {
                borderRadius: 16,
              },
            }}
            style={{ marginVertical: 1, borderRadius: 16 }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <TouchableOpacity>
            {startDate && (
              <View style={styles.appButtonContainer}>
                <Text
                  onPress={fetchFilteredPieData}
                  style={styles.appButtonText}>
                  Filter By Date
                </Text>
              </View>
            )}
            <View style={styles.appButtonContainer1}>
              <Text onPress={fetchPieData} style={styles.appButtonText}>
                Reset
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            {shouldShow ? (
              <DateRangePicker
                onSelectDateRange={(range) => {
                  setRange(range);
                }}
                responseFormat="YYYY-MM-DD"
                maxDate={moment()}
              />
            ) : null}
            <Button
              title="Hide/Show Date Range"
              onPress={() => setShouldShow(!shouldShow)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appButtonContainer: {
    marginBottom: 10,
    elevation: 7,
    justifyContent: "center",
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonContainer1: {
    elevation: 8,
    backgroundColor: "blue",
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
