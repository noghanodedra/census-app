import { StyleSheet } from "react-native";
import { theme } from "helpers";

const styles = StyleSheet.create({
  fixedView: {
    position: "absolute",
    right: 0,
    bottom: 10,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  fab: {
    marginRight: 2 * 2,
    marginBottom: 2 * 3,
    backgroundColor: theme.colors.primary
  },
  container: {
    // flex: 1,
    width: "100%"
  },
  item: {
    //flex: 1,
    margin: 5,
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "normal",
    color: theme.colors.secondary
  },
  caption: {
    fontSize: 14,
    lineHeight: 14
  },
  accordion: {
    margin: 1,
    padding: 1
  },
  accordionTitle: {
    fontWeight: "600"
  },
  titleStyle: {
    fontSize: 15,
    color: theme.colors.secondary
  }
});

export default styles;
