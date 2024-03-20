// export default config;
import type { Config } from "@jest/types";
import { defaults } from "jest-config";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
};
export default config;
