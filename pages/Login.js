import React, {useState} from 'react';
import {StyleSheet,  View, TextInput, TouchableOpacity, Keyboard, Button,Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login({navigation}) {
  const [password, setPassword] = useState();
  const [counter,setCounter] = useState(5);

  


  const handleLogin = async (event) => {
    Keyboard.dismiss();
    if(counter===0)
    {
      alert("Exceeded maximum tries. \n Try again tomorrow");
    }
    else if(await AsyncStorage.getItem("password")==null || await AsyncStorage.getItem("password")==undefined)
    {
      alert("You haven't created an account yet");

    }
    else if(password!==await AsyncStorage.getItem("password"))
    {
      alert("Incorrect Username or password. \n Tries: "+counter);
      setCounter(counter-1);
    }
    else 
    {
        navigation.navigate('Home')
    }
  }

  return (
    
    <View
    style={styles.container}>
      <Text style={styles.sectionTitle}>Password Manager</Text>
        <TextInput style={styles.input} secureTextEntry={true} placeholder={'Password'} placeholderTextColor="#C0C0C0" value={password} onChangeText={text => setPassword(text)} />
        <TouchableOpacity style={styles.appButtonContainer}>
            <Button  color="white" title="Login" onPress={() => handleLogin()}/>
        </TouchableOpacity>
    </View>
        
      
      
          
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasksWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom:30
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'relative',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250, //250
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize:20,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    position:'relative',
    top:50
  },
});