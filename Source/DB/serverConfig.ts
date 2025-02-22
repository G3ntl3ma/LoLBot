import mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * Config for storage of User Information
 */

const userConfigSchema = new Schema({
  _id: {
    type: String,
    required: true,
  }, //ServerID
  out: {
    type: String,
    required: true,
  }, //Output Channel
  teamSubs: [
    {
      type: String,
      required: true,
    },
  ], //Array of all teams that the Server is subscribed to
  timezone: { type: String, required: true },
});
/**
 * Config for Storing Game Information
 */
const gameConfigSchema = new Schema({
  Team1: {
    type: String,
    required: true,
  },
  Team2: {
    type: String,
    required: true,
  },
  Winner: {
    type: String,
    required: false,
  },
  "DateTime UTC": {
    type: String,
    required: true,
  },
  Tournament: {
    type: String,
    required: false,
  },
});

export const LoLConfig = mongoose.model("users", userConfigSchema);
export default LoLConfig;
export const gameConfig = mongoose.model("games", gameConfigSchema);
