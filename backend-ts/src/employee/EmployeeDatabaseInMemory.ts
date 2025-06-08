import { EmployeeDatabase } from "./EmployeeDatabase";
import { Employee } from "./Employee";

export class EmployeeDatabaseInMemory implements EmployeeDatabase {
    private employees: Map<string, Employee>

    constructor() {
        this.employees = new Map<string, Employee>();
        this.employees.set("1", { id: "1", name: "Jane Doe", age: 22, affiliation: "開発部", post: "一般"});
        this.employees.set("2", { id: "2", name: "John Smith", age: 28, affiliation: "開発部", post: "役員"});
        this.employees.set("3", { id: "3", name: "山田 太郎", age: 27, affiliation: "営業部", post: "一般"});
    }

    async getEmployee(id: string): Promise<Employee | undefined> {
        return this.employees.get(id);
    }

    async getEmployees(filterText: string): Promise<Employee[]> {
        const employees = Array.from(this.employees.values());
        if (filterText === "") {
            return employees;
        }
        // 完全一致でフィルタリングではなく一部一致に変更
        return employees.filter(employee => employee.name.includes(filterText));
        // もし完全一致でフィルタリングしたい場合は、以下のようにコメントアウトを外してください
        // return employees.filter(employee => employee.name === filterText);
    }

    async createEmployee(employee: Omit<Employee, "id">): Promise<Employee> {
        // 既存のIDを数値に変換して最大値を取得
        const existingIds = Array.from(this.employees.keys())
            .map(id => parseInt(id, 10))
            .filter(id => !isNaN(id));
        
        const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
        const newId = (maxId + 1).toString();
        
        const newEmployee = { ...employee, id: newId };
        this.employees.set(newId, newEmployee);
        return newEmployee;
    }

    async deleteEmployee(employee: Omit<Employee, "id">): Promise<Employee> {
        const targetEmployee = Array.from(this.employees.values()).find(
            e => e.name === employee.name && 
                e.age === employee.age && 
                e.affiliation === employee.affiliation && 
                e.post === employee.post
        );

        if (!targetEmployee) {
            throw new Error("削除対象の従業員が見つかりません");
        }

        this.employees.delete(targetEmployee.id);

        return targetEmployee;
    }
}
