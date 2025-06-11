import { useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";

import Paragraph from "../../../components/Paragraph/Paragraph";
import Image from "../../../components/Image/Image";
import Loading from "../../../components/Loading/Loading";

import {
  fetchGrandmasters,
  fetchGrandmasterProfile,
  fetchGrandmasterClubs,
} from "../api/grandmasters";
import { GrandmasterProfileWithClubs } from "../types";

import { PAGE_NUMBER, PAGE_SIZE } from "../utils";

import styles from "./Grandmasters.module.scss";

const Grandmasters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || PAGE_NUMBER;
  const [players, setPlayers] = useState<GrandmasterProfileWithClubs[]>([]);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetchGrandmasters();
        const usernames = res.players;

        setPlayers(
          usernames.map((username) => ({
            username,
          }))
        );
      } catch {
        setError("Failed to fetch players");
      } finally {
        setLoadingPlayers(false);
      }
    };
    fetchPlayers();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      const startIdx = (currentPage - 1) * PAGE_SIZE;
      const currentPlayers = players.slice(startIdx, startIdx + PAGE_SIZE);

      const updates = await Promise.all(
        currentPlayers.map(async (player) => {
          try {
            const profilePromise = fetchGrandmasterProfile(player.username);
            const clubsPromise = fetchGrandmasterClubs(player.username);

            const [profile, clubs] = await Promise.all([
              profilePromise,
              clubsPromise,
            ]);
            return { ...player, ...profile, clubs };
          } catch {
            return { ...player };
          }
        })
      );

      setPlayers((prev) => {
        // Map for quick lookup
        const updatesMap = new Map(updates.map((upd) => [upd.username, upd]));
        return prev.map((p) => updatesMap.get(p.username) ?? p);
      });
    };

    if (players.length > 0) fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players.length, currentPage]);

  useEffect(() => {
    setCurrentPage(pageFromUrl);
    // eslint-disable-next-line
  }, [pageFromUrl]);

  const totalPages = Math.ceil(players.length / PAGE_SIZE);
  const startIdx = (currentPage - PAGE_NUMBER) * PAGE_SIZE;
  const currentPlayers = players.slice(startIdx, startIdx + PAGE_SIZE);

  const handlePrev = () => setSearchParams({ page: String(currentPage - PAGE_NUMBER) });
  const handleNext = () => setSearchParams({ page: String(currentPage + PAGE_NUMBER) });

  if (loadingPlayers) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Chess Grandmasters Wiki</h1>
      <main className={styles.playerGrid}>
        {currentPlayers.map((player, idx) => (
          <Link
            to={`/${player.username}`}
            state={player}
            key={`${player.username}-${idx}`}
            className={styles.playerCard}
          >
            <div className={styles.card}>
              <Image src={player.avatar} alt={`${player.username} avatar`} borderRadius="50%"/>
              <div className={styles.playerInfo}>
                <Paragraph text={player.username} fontSize={24} fontWeight={600} />
                <Paragraph
                  text={player.name}
                  fontSize={17}
                  fontWeight={400}
                />
                <div className={styles.clubsContainer}>
                  <Paragraph text="Clubs:" fontSize={14} />
                  {player.clubs === null ? (
                    <span style={{ marginLeft: 8 }}>...</span>
                  ) : player.clubs && player.clubs.length > 0 ? (
                    <div className={styles.clubIconsContainer}>
                      {player.clubs.slice(0, 5).map((club, idx) => (
                        <div className={styles.clubIcon} key={`${club}-${idx}`}>
                          <Image
                            src={club.icon}
                            alt={club.name}
                            title={club.name}
                            height="24px"
                            width="24px"
                            borderRadius="50%"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Paragraph text="N/A" fontSize={14} />
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </main>
      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Grandmasters;
