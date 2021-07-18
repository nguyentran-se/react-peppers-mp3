import React from "react";
import Topic from "../Topic/Topic";
import { LIST_TOPIC } from "constant";
import "./ListTopic.scss";

const ListTopic = () => {
   const transformedListTopic = LIST_TOPIC.map((t, index) => (
      <Topic
         topicHeader={t.topicHeader}
         cards={t.cards}
         type={t.type}
         isBanner={t.isBanner}
         key={index}
      />
   ));
   return <div className="list-topic">{transformedListTopic}</div>;
};

export default ListTopic;
