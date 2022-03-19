import { SEO } from "constant";
import React from "react";
import { Helmet } from "react-helmet";

function GeneralHelmet({
  children,
  og: { imageUrl = SEO.og.image, pageUrl = SEO.og.url } = {},
  page: { title, description },
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* <meta property="og:title" content={title} />
      <meta property="og:image" content={imageUrl} /> */}
      <meta property="og:url" content={pageUrl} />
      <meta property="og:description" content={description} />
      {children}
    </Helmet>
  );
}

export default GeneralHelmet;
