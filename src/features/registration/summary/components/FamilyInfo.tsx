import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Title, Caption } from "react-native-paper";

import { theme } from "helpers";

const FamilyInfo = props => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Title style={styles.title}>
          <Text>Head Name</Text>
        </Title>
        <Caption style={styles.caption}> {props.family.headName}</Caption>
      </View>
      <View style={styles.item}>
        <Title style={styles.title}>
          <Text>Census</Text>
        </Title>
        <Caption style={styles.caption}> {props.family.census.name}</Caption>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  item: {
    flex: 1,
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
  }
});

export default memo(FamilyInfo);
