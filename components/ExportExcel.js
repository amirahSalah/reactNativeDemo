import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';

//material components
import { Button} from "react-native-paper";

//
var RNFS = require("react-native-fs");
import XLSX from "xlsx";


// function to handle exporting

export default class ExportExcel extends Component {
  state = {
    users: this.props.users,
    usersToExcel:[]
  }

  componentDidMount(){
    //sort users first to be ready later for eporting
    const myData = [].concat(this.state.users)
    .sort((a, b) => a.number_of_messages < b.number_of_messages ? 1 : -1);

    this.setState({
        usersToExcel: myData
    });
  }

  exportDataToExcel = () => {
    let user_data_to_export = this.state.usersToExcel;
    console.log('user_data_to_export');
    console.log(user_data_to_export);
    
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(user_data_to_export);
    XLSX.utils.book_append_sheet(wb,ws,"Users");

    //binary file
    const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
    //download
    RNFS.writeFile(wbout, "StudentData.xlsx");

}

  render() {
  
    return (
      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <Text style={styles.header}>Users sorted by number of messages</Text>

        <Button
            onPress={() => this.exportDataToExcel()}
            >Download Excel </Button>

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