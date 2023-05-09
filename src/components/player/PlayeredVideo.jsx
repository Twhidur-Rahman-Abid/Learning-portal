import React from "react";

const PlayeredVideo = ({ url, title }) => {
  return (
    <iframe
      width="100%"
      className="aspect-video"
      src={url}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default PlayeredVideo;
