import { DateObject } from "react-multi-date-picker";
import Record from "./record";

export default interface Entry {
  id: string;
  userId: number;
  userName: string;
  warehouseName: string;
  warehouseId: number;
  date: DateObject;
  receptNo: string;
  records: Record[];
}