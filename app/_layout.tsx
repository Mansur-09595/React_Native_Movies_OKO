import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import "./global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <>
        <StatusBar hidden={true} />

        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="movie/[id]"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </>
    </Provider>
  );
}