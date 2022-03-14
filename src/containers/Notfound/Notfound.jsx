import GeneralHelmet from "common/GeneralHelmet/GeneralHelmet";
import { SEO } from "constant";
import React from "react";

const Notfound = () => {
  return (
    <div>
      <GeneralHelmet
        page={{
          title: SEO.notFound.title,
          description: SEO.notFound.description,
        }}></GeneralHelmet>
      not found
    </div>
  );
};

export default Notfound;
