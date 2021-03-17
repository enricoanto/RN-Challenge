import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import Axios from 'axios'
import TodosComponents from '../components/TodosComponents'

const TodosFalseScreen = () => {
    interface Todo {
        id: number,
        title: string,
        description: string,
        status: string,
        due_date: number
    }
    interface Error {
        Error: string
    }
    const [todos, setTodos] = useState<Todo[]>([])
   useEffect(() => {
        Axios
        .get('http://localhost:3000/todos/false')
            .then(({data}) => {
                setTodos(data)
            })
            .catch(err => {
                console.log(err)
                if(err.response) {
                    console.log(err.response)
                } else if (err.request) {
                    console.log(err.request)
                } else {
                    console.log(err)
                }
            })
    }, [])

    if(todos.length === 0) {
        return <Text>Loading...</Text>
    } else {
        return (
            <View>
                <Text>Todos List</Text>
                <FlatList
            keyExtractor={todoId => (todoId.id).toString()}
            data={todos}
            renderItem={({ item }) => {
                return <TodosComponents
                id={item.id}
                title={item.title}
                description={item.description}
                status={item.status}
                due_date={item.due_date}
            ></TodosComponents>
            }} />
            </View>
        )
    }
}
export default TodosFalseScreen