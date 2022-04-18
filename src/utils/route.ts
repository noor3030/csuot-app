import { ScheduleDetailsItem, ScheduleType } from "@/client";

export function addHashToLocation(that: any, params: string): string {
  const path: string = that.$route.path + params;
  history.pushState({}, "", that.$route.path + params);
  return path;
}

export function generateScheduleIdPath(item: ScheduleDetailsItem): string {
  let idType = "stage_id";
  switch (item.type) {
    case ScheduleType.STAGES:
      idType = "stage_id";
      break;
    case ScheduleType.CLASSROOMS:
      idType = "classroom_id";
      break;
    case ScheduleType.SUBJECTS:
      idType = "subject_id";
      break;
    case ScheduleType.TEACHERS:
      idType = "teacher_id";
      break;
  }

  return `?${idType}=${item.id}`;
}

export function addIdToUrl(that: any, item: ScheduleDetailsItem): string {
  return addHashToLocation(that, generateScheduleIdPath(item));
}
