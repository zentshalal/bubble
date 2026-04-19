export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  date: string;
}

export interface Profile {
  id: string;
  username: string;
  profile_pic: string;
  soulmate_id: string;
}

export interface Couple {
  id: string;
  lover_id: string;
  loved_id: string;
  date: string;
}
