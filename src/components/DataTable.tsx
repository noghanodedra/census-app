import React, { memo, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { DataTable as PaperDataTable } from "react-native-paper";
import { theme } from "helpers";

const DataTable = ({ columns, fields, data, onRowSelected }) => {
  const numericsArr = [];
  const minColumnWidths = [];
  const alignArr = [];

  const renderHeaders = () => {
    return (
      <PaperDataTable.Header>
        {columns.map((item, index) => {
          numericsArr[index] = item.numeric ? true : false;
          minColumnWidths[index] = item.width;
          alignArr[index] = item.align;
          return (
            <PaperDataTable.Title
              sortDirection={item.sortDirection}
              style={[
                styles.title,
                { minWidth: item.width },
                item.align == "left"
                  ? { justifyContent: "flex-start" }
                  : { justifyContent: "center" }
              ]}
              numeric={item.numeric}
              key={index}
            >
              <Text style={[styles.titleText]}>{item.name}</Text>
            </PaperDataTable.Title>
          );
        })}
      </PaperDataTable.Header>
    );
  };

  const renderRow = (row, rowIndex) => {
    const getKey = (name, row, col) => {
      return `${name}_${row}_${col}`;
    };

    return (
      <PaperDataTable.Row
        key={rowIndex}
        onPress={() => {
          onRowSelected(row);
        }}
      >
        {fields.map((field, colIndex) => (
          <PaperDataTable.Cell
            style={[
              styles.cell,
              {
                minWidth: minColumnWidths[colIndex] + 5
              },
              alignArr[colIndex] == "left"
                ? { justifyContent: "flex-start" }
                : { justifyContent: "center" }
            ]}
            key={getKey(field.name, rowIndex, colIndex)}
            numeric={numericsArr[colIndex]}
          >
            <Text>
              {field.nestedProp
                ? row[field.name][field.nestedProp]
                : row[field.name]}
            </Text>
          </PaperDataTable.Cell>
        ))}
      </PaperDataTable.Row>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {data && (
          <PaperDataTable>
            {renderHeaders()}
            {data.map((row, rowIndex) => renderRow(row, rowIndex))}
          </PaperDataTable>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    minHeight: 300
  },
  title: {
    padding: 1,
    marginRight: 2
  },
  titleText: {
    color: theme.colors.secondary,
    fontWeight: "500",
    fontSize: 14
  },
  cell: {
    padding: 1,
    marginRight: 1,
    marginLeft: 1
    //justifyContent: "center"
  }
});

export default memo(DataTable);
