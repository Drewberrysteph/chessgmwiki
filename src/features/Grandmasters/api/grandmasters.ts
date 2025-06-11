import axios from "axios";
import { Club, ClubsResponse, GrandmasterProfile, GrandMastersResponse } from "../types";

export const fetchGrandmasters = async (): Promise<GrandMastersResponse> => {
  const res = await axios.get<GrandMastersResponse>(
    "https://api.chess.com/pub/titled/GM"
  );
  return res.data;
};

export const fetchGrandmasterProfile = async (
  username: string
): Promise<GrandmasterProfile> => {
  const res = await axios.get<GrandmasterProfile>(
    `https://api.chess.com/pub/player/${username}`
  );
  return res.data;
};

export const fetchGrandmasterClubs = async (
  username: string
): Promise<Club[]> => {
  const res = await axios.get<ClubsResponse>(
    `https://api.chess.com/pub/player/${username}/clubs`
  );
  return res.data.clubs.filter((club) => club.icon && club.name);
};
