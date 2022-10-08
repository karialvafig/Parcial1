import { Button, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase";

const auth = getAuth();

export function HomeView() {
    const navigation = useNavigation();

    return <View style={styles.background}>
        <View>
        
        <Text>Sunshine Boutique</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Pedidos")}>
            <Text style={styles.textbutton}>Visualizar pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Agregar")}>
            <Text style={styles.textbutton}>Agregar pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => signOut(auth)}>
            <Text style={styles.textbutton}>Cerrar sesión</Text>
        </TouchableOpacity>

        

    </View>
    </View>
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:"#d97706"
    },

    button:{
        paddingHorizontal:20,
        paddingVertical:10,
        width: 300,
        backgroundColor: "#b91c1c",
        borderRadius: 10,
        marginHorizontal: "auto",
        marginVertical: 10,
        display: "flex",
        justifyContent:"center",
        elevation: 5,
    },

    textbutton:{
        alignSelf: "center",
        color: "white",
       }
})