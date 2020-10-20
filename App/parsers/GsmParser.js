import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const cheerio = require('react-native-cheerio')

export default class GsmParser extends Component {

    constructor(props) {
        super()
        this.baseUrl = props.url
    }

    async autocomplete(q) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        return fetch(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${q}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    async parse() {
        const searchUrl = this.baseUrl;
        const response = await fetch(searchUrl);   // fetch page
        const htm = await response.text()
        const val = await this.parseHtml(htm)
        // console.log(this.allData);
        return val
    }


    async parseHtml(html) {
        const $ = cheerio.load(html)
        let mainDiv = $("#specs-list")
        // #specs-list > table > tbody > tr > td
        const scrapedData = [];
        const tableHeaders = [];
        let vals = []
        let i = 0
        $("#specs-list > table > tbody > tr").each((index, element) => {
            const ths = $(element).find("th");
            console.log('th >>>', ths.text());

            if (ths.text() != '') {
                tableHeaders.push(ths.text())
                // tableHeaders[tableHeaders.length - 1] = vals
                // console.log(vals);
                if (tableHeaders.length > 1) {
                    scrapedData.push({ "name": tableHeaders[i], "vals": vals })
                    i += 1
                    vals = []
                }
            } else {
                const tds = $(element).find("td");
                $(tds).each((i, element) => {
                    vals.push($(element).text())
                });
            }
        });
        return scrapedData
    }

    async getDeviceInfo() {
        let brand = DeviceInfo.getBrand()
        let os = DeviceInfo.getSystemName()
        let systemVersion = DeviceInfo.getSystemVersion()
        let deviceId = await DeviceInfo.getDeviceName()

        console.log(`${brand} ${os} ${systemVersion} ${deviceId}`);
    }
}
