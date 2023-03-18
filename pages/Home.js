import React, {useState,useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView,Alert } from 'react-native';
import Task from './../components/Task';
import { useHeaderHeight } from '@react-navigation/elements'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Home({navigation}) {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [username, setUsername] = useState();
  const [usernameList, setUsernameList] = useState([]);
  const [password, setPassword] = useState();
  const [passwordList,setPasswordList] = useState([]);

  const [counter,setCounter] = useState()

  useEffect( () => {

    async function getCounter(){
      let num= await AsyncStorage.getItem("counter");
      if(num===null || num===undefined)
      {
        num=1;
      }
      setCounter(num);

    }
    getCounter();
    
  }, [])
  async function handleAddTask(){
    //await AsyncStorage.setItem("counter",counter);
    Keyboard.dismiss();
    if(task===undefined || username===undefined || password===undefined)
    {
      alert("Fields cannot be left empty")
    }
    else if(task===null || username===null || password===null)
    {
      alert("Fields cannot be left empty")
    }
    else
    {
      setCounter(counter+1);
      setTaskItems([...taskItems, task])
      setUsernameList([...usernameList, username])
      setPasswordList([...passwordList, password])
      setTask(null);
      setUsername(null);
      setPassword(null);

    }
  }


  const handleCallback = (childData) =>{
    let index=childData;
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
    setUsernameList(itemsCopy)
    setPasswordList(itemsCopy)
  }


  const showTask = (index) => {
    Alert.alert("Username: "+usernameList[index]+"\n"+"Password: "+passwordList[index]);
  }


  return (
    
    <View
    style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <View style={styles.header}>
        <Text style={styles.sectionTitle}>Login Credentials</Text>
        <AntDesign name="setting" size={25} color="blue" style={styles.gear} onPress={() => navigation.navigate('NewPassword')}/>
        </View>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => showTask(index)}>
                  <Task 
                  text={item} 
                  index={index}
                  parentCallback={handleCallback}
                  
                  /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
    keyboardVerticalOffset={useHeaderHeight() + 50}
    behavior="padding" 
    
    >
      <View style={styles.writeTaskWrapper}>
      <View style={flexDirection="column"}>
        <TextInput style={styles.input} placeholder={'Name'} placeholderTextColor="#C0C0C0" value={task} onChangeText={text1 => setTask(text1)} />
        <TextInput style={styles.input} placeholder={'Username'} placeholderTextColor="#C0C0C0" value={username} onChangeText={text2 => setUsername(text2)} />
        <TextInput style={styles.input} placeholder={'Password'} placeholderTextColor="#C0C0C0" secureTextEntry={true} value={password} onChangeText={text3 => setPassword(text3)} />
        </View>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>

      
      
      
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  header: {
    flexDirection: 'row',
  },
  tasksWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
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
    borderRadius: 60,
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
  gear:{
    marginLeft:130
  }
});