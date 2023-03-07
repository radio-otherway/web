"use client";
import { JobInfoModel } from "@/models";
import React from "react";
import { GoRocket } from "react-icons/all";
import axios from "axios";
import { StatusCode } from "@google-cloud/firestore/build/src/status-code";
import { StatusCodes } from "http-status-codes";
import ToastService from "@/components/widgets/toast";

interface ISchedulePageProps {
  data: JobInfoModel[];
}


const SchedulerPage = ({ data }: ISchedulePageProps) => {
  const _triggerJob = async (job: string) => {
    const result = await axios.post(`${process.env.NEXT_PUBLIC_SCHEDULER_API_HOST}/job`, { jobName: job });
    if (result.status === StatusCodes.OK) {
      ToastService.success("Job triggered successfully");
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <th>Job Name</th>
          <th>Next Run</th>
          <th>Last Run</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {data?.map((d) => {
          return d && d.jobs && d.jobs.map((j) => {
            return j && j.triggers && (
              <tr key={j.jobName}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>{j.jobName}</th>
                <td>{j.triggers[0].nextFireTimeHuman}</td>
                <td>{j.triggers[0].previousFireTimeHuman}</td>
                <th>
                  <button className="btn btn-outline gap-2"
                          onClick={() => j.jobName && void _triggerJob(j.jobName)}>
                    < GoRocket className="h-6 w-6" />
                    Trigger Now
                  </button>
                </th>
              </tr>
            );
          });
        })}
        </tbody>
      </table>
    </div>
  );
};
export default SchedulerPage;
