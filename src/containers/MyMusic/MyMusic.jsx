import GeneralHelmet from "common/GeneralHelmet/GeneralHelmet";
import NestedNav from "common/NestedNav/NestedNav";
import UserPhoto from "common/User/UserPhoto/UserPhoto";
import { AUTHORIZE_URL, SEO } from "constant";
import React from "react";
import { useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import { selectFollowers, selectIsLoggedIn, selectName } from "selectors";
import "./MyMusic.scss";
import service from "./service";

const MyMusic = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const matchPath = useRouteMatch().url;

  const name = useSelector(selectName);
  const followers = useSelector(selectFollowers);

  //if has not login yet, redirect to authorize
  if (!isLoggedIn) window.location.href = AUTHORIZE_URL;

  return (
    <div className="mymusic">
      <GeneralHelmet
        page={{
          title: `${SEO.myMusic.title} - ${name}`,
          description: SEO.myMusic.description,
        }}></GeneralHelmet>
      <div className="container mymusic-container">
        <div className="mymusic-user">
          <UserPhoto medium />
          <div className="mymusic-user__info">
            <h2 className="mymusic-user__name">{name}</h2>
            <p className="heading-message">{followers} người theo dõi</p>
          </div>
        </div>
        <div className="mymusic-nav">
          <NestedNav nestedNavList={service.getNestedNav(matchPath)} />
        </div>
        <div className="mymusic-main">
          {service
            .getNestedNav(matchPath)
            .map(({ name, href, component: Component }) => (
              <Route key={name} path={href} component={Component} exact />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyMusic;
