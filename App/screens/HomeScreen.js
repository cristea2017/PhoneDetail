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
    TouchableOpacity,
    Image,
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
            related: ['a', 'b']
        };

        this.data = []
        this.parse = new GsmParser({ url: baseUrl })
        this.devName = ""
        this.allSpecification = [""]
        this.getRelated(baseUrl)
    }
    async componentDidMount() {
        this.data = await this.parse.parse()
        // console.log('>>>', this.data);
        this.separateInfo()
    }

    getRelated = async (url) => {
        console.log(url);
        this.parse.baseUrl = url
        this.devName = url.split('.com/')[1].split('-')[0].replace(/_/g, ' ').toUpperCase()
        this.data = await this.parse.parse()
        this.separateInfo()
        this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
    }

    separateInfo() {
        this.data.map(e => {
            let vals = e.vals
            switch (e.name) {
                case "Platform":
                    this.allSpecification[0] = vals[1]
                    this.allSpecification[4] = vals[3]
                    break;
                case "Network":
                    break;
                case "Body":
                    break;
                case "Display":
                    this.allSpecification[5] = vals[3]
                    break;
                case "Memory":
                    this.allSpecification[1] = vals[3]
                    break;
                case "Main Camera":
                    this.allSpecification[2] = vals[1]
                    break;
                case "Battery":
                    this.allSpecification[3] = vals[1]
                    break;
                case "Battery":
                    break;
                default:
                    break;
            }

        })
        this.setState({})
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
                        ref='_scrollView'
                        contentInsetAdjustmentBehavior="automatic"
                        showsVerticalScrollIndicator={false}
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
                        {this.renderRelated()}
                        <View style={{ height: 30 }} />
                    </ScrollView>

                </View>
            </LinearGradient>
        );
    }
    renderRelated() {
        return (
            <View style={{ width: '100%', height: 250, marginTop: 10 }}>
                <Text style={{
                    color: 'white',
                    fontFamily: fonts['Mada-Black'],
                    fontSize: 24, marginVertical: 10
                }}>Related :</Text>
                <ScrollView
                    horizontal>
                    {this.parse.related.map(e => {
                        console.log(e);
                        return (<TouchableOpacity
                            key={e[0]}
                            onPress={() => {
                                this.getRelated('https://www.gsmarena.com/' + e[0])
                            }}
                            style={{ width: 200, height: 200, backgroundColor: 'white', margin: 4, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={{ uri: e[1] }}
                                style={{ width: '50%', height: '50%', resizeMode: 'contain' }} />
                            <View style={{ flex: 0.25 }} />
                            <Text
                                style={{
                                    color: '#4F5E70',
                                    fontFamily: fonts['Mada-Medium'],
                                    fontSize: 16, textAlign: 'center'
                                }}
                            >{e[0].replace(e[0].split('-')[1].split('PHP')[0], '').replace('-', '').replace(/_/g, ' ').toUpperCase()}</Text>
                        </TouchableOpacity>)
                    })}

                </ScrollView>
            </View>
        )
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