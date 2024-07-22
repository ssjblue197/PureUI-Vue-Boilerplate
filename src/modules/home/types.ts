export interface History {
  fromId?: number;
  inDate?: string;
  action?: string;
  message?: string;
  toId?: number;
  value?: number;
  status?: string;
}
export interface Statistic {
  totalUser?: number;
  deposit?: number;
  withDraw?: number;
  profitLoss?: number;
  tradingVolume?: number;
  earn?: number;
}

export type StatisticType = 'MONTHLY' | 'WEEKLY' | 'DAILY';
export interface FilterParams {
  from_date?: string;
  to_date?: string;
  type?: StatisticType;
}

export type Actions = {
  history: (params?: FilterParams) => Promise<any>;
  statistics: (params?: FilterParams) => Promise<any>;
  reset: () => void;
};

export interface State {}
