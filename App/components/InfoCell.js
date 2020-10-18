import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import images from '../assets/images';
import fonts from '../res/fonts';



const InfoCell = (props) => {
    return (
        <View style={{
            flex: 1,
            height: 100, margin: 10, justifyContent: 'center', alignItems: 'center'
        }}>
            <Image source={images.cellBG}
                style={{ resizeMode: 'contain', aspectRatio: 317 / 77, width: '95%', height: null, position: 'absolute' }}
            />
            <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center' }}>
                <Image source={props.img}
                    style={{ resizeMode: 'contain', width: 48, height: 48, marginLeft: '3%' }}
                />
                <Text style={{
                    color: '#4F5E70', marginLeft: '5%',
                    fontFamily: fonts["PlayfairDisplay-SemiBold"],
                    fontSize: 16
                }}>{props.txt}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1
    }
});


export default InfoCell