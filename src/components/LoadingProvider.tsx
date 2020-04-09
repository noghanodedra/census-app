import React, { useState } from "react";
import { LoadingContext } from "contexts";

const LoadingProvider = ({ children }) => {
  const showLoading = () => {
    console.log("show", loading.loadingCount);
    toggleLoading((prevState) => {
      return {
        ...prevState,
        loadingCount: prevState.loadingCount + 1,
      };
    });
  };

  const hideLoading = () => {
    console.log("hide", loading.loadingCount);

    toggleLoading((prevState) => {
      return {
        ...prevState,
        loadingCount:
          prevState.loadingCount > 0 ? prevState.loadingCount - 1 : 0,
      };
    });
  };

  const loadingState = {
    loadingCount: 0,
    showLoading,
    hideLoading,
  };

  const [loading, toggleLoading] = useState(loadingState);

  return (
    <LoadingContext.Provider value={loading}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
