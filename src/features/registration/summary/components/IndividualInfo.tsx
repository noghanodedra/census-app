import React, { memo } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Title, Caption } from "react-native-paper";

import { theme } from "helpers";

const IndividualInfo = ({ individual }) => {
  const getLabel = (fieldName: string) => {
    const result = fieldName
      .split("")
      .map(function(c, index) {
        return index === 0
          ? c.toUpperCase()
          : c === c.toUpperCase()
          ? " " + c.toUpperCase()
          : c.toLowerCase();
      })
      .join("");
    return result;
  };

  const getRowItem = (field: string, index: number, data: any) => {
    if (field.startsWith("_")) return null;
    return (
      <View style={styles.item} key={index}>
        <Title style={styles.title}>
          <Text>{getLabel(field)}</Text>
        </Title>
        <Caption style={styles.caption}>{data}</Caption>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {Object.keys(individual).map((key, index) =>
          getRowItem(
            key,
            index,
            individual[key]["name"] ? individual[key]["name"] : individual[key]
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 200,
  },
  item: {
    flex: 0,
    padding: 4,
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
});

export default memo(IndividualInfo);
