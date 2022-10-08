import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Touchable, TouchableOpacity, LogBox, Image} from "react-native";
import { getAuth, signInWithEmailAndPassword,} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { app } from "../../firebase";

export function LoginView() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation();

    function iniciarSesion() {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate("Home")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            });
    }

    return <View style={styles.background}>
        <View style={styles.container}>
        <Image source={require("../../assets/logo.jpg")} style={styles.image}/>
        <View>

            <Text style={styles.title}>Iniciar sesión</Text>

            <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} />
            <TextInput style={styles.input} placeholder="Contraseña" onChangeText={(text) => setPassword(text)} secureTextEntry />
            <TouchableOpacity style={styles.button} onPress={iniciarSesion} >
                <Text style={styles.textbutton}>Iniciar Sesión</Text>
            </TouchableOpacity>
        </View>
    </View>
    </View>
}

const styles = StyleSheet.create({
    title:{
        marginVertical: 15,
        fontSize: 30,

    },
    background:{
        flex:1,
        backgroundColor:"#d97706"
    },
    image:{
        width:150,
        height:150,
        borderRadius: 100,

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
    },

   button:{
        paddingHorizontal:20,
        paddingVertical:10,
        width: 150,
        backgroundColor: "#b91c1c",
        borderRadius: 10,
        marginHorizontal: "auto",
        display: "flex",
        justifyContent:"center",
        elevation: 5,
   }, 

   container:{
    width: 350,
    marginHorizontal: 70,
    marginTop: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#92400e",
    padding: 70,
    backgroundColor:"#fef3c7",

   },

   textbutton:{
    alignSelf: "center",
    color: "white",
   }
});
