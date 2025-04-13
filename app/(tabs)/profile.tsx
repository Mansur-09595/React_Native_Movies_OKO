import { View, Text, Switch, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("en");

  const toggleTheme = () => setDarkMode((prev) => !prev);
  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);
  const switchLanguage = () => setLanguage((prev) => (prev === "en" ? "ru" : "en"));

  return (
    <ScrollView className="flex-1 bg-primary px-5 pt-20">
      <Text className="text-white font-bold text-2xl mb-6">Profile & Settings</Text>

      {/* Language */}
      <View className="mb-6">
        <Text className="text-white text-base mb-2">Language</Text>
        <TouchableOpacity
          onPress={switchLanguage}
          className="bg-dark-100 rounded-lg px-4 py-3"
        >
          <Text className="text-white text-lg">
            {language === "en" ? "English 🇬🇧" : "Русский 🇷🇺"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Theme */}
      <View className="mb-6 flex-row justify-between items-center">
        <Text className="text-white text-base">Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      {/* Notifications */}
      <View className="mb-6 flex-row justify-between items-center">
        <Text className="text-white text-base">Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      {/* Version */}
      <View className="mt-10">
        <Text className="text-gray-400 text-sm text-center">
          OKO Movies v1.0.0 — powered by TMDB
        </Text>
      </View>
    </ScrollView>
  );
};

export default Profile;
