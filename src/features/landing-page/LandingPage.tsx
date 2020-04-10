import React, { memo, useContext, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { FAB, Paragraph } from "components";
import { View } from "react-native";

import ScreenNames from "constants/screen-names";
import { HeaderTitleContext, LoadingContext } from "contexts";
import styles from "./styles";

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
  const { loading, error, data, called } = useQuery(GET_DATA);
  const { setCurrentHeaderTitle } = useContext(HeaderTitleContext);
  const { showLoading, hideLoading } = useContext(LoadingContext);

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
      <View>
        <Paragraph>this</Paragraph>
      </View>
      <View style={styles.fixedView}>
        <FAB
          style={styles.fab}
          small
          label="Register"
          icon="plus"
          onPress={() => {
            setCurrentHeaderTitle(ScreenNames.REGISTRATION);
            props.navigation.navigate(ScreenNames.REGISTRATION, {
              data,
            });
          }}
        />
      </View>
    </>
  );
};

export default memo(LandingPage);
