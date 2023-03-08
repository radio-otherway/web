"use client";
import logger from "@/lib/util/logging";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const DebugPage = () => {
  const [schedulerFullName, setSchedulerFullName] = useState("");
  const [schedulerAssemblyVersion, setSchedulerAssemblyVersion] = useState("");
  const [schedulerAssemblyFileVersion, setAssemblySchedulerFileVersion] =
    useState("");
  const [
    schedulerAssemblyInformationalVersion,
    setAssemblySchedulerInformationalVersion,
  ] = useState("");
  useEffect(() => {
    const getSchedulerVersion = async () => {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_SCHEDULER_API_HOST}/debug/version`
      );

      if (result.status === 200) {
        const {
          fullName,
          assemblyVersion,
          assemblyFileVersion,
          assemblyInformationalVersion,
        } = result.data;

        setSchedulerFullName(fullName);
        setSchedulerAssemblyVersion(assemblyVersion);
        setAssemblySchedulerFileVersion(assemblyFileVersion);
        setAssemblySchedulerInformationalVersion(assemblyInformationalVersion);
      }
    };
    getSchedulerVersion().catch((err) => {
      logger.error("DebugPage", "Error getting scheduler version", err);
    });
  }, []);
  return (
    <div className="svelte-1n6ue57 rounded-box col-span-3 row-span-3 mx-2 flex w-1.5 flex-shrink-0 flex-col justify-center gap-4 bg-base-100 p-4 shadow-xl xl:mx-0 xl:w-full">
      <div className="px-6 pt-6">
        <div className="text-xl font-extrabold">Scheduler Settings</div>{" "}
        <div className="flex-1 w-full dropdown">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Full Name</td>
                  <td>{schedulerFullName}</td>
                </tr>
                <tr>
                  <td>Assembly Version</td>
                  <td>{schedulerAssemblyVersion}</td>
                </tr>
                <tr>
                  <td>Assembly File Version</td>
                  <td>{schedulerAssemblyFileVersion}</td>
                </tr>
                <tr>
                  <td>Assembly Informational Version</td>
                  <td>{schedulerAssemblyInformationalVersion}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="form-control">
        <div className="dropdown dropdown-top dropdown-end">
          <div tabIndex={0}>
            <button className="space-x-2 btn-secondary btn-block btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>{" "}
              <span>Apply settings</span>
            </button>
          </div>{" "}
          <div tabIndex={0} className="py-2 dropdown-content">
            <div className="shadow-xl card compact rounded-box w-72 bg-neutral-focus text-neutral-content">
              <div className="card-body">
                <h2 className="font-extrabold capitalize card-title">
                  button component
                </h2>{" "}
                <p className="text-sm text-neutral-content text-opacity-80">
                  Buttons come in various shapes, colors and sizes
                </p>{" "}
                <div className="flex justify-end mt-4">
                  <Link
                    href="/components/button"
                    className="btn-primary btn-sm btn xl:btn-md"
                  >
                    See component
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DebugPage;
