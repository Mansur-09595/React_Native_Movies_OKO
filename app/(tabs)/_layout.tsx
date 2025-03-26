import { Tabs } from "expo-router";
import { Image, View, Text } from "react-native";
// import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const TABS = [
  { name: "index", title: "Home", icon: icons.home },
  { name: "search", title: "Search", icon: icons.search },
  { name: "saved", title: "Saved", icon: icons.save },
  { name: "profile", title: "Profile", icon: icons.person },
];

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => {
  return focused ? (
    <View className="flex flex-row flex-1 min-w-[122px] min-h-16 mt-4 items-center justify-center rounded-full overflow-hidden bg-light-100">
      <Image source={icon} tintColor="#000000" className="size-5" />
      <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
    </View>
  ) : (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#ffffff" className="size-5" />
    </View>
  );
};


const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#000000",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 66,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#ffffff",
        },
      }}
    >
      {TABS.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            headerShown: false,
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icon} title={title} />,
          }}
        />
      ))}
    </Tabs>
  );
};

export default _Layout;
