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
  INDIVIDUALCHANNEL = "channel processing",
  SEARCHCHANNELS = "search channels",
  FETCHCHANNELS = "fetch channels",
}

export interface ChannelSpinnerEvent {
  //   type: ChannelSpinnerEvents;
  _id?: string;
}
