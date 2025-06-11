import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

import Image from "../../../components/Image/Image";
import Paragraph from "../../../components/Paragraph/Paragraph";
import { Club } from "../types";

import styles from "./Grandmasters.module.scss";

const GrandmasterProfile = () => {
  const location = useLocation();
  const player = location.state;

  const {
    avatar,
    username,
    player_id,
    name,
    title,
    last_online,
    location: playerLocation,
    clubs,
    followers,
    joined,
    country,
  } = player;
  const [elapsed, setElapsed] = useState(() => {
    const now = Math.floor(Date.now() / 1000);
    return now - last_online;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor(Date.now() / 1000) - last_online);
    }, 1000);
    return () => clearInterval(interval);
  }, [last_online]);

  const formatElapsed = (seconds: number) => {
    const pad = (n: number) => String(n).padStart(2, "0");
    if (seconds < 60) return `00:${pad(seconds)} ago`;
    if (seconds < 3600) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${pad(m)}:${pad(s)} ago`;
    }
    if (seconds < 86400) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${pad(h)}:${pad(m)}:${pad(s)} ago`;
    }
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d}d ${pad(h)}:${pad(m)}:${pad(s)} ago`;
  };

  // Flag icon
  const countryCode = country?.split("/").pop();

  return (
    <div className={styles.profileContainer}>
      <div className={styles.leftContainer}>
        <Image
          src={avatar}
          alt={`${username} avatar`}
          height="230px"
          width="230px"
          borderRadius="0"
        />
        <div className={styles.playerAbout}>
          <div className={styles.playerAboutRow}>
            <Paragraph text="Player ID" fontWeight={600} />
            <Paragraph text={player_id} />
          </div>
          <div className={styles.playerAboutRow}>
            <Paragraph text="Username" fontWeight={600} />
            <Paragraph text={username} />
          </div>
          <Paragraph
            text={`Joined ${new Date(joined * 1000).toLocaleDateString(
              undefined,
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )}`}
          />
          <div className={styles.playerAboutRow}>
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              style={{
                width: "2em",
                height: "2em",
                marginRight: "0.5em",
                verticalAlign: "middle",
              }}
              title={countryCode}
            />
            <Paragraph
              text={`${countryCode}, ${playerLocation ?? "N/A"}`}
              color="#aaaaaa"
            />
          </div>

          <div className={styles.followers}>
            <FontAwesomeIcon icon={faUserFriends} />
            <Paragraph text={followers || 0} color="#aaaaaa" />
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.basicInfo}>
          <div className={styles.nameContainer}>
            <Paragraph text={title} fontWeight={600} color="#69923e" />
            <Paragraph text={name} fontSize={32} fontWeight={600} />
          </div>
        </div>
        <Paragraph
          text={
            last_online
              ? `Online ${formatElapsed(elapsed)}`
              : "Last online: Unknown"
          }
        />
        <div className={styles.clubs}>
          <div className={styles.clubTitle}>
            <Paragraph text="CLUBS" fontWeight={600} />
          </div>
          <div className={styles.icons}>
            {clubs?.slice(0, 10).map((club: Club, idx: number) => (
              <div className={styles.icon} key={`${club}-${idx}`}>
                <Image
                  src={club.icon}
                  alt={club.name}
                  title={club.name}
                  height="34px"
                  width="34px"
                />
                <div>
                  <Paragraph
                    text={club.name}
                    fontSize={12}
                    fontWeight={600}
                    color="#333333"
                  />
                  <Paragraph
                    text={`Joined ${new Date(
                      club.joined * 1000
                    ).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}`}
                    fontSize={12}
                    fontWeight={400}
                    color="#999999"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrandmasterProfile;
