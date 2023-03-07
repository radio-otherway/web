"use client";
import { JobInfoModel } from "@/models";
import React from "react";
import { GoRocket } from "react-icons/go";
import { StatusCodes } from "http-status-codes";
import ToastService from "@/components/widgets/toast";
import logger from "@/lib/util/logging";

interface ISchedulePageProps {
  data: JobInfoModel[];
}

const SchedulerPage = ({ data }: ISchedulePageProps) => {
  const _triggerJob = async (group: string, job: string) => {
    console.log(
      "SchedulerPage",
      "_triggerJob",
      process.env.NEXT_PUBLIC_SCHEDULER_API_HOST
    );
    try {
      const body = {
        group: group,
        jobName: job
      };
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SCHEDULER_API_HOST}/job/trigger`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      if (result.status === StatusCodes.OK) {
        ToastService.success("Job triggered successfully");
      }
    } catch (err) {
      logger.error("SchedulerPage", "_triggerJob", err);
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
              <input title="nothing" type="checkbox" className="checkbox" />
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
          return (
            d &&
            d.group &&
            d.jobs &&
            d.jobs.map((j) => {
              return (
                j &&
                j.triggers && (
                  <tr key={j.jobName}>
                    <th>
                      <label>
                        <input
                          title="notused"
                          type="checkbox"
                          className="checkbox"
                        />
                      </label>
                    </th>
                    <th>{j.jobName}</th>
                    <td>{j.triggers[0].nextFireTimeHuman}</td>
                    <td>{j.triggers[0].previousFireTimeHuman}</td>
                    <th>
                      <button
                        title="Trigger Now"
                        className="btn-outline btn gap-2"
                        onClick={() =>
                          j.jobName && void _triggerJob(d.group as string, j.jobName)
                        }
                      >
                        <GoRocket className="h-4 w-4" />
                      </button>
                    </th>
                  </tr>
                )
              );
            })
          );
        })}
        </tbody>
      </table>
    </div>
  );
};
export default SchedulerPage;
