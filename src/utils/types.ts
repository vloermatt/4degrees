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
  week: string;
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
    home: number;
    away: number;
  };
  periods: {
    first: {
      home: number;
      away: number;
    };
    second: {
      home: number;
      away: number;
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
  code: string;
  flag: string;
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
  seasons: Season[];
};

export type NavRoute = {
  path: string;
  title: string;
};
