import * as React from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import CurrentDish from "../components/CurrentDish";
import CurrentIngredient from "../components/CurrentIngredient";
import { fetchNutrition, fetchIngredient } from "../store/nutrition";
import { ingrNameFunc, portionQuantFunc, routes } from "../utilityFunctions";
import SaveDish from "../components/SaveDish";
import { createDish, fetchWorkoutDebtForSingleDish } from "../store/dishes";
import WorkoutDebtModal from "../components/WorkoutDebtModal";


const initialLayout = { width: Dimensions.get("window").width };

class DishScreen extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {
      index: 0,
      routes: [{ key: "Dish", title: "Dish" }],
      modalOpen: false,
      workoutDebtModalOpen: false
    };
    this.renderScene = this.renderScene.bind(this);
    this.renderTabBar = this.renderTabBar.bind(this);
    this.handleIndexChange = this.handleIndexChange.bind(this);
    this.createRoutes = this.createRoutes.bind(this);
    this.onSave = this.onSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.workoutDebtHandleCancel = this.workoutDebtHandleCancel.bind(this)
    this.onPress = this.onPress.bind(this);
  }

  async fetchDataFromDbOrEdamam() {
    if (!this.props.dishNut.name && this.props.ingrNut.length < 1) {
      let ingrNameArr = ingrNameFunc(this.props.finalIngrObj);
      let portionQuantArr = portionQuantFunc(this.props.finalIngrObj);

      this.createRoutes(ingrNameArr);

      await this.props.fetchNutritionDispatch(
        this.props.name,
        this.props.imgUrl,
        this.props.finalIngrStr
      );

      await this.props.fetchIngredientDispatch(
        ingrNameArr,
        portionQuantArr,
        this.props.finalIngrStr
      );
    } else {
      this.createRoutes(this.props.ingredientNames);
    }
  }

  onPress() {
    this.setState({
      modalOpen: true,
    });
  }

  async onSave(values) {
    this.setState({
      modalOpen: false,
    });
    await this.props.createDish(this.props.dishNut, values, this.props.ingrNut);
    await this.props.fetchWorkoutDebtForSingleDish(this.props.dishNut)
    this.setState({
      workoutDebtModalOpen: true,
    });
  }

  handleCancel() {
    this.setState({
      modalOpen: false,
    });
  }

  workoutDebtHandleCancel() {
    this.setState({
      workoutDebtModalOpen: false,
    });
    return this.navigation.navigate("Meal Diary");
  }

  componentDidMount() {
    this.unsubscribe = this.navigation.addListener("focus", () => {
      this.setState({ routes: [{ key: "Dish", title: "Dish" }] });
      this.fetchDataFromDbOrEdamam();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderScene = ({ route, jumpTo }) => {
    if (route.key === "Dish") {
      return (
        <View>
          <SaveDish
            isVisible={this.state.modalOpen}
            handleCancel={this.handleCancel}
            dishNut={this.props.dishNut}
            onSave={(values) => {
              this.onSave(values);
            }}
          />
          <WorkoutDebtModal
            isVisible={this.state.workoutDebtModalOpen}
            handleCancel={this.workoutDebtHandleCancel}
            workoutDebtInfo = {this.props.workoutDebtSingleDishData}
            isSingleDish={true}
          />
          <CurrentDish
            dishNut={this.props.dishNut}
            finalIngrStr={this.props.finalIngrStr}
            ingrNut={this.props.ingrNut}
            onPress={this.onPress}
          />
        </View>
      );
    }
    for (let i = 0; i < this.props.ingrNut.length; i++) {
      if (route.key === this.props.ingrNut[i].ingredientName) {
        return (
          <CurrentIngredient ingrNut={this.props.ingrNut[i]} jumpTo={jumpTo} />
        );
      }
    }
  };

  renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#E2CA2B" }}
      style={{ backgroundColor: "black", fontFamily: "cabin" }}
      scrollEnabled={true}
    />
  );

  handleIndexChange = (newIndex) => {
    this.setState({ index: newIndex });
  };

  createRoutes = (arr) => {
    let routesObj = routes(arr);
    this.setState({
      routes: [...[{ key: "Dish", title: "Dish" }], ...routesObj],
    });
  };

  render() {
    return (
      <View style={styles.container}>
      <Image source={require("../assets/images/fit_fast_banner.png")} resizeMode={'cover'} style={styles.banner} />
      <TabView
        navigationState={{
          index: this.state.index,
          routes: this.state.routes,
        }}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
        initialLayout={initialLayout}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner:{ 
    width: '100%', 
    height: 75, 
  },
  scene: {
    flex: 1,
  },  
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const mapStateToProps = (state) => ({
  name: state.dishes.name,
  imgUrl: state.dishes.imgUrl,
  finalIngrObj: state.dishes.finalIngredients,
  finalIngrStr: state.dishes.consolidatedData,
  dishNut: state.nutrition.dishNut,
  ingrNut: state.nutrition.ingrNut,
  ingredientNames: state.nutrition.ingredientNames,
  workoutDebtSingleDishData: state.dishes.workoutDebtInfoSingleDish
});

const mapDispatchToProps = (dispatch) => ({
  fetchNutritionDispatch: (name, dishUrl, finalIngrStr) =>
    dispatch(fetchNutrition(name, dishUrl, finalIngrStr)),
  fetchIngredientDispatch: (ingrNameArr, portionQuantArr, finalIngrStr) =>
    dispatch(fetchIngredient(ingrNameArr, portionQuantArr, finalIngrStr)),
  createDish: (dishNut, formValues, ingredientArray) => {
    dispatch(createDish(dishNut, formValues, ingredientArray));
  },
  fetchWorkoutDebtForSingleDish: (dishNut) => {
    dispatch(fetchWorkoutDebtForSingleDish(dishNut));
  }

});

const ConnectedDishScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(DishScreen);
export default ConnectedDishScreen;
