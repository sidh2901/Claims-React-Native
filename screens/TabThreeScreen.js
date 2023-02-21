import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  SafeAreaView,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import moment from "moment";
import DateRangePicker from "rnv-date-range-picker";

export default function TabThreeScreen() {
  const [selectedRange, setRange] = useState({});
  const [shouldShow, setShouldShow] = useState(false);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {/*It is an Example of Pie Chart*/}
          <Text
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
          </Text>
          <PieChart
            data={[
              {
                name: "Paid",
                population: 215,
                color: "#019AFF",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
              {
                name: "Rejected",
                population: 280,
                color: "#FF0000",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
              {
                name: "Closed",
                population: 853,
                color: "#FF8000",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
              {
                name: "Approved",
                population: 119,
                color: "#62f518",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
            ]}
            width={Dimensions.get("window").width - 3}
            height={240}
            chartConfig={{
              backgroundColor: "#194ad1",
              backgroundGradientFrom: "#f74871",
              backgroundGradientTo: "#ffbc47",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{ marginVertical: 2, borderRadius: 16 }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <Button
            //onPress={onPressLearnMore}
            title="Generate Analytics"
            color="#eeeee"
          />
          <View>
            {shouldShow ? (
              <DateRangePicker
                onSelectDateRange={(range) => {
                  setRange(range);
                }}
                responseFormat="ll"
                maxDate={moment().toDate}
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
    marginBottom: 10,
    justifyContent: "center",
    padding: 8,
    paddingTop: 30,
    backgroundColor: "#ecf0f1",
  },
});
