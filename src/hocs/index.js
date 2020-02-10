import React from "react";
import Loading from "../components/Loading";

export const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loading /> : <Component {...rest} />;

export const withError = Component => ({ error, ...rest }) =>
  error ? (
    <div className="interaction">
      <p>Something went wrong</p>
    </div>
  ) : (
    <Component {...rest} />
  );
