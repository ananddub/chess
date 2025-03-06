import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../features/home/home"
import { Image } from "moti"
import { IconImage } from "../helpers/GetIcons"
import responsive from "../helpers/responsive"
import { TabBarIOS } from "react-native"
import CustomTab from "../component/CustomTab"
interface Props {
    focused: boolean,
    color: string,
    size: number
}

const Tab = createBottomTabNavigator()
export default function TabNavigation() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTab {...props} />}
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="freind" component={Home} />
            <Tab.Screen name="group" component={Home} />
            <Tab.Screen name="toplist" component={Home} />
        </Tab.Navigator>
    )
}

