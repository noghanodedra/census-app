import React, { memo, useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { FAB, Paragraph, CenterSpinner } from "components";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";

import ScreenNames from "constants/screen-names";
import { HeaderTitleContext } from "contexts";
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
  const { loading, error, data } = useQuery(GET_DATA);
  const { setHeaderTitle } = useContext(HeaderTitleContext);

  if (loading) {
    return <CenterSpinner />;
  }
  console.log(error);

  return (
    <SafeAreaView>
      <Paragraph>
        Your amazing app starts here. Open you favourite code editor and start
        editing this project.
      </Paragraph>
      <View style={styles.fixedView}>
        <FAB
          style={styles.fab}
          small
          label="Register"
          icon="plus"
          onPress={() => {
            setHeaderTitle(ScreenNames.REGISTRATION);
            props.navigation.navigate(ScreenNames.REGISTRATION, {
              data,
              title: ScreenNames.REGISTRATION,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default memo(LandingPage);
