import { Text, View } from "react-native";
import { globalStyles } from "@/styles/globalStyles";

export default function Index() {
  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.welcomeText}>Welcome!</Text>
    </View>
  );
}
