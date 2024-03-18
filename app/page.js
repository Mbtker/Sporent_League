"use client";
import GroupsCard from "./components/groupsCard/index";
import Matches from "./components/Matches/index";
import Footer from "./components/footer";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import Live from "./components/live/index";
import NavbarAndTeams from "./components/navBarAndTeams";
import { mutate } from "swr";
import { db } from "./utilis/firebase";
import { ref, onValue } from "firebase/database";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme, setTheme } = useTheme();

  function isBetween6PMand6AM() {
    // Get the current date and time
    let currentTime = new Date();

    // Extract hours from the current time
    let hours = currentTime.getHours();

    // Check if the time is between 6 PM (18) and 6 AM (6)
    if (hours >= 18 || hours < 6) {
      return true; // It's between 6 PM and 6 AM
    } else {
      return false; // It's not between 6 PM and 6 AM
    }
  }

  // Call the function and store the result
  let isBetween = isBetween6PMand6AM();

  // Display the result

  useEffect(() => {
    if (isBetween) {
      setTheme("dark");
      setIsDarkMode(true);
    } else {
      setTheme("light");
      setIsDarkMode(false);
    }
  }, [isBetween]);

  const leagueDataRef = useRef({});

  useEffect(() => {
    const leagueRef = ref(db, "League");

    const unsubscribe = onValue(leagueRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedLeagueData = snapshot.val();
        console.log("Response from API:", fetchedLeagueData);

        // Check if leagueDataRef is not empty
        if (Object.keys(leagueDataRef.current).length > 0) {
          // Check for updated endpoints and mutate if necessary
          Object.keys(fetchedLeagueData).forEach((endpoint) => {
            const apiTimestamp = new Date(
              fetchedLeagueData[endpoint]
            ).getTime();
            const storedTimestamp = new Date(
              leagueDataRef.current[endpoint] || "1970-01-01"
            ).getTime();
            if (apiTimestamp > storedTimestamp) {
              // Mutate the API data for the updated endpoint
              mutate(
                `https://www.sporent.net/${endpoint}`,
                fetchedLeagueData[endpoint]
              );
            }
          });
        }

        // Update leagueDataRef after checking for updates
        leagueDataRef.current = fetchedLeagueData;
      }
    });

    return () => {
      // Unsubscribe from real-time updates when component unmounts
      unsubscribe();
    };
  }, []); // Run only once on component mount

  return (
    <div className="">
      <NavbarAndTeams isDarkMode={isDarkMode} />
      <GroupsCard />

      <div className="container flex flex-wrap items-start justify-between gap-5 m-auto mt-5 xl:flex-nowrap">
        <Matches />
        <Live />
      </div>
      <Footer />
    </div>
  );
}
