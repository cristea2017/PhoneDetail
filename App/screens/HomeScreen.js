import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import images from '../assets/images';
import InfoCell from '../components/InfoCell';
import fonts from '../res/fonts';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let data = ['Android 10', 'RAM 8 GB', 'FATA 10 MP \n Spate 12 + 64 + 12 MP', '4000 mAh', 'Octa-core \n Exynos 990', '6.2 \n QHD+(1420 x 3200)']
        let imgs = [images.androidIcon, images.ramIcon, images.cameraIcon, images.bateryIcon, images.procesorIcon, images.screenIcon]
        let devName = "Samsung \n Galaxy S 20"
        return (
            <LinearGradient colors={['#53C0FF', '#4390F1']} style={styles.linearGradient}>


                <View style={styles.safeArea}>
                    <View
                        style={styles.headerView}>
                        <SafeAreaView style={{ flex: 1, justifyContent: 'center', margin: 16 }}>
                            <Text style={{
                                color: 'white',
                                fontFamily: fonts["PlayfairDisplay-SemiBold"],
                                fontSize: 24
                            }}>
                                {devName}
                            </Text>
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