export enum TriggerState {
  Normal,
  Paused,
  Complete,
  Error,
  Blocked,
  None,
}

export class JobInfoModel {
  group?: string;
  jobs?: JobInfoModelJobs[];
}

export class JobInfoModelJobs {
  detail?: string | null;
  jobName?: string;
  triggers?: JobInfoModelTriggers[];
}

export class JobInfoModelTriggers {
  name?: string = "";
  group?: string = "";
  type?: string = "";
  state?: TriggerState;
  nextFireTime?: string | null;
  nextFireTimeHuman?: string | null;
  previousFireTime?: string | null;
  previousFireTimeHuman?: string | null;
}
