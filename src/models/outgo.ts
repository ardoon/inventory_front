import { DateObject } from "react-multi-date-picker";
import Record from "./record";

export default interface Outgo {
  id: string;
  userId: number;
  userName: string;
  sectionName: string;
  sectionId: number;
  date: DateObject;
  receptNo: string;
  records: Record[];
}