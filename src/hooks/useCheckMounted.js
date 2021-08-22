import { useEffect, useRef } from "react";

const useCheckMounted = () => {
   const mountedRef = useRef(true);

   useEffect(() => {
      return () => {
         mountedRef.current = false;
      };
   }, []);

   return mountedRef.current;
};

export { useCheckMounted };
