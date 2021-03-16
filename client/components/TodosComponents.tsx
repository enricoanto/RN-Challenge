import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

interface Todo {
    key: string,
    title: string,
    description: string,
    status: boolean,
    due_date: number
}
const TodosComponents = (props:Todo)=> {
   
    return (
        <View style={styles.container}>
            <Text style={styles.headText}>{props.title}</Text>
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
       backgroundColor: 'green'
    },
    headText: {
        fontSize: 25,
    }
})
export default TodosComponents