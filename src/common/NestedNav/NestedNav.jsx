import React from "react";
import NestedNavItem from "./NestedNavItem/NestedNavItem";
import "./NestedNav.scss";
const NestedNav = ({ nestedNavList }) => {
   let transformedNestedNavList;
   if (nestedNavList) {
      transformedNestedNavList = nestedNavList.map((nav) => (
         <NestedNavItem name={nav.name} href={nav.href} key={nav.href} />
      ));
   }

   return <ul className="nested-nav">{transformedNestedNavList}</ul>;
};

export default NestedNav;
