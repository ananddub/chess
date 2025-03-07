import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import CustomTab from "../component/CustomTab"
import Home from "../features/home/Home"
import Freind from "../features/freind/Freind"
import Group from "../features/group/Group"
import TopList from "../features/toplist/TopList"

const Tab = createBottomTabNavigator()
export default function TabNavigation() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTab {...props} />}
            initialRouteName="home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="freind" component={Freind} />
            <Tab.Screen name="group" component={Group} />
            <Tab.Screen name="toplist" component={TopList} />
        </Tab.Navigator>
    )
}

