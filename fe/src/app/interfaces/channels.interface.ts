export interface Channel {
  name: string;
  img: string;
  _id: string;
  ytId: string;
  url: string;
  isUserSub: boolean;
}

export interface ChannelsHttpResponse {
  channels: Channel[];
  currentPage: number;
  numOfChannels: number;
  totalPagesCount: number;
}

export type FilterTypes = "available" | "user";

export enum ChannelSpinnerEvents {
  FETCHCHANNEL = "fetch channel",
  REMOVECHANNEL = "remove channel",
  SEARCHCHANNELS = "search channels",
}

export interface ChannelSpinnerEvent {
  type: ChannelSpinnerEvents;
  _id?: string;
}
