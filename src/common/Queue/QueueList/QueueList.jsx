import React from "react";
import "./QueueList.scss";
import srcImg from "assets/images/test.jpg";
import QueueItem from "../QueueItem/QueueItem";
const queueList = [
   { src: srcImg, songName: "test1", songArtist: "artist1" },
   { src: srcImg, songName: "test1", songArtist: "artist1" },
   { src: srcImg, songName: "test1", songArtist: "artist1" },
   { src: srcImg, songName: "test1", songArtist: "artist1" },
   { src: srcImg, songName: "test1", songArtist: "artist1" },
   { src: srcImg, songName: "test1", songArtist: "artist1" },
   { src: srcImg, songName: "test1", songArtist: "artist1" },
   { src: srcImg, songName: "test1", songArtist: "artist1" },
   { src: srcImg, songName: "test1", songArtist: "artist1" },
   { src: srcImg, songName: "test1", songArtist: "artist1" },
   { src: srcImg, songName: "test1", songArtist: "artist1" },
   { src: srcImg, songName: "test1", songArtist: "artist1" },
   { src: srcImg, songName: "test1", songArtist: "artist1" },
];
const QueueList = () => {
   let transformedQueue = queueList.map((item, index) => (
      <QueueItem
         src={item.src}
         name={item.songName}
         artist={item.songArtist}
         key={index}
      />
   ));
   return (
      <div className="queue-list">
         <div className="queue-list__wrapper">{transformedQueue}</div>
      </div>
   );
};

export default QueueList;
