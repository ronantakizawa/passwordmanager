import React from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const Task = (props) => {

    const handleDelete = (event) =>{
        props.parentCallback(props.index);
        event.preventDefault();
    }

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={styles.header}>{props.text}</Text>
            </View>
            <TouchableOpacity>
                <AntDesign name="closecircleo" size={20} color="red" onPress={handleDelete}/>
            </TouchableOpacity>
        </View>
    ) 
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,

    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        paddingLeft:20
    }
})

export default Task;