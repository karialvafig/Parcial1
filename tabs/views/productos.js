import React from "react";
import {View, StyleSheet, Button} from "react-native";

const ProductosView = (props) => {
    return(
        <View style={styles.container} backgroundColor="#fffff0">
            <Button title="Agregar producto" onPress={ () => props.navigation.navigate("productos_add")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff0",
        alignItems: "center",
        justifyContent: "center",
    },
    buttons: {
        flex: 1,
        backgroundColor: "#fff0",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ProductosView;