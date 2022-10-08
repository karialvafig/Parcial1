import { View, Text, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import { getFirestore, collection, getDocs, deleteDoc, doc  } from 'firebase/firestore';
import { app } from "../../firebase";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';

const db = getFirestore(app);

  
  
  export function PedidosView() {
      const [pedidos, setPedidos] = useState([]);
      const navigation = useNavigation();

    useEffect(() => {
        getPedidos()
    }, [])

    useEffect(() => console.log(pedidos), [pedidos])

    async function eliminarPedido(id) {
        await deleteDoc(doc(db, "pedidos", id));
        getPedidos()
    }

    function getPedidos() {
        getDocs(collection(db, "pedidos")).then((querySnapshot) => {
            let docs = []
            querySnapshot.forEach((doc) => {
                docs.push({id: doc.id, ...doc.data()})
            })
            setPedidos(docs)
        });
    }

    function editarPedido(id) {
        navigation.navigate("Editar", { id })
    }

    return <View style={styles.container}>
        <View style={styles.container2}>
            <Text>Todos los pedidos</Text>
            {pedidos && <FlatList
                data={pedidos}
                renderItem={({item}) => <View style={styles.item}>
                    
                    <Text> <Text style={styles.negritas}> Cliente: </Text> {item.cliente}</Text>
                    <Text> <Text style={styles.negritas}> Prenda: </Text> {item.prenda}</Text>
                    <Text> <Text style={styles.negritas}> Anticipo: </Text> {item.anticipo}</Text>
                    <Text> <Text style={styles.negritas}> Proveedor: </Text> {item.proveedor}</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={() => eliminarPedido(item.id)}>
                            <Text style={styles.textbutton}>Eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => editarPedido(item.id)}>
                            <Text style={styles.textbutton}>Editar</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            />} 

        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22

    },

    item: {
      marginTop: 10,
      fontSize: 18,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },

        elevation: 3,
        backgroundColor: "white",
        width: 250,
        borderRadius: 10,
    },

    container2:{
        width: 300,
        marginHorizontal: "auto",
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

 

   textbutton:{
    alignSelf: "center",
    color: "white",
   },

   buttons:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"

   }
  });