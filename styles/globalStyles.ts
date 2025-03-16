import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const globalStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.dark200,
    borderRadius: 50,
    marginHorizontal: 20,
    marginBottom: 36,
    height: 52,
    position: "absolute",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.dark200,
  },
  tabBarItem: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    flexDirection: "row",
    flex: 1,
    minWidth: 122,
    minHeight: 64, // 16 * 4
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    overflow: "hidden",
  },
  inactiveTab: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 9999,
  },
  icon: {
    width: 20,
    height: 20,
  },
  activeText: {
    color: theme.colors.secondary,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.dark200,
  },
});
