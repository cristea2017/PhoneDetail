import React, { Component } from 'react';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import GsmParser from './GsmParser';


export default class DeviceModel {
    constructor() {
        this.parse = new GsmParser()
        this.parse.parse().then(e => {
            console.log('after parse ', e);
        })
    }

    async getDeviceInfo() {
        let brand = DeviceInfo.getBrand()
        let os = DeviceInfo.getSystemName()
        let systemVersion = DeviceInfo.getSystemVersion()
        let deviceId = await DeviceInfo.getDeviceName()

        console.log(`${brand} ${os} ${systemVersion} ${deviceId}`);
    }

}
