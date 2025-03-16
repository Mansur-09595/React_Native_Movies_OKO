import { Tabs } from "expo-router";
import { ImageBackground, Image, View, Text } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { globalStyles } from "@/styles/globalStyles";

const TABS = [
  { name: "index", title: "Home", icon: icons.home },
  { name: "search", title: "Search", icon: icons.search },
  { name: "saved", title: "Saved", icon: icons.save },
  { name: "profile", title: "Profile", icon: icons.person },
];

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => {
  return focused ? (
    <ImageBackground source={images.highlight} style={globalStyles.activeTab}>
      <Image source={icon} tintColor="#151312" style={globalStyles.icon} />
      <Text style={globalStyles.activeText}>{title}</Text>
    </ImageBackground>
  ) : (
    <View style={globalStyles.inactiveTab}>
      <Image source={icon} tintColor="#A8B5DB" style={globalStyles.icon} />
    </View>
  );
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: globalStyles.tabBarItem,
        tabBarStyle: globalStyles.tabBar,
      }}
    >
      {TABS.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            headerShown: false,
            tabBarIcon: ({ focused }) => 
              <TabIcon 
                focused={focused} 
                icon={icon} 
                title={title} 
              />,
          }}
        />
      ))}
    </Tabs>
  );
};

export default _Layout;
