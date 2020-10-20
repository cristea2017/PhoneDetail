import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import images from '../assets/images';
import InfoCell from '../components/InfoCell';
import GsmParser from '../parsers/GsmParser';
import fonts from '../res/fonts';

const baseUrl = 'https://www.gsmarena.com/apple_iphone_12_pro_max-10237.php'

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autocomplete: [],

        };

        this.data = []
        this.parse = new GsmParser({ url: baseUrl })
        this.devName = baseUrl.split('.com/')[1].split('-')[0].replaceAll('_', " ").toUpperCase()
        this.allSpecification = [""]
    }
    async componentDidMount() {
        this.data = await this.parse.parse()
        console.log('>>>', this.data);
        this.separateInfo()
    }


    separateInfo() {
        this.data.map(e => {
            let vals = e.vals
            switch (e.name) {
                case "Platform":
                    // this.addElem(vals[1])
                    this.allSpecification[0] = vals[1]
                    this.allSpecification[4] = vals[3]
                    break;
                case "Network":
                    // this.addElem(vals[1])
                    break;
                case "Body":
                    // this.addElem(vals[1])
                    break;
                case "Display":
                    // this.addElem(vals[1])
                    this.allSpecification[5] = vals[3]
                    break;
                case "Memory":
                    // this.addElem(vals[1])
                    this.allSpecification[1] = vals[3]
                    break;
                case "Main Camera":
                    // this.addElem(vals[1])
                    this.allSpecification[2] = vals[1]
                    break;
                case "Battery":
                    // this.addElem(vals[1])
                    this.allSpecification[3] = vals[1]
                    break;
                case "Battery":
                    // this.addElem(vals[1])
                    break;
                default:
                    break;
            }

        })
        this.setState({})
    }

    addElem(e) {
        this.allSpecification.push(e)
    }

    render() {
        // let data = ['Android 10', 'RAM 8 GB', 'FATA 10 MP \n Spate 12 + 64 + 12 MP', '4000 mAh', 'Octa-core \n Exynos 990', '6.2 \n QHD+(1420 x 3200)']
        let data = this.allSpecification
        let imgs = [Platform.OS == 'android' ? images.androidIcon : images.iosIcon, images.ramIcon, images.cameraIcon, images.bateryIcon, images.procesorIcon, images.screenIcon]
        return (
            <LinearGradient colors={['#53C0FF', '#4390F1']} style={styles.linearGradient}>
                <View style={styles.safeArea}>
                    <View
                        style={styles.headerView}>
                        <SafeAreaView style={{ flex: 1, justifyContent: 'center', margin: 16 }}>
                            <Text style={{
                                color: 'white',
                                fontFamily: fonts['Mada-Black'],
                                fontSize: 24
                            }}>
                                {this.devName}
                            </Text>
                            {/* <TextInput
                                style={{
                                    width: 200, height: 30,
                                    backgroundColor: 'white',
                                    borderRadius: 10, alignSelf: 'center'
                                }}
                                onChangeText={(e) => {
                                    this.parse.autocomplete(e).then(res => {
                                        let j = JSON.parse(res)
                                        console.log('asdasda', j);
                                        this.setState({ autocomplete: j[1] })
                                    })

                                }}
                            /> */}
                        </SafeAreaView>
                    </View>

                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                    >
                        {data.map(e => {
                            return (
                                <InfoCell
                                    key={e}
                                    txt={e}
                                    img={imgs[data.indexOf(e)]}
                                />
                            )
                        })}
                    </ScrollView>
                </View>
            </LinearGradient>
        );
    }
}



const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    }, headerView: {
        aspectRatio: 375 / 130,
        width: '100%',
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
});