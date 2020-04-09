import React from "react";
import { IHeaderTitleContext } from "contexts/HeaderTitle.context";

export const useHeaderTitle = (): IHeaderTitleContext => {
  const [headerTitle, setHeaderTitle] = React.useState("Home");

  const setCurrentHeaderTitle = React.useCallback(
    (currentHeaderTitle: string): void => {
      setHeaderTitle(currentHeaderTitle);
    },
    []
  );

  return {
    headerTitle,
    setCurrentHeaderTitle,
  };
};
export default useHeaderTitle;
