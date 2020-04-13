import React, { memo, useState, useContext, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import { Background, ViewWithTitle, DataTable, Modal } from "components";
import FamilyInfo from "./FamilyInfo";
import IndividualInfo from "./IndividualInfo";
import { LoadingContext } from "contexts";

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

const FamilyContainer = ({ ...props }) => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [showModal, setShowModal] = useState(false);
  const [individualData, setIndividualData] = useState(null);

  const columns = [
    { numeric: false, name: "Name", width: 80, align: "left" },
    { numeric: true, name: "Age", width: 30, align: "right" },
    { numeric: true, name: "Education", width: 80, align: "left" },
    { numeric: true, name: "Caste", width: 50, align: "left" },
    { numeric: true, name: "Relationship", width: 105, align: "left" }
  ];
  const fields = [
    { name: "name" },
    { name: "age" },
    { name: "education", nestedProp: "name" },
    { name: "caste", nestedProp: "name" },
    { name: "relationship", nestedProp: "name" }
  ];

  const _onRowSelected = data => {
    setIndividualData(data);
    setShowModal(true);
  };

  const { loading, error, data } = useQuery(GET_FAMILY, {
    variables: { id: props.family.id },
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    if (loading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [data]);
  if (loading) {
    return null;
  }
  if (error) {
    console.log(error);
    return null;
  }
  const { family } = data;
  return (
    <Background>
      <ViewWithTitle title="Family Info">
        {family && <FamilyInfo family={family}></FamilyInfo>}
      </ViewWithTitle>

      <ViewWithTitle title="Individuals">
        {family && (
          <DataTable
            data={family.individuals}
            columns={columns}
            fields={fields}
            onRowSelected={_onRowSelected}
          ></DataTable>
        )}

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
};

export default memo(FamilyContainer);
