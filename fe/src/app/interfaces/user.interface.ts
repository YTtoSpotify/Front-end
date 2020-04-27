import { Channel } from "./channels.interface";
export interface User {
  hasPlaylist: boolean;
  _id: string;
  email: string;
  subbedChannels: Channel[];
  displayName: string;
  username: string;
  spotifyId: string;
  photo: string;
  firstName: string;
  lastName: string;
}
