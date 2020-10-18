
import { StyleSheet } from 'react-native'


const colors = {
    main: "#5ea23a",
    text: "#696969",
    starRating: "#2bdf85",
    location: "#a9a9a9",
    white: "white",
    facebook: "#4267b2",
    blue: "#3293fe"
}


const AppStyles = {
    borderRadius: {
        main: 25,
        small: 5
    },
    navBar: {
        shadowColor: 'transparent',
        backgroundColor: colors.description
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.description
    }
}


const h1 = StyleSheet.create({
    h1: {
        fontSize: 15,
        backgroundColor: 'red'
    }
})


export { AppStyles, h1, colors } 