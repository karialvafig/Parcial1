import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Input,NativeBaseProvider, Button, Icon, Box, Image,AspectRatio } from "native-base";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../auth/firebase_config";
import { getFirestore, collection, addDoc } from "firebase/firestore";
//import { alignContent, flex, flexDirection, width } from 'styled-system';

function Signup() {
  const navigation = useNavigation();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleSignUp = async () => {
    if (username === "") {
      return Alert.alert("Llenar todos los campos es obligatorio");
    } else if (email === "") {
      return Alert.alert("Llenar todos los campos es obligatorio");
    } else if (password !== confirmPassword) {
      return Alert.alert("Las contraseñas no coinciden");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((usr) => {
        const user = usr.user;
        console.log("Nuevo usuario", user);
        Alert.alert("Usuario registrado exitosamente");
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Ha ocurrido un error", err.message);
      });

    await addDoc(collection(db, "users"), {
      username: username,
      email: email,
      password: password,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.Middle}>
        <Text style={styles.LoginText}>Registro</Text>
      </View>
      <View style={styles.text2}>
        <Text>¿Ya tienes cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupText}> Inicia sesión </Text>
        </TouchableOpacity>
      </View>

      {/* Username Input Field */}
      <View style={styles.buttonStyle}>
        <View style={styles.emailInput}>
          <Input
            onChangeText={(text) => setUsername(text)}
            value={username}
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="user-secret" />}
                size="sm"
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            placeholder="Nombre de usuario"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
          />
        </View>
      </View>

      {/* Email Input Field */}
      <View style={styles.buttonStyleX}>
        <View style={styles.emailInput}>
          <Input
            onChangeText={(text) => setEmail(text)}
            value={email}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="email" />}
                size="sm"
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            placeholder="Correo electrónico"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
          />
        </View>
      </View>

      {/* Password Input Field */}
      <View style={styles.buttonStyleX}>
        <View style={styles.emailInput}>
          <Input
            onChangeText={(text) => setPassword(text)}
            value={password}
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="key" />}
                size="sm"
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            secureTextEntry={true}
            placeholder="Contraseña"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
          />
        </View>
      </View>

      {/* Password Input Field */}
      <View style={styles.buttonStyleX}>
        <View style={styles.emailInput}>
          <Input
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="key" />}
                size="sm"
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            secureTextEntry={true}
            placeholder="Confirma contraseña"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
          />
        </View>
      </View>

      {/* Button */}
      <View style={styles.buttonStyle}>
        <Button onPress={handleSignUp} style={styles.buttonDesign}>
          ¡Registrar ahora!
        </Button>
      </View>

      {/* Line */}
      <View style={styles.lineStyle}>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <View>
          <Text style={{ width: 50, textAlign: "center" }}>O</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>

      {/* Box */}
      <View style={styles.boxStyle}>
        <Box
          onPress={() => navigation.navigate("#")} // for navigation
          style={{ height: 80, width: 80 }}
          shadow={3}
          _light={{
            backgroundColor: "gray.50",
          }}
          _dark={{
            backgroundColor: "gray.700",
          }}
        >
          <AspectRatio ratio={1 / 1}>
            <Image
              roundedTop="lg"
              source={{
                uri: "https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png",
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Box
          onPress={() => navigation.navigate("#")} // for navigation
          style={styles.imageStyle}
          shadow={3}
          _light={{
            backgroundColor: "gray.50",
          }}
          _dark={{
            backgroundColor: "gray.700",
          }}
        >
          <AspectRatio ratio={1 / 1}>
            <Image
              roundedTop="lg"
              source={{
                uri: "https://www.transparentpng.com/thumb/facebook-logo-png/photo-facebook-logo-png-hd-25.png",
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Box
          onPress={() => navigation.navigate("#")} // for navigation
          style={styles.imageStyle}
          shadow={3}
          _light={{
            backgroundColor: "gray.50",
          }}
          _dark={{
            backgroundColor: "gray.700",
          }}
        >
          <AspectRatio ratio={1 / 1}>
            <Image
              roundedTop="lg"
              source={{
                uri: "https://www.transparentpng.com/thumb/twitter/bird-twitter-socialmedia-icons-png-5.png",
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Box
          onPress={() => navigation.navigate("#")} // for navigation
          style={styles.imageStyle}
          shadow={3}
          _light={{
            backgroundColor: "gray.50",
          }}
          _dark={{
            backgroundColor: "gray.700",
          }}
        >
          <AspectRatio ratio={1 / 1}>
            <Image
              roundedTop="lg"
              source={{
                uri: "https://www.transparentpng.com/thumb/apple-logo/RRgURB-apple-logo-clipart-hd.png",
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Signup />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  LoginText: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: "bold",
  },
  Middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
  },
  signupText: {
    fontWeight: "bold",
  },
  emailField: {
    marginTop: 30,
    marginLeft: 15,
  },
  emailInput: {
    marginTop: 10,
    marginRight: 5,
  },
  buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    backgroundColor: "#026efd",
  },
  lineStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  boxStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "space-around",
  },
});