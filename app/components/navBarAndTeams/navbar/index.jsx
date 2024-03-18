import Logo from "../../../assets/img/logo.png";
import Image from "next/image";
import Link from "next/link";
import LightLogo from "../../../assets/img/logoLight.png";
import { useState, useEffect } from "react";

function Navbar({ isDarkMode, Topic, Sponsors }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log("dd", Sponsors);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === Sponsors.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 10 seconds

    return () => clearInterval(intervalId);
  }, [currentImageIndex, Sponsors.length]);

  return (
    <div className=" bg-[#F5F0FA] dark:bg-[#1C1D22]  from-cyan-500 to-blue-500 border-b-main dark:border-b-[#4A4E57] border-b px-5">
      <div
        className={`container relative flex flex-wrap justify-center items-center  py-3 m-auto gap-x-5 gap-y-1 md:gap-y-3 lg:items-end  ${
          Sponsors?.length > 0 && "lg:justify-between md:justify-evenly "
        }  md:py-7`}
      >
        <div className={`${Sponsors?.length == 0 && "right-0 lg:absolute"} `}>
          <Link target="blank" href="https://sporent.net/">
            <div className="flex items-center justify-center hover:cursor-pointer">
              <div className="relative md:w-[211px] md:h-[50px] w-[140px] h-[33px] overflow-hidden">
                <Image fill src={isDarkMode ? LightLogo : Logo} alt="سبورنت" />
              </div>
            </div>
          </Link>
        </div>
        <div
          className={`md:text-3xl  w-[70%] text-center lg:text-4xl text-2xl font-[800] text-main dark:text-[#FFFFFF]`}
        >
          {Topic}
        </div>
        {Sponsors?.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="md:text-2xl sm:text-xl text-lg font-bold text-[#2A2A2A] dark:text-[#FFFFFF] min-w-fit">
              برعاية :
            </div>

            <Image
              width={0}
              height={0}
              style={{ width: "50px", height: "100%" }}
              src={`data:image/jpeg;base64,${Sponsors?.[currentImageIndex]?.Logo}`}
              alt="spornet"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
