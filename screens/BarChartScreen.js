import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button,
  Switch,
} from "react-native";
import { useState, useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import DateRangePicker from "rnv-date-range-picker";
import moment from "moment";
import { size } from "lodash";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function BarChartScreen() {
  const [selectedRange, setRange] = useState({});
  const [shouldShow, setShouldShow] = useState(false);
  const [useFirstData, setUseFirstData] = useState(true);
  const [bardata, setBardata] = useState([]);
  const [selectedBarValue, setSelectedBarValue] = useState(null);

  const handleBarPress = (value) => {
    setSelectedBarValue(value);
  };

  const fetchData = async () => {
    const response = await fetch(
      "http://20.62.171.46:4000/claims/barchartanalytics"
    ).then((response) => response.json());
    if (response === undefined) {
      return null;
    } else {
      setBardata(response[useFirstData ? 0 : 1]);
    }
  };

  const fetchFilteredData = async () => {
    const url = `http://20.62.171.46:4000/claims/barchartanalytics?startDate=${selectedRange.firstDate}&endDate=${selectedRange.secondDate}`;
    const response = await fetch(url).then((response) => response.json());
    if (response[useFirstData ? 0 : 1] === undefined) {
      setBardata([]);
    } else {
      setBardata(response[useFirstData ? 0 : 1]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [useFirstData]);

  const handleFilterByDate = () => {
    if (selectedRange.firstDate && selectedRange.secondDate) {
      fetchFilteredData();
    }
  };

  const handleReset = () => {
    setRange({});
    setShouldShow(false);
    fetchData();
  };

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
                key: "dataset-1", // unique key value
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={300}
          yAxisLabel={"$"}
          legend={"Customers"}
          verticalLabelRotation={15}
          chartConfig={{
            propsForLabels: {
              fontSize: 13,
              marginLeft: 10,
            },
            legend: ["Legend Title"],
            backgroundColor: "#00000",
            backgroundGradientFrom: "#f2b40a",
            backgroundGradientTo: "#99f7e3",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            valueAccessor: ({ item }) => {
              return `$${item}`;
            },
          }}
          style={{ borderRadius: 16 }}
          onPress={(value) => handleBarPress(value)}
        />
        <View style={styles.toggleContainer}>
          {/* <Text style={styles.toggleLabel}>Toggle:</Text> */}
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={useFirstData ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setUseFirstData(!useFirstData)}
            value={useFirstData}
          />
          <Text style={styles.toggleText}>
            {useFirstData ? "Closed Claims" : "Open Claims"}
          </Text>
        </View>

        {selectedBarValue && (
          <View
            style={{
              position: "absolute",
              backgroundColor: "white",
              padding: 8,
              borderRadius: 4,
              borderColor: "gray",
              borderWidth: 1,
              top: selectedBarValue.y - 40,
              left: selectedBarValue.x,
            }}>
            <Text>{`$${selectedBarValue.value}`}</Text>
          </View>
        )}
      </View>

      <View>
        {selectedRange.firstDate && (
          <TouchableOpacity style={styles.appButtonContainer}>
            <Text onPress={handleFilterByDate} style={styles.appButtonText}>
              Filter By Date
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.appButtonContainer1}>
          <Text onPress={handleReset} style={styles.appButtonText}>
            Reset
          </Text>
        </TouchableOpacity>
        {shouldShow && (
          <DateRangePicker
            onSelectDateRange={setRange}
            responseFormat="YYYY-MM-DD"
            maxDate={moment()}
            containerStyle={styles.datePickerContainer}
          />
        )}
        <Button
          title={shouldShow ? "Hide Date Range" : "Show Date Range"}
          onPress={() => setShouldShow(!shouldShow)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: windowHeight * 0.02,
    justifyContent: "center",
    padding: windowWidth * 0.02,
    backgroundColor: "#ecf0f1",
  },
  title: {
    fontSize: windowWidth * 0.06,
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
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    //marginBottom: 20,
  },
  toggleLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  toggleText: {
    marginLeft: 10,
    fontSize: 16,
  },
  datePickerContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: windowWidth * 0.03,
    padding: windowWidth * 0.03,
  },
});
