import React, { memo, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "helpers";
import { LoadingContext } from "contexts";

const Spinner = ({ ...props }) => {
  const { loadingCount } = useContext(LoadingContext);
  console.log("loadingCount", loadingCount);
  return (
    <>
      {loadingCount > 0 && (
        <View style={[styles.container, styles.horizontal, styles.overlay]}>
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
            {...props}
          />
        </View>
      )}
    </>
  );
};

export default memo(Spinner);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
