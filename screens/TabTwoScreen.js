import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import DateRangePicker from "rnv-date-range-picker";
import moment from "moment";
import { size } from "lodash";

export default function TabTwoScreen() {
  const [selectedRange, setRange] = useState({});
  const [shouldShow, setShouldShow] = useState(false);
  const [bardata, setBardata] = useState([]);
  const fetchBarData = async () => {
    const response = await fetch(
      "http://20.62.171.46:4000/claims/barchartanalytics"
    ).then((response) => response.json());
    if (response === undefined) {
      return null;
    } else {
      setBardata(response[0]);
    }

    //console.log(Object.keys(bardata).splice(0, 5));
  };
  let startDate = selectedRange.firstDate;
  let endDate = selectedRange.secondDate;
  const fetchFilteredBarData = async () => {
    const url = `http://20.62.171.46:4000/claims/barchartanalytics?startDate=${startDate}&endDate=${endDate}`;
    const response = await fetch(url).then((response) => response.json());
    if (response[0] === undefined) {
      return <Text>No Data</Text>;
    } else {
      setBardata(response[0]);
    }
    //console.log(Object.keys(bardata).splice(0, 5));
    console.log(response[0]);
    console.log(url);
  };
  useEffect(() => {
    fetchBarData();
    fetchFilteredBarData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <BarChart
          data={{
            labels: Object.keys(bardata).splice(0, 4),
            datasets: [
              {
                data: Object.values(bardata).splice(0, 4),
                barPercentage: 0.5,
                barRadius: 5,
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={300}
          yAxisLabel={"$"}
          verticalLabelRotation={15}
          chartConfig={{
            propsForLabels: {
              fontSize: 12,
              marginLeft: 10,
            },
            backgroundColor: "#10c9bd",
            backgroundGradientFrom: "#f2b40a",
            backgroundGradientTo: "#99f7e3",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{ borderRadius: 16 }}
        />
      </View>
      <TouchableOpacity>
        {startDate && (
          <View style={styles.appButtonContainer}>
            <Text onPress={fetchFilteredBarData} style={styles.appButtonText}>
              Filter By Date
            </Text>
          </View>
        )}
        <View style={styles.appButtonContainer1}>
          <Text onPress={fetchBarData} style={styles.appButtonText}>
            Reset
          </Text>
        </View>
        <View>
          {shouldShow ? (
            <DateRangePicker
              onSelectDateRange={(range) => {
                setRange(range);
              }}
              responseFormat="YYYY-MM-DD"
              maxDate={moment()}
              containerStyle={styles.datePickerContainer}
            />
          ) : null}
          <Button
            title="Hide/Show Date Range"
            onPress={() => setShouldShow(!shouldShow)}
          />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    justifyContent: "center",
    padding: 8,
    paddingTop: 30,
    backgroundColor: "#ecf0f1",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  datePickerContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
