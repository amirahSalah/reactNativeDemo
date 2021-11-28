import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions,ScrollView } from 'react-native';
import {
  BarChart,
  PieChart,
} from "react-native-chart-kit";
import ExportExcel from "./ExportExcel";

export default class GraphsScreen extends Component {
  state = {
    //fake users collection
    users: this.props.route.params.users,

    //gender chart
    genderData:[],

    //age chart
    ageData:[10,20,30],

    //user creation
    createdUserData:[10,20,32,15,50,60,47,0,28,59,30,50]
  }

  componentDidMount(){
    //START get gender chart data
    const countMale = this.state.users.filter((obj) => obj.gender === 'Male').length;
    const countFemale = this.state.users.filter((obj) => obj.gender === 'Female').length;
    let newGenderData = [
      {
        name: "Female",
        count: countFemale,
        color: "#df78ef",
        legendFontColor: "#df78ef",
        legendFontSize: 15
      },
      {
        name: "Male",
        count: countMale,
        color: "#790e8b",
        legendFontColor: "#790e8b",
        legendFontSize: 15
      }
    ];
    this.setState({
      genderData: newGenderData
    });
    //END get gender chart data

    
    //START get age chart data
    const countAge30 = this.state.users.filter((obj) => (obj.age > 20 )&& (obj.age <= 30)).length;
    const countAge20 = this.state.users.filter((obj) => (obj.age > 10 )&& (obj.age <= 20)).length;
    const countAge10 = this.state.users.filter((obj) => (obj.age > 0 )&& (obj.age <= 10)).length;
    let newAgeData = [countAge10, countAge20, countAge30]
    this.setState({
      ageData: newAgeData
    });
    //END get age chart data

    //START get user created by every month

    //create array to collect all dates (months only) from the fake users collection
    let newUserCreationData1 = [];

    this.state.users.map((userData) => {
      let tryDate = userData.creation_date.split("/");
      newUserCreationData1.push(tryDate[1])
  });

  //create array to get count of created user every month
  let newUserCreationData2 =[];

  const fillJan = newUserCreationData1.filter((obj) => obj == "1").length;
  const fillFeb = newUserCreationData1.filter((obj) => obj == "2").length;
  const fillMar = newUserCreationData1.filter((obj) => obj == "3").length;
  const fillApr = newUserCreationData1.filter((obj) => obj == "4").length;
  const fillMay = newUserCreationData1.filter((obj) => obj == "5").length;
  const fillJun = newUserCreationData1.filter((obj) => obj == "6").length;
  const fillJul = newUserCreationData1.filter((obj) => obj == "7").length;
  const fillOgs = newUserCreationData1.filter((obj) => obj == "8").length;
  const fillSep = newUserCreationData1.filter((obj) => obj == "9").length;
  const fillOct = newUserCreationData1.filter((obj) => obj == "10").length;
  const fillNov = newUserCreationData1.filter((obj) => obj == "11").length;
  const fillDec = newUserCreationData1.filter((obj) => obj == "12").length;

  newUserCreationData2.push(fillJan, fillFeb, fillMar, fillApr, fillMay, fillJun, fillJul, fillOgs, fillSep, fillOct, fillNov, fillDec);

  this.setState({
    createdUserData: newUserCreationData2
  });
  //END get user created by every month    
  }

  render() {
  
    return (
      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 30}}>
        <Text style={styles.header}>Female vs Male</Text>
        <PieChart
          data={this.state.genderData}
          width={Dimensions.get('window').width - 16}
          height={250}
          accessor={"count"}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[0, 10]}  
        />

      <Text style={styles.header}>Age segmentation</Text>
      <BarChart
        data={{
          labels: ['0-10', '10-20', '20-30'],
          datasets: [
            {
              data: this.state.ageData,
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          fillShadowGradient:"#df78ef",
          fillShadowGradientOpacity: '.8',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Text style={styles.header}>Users created by month</Text>
      <BarChart
        data={{
          labels: ['1', '2', '3','4', '5', '6', '7', '8', '9', '10', '11', '12'],
          datasets: [
            {
              data: this.state.createdUserData,
            },
          ],
        }}
        width={Dimensions.get('window').width-16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          fillShadowGradient:"#790e8b",
          fillShadowGradientOpacity: '.8',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 0,
          borderRadius: 16,
        }}
      />

      <ExportExcel users={this.state.users}/>

      </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});