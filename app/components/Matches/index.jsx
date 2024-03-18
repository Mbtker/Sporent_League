import Image from "next/image";
import PreviousMatches from "../previousMatches/index";
import useSWR from "swr";

function Matches() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: currentMatchData,
    error,
    isLoading,
  } = useSWR("https://www.sporent.net/CurrentMatch", fetcher, {
    fallback: false,
    revalidateOnFocus: false,
    keepPreviousData: true,
  });
  const {
    data: UpcomingMatchData,
    error: UpcomingError,
    isLoading: UpcomingIsLoading,
  } = useSWR("https://www.sporent.net/UpcomingMatch", fetcher, {
    fallback: false,
    revalidateOnFocus: false,
    keepPreviousData: true,
  });
  const {
    data: OtherMatchesData,
    error: OtherMatcheError,
    isLoading: OtherMatchesIsLoading,
  } = useSWR("https://www.sporent.net/OtherMatches", fetcher, {
    fallback: false,
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  return (
    <>
      <div className="xl:w-[50%]  w-full px-5 md:px-0">
        <div className={`grid w-full grid-cols-1 gap-5 md:grid-cols-2 `}>
          <div className="p-6 border dark:bg-gradient-to-b from-[#2C303C] to-[#1D1E23] min-h-[300px]  border-main rounded-2xl dark:border-[#4A4E57]">
            <div className="flex items-start justify-between">
              <div className="text-xl font-[800] leading-none text-main dark:text-[#FFFFFF]">
                المباراة الحالية
              </div>
              <div className="bg-[#EF3636] text-lg text-[#FFFFFF] font-bold px-8 rounded-full py-1 shadow-md -mt-2 ">
                الآن
              </div>
            </div>

            {currentMatchData != null && (
              <div className="flex items-start justify-between mt-4">
                <div className="flex flex-col items-center gap-2">
                  {currentMatchData?.FirstTeam?.Logo && (
                    <div className="relative rounded-full w-[100px] min-w-[100px]  h-[100px] overflow-hidden">
                      <Image
                        fill
                        alt="spornet"
                        src={currentMatchData?.FirstTeam?.Logo}
                      />
                    </div>
                  )}
                  <div className="my-2 font-bold text-sm text-center text-main dark:text-[#FFFFFF]">
                    {currentMatchData?.FirstTeam?.Name}
                  </div>
                  <div className="flex flex-col justify-start gap-1">
                    {currentMatchData?.FirstTeam?.GoalsDetails?.map(
                      (item, index) => (
                        <div
                          key={item?.Name + index}
                          className="text-xs leading-none text-right text-main dark:text-[#FFFFFF]"
                        >
                          <span>{item?.Time}</span> <span>{item?.Name}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {currentMatchData?.FirstTeam && (
                  <div className="m:w-fit min-h-[54px] w-full flex-col justify-center items-center text-2xl dark:text-[#FFFFFF] flex gap-0.5">
                    <div className="text-xl flex gap-0.5 min-w-fit font-[800] text-main mt-11 dark:text-[#FFFFFF]">
                      <div>{currentMatchData?.FirstTeam?.Gol ?? "-"}</div>
                      <div>:</div>
                      <div>{currentMatchData?.SecondTeam?.Gol ?? "-"}</div>
                    </div>
                    {currentMatchData?.FirstTeam?.PenaltyShootoutsGoal > 0 && (
                      <div className="font-[600] m:w-fit w-full justify-center text-sm text-main dark:text-[#3F8CAA] flex gap-0.5">
                        <div>
                          (
                          {currentMatchData?.FirstTeam?.PenaltyShootoutsGoal ??
                            ""}
                        </div>
                        <div>:</div>
                        <div>
                          {currentMatchData?.SecondTeam?.PenaltyShootoutsGoal ??
                            ""}
                          )
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col items-center gap-2">
                  {currentMatchData?.SecondTeam?.Logo && (
                    <div className="relative rounded-full w-[100px] h-[100px] overflow-hidden">
                      <Image
                        alt="spornet"
                        fill
                        src={currentMatchData?.SecondTeam?.Logo}
                      />
                    </div>
                  )}
                  <div className="my-2 font-bold text-center text-sm text-main dark:text-[#FFFFFF]">
                    {currentMatchData?.SecondTeam?.Name}
                  </div>
                  <div className="flex flex-col justify-start gap-1">
                    {currentMatchData?.SecondTeam?.GoalsDetails?.map?.(
                      (item, index) => (
                        <div
                          key={item.Name + index}
                          className="text-xs leading-none text-right text-main dark:text-[#FFFFFF]"
                        >
                          <span>{item?.Time}</span> <span>{item?.Name}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border dark:bg-gradient-to-b from-[#2C303C] to-[#1D1E23]  border-main dark:border-[#4A4E57] rounded-2xl ">
            <div className="flex justify-between">
              <div className="text-xl font-[800] leading-none text-main dark:text-[#FFFFFF]">
                المباراة التالية
              </div>
              {UpcomingMatchData?.MatchDate?.Date && (
                <div className="py-1 text-sm text-main dark:text-[#FFFFFF] flex gap-2">
                  <div>{UpcomingMatchData?.MatchDate?.Date}</div>
                  <div>{UpcomingMatchData?.MatchDate?.Time}</div>
                </div>
              )}
            </div>

            {UpcomingMatchData?.FirstTeam?.Logo && (
              <div className="flex items-start justify-between mt-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-[100px] min-w-[100px] rounded-full h-[100px] overflow-hidden">
                    <Image
                      alt="spornet"
                      fill
                      src={UpcomingMatchData?.FirstTeam?.Logo}
                    />
                  </div>
                  <div className="my-2 text-center font-bold text-sm text-main dark:text-[#FFFFFF]">
                    {UpcomingMatchData?.FirstTeam?.Name ?? "-"}
                  </div>
                </div>
                <div className="text-2xl font-[800] text-main mt-11 dark:text-[#FFFFFF]">
                  vs
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-[100px] rounded-full min-w-[100px] min-h-[100px] h-[100px] overflow-hidden">
                    <Image
                      alt="spornet"
                      fill
                      src={UpcomingMatchData?.SecondTeam?.Logo}
                    />
                  </div>
                  <div className="my-2 text-center font-bold text-main text-sm dark:text-[#FFFFFF]">
                    {UpcomingMatchData?.SecondTeam?.Name ?? "-"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <PreviousMatches otherMatchesData={OtherMatchesData} />
      </div>
    </>
  );
}

export default Matches;
