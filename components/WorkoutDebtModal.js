import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Overlay, Button } from "react-native-elements";

const WorkoutDebtModal = (props) => {
  return (
    <Overlay
      isVisible={props.isVisible}
      width={"93%"}
      height={"75%"}
      animationType={"fade"}
      overlayBackgroundColor={"white"}
    >
      <View>
        <View>
          <Text style={styles.mainHeader}>Next Steps</Text>
        </View>

        <View style={styles.mealContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Yesterday's Caloric Values:</Text>
          </View>
          <View style={styles.wholeDishView}>
            <View style={styles.individualDishView}>
              <View style={styles.dishNameContainer}>
                <View style={styles.dishNameContainer}>
                  <Text style={styles.dishName}>
                    {props.calorieCount.calories || 0} General Calories
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.individualDishView}>
              <View style={styles.dishNameContainer}>
                <View style={styles.dishNameContainer}>
                  <Text style={styles.dishName}>
                    {props.calorieCount.fatKcal || 0} Fat Calories
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.individualDishView}>
              <View style={styles.dishNameContainer}>
                <View style={styles.dishNameContainer}>
                  <Text style={styles.dishName}>
                    {props.calorieCount.chocdfKcal || 0} CHOCDF Calories
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.mealContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Today's Workout Debt:</Text>
          </View>
          <View style={styles.wholeDishView}>
            {props.workouts.map((workout, index) => {
              return (
                <View key={index} style={styles.individualDishView}>
                  <View style={styles.dishNameContainer}>
                    <Text style={styles.dishName}>
                      {workout.name} for {workout.miles} miles or {workout.min}{" "}
                      minutes
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <Button
          title="Cancel"
          titleStyle={{
            color: "white",
            fontSize: 15,
            lineHeight: 15,
          }}
          buttonStyle={{
            backgroundColor: "#FF7F4B",
            borderRadius: 20,
            height: 35,
            width: 75,
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 12,
            marginLeft: 2.5,
          }}
          onPress={props.handleCancel}
        />
      </View>
    </Overlay>
  );
};
export default WorkoutDebtModal;

const styles = StyleSheet.create({
  mainHeader: {
    padding: 15,
    marginTop: 0,
    color: "black",
    fontSize: 24,
    fontFamily: "Avenir-Book",
    justifyContent: "center",
    alignSelf: "center",
  },
  mealContainer: {
    borderRadius: 10,
    width: 350,
    //backgroundColor: "#ffffff94",
    backgroundColor: "#faefe8",
    //opacity: 0.8,

    margin: 7,
  },
  headerText: {
    backgroundColor: "#659B0E",
    padding: 5,
    color: "white",
    fontFamily: "Avenir-Roman",
    fontSize: 20,
  },
  headerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontWeight: "bold",
    backgroundColor: "#659B0E",
    padding: 5,
    color: "white",
    fontFamily: "Avenir-Book",
  },
  wholeDishView: {
    padding: 10,
  },
  individualDishView: {
    flexDirection: "row",
    height: 35,
    marginTop: 7,
    alignItems: "center",
  },
  dishNameContainer: {
    width: 295,
  },
  dishName: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    color: "#ff7f4b",
    fontFamily: "Avenir-Book",
    fontSize: 17,
  },
});
