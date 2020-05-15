import React, { memo, useContext, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { FAB, ViewWithTitle } from "components";
import { View, Text } from "react-native";
import { List, Title, Caption } from "react-native-paper";

import ScreenNames from "constants/screen-names";
import { HeaderTitleContext, LoadingContext } from "contexts";
import styles from "./styles";
import { theme } from "helpers";

const GET_DATA = gql`
  {
    workClassList {
      id
      name
      description
    }

    occupationList {
      id
      name
      description
    }

    educationList {
      id
      name
      description
    }

    relationshipList {
      id
      name
      description
    }

    casteList {
      id
      name
      minority
      description
    }

    genderList {
      id
      name
      description
    }

    incomeClassList {
      id
      name
      description
    }

    maritalStatusList {
      id
      name
      description
    }

    stateList {
      id
      name
      code
      districts {
        id
        name
      }
    }

    censusList {
      id
      name
    }
  }
`;

const LandingPage = ({ ...props }) => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const { setCurrentHeaderTitle } = useContext(HeaderTitleContext);
  const { loading, error, data } = useQuery(GET_DATA);

  const areas = [
    {
      name: "City 1",
      type: 1,
      subArea: [{ name: "Area 1" }, { name: "Area 2" }]
    },
    {
      name: "Town 1",
      type: 2,
      subArea: [{ name: "Area 1" }, { name: "Area 2" }]
    },
    {
      name: "Village 1",
      type: 3,
      subArea: [{ name: "Area 1" }, { name: "Area 2" }]
    }
  ];

  useEffect(() => {
    if (loading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <>
      <ViewWithTitle title="Your progress">
        <View style={styles.container}>
          <View style={styles.item}>
            <Title style={styles.title}>
              <Text>Total registrations:</Text>
            </Title>
            <Caption style={styles.caption}>1001</Caption>
          </View>
          <View style={styles.item}>
            <Title style={styles.title}>
              <Text>Completed Areas:</Text>
            </Title>
            <Caption style={styles.caption}>5 out of 34</Caption>
          </View>
        </View>
      </ViewWithTitle>
      <ViewWithTitle title="Areas assigned to you">
        <List.Section title="Villages/Towns/Cities">
          {areas.map((item, index) => {
            return (
              <List.Accordion
                style={styles.accordion}
                titleStyle={styles.accordionTitle}
                key={index}
                title={item.name}
                left={props => (
                  <List.Icon
                    {...props}
                    icon="folder"
                    color={theme.colors.primary}
                  />
                )}
              >
                {item.subArea.map((subItem, index) => {
                  return (
                    <List.Item
                      titleStyle={styles.titleStyle}
                      title={subItem.name}
                      key={index}
                    />
                  );
                })}
              </List.Accordion>
            );
          })}
        </List.Section>
      </ViewWithTitle>
      <View style={styles.fixedView}>
        <FAB
          style={styles.fab}
          small
          label="Register"
          icon="plus"
          onPress={() => {
            setCurrentHeaderTitle(ScreenNames.REGISTRATION);
            props.navigation.navigate(ScreenNames.REGISTRATION, {
              data
            });
          }}
        />
      </View>
    </>
  );
};

export default memo(LandingPage);
