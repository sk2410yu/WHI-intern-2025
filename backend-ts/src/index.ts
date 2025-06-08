import express, { Request, Response } from "express";
import { EmployeeDatabaseInMemory } from './employee/EmployeeDatabaseInMemory';

const app = express();
const port = process.env.PORT ?? 8080;
const database = new EmployeeDatabaseInMemory();

app.get("/api/employees", async (req: Request, res: Response) => {
    const filterText = req.query.filterText ?? "";
    const department = req.query.department ?? "";
    const position = req.query.position ?? "";
    // req.query is parsed by the qs module.
    // https://www.npmjs.com/package/qs
    if (Array.isArray(filterText) || Array.isArray(department) || Array.isArray(position)) {
        // Multiple filterText is not supported
        res.status(400).send();
        console.log("Multiple filterText is not supported.");
        return;
    }
    if (typeof filterText !== "string" || typeof department !== "string" || typeof position !== "string") {
        // Nested query object is not supported
        res.status(400).send();
        console.log("Nested query object is not supported.");
        return;
    }
    try {
        // const employees = await database.getEmployees(filterText);
        let employees = await database.getEmployees(filterText);
        console.log(`Loaded ${employees.length} employees filtered by ${filterText}.`);
        console.log(`Filtering by department: ${department}, position: ${position}`);
        if (department) {
            // 部署でフィルタリング
            employees = employees.filter(employee => employee.affiliation.includes(department));
        }
        if (position) {
            // 役職でフィルタリング
            employees = employees.filter(employee => employee.post.includes(position));
        }
        res.status(200).send(JSON.stringify(employees));
    } catch (e) {
        console.error(`Failed to load the users filtered by ${filterText}.`, e);
        res.status(500).send();
    }
});

app.get("/api/employees/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const employee = await database.getEmployee(userId);
        if (employee == undefined) {
            res.status(404).send();
            return;
        }
        res.status(200).send(JSON.stringify(employee));
    } catch (e) {
        console.error(`Failed to load the user ${userId}.`, e);
        res.status(500).send();
    }
});

app.listen(port, () => {
    console.log(`App listening on the port ${port}`);
});
