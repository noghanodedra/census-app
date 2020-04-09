import React from "react";

export interface IHeaderTitleContext {
  headerTitle: string;
  setCurrentHeaderTitle: (headerTitle: string) => void;
}

export const HEADER_TITLE_DEFAULT_VALUE = {
  headerTitle: "Home",
  setCurrentHeaderTitle: () => {},
};

const HeaderTitleContext = React.createContext<IHeaderTitleContext>(
  HEADER_TITLE_DEFAULT_VALUE
);
export default HeaderTitleContext;
//https://medium.com/@cosmvs/react-usecontext-how-to-update-context-from-child-component-8fa2894eee3d
//https://medium.com/digio-australia/using-the-react-usecontext-hook-9f55461c4eae
