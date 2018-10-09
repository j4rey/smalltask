export class Emp {
    public edit: boolean = false;
    constructor(
        public ID: number,
        public Name: string,
        public Gender: string,
        public Salary: number,
        public DepartmentId: number
    ) {
    }

}