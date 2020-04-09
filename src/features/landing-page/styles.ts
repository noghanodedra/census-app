import { StyleSheet } from "react-native";
import { theme } from "helpers";

const styles = StyleSheet.create({
  fixedView: {
    position: "absolute",
    right: 0,
    bottom: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  fab: {
    marginRight: 2 * 2,
    marginBottom: 2 * 3,
    backgroundColor: theme.colors.primary,
  },
});

export default styles;
