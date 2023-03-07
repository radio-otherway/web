import React from "react";
import { JobInfoModel } from "@/models/index";
import { SchedulerPage } from "@/components/pages/admin/scheduler";
import { plainToInstance } from "class-transformer";
import axios from "axios";

const getData = async (): Promise<JobInfoModel[] | undefined> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_SCHEDULER_API_HOST}/job`);
  if (response.status === 200) {
    const results = response.data.map((value: JobInfoModel) =>
      plainToInstance(JobInfoModel, value, {})
    );
    return results;
  }
  return undefined;
};

const Scheduler = async () => {
  const data = await getData();
  return data ? <SchedulerPage data={data} /> : <div>No data to show</div>;
};

export default Scheduler;
