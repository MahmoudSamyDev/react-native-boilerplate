import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

function TabIcon({ focused, icon, title }: { focused: boolean; icon: any; title: string }) {
  return (
    <View className="flex-1 mt-3 flex-col items-center">
      <Image
        source={icon}
        resizeMode="contain"
        className="size-6"
        tintColor={focused ? "#0061ff" : "#666876"}
      />
      <Text
        className={`text-xs w-full text-center mt-1 ${focused ? "text-primary-300 font-rubik-medium" : "text-black-200 fonr-rubik"}`}
      >
        {title}
      </Text>
    </View>
  );
}

function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={null} focused={focused} title="Home" />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={null} focused={focused} title="Explore" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={null} focused={focused} title="Profile" />,
        }}
      />
    </Tabs>
  );
}

export default TabsLayout;
