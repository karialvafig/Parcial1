import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AgregarView } from "./src/views/Agregar";
import { EditarView } from "./src/views/Editar";
import { HomeView } from './src/views/Home';
import { LoginView } from './src/views/Login';
import { PedidosView } from './src/views/Pedidos';

const Stack = createNativeStackNavigator();

const navigationRef = createNavigationContainerRef()

const auth = getAuth();

export default function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUsuario(uid);
        if (navigationRef.isReady()) {
          navigationRef.navigate("Home");
        }      
      } else {
        navigationRef.navigate("Login");
      }
    });    
  }, [usuario])

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginView} options={{}}/>
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Pedidos" component={PedidosView} />
        <Stack.Screen name="Agregar" component={AgregarView} />
        <Stack.Screen name="Editar" component={EditarView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
