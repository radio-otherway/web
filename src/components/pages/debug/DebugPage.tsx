"use client";
import TitleCard from "@/components/widgets/cards/TitleCard";
import logger from "@/lib/util/logging";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import packageJson from "../../../../package.json";

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
    <div className="flex flex-col justify-center flex-shrink-0 w-3/4 col-span-3 row-span-3 gap-4 p-4 mx-2 shadow-xl rounded-box bg-base-100 xl:mx-0 xl:w-full">
      <TitleCard title="Scheduler Settings">
        <div className="px-6 pt-6">
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
                  <tr>
                    <td>Web App Version</td>
                    <td>{packageJson.version}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};
export default DebugPage;
