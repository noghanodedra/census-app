import { StyleSheet } from "react-native";
import { theme } from "helpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  label: {
    color: theme.colors.secondary
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  }
});

export default styles;
