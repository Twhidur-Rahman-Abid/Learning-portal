import React from "react";
import { useSelector } from "react-redux";

// import components
import Description from "../../components/player/Description";
import PlayeredVideo from "../../components/player/PlayeredVideo";
import Videos from "../../components/player/videos/Videos";
import Error from "../../components/Ui/Error";

// RTK query hooks
import { useGetVideoQuery } from "../../features/videos/videosApi";
import VideoLoader from "../../components/Ui/Loader/VideoLoader";

const CoursePlayer = () => {
  const { videoId } = useSelector((state) => state.videos);
  const { data: video, isLoading, isError } = useGetVideoQuery(videoId);

  // decide what to render
  let content = null;
  if (isLoading) content = <VideoLoader />;
  if (!isLoading && isError)
    content = <Error message="There was aan error occur!" />;
  if (!isLoading && !isError && video?.id)
    content = (
      <div className="col-span-full w-full space-y-8 lg:col-span-2">
        <PlayeredVideo url={video.url} title={video.title} />
        <Description video={video} />
      </div>
    );

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          {/* played video and description */}
          {content}

          <Videos />
        </div>
      </div>
    </section>
  );
};

export default CoursePlayer;
