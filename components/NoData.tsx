import React from "react";
import { Image, View, StyleSheet } from "react-native";

const NoData: React.FC = () => {
    return (
        <>
            <View style={ styles.container }>
                <Image style={styles.imageContainer} source={require('../assets/images/not_found.jpg')} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    imageContainer: {
        width: 200,
        height: 200,
    }
})

export default NoData;