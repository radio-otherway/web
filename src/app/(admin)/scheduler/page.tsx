import React from "react";
import { JobInfoModel } from "@/models/index";
import { SchedulerPage } from "@/components/pages/admin/scheduler";
import { plainToInstance } from "class-transformer";
import axios from "axios";
import logger from "@/lib/util/logging";

const getData = async (): Promise<JobInfoModel[] | undefined> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SCHEDULER_API_HOST}/job`
    );
    if (response.status === 200) {
      const results = response.data.map((value: JobInfoModel) =>
        plainToInstance(JobInfoModel, value, {})
      );
      return results;
    }
  } catch (err) {
    logger.error("page", "getData", err);
  }
  return undefined;
};

const Scheduler = async () => {
  const data = await getData();
  return data ? <SchedulerPage data={data} /> : <div>No data to show</div>;
};

export default Scheduler;
