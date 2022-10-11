import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, Text, StyleSheet, TextInput, View, Button, Touchable, TouchableOpacity, FlatList, ScrollView, Modal } from 'react-native'




const TodoList = ({ data, setData }) => {
    const cntId = useRef(1);
    const [inputData, setInputData] = useState("");
    const addList = () => {
        if (inputData.length > 0) {
            setData([...data, {
                id: cntId.current,
                content: inputData
            }])
            cntId.current += 1;
            setInputData("");
        } else {
            alert("1글자 이상 입력하세요")
        }
    }




    return (
        <>
            <View style={styles.flex}>
                <TextInput
                    style={styles.input}
                    value={inputData}
                    onChangeText={text => setInputData(text)}
                    autoCapitalize={'none'}
                    autoComplete={'none'}
                    placeholder={"일기를 작성하세요"}
                    />
                <TouchableOpacity style={styles.btnItem} onPress={addList}>
                    <Text style={{ color: "#fff" }}>작성하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnItem} onPress={() => { setData([]) }}>
                    <Text style={{ color: "#fff" }}>전부지우기</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.itemList}>
                    <FlatList data={data} renderItem={({ item }) => (<TodoItem item={item} setData={setData} data={data} />)} keyExtractor={item => item.id}></FlatList>
                </View>
            </ScrollView>
        </>
    )

}

const TodoItem = ({ item, data, setData }) => {
    const onDelete = (targetId) => {
        setData(data.filter(it => it.id !== targetId));
    }
    return (
        <SafeAreaView style={styles.itemBox}>
            <Text style={styles.content}>{item.content}</Text>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => { onDelete(item.id) }}><Text style={styles.deleteText}>삭제하기</Text></TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    itemList: {
    },
    flex: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 20
    },
    deleteBtn: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        marginRight: 10,
        borderRadius: 50,
    },
    deleteText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold"
    },
    itemBox: {
        width: "100%",
        backgroundColor: "#eee",
        padding: 20,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10
    },
    input: {
        width: "60%",
        height: 50,
        padding: 5,
        backgroundColor: '#61dafb',
        fontWeight: "bold",
        position: "relative",
        bottom: 0
    },
    btnItem: {
        width: "20%",
        backgroundColor: "#000",
        height: 50,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default TodoList