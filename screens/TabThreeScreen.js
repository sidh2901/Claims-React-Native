import * as React from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default function TabThreeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {/*It is an Example of Pie Chart*/}
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              padding: 16,
              marginTop: 16,
            }}>
            Pie Chart
          </Text>
          <PieChart
            data={[
              {
                name: "Seoul",
                population: 21500000,
                color: "#b81ff0",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
              {
                name: "Toronto",
                population: 2800000,
                color: "#f2f763",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
              {
                name: "New York",
                population: 8538000,
                color: "#f51818",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
              {
                name: "Moscow",
                population: 11920000,
                color: "#62f518",
                legendFontColor: "#050505",
                legendFontSize: 15,
              },
            ]}
            width={Dimensions.get("window").width - 16}
            height={220}
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
            style={{ marginVertical: 8, borderRadius: 16 }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    paddingTop: 30,
    backgroundColor: "#ecf0f1",
  },
});
