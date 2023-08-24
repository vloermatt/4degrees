export type RugbyAPIStatusResponse = {
  account: {
    firstname: string;
    lastname: string;
    email: string;
  };
  subscription: {
    plan: string;
    end: Date;
    active: boolean;
  };
  requests: {
    current: number;
    limit_day: number;
  };
};

export type Game = {
  id: number;
  date: string;
  time: string;
  timestamp: number;
  timezone: string;
  week: string | null;
  status: {
    long: string;
    short: string;
  };
  country: Country;
  league: League;
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  scores: {
    home: number | null;
    away: number | null;
  };
  periods: {
    first: {
      home: number | null;
      away: number | null;
    };
    second: {
      home: number | null;
      away: number | null;
    };
    overtime: {
      home: number | null;
      away: number | null;
    };
    second_overtime: {
      home: number | null;
      away: number | null;
    };
  };
};

export type Country = {
  id: number;
  name: string;
  code: string | null;
  flag: string | null;
};

export type Season = {
  season: number;
  current: boolean;
  start: string;
  end: string;
};

export type League = {
  id: number;
  name: string;
  type: string;
  logo: string;
  country?: Country;
  seasons?: Season[];
};

export type NavRoute = {
  path: string;
  title: string;
  hideNav?: boolean;
  onNav?: boolean;
};

export type Score = {
  home: number;
  away: number;
};
