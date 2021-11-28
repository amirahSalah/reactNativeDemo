import React, { Component } from 'react';

//react native components used
import { View, Text, StyleSheet, FlatList } from 'react-native';

//material components
import { Button, TextInput} from "react-native-paper";

//react native dropdown
import SelectDropdown from 'react-native-select-dropdown'

//fake users collection
import mocker from 'mocker-data-generator';




//START fake users collection using "mocker-data-generator"
  var user = {
    user_id:{
      faker: 'datatype.number'
    },
    first_name: {
        faker: 'name.firstName'
    },
    last_name: {
        faker: 'name.lastName'
    },
    full_name: {
      function: function() {
          return (
              this.object.first_name +
              " "+
              this.object.last_name 
          )
      }
    },
    gender: {
      chance: 'gender'
    },
    number_of_messages:{
      chance: 'integer({"min": 1, "max": 100})'
    },
    age:{
      chance: 'age'
    },
    creation_date: {
      chance: 'date({"string": true, "american": false, "year": 2021})',
    },
    
  }
  // Using traditional callback Style to return my fake users 
  let myUsers = mocker()
    .schema('user', user, 1000)
    .build(function(error, data) {
        if (error) {
            throw error
        }
        //console.log(data);
        //console.log(util.inspect(data.user)); 
        
        return data.user;
  });
//END fake users collection using "mocker-data-generator"

export default class QueryScreen extends Component {
  
  state = {
    //fake users collection
    user: myUsers,

    //selected values
    userDataSelected: '',
    operatorSelected: '',
    valueFilled: '',

    //filter array
    filteredArray: [],
  }

  //START create query array
  createQueryArray = () => {

    //reset filter array with search click
    this.setState({
      filteredArray: []
    });

    //create array to push filtered value in
    let newArray = [];

    //get values from filter form
    let userDataSelected = this.state.userDataSelected;
    let operatorSelected = this.state.operatorSelected;
    let valueFilled = this.state.valueFilled;


    //filter users collection
    this.state.user.map((userData) => {
      console.log(userData);

      //condition to catch each operator type
      if(operatorSelected == '=='){
        if(userData[userDataSelected] == valueFilled){
          newArray.push(userData);
        }
      }else if(operatorSelected == '!='){
        if(userData[userDataSelected] != valueFilled){
          newArray.push(userData);
        }
      }else if(operatorSelected == '>'){
        if(userData[userDataSelected] > valueFilled){
          newArray.push(userData);
        }
      }else if(operatorSelected == '<'){
        if(userData[userDataSelected] < valueFilled){
          newArray.push(userData);
        }
      }else if(operatorSelected == 'startsWith'){
        if(userData[userDataSelected].startsWith(valueFilled)){
          newArray.push(userData);
        }
      }else if(operatorSelected == 'endsWith'){
        if(userData[userDataSelected].endsWith(valueFilled)){
          newArray.push(userData);
        }
      }else if(operatorSelected == 'includes'){
        if(userData[userDataSelected].includes(valueFilled)){
          newArray.push(userData);
        }
      }else if(operatorSelected == '==='){
        if(userData[userDataSelected] === valueFilled){
          newArray.push(userData);
        }
      }
    });

    //fill original filtered states to render it later
    this.setState({
      filteredArray: newArray
    });
  }
  //END create query array


  //START render list items
  renderFlatItems = (item) => {
    <View><Text>{item.first_name}</Text></View>
  }
  renderSeparator = () => {  
    return (  
        <View  
            style={{  
                height: 1,  
                width: "100%",  
                backgroundColor: "#ccc",
                marginBottom:3,
                marginTop:3  
            }}  
        />  
    );  
  }; 
  //END render list items
  
  render() {

    //bring user data from my fake api
    const userData = Object.keys(this.state.user[0]);
    const operators = ["==", "!=", ">", "<", "startsWith", "endsWith", "includes", "==="];
   
    
    return (
        <View style={styles.parentStyle}>

            {/* START navigation to graphs page */}
            <Button
            onPress={() => this.props.navigation.navigate('Graphs',{
              users: this.state.user,
            })}
            >Go to Graphical Reports </Button>
            {/* END navigation to graphs page */}

            {/* START collecting filter options */}
            <View style={styles.filterRow}>
              <SelectDropdown
                data={userData}
                defaultButtonText={"Select User data"}
                onSelect={(selectedItem, index) => this.setState({userDataSelected:selectedItem})}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}            
                buttonStyle={styles.dropdown3BtnStyle}              
              />
              <SelectDropdown
                data={operators}
                defaultButtonText={"Select operator"}
                onSelect={(selectedItem, index) => this.setState({operatorSelected:selectedItem})}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}            
                buttonStyle={styles.dropdown3BtnStyle}              
              />

              <TextInput mode="outlined" label="value" value={this.state.valueFilled} onChangeText={text => this.setState({valueFilled:text})}/>

              <Button style={{marginTop: 10}} mode="contained" onPress={() => this.createQueryArray()}>
                Search
              </Button>
            </View>
            {/* END collecting filter options */}
            

            {/* dummy list */}
            <View style={styles.resultRow}>
              <Text style={{fontWeight: "bold", marginBottom: 5}}>Found: {this.state.filteredArray.length} Results..</Text> 
             <FlatList            
              data={this.state.filteredArray}
              renderItem={({item}) => 
                <View style={styles.listStyle}>
                  <Text>User ID: {item.user_id}</Text>
                  <Text>First Name: {item.first_name}</Text>
                  <Text>Last Name: {item.last_name}</Text>
                  <Text>Age: {item.age}</Text>
                  <Text>Gender: {item.gender}</Text>
                  <Text>NO.MSGS: {item.number_of_messages}</Text>
                  <Text>Creation Date: {item.creation_date}</Text>
                </View>
              }
              ItemSeparatorComponent={this.renderSeparator}  
            /> 
            </View>
        </View>
    )
  }

  
  
}
const styles = StyleSheet.create({
    parentStyle: {
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      padding: 15,
    },
    dropdown3BtnStyle: {
      width: "100%",
      height: 55,
      alignSelf: "flex-start",
      backgroundColor: "#fff",
      paddingHorizontal: 0,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: "#999",
      fontSize: "12px",
      marginBottom: 5
    },
    filterRow:{
      width: "100%",
      flex: 3,
      backgroundColor: "#eee",
      flexDirection: "column"
    },
    resultRow:{
      width: "100%",
      flex:3,
      backgroundColor: "#eee",
      flexDirection: "column"
    },
    listStyle:{
      borderWidth: 1,
      borderRadius: 4,
      borderColor: "#673ab7",
      padding: 10,
    }
});