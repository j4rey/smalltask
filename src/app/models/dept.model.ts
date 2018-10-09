import { Emp } from "./emp.model";

export class Dept {
    public edit: boolean = false;
    public DepartmentHead: number
    constructor(
        public ID: number,
        public DepartmentName: string,
        public Location: string
    ) {
        
    }
}