import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "../helpers/NavigationUtil";
import Login from "../features/auth/Login";
import SignUp from "../features/auth/SignUp";
import SplashScreen from "../features/auth/SplashScreen";
import TabNavigation from "./TabNavigation";


const Stack = createNativeStackNavigator()
const Navigation = () => {
    return (
        <NavigationContainer ref={navigationRef} >
            <Stack.Navigator
                initialRouteName="splash"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="splash" component={SplashScreen} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="signup" component={SignUp} />
                <Stack.Screen name="Tab" component={TabNavigation} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default Navigation
