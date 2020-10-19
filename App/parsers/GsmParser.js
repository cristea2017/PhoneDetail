import React, { Component } from 'react';
import { View, Text } from 'react-native';
const cheerio = require('react-native-cheerio')

export default class GsmParser extends Component {

    constructor() {
        super()
        this.baseUrl = 'https://www.gsmarena.com/google_pixel_5-10386.php'
        this.allData = []
    }

    async autocomplete(q) {
        let res = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${q.replace(' ', '+')}`)
        console.log(res.text());
        return res.text()
    }

    async parse() {
        const searchUrl = this.baseUrl;
        const response = await fetch(searchUrl);   // fetch page
        const htm = await response.text()
        const val = await this.parseHtml(htm)
        console.log(this.allData);
        return val
    }


    async parseHtml(html) {
        const $ = cheerio.load(html)
        let mainDiv = $("#specs-list")
        // #specs-list > table > tbody > tr > td
        const scrapedData = [];
        const tableHeaders = [];

        $("#specs-list > table > tbody > tr").each((index, element) => {
            const ths = $(element).find("th");
            console.log('thsssss', ths.text());
            if (ths.text() != '') {
                tableHeaders.push(
                    $(element)
                        .text()
                        .toLowerCase()
                );
            }
            const tds = $(element).find("td");
            const tableRow = {};
            $(tds).each((i, element) => {
                tableRow[tableHeaders[tableHeaders.length - 1]] = $(element).text();
                console.log('td >>>', $(element).text());
            });
            scrapedData.push(tableRow);
        });
        this.allData = scrapedData
        return scrapedData
    }

}
