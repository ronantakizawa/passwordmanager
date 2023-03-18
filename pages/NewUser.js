import React, {useState} from 'react';
import {StyleSheet,  View, TextInput, TouchableOpacity, Keyboard, Button,Alert,Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function NewUser({navigation}) {
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();


  const handleNewPassword = async () => {
    Keyboard.dismiss();
    if(password===undefined || confirmpassword===undefined)
    {
      alert("Fields cannot be left empty")
    }
    else if(password===null || confirmpassword===null)
    {
      alert("Fields cannot be left empty")
    }
    else if(password!==confirmpassword)
    {
      alert("Passwords don't match")
    }
    else if( await AsyncStorage.getItem("password") !== null ||  await AsyncStorage.getItem("password") !== undefined)
    {
        alert("Account already exists")
    }
    else
    {
        await AsyncStorage.setItem("password",password)
        setPassword(null);
        setConfirmPassword(null);
        Alert.alert("Password set");
        navigation.navigate('Login')
    }
  }

  return (
    
    <View
    style={styles.container}>
        <TouchableOpacity >
            <Text  style={styles.login}onPress={() => navigation.navigate('Login')}> {'Have an account >'} </Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Create Account</Text>
        <TextInput style={styles.input} secureTextEntry={true} placeholder={'New Password'} placeholderTextColor="#C0C0C0"  value={password} onChangeText={text => setPassword(text)} />
        <TextInput style={styles.input} secureTextEntry={true} placeholder={'Confirm Password'} value={confirmpassword} placeholderTextColor="#C0C0C0" onChangeText={text2 => setConfirmPassword(text2)} />
        <TouchableOpacity style={styles.appButtonContainer}>
            <Button  color="white" title="Confirm" onPress={() => handleNewPassword()}/>
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
    paddingBottom:100
  },
  tasksWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  login: {
    color:"#007bff",
    position:"relative",
    left:120,
    bottom:130
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