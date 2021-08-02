import Button from "common/UI/Button/Button";
import { getLocalStorage, setLocalStorage } from "helper";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./HeaderLeft.scss";
const HeaderLeft = () => {
   const history = useHistory();

   // history length === 2 || 1 <=> user close app and access again
   if (history.length === 2 || history.length === 1) {
      localStorage.removeItem("LOCATION_KEYS");
   }
   //save location.key to know limit of forward
   const [locationKeys, setLocationKeys] = useState(
      getLocalStorage("LOCATION_KEYS") || []
   );
   //if locationKeys[last] === present key of page => disabled forward
   const [disabledForward, setDisabledForward] = useState(
      locationKeys[locationKeys.length - 1] === history.location.key
   );
   //if preseny key === undefined then disabled back
   const [disabledBack, setDisabledBack] = useState(
      history.location.key ? false : true
   );

   // console.log(locationKeys);

   useEffect(() => {
      // console.log("useEffect");
      if (history.length !== 2) setLocalStorage("LOCATION_KEYS", locationKeys);
      const unregisterHistoryListener = history.listen((location, action) => {
         // console.log("listen");

         switch (action) {
            //case PUSH: user click on nav-item like: home -> category
            case "PUSH":
               setLocationKeys((keys) => [...keys, location.key]);
               setDisabledForward(true);
               setDisabledBack(false);
               break;
            //case POP: user click back or forward
            case "POP":
               // console.log(history.location.key);
               if (
                  locationKeys[locationKeys.length - 1] === history.location.key
               ) {
                  setDisabledForward(true);
               } else setDisabledForward(false);
               if (!history.location.key) {
                  setDisabledBack(true);
               } else setDisabledBack(false);
               break;
            default:
               break;
         }
      });

      return () => {
         unregisterHistoryListener();
      };
   }, [history, locationKeys]);

   const goBackHandler = () => {
      history.goBack();
   };
   const goForwardHandler = () => {
      history.goForward();
   };

   return (
      <div className="header-left">
         <div className="btn-group--nav">
            <Button
               icon="ic-back icon--header-nav"
               disabled={disabledBack}
               clicked={goBackHandler}
            />
            <Button
               icon="ic-forward icon--header-nav"
               disabled={disabledForward}
               clicked={goForwardHandler}
            />
         </div>
         <SearchBar />
      </div>
   );
};

export default HeaderLeft;
