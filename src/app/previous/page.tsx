import { MixcloudResponse } from "@/models/wire/mixcloud";
import React from "react";
import axios from "axios";
import { JobInfoModel } from "@/models/index";
import { plainToInstance } from "class-transformer";
import logger from "@/lib/util/logging";
import { StatusCodes } from "http-status-codes";
import PreviousPage from "@/components/pages/previous/PreviousPage";

const getData = async (): Promise<MixcloudResponse | undefined> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/shows/previous`
    );
    if (response.status === StatusCodes.OK) {
      const results = plainToInstance(MixcloudResponse, response.data, {});
      return results;
    }
  } catch (err) {
    logger.error("page", "getData", err);
  }
  return undefined;
};
const Previous = async () => {
  const data = await getData();
  return data ? (
    <PreviousPage shows={data} />
  ) : (
    <div>No prevous shows found</div>
  );
};

export default Previous;
