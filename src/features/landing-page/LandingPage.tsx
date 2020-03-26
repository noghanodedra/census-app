import React, { memo } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Background, FAB, Paragraph, CenterSpinner } from "components";
import styles from "./styles";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";

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
  }
`;

const LandingPage = ({ ...props }) => {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) {
    return <CenterSpinner />;
  }
  console.log(error);
  console.log(data);

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
          onPress={() => props.navigationCallBack(data)}
        />
      </View>
    </SafeAreaView>
  );
};

export default memo(LandingPage);
