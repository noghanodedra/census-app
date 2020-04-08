import React, { forwardRef, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";

import { theme } from "helpers";
import { scrollToComponentInScrollView } from "helpers/utils";

const TextInput = ({ errorText, ...props }, ref) => {
  useEffect(() => {
    if (errorText && ref && props.scrollViewRef) {
      scrollToComponentInScrollView(props.scrollViewRef, ref);
    }
  });

  return (
    <View style={styles.container} ref={ref}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default forwardRef(TextInput);
