import React, { useState } from 'react'
import {View, Text, StyleSheet} from 'react-native'

interface Todo {
    key: string,
    title: string,
    description: string,
    status: boolean,
    due_date: number
}
const TodosComponents = (props:Todo)=> {
    const[completed, setCompleted] = useState<string>("")

    // if(!props.status) {
    //     setCompleted('Uncompleted')
    // } else {
    //     setCompleted('Comple')
    // }
   
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.titleBox}>
            <Text style={styles.titleText}>{props.title}</Text>
            <Text></Text>
                </View>
            <View style={styles.descBox}>
                <Text style={styles.descText}>{props.description}</Text>
            </View>
            <Text style={styles.date}>{props.due_date.toString().slice(0,10)}</Text>
            </View>
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
       backgroundColor: 'rgb(148,168,208)',
       marginBottom: 10,
       height: 110,
       width: 350, 
       borderRadius: 9

    },
    titleText: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 5,
        color: "rgb(50,50,50)",
    },
    descBox: {
        alignContent: 'center',
        marginHorizontal: 10,
        height:60,
        backgroundColor: 'rgb(179,229,221)',
    },
    descText: {
        marginLeft: 3,
        marginTop: 5
    },
    titleBox: {
        flexDirection: 'row'
    },
    date: {
        textAlign: 'right',
        marginRight: 10,
        marginTop: 2.5
    }
})
export default TodosComponents