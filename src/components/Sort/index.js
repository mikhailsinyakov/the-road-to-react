import React from "react";
import classNames from "classnames";
import Button from "../Button";

const Sort = ({ sortKey, onSort, activeSortKey, isSortReversed, children }) => {
  const sortClass = classNames("button-inline", {
    "button-active": sortKey === activeSortKey
  });

  const Icon = () =>
    sortKey === activeSortKey ? (
      isSortReversed ? (
        <i className="fas fa-arrow-down"></i>
      ) : (
        <i className="fas fa-arrow-up"></i>
      )
    ) : null;

  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass}>
      {children}
      <Icon />
    </Button>
  );
};

export default Sort;
