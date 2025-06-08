import { Employee } from "./Employee";

export interface EmployeeDatabase {
    getEmployee(id: string): Promise<Employee | undefined>
    // getEmployees(filterText: string): Promise<Employee[]>
    getEmployees(filterText: string, department: string, position: string): Promise<Employee[]>
}
