import React, { useState } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  Background,
  CenterSpinner,
  ViewWithTitle,
  DataTable,
  Modal,
} from "components";
import FamilyInfo from "./components/FamilyInfo";
import IndividualInfo from "./components/IndividualInfo";
import styles from "./styles";
import { View } from "react-native";

const GET_FAMILY = gql`
  query getFamily($id: String!) {
    family(id: $id) {
      id
      headName
      census {
        name
      }
      individuals {
        id
        name
        age
        educationYears
        hoursPerWeek
        education {
          name
        }
        workClass {
          name
        }
        occupation {
          name
        }
        relationship {
          name
        }
        caste {
          name
        }
        gender {
          name
        }
        incomeClass {
          name
        }
        maritalStatus {
          name
        }
      }
      address {
        line1
      }
    }
  }
`;

const Summary = ({ navigation, family }) => {
  const [showModal, setShowModal] = useState(false);
  const [individualData, setIndividualData] = useState(null);

  const columns = [
    { numeric: false, name: "Name", width: 80, align: "left" },
    { numeric: true, name: "Age", width: 30, align: "right" },
    { numeric: true, name: "Education", width: 80, align: "left" },
    { numeric: true, name: "Caste", width: 50, align: "left" },
    { numeric: true, name: "Relationship", width: 105, align: "left" },
  ];
  const fields = [
    { name: "name" },
    { name: "age" },
    { name: "education", nestedProp: "name" },
    { name: "caste", nestedProp: "name" },
    { name: "relationship", nestedProp: "name" },
  ];

  const _onRowSelected = (data) => {
    setIndividualData(data);
    setShowModal(true);
  };

  const FamilyComponent = graphql(GET_FAMILY, {
    options: { variables: { id: family.id }, fetchPolicy: "network-only" },
  })((props) => {
    const { error, family } = props.data;
    if (error) {
      console.error(error);
    }
    if (family) {
      return (
        <Background>
          <ViewWithTitle title="Family Info">
            <FamilyInfo family={family}></FamilyInfo>
          </ViewWithTitle>

          <ViewWithTitle title="Individuals">
            <DataTable
              data={family.individuals}
              columns={columns}
              fields={fields}
              onRowSelected={_onRowSelected}
            ></DataTable>

            {showModal && (
              <Modal
                title="Individual Info"
                closeButtonText="Close"
                setVisible={setShowModal}
                visible={showModal}
                individual={individualData}
              >
                <IndividualInfo individual={individualData}></IndividualInfo>
              </Modal>
            )}
          </ViewWithTitle>
        </Background>
      );
    }
    return <CenterSpinner overlay="true"></CenterSpinner>;
  });

  return (
    <View style={styles.container}>
      <FamilyComponent></FamilyComponent>
    </View>
  );
};
export default Summary;