export type GrandMastersResponse = { players: string[] };

export type ClubsResponse = { clubs: Club[] };

export type Club = {
  icon: string;
  name: string;
  joined: number;
};

export type GrandmasterProfile = {
  avatar?: string;
  name?: string;
  username: string;
};

export type GrandmasterProfileWithClubs = GrandmasterProfile & {
  clubs?: Club[] | null;
};
