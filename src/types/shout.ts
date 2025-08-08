export type Shout = {
  author: string;
  authorRole: string;
  timePosted: string; // e.g., "Fri May 30 2025 17:28:18 GMT-0400 (Eastern Daylight Time)"
  relevantRoles: string[];
  title: string;
  content: string;
  _id?: string;
};
