import React from "react";
import { useGetVideosQuery } from "../../../features/videos/videosApi";

import Video from "./Video";
import Error from "../../Ui/Error";
import VideosLoader from "../../Ui/Loader/VideosLoader";

const Videos = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  // decide what to render
  let content = null;
  if (isLoading)
    content = (
      <>
        <VideosLoader />
        <VideosLoader />
        <VideosLoader />
        <VideosLoader />
      </>
    );
  if (!isLoading && isError)
    content = <Error message="There was an error occur!" />;
  if (!isLoading && !isError && videos?.length === 0)
    content = <div>Not video found!</div>;
  if (!isLoading && !isError && videos?.length > 0)
    content = videos.map((video) => <Video key={video.id} video={video} />);

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {/* video list */}
      {content}
    </div>
  );
};

export default Videos;
