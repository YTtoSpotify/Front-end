export interface Channel {
  name: string;
  img: string;
  _id: string;
  ytId: string;
  url: string;
}

export interface ChannelsHttpResponse {
  channels: Channel[];
  currentPage: number;
  numOfChannels: number;
  totalPagesCount: number;
}

export type FilterTypes = "all" | "user";