import * as React from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import Moment from "moment";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { logout } from "../store/user";
import { capitalize } from "../utilityFunctions";

class HomeScreen extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = async () => {
    this.props.logoutDispatch();
  };

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/fit_fast_background.jpg")}
          style={styles.image}
        >
          <Image source={require("../assets/images/fit_fast_banner.png")} resizeMode={'cover'} style={styles.banner} />
          <View style={styles.userContainer}>
            <Text style={styles.header}>Welcome, {user.name}!</Text>

            <View style={styles.textContainer}>
              <View style={styles.textInnerContainer}>
                <Text style={styles.subHeader}>Sex: </Text>
                <Text style={styles.text}>
                  {" "}
                  {user.sex ? capitalize(user.sex) : ""}
                </Text>
              </View>

              <View style={styles.birthday}>
                <Text style={styles.subHeader}>Birthday: </Text>
                <Text style={styles.text}>
                  {Moment(user.birthdate).format("MMMM Do, YYYY")}
                </Text>
              </View>

              <View style={styles.textInnerContainer}>
                <Text style={styles.subHeader}>Height: </Text>
                <Text style={styles.text}>
                  {" "}
                  {Math.floor(user.height / 12)} ft {user.height % 12} in
                </Text>
              </View>

              <View style={styles.textInnerContainer}>
                <Text style={styles.subHeader}>Weight: </Text>
                <Text style={styles.text}> {user.weight} lbs </Text>
              </View>

              <Text style={styles.subHeader}>Dietary Preference: </Text>
              <View style={styles.dietPrefContainer}>
                {user.dietaryPreference &&
                user.dietaryPreference.length >= 1 ? (
                  user.dietaryPreference.map((el, ind) => {
                    return (
                      <Text
                        key={ind.toString() + Math.random().toString()}
                        style={styles.dietPref}
                      >
                        - {el === "glutenFree" ? "Gluten Free" : ""}
                        {el === "dairyFree" ? "Dairy Free" : ""}
                        {el === "vegan" ? "Vegan" : ""}
                        {el === "vegetarian" ? "Vegetarian" : ""}
                        {el === "lowCarb" ? "Low Carb" : ""}
                        {el === "lowFat" ? "Low Fat" : ""}
                      </Text>
                    );
                  })
                ) : (
                  <Text style={styles.nodietPref}>N/A</Text>
                )}
              </View>
            </View>

            <View>
              <Button
                title="LOG OUT"
                onPress={this.handleLogout}
                color="black"
                titleStyle={{
                  color: "white",
                  fontSize: 15,
                  lineHeight: 15,
                }}
                buttonStyle={{
                  backgroundColor: "#FF7F4B",
                  opacity: 1,
                  borderRadius: 20,
                  height: 35,
                  width: 190,
                  justifyContent: "center",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  banner:{ 
    width: '100%', 
    height: 75, 
    position:'absolute', 
    top: 50 
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  userContainer: {
    backgroundColor: "white",
    opacity: 0.85,
    width: 280,
    height: 430,
    marginTop: 40,
    alignItems: "center",
    borderRadius: 30,
  },
  header: {
    fontFamily: "cabin",
    fontSize: 30,
    marginTop: 50,
    padding: 5,
    alignSelf: "center",
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 18,
    fontFamily: "cabin",
  },
  text: {
    fontFamily: "cabin",
    alignSelf: "center",
  },
  textContainer: {
    width: 245,
    height: 230,
    justifyContent: "center",
  },
  textInnerContainer: {
    flexDirection: "row",
  },
  birthday: {
    flexDirection: "row",
  },
  dietPrefContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dietPref: {
    fontFamily: "cabin",
    fontSize: 14,
    marginLeft: 4,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 2,
  },
  nodietPref: {
    fontFamily: "cabin",
    fontSize: 14,
    paddingTop: 2,
  },
  list: {
    fontSize: 13,
    fontFamily: "cabin",
    backgroundColor: "black",
    color: "white",
    margin: 5,
    padding: 8,
    paddingLeft: 9,
    width: 110,
    height: 35,
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  logoutDispatch: () => dispatch(logout()),
});

const ConnectedHomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
export default ConnectedHomeScreen;
