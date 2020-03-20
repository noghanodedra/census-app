import React, { memo } from "react";

import { Background, FAB, Paragraph, CenterSpinner } from "components";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
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
  }
`;

const LandingPage = ({ ...props }) => {
  const { loading, error, data } = useQuery(GET_DATA);
  console.log(data);

  if (loading) {
    return <CenterSpinner />;
  }
  console.log(error);
  return (
    <Background>
      <Paragraph>
        Your amazing app starts here. Open you favourite code editor and start
        editing this project.
      </Paragraph>
      <FAB
        small
        label="Register"
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
    </Background>
  );
};

export default memo(LandingPage);
