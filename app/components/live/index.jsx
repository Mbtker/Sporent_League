import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import useSWR from "swr";

function Live() {
  const [isClient, setIsClient] = useState(false);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://www.sporent.net/LeagueVideo",
    fetcher,
    { fallback: false, revalidateOnFocus: false, keepPreviousData: true }
  );

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className=" rounded-2xl border border-main overflow-hidden dark:border-[#4A4E57] w-full xl:w-[50%]  mx-5 md:mx-0">
      <div className="player-wrapper">
        {isClient && (
          <ReactPlayer
            url={data?.VideoUrl}
            className="react-player"
            playing={true}
            width="100%"
            height="100%"
            controls={false}
          />
        )}
      </div>
    </div>
  );
}

export default Live;
