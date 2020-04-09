import { StyleSheet } from "react-native";
import { theme } from "helpers";

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 200,
  },
  item: {
    flex: 0,
    padding: 4,
    margin: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "normal",
    color: theme.colors.secondary,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  link: {
    color: theme.colors.primary,
    textDecorationLine: "underline",
    fontSize: 15,
  },
});

export default styles;
