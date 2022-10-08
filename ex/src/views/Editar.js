import { collection, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { app } from "../../firebase";

const db = getFirestore(app);

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    button:{
        paddingHorizontal:15,
        paddingVertical:8,
        width: 80,
        backgroundColor: "#b91c1c",
        borderRadius: 10,
        marginHorizontal: "auto",
        display: "flex",
        justifyContent:"center",
        elevation: 5,
        marginTop: 5,
   }, 
});

export function EditarView({ route }) {
    const { id } = route.params;
    const [cliente, setCliente] = useState("")
    const [anticipo, setAnticipo] = useState("")
    const [prenda, setPrenda] = useState("")
    const [proveedor, setProveedor] = useState("")
    const [total, setTotal] = useState("")

    async function editarPedido() {
        try {
            const docRef = doc(db, "pedidos", id);
            await updateDoc(docRef, {
              cliente,
              anticipo,
              prenda,
              proveedor,
              total
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    return (
        <View>
            <Text>Agregar pedido</Text>
            <TextInput style={styles.input} placeholder="Cliente" onChangeText={(text) => setCliente(text)} />
            <TextInput style={styles.input} placeholder="Anticipo" onChangeText={(text) => setAnticipo(text)} />
            <TextInput style={styles.input} placeholder="Prenda" onChangeText={(text) => setPrenda(text)} />
            <TextInput style={styles.input} placeholder="Proveedor" onChangeText={(text) => setProveedor(text)} />
            <TextInput style={styles.input} placeholder="Total" onChangeText={(text) => setTotal(text)} />
            <Button title="Editar" onPress={editarPedido} />
        </View>
    )
}