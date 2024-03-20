"use client";
import Card from "./card";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useSWR from "swr";

// import required modules
import { Autoplay } from "swiper/modules";

function GroupsCard() {
  const fetcher = (...args) =>
    fetch(...args)
      .then((res) => res.json())
      .catch((err) => console.log({ err }));
  const { data, error, isLoading, mutate } = useSWR(
    "https://www.sporent.net/LeagueChampionship",
    fetcher,
    { fallback: false, revalidateOnFocus: false, keepPreviousData: true }
  );

  function convertDate(dateStr) {
    // Convert the string to a Date object
    var dateObj = new Date(dateStr);

    // Define Arabic month names array
    var monthNamesArabic = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];

    // Extract day and month
    var day = dateObj.getDate();
    var monthIndex = dateObj.getMonth();

    // Format the date
    var formattedDate = day + " " + monthNamesArabic[monthIndex];

    return formattedDate;
  }

  function convertTime(timeStr) {
    // Convert the string to a Date object
    var timeObj = new Date(timeStr);

    // Extract hours and minutes
    var hours = timeObj.getHours();
    var minutes = timeObj.getMinutes();

    // Convert hours to 12-hour format
    var meridiem = hours >= 12 ? "م" : "ص";
    hours = hours % 12 || 12;

    // Format the time
    var formattedTime =
      hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + meridiem;

    return formattedTime;
  }
  const tableActions = [
    {
      Header: "Topic",
      accessor: "Topic",
      Cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 ">
            <div className="relative md:w-[40px] min-w-fit md:h-[40px] w-[20px] h-[20px]">
              <Image
                fill
                className="rounded-full"
                alt="سبورنت"
                src={row.original.Logo}
              />
            </div>
            <div className="text-right ">{row.original.Name}</div>
          </div>
        );
      },
    },
    {
      Header: "لعب",
      accessor: "Play",
      Cell: ({ row }) => {
        return row.original.Play;
      },
    },
    {
      Header: "ف",
      accessor: "Win",
      Cell: ({ row }) => {
        return row.original.Win;
      },
    },
    {
      Header: "ت",
      accessor: "Draw",
      Cell: ({ row }) => {
        return row.original.Draw;
      },
    },
    {
      Header: "خ",
      accessor: "Lost",
      Cell: ({ row }) => {
        return row.original.Lost;
      },
    },
    {
      Header: "له",
      accessor: "ForThem",
      Cell: ({ row }) => {
        return row.original.ForThem;
      },
    },
    {
      Header: "عليه",
      accessor: "A",
      Cell: ({ row }) => {
        return row.original.A;
      },
    },
    {
      Header: "الفرق",
      accessor: "GD",
      Cell: ({ row }) => {
        return row.original.GD;
      },
    },
    {
      Header: "النقاط",
      accessor: "Pts",
      Cell: ({ row }) => {
        return row.original.Pts;
      },
    },
  ];

  return (
    <div className="px-5 lg:px-0">
      <div className="container m-auto ">
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          centeredSlidesBounds={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 1,
            },
            639: {
              slidesPerView: 1,
            },
            865: {
              slidesPerView: 1,
            },
            1000: {
              slidesPerView: 1,
            },
            1200: {
              slidesPerView: 2,
            },
          }}
          slidesPerView={1}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {data?.Championship?.map?.((i) => (
            <SwiperSlide key={i.Topic}>
              {i.Type == "Group" ? (
                <Card
                  title={i.Topic}
                  tableActions={tableActions}
                  data={i.Teams}
                  // data={
                  //   data?.Championship?.filter?.(
                  //     (card) => card.Type == "Group"
                  //   )[0]?.i.Teams ?? []
                  // }
                />
              ) : (
                <div className="dark:bg-gradient-to-b from-[#2C303C] to-[#1D1E23]  overflow-x-auto border rounded-2xl border-main dark:border-[#4A4E57]">
                  <div className="bg-[#3F8CAA] rounded-t-2xl px-10 py-2 font-[800] text-[#FFFFFF] md:text-lg xl:text-xl text-sm    border-[#3F8CAA] border-4   select-none ">
                    {i.Topic}
                  </div>
                  <div>
                    {i.Teams?.map?.((match, index) => (
                      <div
                        key={index + match.MatchDate?.Day + Math.random()}
                        className={`flex flex-wrap gap-1 sm:gap-0 sm:flex-nowrap items-center justify-between py-4  ${
                          index == 0 && "pb-2"
                        }  ${
                          index + 1 != i.Teams &&
                          index != i.Teams.length - 1 &&
                          "border-b "
                        }  border-main dark:border-[#4A4E57]`}
                      >
                        <div className="  text-lg sm:text-xs text-center mx-4 md:text-md text-main dark:text-[#878A91]">
                          <div>
                            {match?.MatchDate
                              ? convertDate(match?.MatchDate)
                              : ""}{" "}
                          </div>
                        </div>
                        <div className="flex flex-col-reverse items-center justify-center w-full gap-1 sm:w-fit sm:flex-row">
                          <div className="font-[600]  dark:text-[#FFFFFF] text-main   min-w-[115px] sm:text-xs text-lg  xl:text-lg lg:min-w-[120px]  xl:min-w-[172px] lg:text-sm ">
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
                          <div className="font-[600] m:w-fit w-full justify-center text-2xl text-main dark:text-[#FFFFFF] flex gap-0.5">
                            <div>{match?.FirstTeam?.Gol ?? "-"}</div>
                            <div>:</div>
                            <div>{match?.SecondTeam?.Gol ?? "-"}</div>
                          </div>
                          {match?.FirstTeam?.PenaltyShootoutsGoal > 0 && (
                            <div className="font-[400] m:w-fit w-full justify-center text-sm text-main dark:text-[#3F8CAA] flex gap-0.5">
                              <div>
                                ({match?.FirstTeam?.PenaltyShootoutsGoal ?? "-"}
                              </div>
                              <div>:</div>
                              <div>
                                {match?.SecondTeam?.PenaltyShootoutsGoal ?? "-"}
                                )
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col-reverse items-center justify-center w-full gap-1 sm:w-fit sm:flex-row">
                          <div className="relative   md:w-[40px] md:h-[40px] w-[40px] h-[40px] sm:w-[20px] sm:h-[20px]">
                            <Image
                              className="rounded-full"
                              alt="spornet"
                              fill
                              src={match?.SecondTeam?.Logo}
                            />
                          </div>
                          <div className="font-[600] text-main dark:text-[#FFFFFF] text-right  min-w-[115px] sm:text-xs text-lg  xl:text-lg lg:min-w-[120px]  xl:min-w-[172px] lg:text-sm ">
                            {match?.SecondTeam?.Name ?? "-"}
                          </div>
                        </div>
                        <div className="text-main  text-lg sm:text-xs text-center min-w-fit mx-4 md:text-md  dark:text-[#878A91]">
                          <div>
                            {match?.MatchDate
                              ? convertTime(match?.MatchDate)
                              : ""}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default GroupsCard;
