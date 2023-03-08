import axios from "axios";
import { plainToInstance } from "class-transformer";
import { MixcloudResponse } from "@/models/wire/mixcloud";
import { StatusCodes } from "http-status-codes";

const MixcloudClient = {
  getShows: async (): Promise<MixcloudResponse | undefined> => {
    const response = await axios.get(
      "https://api.mixcloud.com/radiootherway/cloudcasts/"
    );
    if (response.status === StatusCodes.OK) {
      const results = plainToInstance(MixcloudResponse, response.data, {});
      return results;
    }
    return undefined;
  }
};

export default MixcloudClient;
