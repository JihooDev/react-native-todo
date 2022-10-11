import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList,Image, TouchableOpacity } from 'react-native'
import axios from 'axios'


const CoinItem = ({ item,navigation }) => {
    const IMG = `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`;
    return (
        <View style={styles.coinItem}>
            <Text style={styles.coinText}>{item.cmc_rank}</Text>
            <View style={styles.coinData}>
                <Image source={{uri : IMG}} style={{width : 30,height : 30}}/>
                <Text style={styles.coinName}>{item.name}</Text>
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate('Detail')}><Text>상세보기</Text></TouchableOpacity>
        </View>
    )
}

const CoinMarket = ({navigation}) => {

    const [data, setData] = useState([]);
    const render = ({ item }) => {
        return (
            <CoinItem item={item} />
        )
    }

    useEffect(() => {
        const dataMethod = {
            url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
            headers: {
                'X-CMC_PRO_API_KEY': '7bfb258c-22a3-4996-8bfa-433553a36690'
            }
        };

        axios(dataMethod)
            .then(res => { setData(res.data.data); })
            .catch(err => console.log(err));
    }, [])

    return (
        <View style={styles.itemBox}>
            {/* <Text style={styles.mainText}>Coin List</Text> */}
            {
                data.length > 0
                ? <FlatList data={data} renderItem={({ item }) => (<CoinItem item={item} navigation={navigation}/>)} keyExtractor={item => item.id} style={styles.coinList}/>
                : <Text style={{fontWeight : "bold", fontSize : 30}}>가져오는 중</Text>
            }
        </View>
    )
}



const styles = StyleSheet.create({
    itemBox: {
        width: "100%",
        height : "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    mainText : {
        fontSize : 30,
        padding : 10,
        fontWeight :  "bold",
        backgroundColor : "#fff",
        width : "100%",
        textAlign: "center",
    },
    coinList : {
        width : "100%",
    },
    coinItem : {
        marginVertical : 10,
        backgroundColor : "yellow",
        width : "100%",
        padding : 10,
        borderRadius : 10,
        flexDirection :"row",
        justifyContent : "space-between"
    },
    coinText : {
        color : "blue",
        fontWeight : "bold",
        width : "20%",
        fontSize : 25
    },
    coinData : {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        width : "45%"
    },
    coinName : {
        color : "#000",
        fontWeight : "bold"
    }
})

export default CoinMarket