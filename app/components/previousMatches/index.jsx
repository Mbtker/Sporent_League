import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function PreviousMatches({ otherMatchesData }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    vertical: true,
    verticalSwiping: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };
  function getTime(timeString) {
    // Split the time string into hours and minutes
    var timeParts = timeString.split(" ");
    var time = timeParts[0]; // Extract the time part

    return time;
  }
  function getChar(timeString) {
    // Split the time string into hours and minutes
    var timeParts = timeString.split(" ");

    var char = timeParts[1]; // Extract the character

    return char;
  }

  return (
    <div className="mt-5 ">
      <div className="md:hidden">
        <Slider {...settings}>
          {otherMatchesData?.map?.((match, index) => (
            <div
              className={`flex px-6 pt-2 pb-4  mt-2  items-center rounded-2xl  text-main  ${
                index % 2 != 0
                  ? "dark:bg-gradient-to-b bg-[#CEDFE6] from-[#2C303C] to-[#1D1E23]  dark:border-[#4A4E57]"
                  : "dark:bg-[#2E323E]"
              }     dark:border-[#4A4E57] bg-[#E5EFF1]`}
            >
              <div className="flex flex-row justify-center sm:flex-col gap-0.5 w-full items-center  text-sm   dark:text-[#FFFFFF]">
                <div> {match?.MatchDate?.Month ?? "-"}</div>
                <div>{match?.MatchDate?.Day ?? "-"} </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-col-reverse items-center justify-center w-full gap-2 sm:w-fit sm:flex-row">
                  <div className="font-[600] dark:text-[#FFFFFF] text-center min-w-[115px] text-xs   ">
                    {match?.FirstTeam?.Name ?? "-"}
                  </div>
                  <div className="relative    w-[70px] h-[70px] ">
                    <Image
                      className="rounded-full"
                      alt="spornet"
                      fill
                      src={match?.FirstTeam?.Logo}
                    />
                  </div>
                </div>
                <div className="m:w-fit min-h-[54px] w-full flex-col justify-center items-center text-2xl dark:text-[#FFFFFF] flex gap-0.5">
                  <div className="font-[600] m:w-fit w-full justify-center text-2xl dark:text-[#FFFFFF] flex gap-0.5">
                    <div>{match?.FirstTeam?.Gol ?? "-"}</div>
                    <div>:</div>
                    <div>{match?.SecondTeam?.Gol ?? "-"}</div>
                  </div>
                  {match?.FirstTeam?.PenaltyShootoutsGoal > 0 && (
                    <div className="font-[600] m:w-fit w-full justify-center text-sm text-main dark:text-[#3F8CAA] flex gap-0.5">
                      <div>
                        ({match?.FirstTeam?.PenaltyShootoutsGoal ?? "-"}
                      </div>
                      <div>:</div>
                      <div>
                        {match?.SecondTeam?.PenaltyShootoutsGoal ?? "-"})
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-2 m:w-fit sm:flex-row">
                  <div className="relative    w-[70px] h-[70px] ">
                    <Image
                      className="rounded-full"
                      alt="spornet"
                      fill
                      src={match?.SecondTeam?.Logo}
                    />
                  </div>
                  <div className="font-[600] dark:text-[#FFFFFF] text-center min-w-[115px] text-xs   ">
                    {match?.SecondTeam?.Name ?? "-"}
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center sm:flex-col gap-0.5 w-full items-center  text-sm   dark:text-[#FFFFFF]">
                <div>{getChar(match?.MatchDate?.Time) ?? "-"}</div>
                <div>{getTime(match?.MatchDate?.Time) ?? "-"}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="hidden md:flex">
        <Slider className="" {...settings}>
          {otherMatchesData?.map?.((match, index) => (
            <div
              key={index + match.MatchDate?.Day + Math.random()}
              className={`flex px-6 py-2  mt-2   rounded-2xl  text-main  ${
                index % 2 != 0
                  ? "dark:bg-gradient-to-b bg-[#CEDFE6] from-[#2C303C] to-[#1D1E23]  dark:border-[#4A4E57]"
                  : "dark:bg-[#2E323E]"
              }     dark:border-[#4A4E57] bg-[#E5EFF1]`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-0 sm:flex-nowrap">
                <div className="flex flex-row justify-center sm:flex-col gap-0.5 w-full items-center  text-lg sm:text-xs md:text-md  dark:text-[#FFFFFF]">
                  <div>{match?.MatchDate?.Day ?? "-"} </div>
                  <div> {match?.MatchDate?.Month ?? "-"}</div>
                </div>
                <div className="flex flex-col-reverse items-center justify-center w-full gap-2 sm:w-fit sm:flex-row">
                  <div className="font-[600] dark:text-[#FFFFFF] text-center min-w-[115px] sm:text-xs text-lg  md:min-w-[172px] md:text-lg ">
                    {match?.FirstTeam?.Name ?? "-"}
                  </div>
                  <div className="relative   md:w-[40px] md:h-[40px] w-[40px] h-[40px] sm:w-[20px] sm:h-[20px]">
                    <Image
                      className="rounded-full"
                      alt="spornet"
                      fill
                      src={match?.FirstTeam?.Logo}
                    />
                  </div>
                </div>
                <div className="m:w-fit min-h-[54px] w-full flex-col justify-center items-center text-2xl dark:text-[#FFFFFF] flex gap-0.5">
                  <div className="font-[600] m:w-fit w-full justify-center text-2xl dark:text-[#FFFFFF] flex gap-0.5">
                    <div>{match?.FirstTeam?.Gol ?? "-"}</div>
                    <div>:</div>
                    <div>{match?.SecondTeam?.Gol ?? "-"}</div>
                  </div>
                  {match?.FirstTeam?.PenaltyShootoutsGoal > 0 && (
                    <div className="font-[600] m:w-fit w-full justify-center text-sm text-main dark:text-[#3F8CAA] flex gap-0.5">
                      <div>
                        ({match?.FirstTeam?.PenaltyShootoutsGoal ?? "-"}
                      </div>
                      <div>:</div>
                      <div>
                        {match?.SecondTeam?.PenaltyShootoutsGoal ?? "-"})
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-2 m:w-fit sm:flex-row">
                  <div className="relative  md:w-[40px] md:h-[40px] w-[40px] h-[40px] sm:w-[20px] sm:h-[20px]">
                    <Image
                      className="rounded-full"
                      alt="spornet"
                      fill
                      src={match?.SecondTeam?.Logo}
                    />
                  </div>
                  <div className="font-[600] text-center dark:text-[#FFFFFF] text-lg sm:text-xs md:text-lg min-w-[115px] md:min-w-[172px]">
                    {match?.SecondTeam?.Name ?? "-"}
                  </div>
                </div>
                {match?.MatchDate?.Time && (
                  <div className="dark:text-[#FFFFFF] gap-1 min-w-fit justify-center items-start  flex text-lg sm:text-xs md:text-normal  md:w-fit w-full">
                    <div>{getChar(match?.MatchDate?.Time) ?? "-"}</div>
                    <div>{getTime(match?.MatchDate?.Time) ?? "-"}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default PreviousMatches;
