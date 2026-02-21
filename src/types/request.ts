import type { Types } from "mongoose";

export interface UserReadOneParams {
  id: Types.ObjectId;
}

export interface UserDeleteOneParams {
  id: Types.ObjectId;
}
