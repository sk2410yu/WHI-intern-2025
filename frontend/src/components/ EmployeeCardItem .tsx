import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Employee } from "../models/Employee";

type EmployeeListContainerProps = {
  filterText: string;
  department: string;
  position: string;
};

export function EmployeeListContainer({ filterText, department, position }: EmployeeListContainerProps) {
  // ここでは例として静的データを使います。実際はAPIやpropsから受け取る想定です。
  const employees: Employee[] = [
    { id: "1", name: "田中 太郎", department: "営業部", position: "一般" },
    { id: "2", name: "鈴木 次郎", department: "開発部", position: "マネージャー" },
    { id: "3", name: "佐藤 花子", department: "人事部", position: "役員" },
  ];

  // フィルタ処理（キーワード＋所属＋役職で絞り込み）
  const filtered = employees.filter(emp => {
    return (
      emp.name.includes(filterText) &&
      (department === "" || emp.department === department) &&
      (position === "" || emp.position === position)
    );
  });

  return (
    <Box display="grid" gap={2} gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))">
      {filtered.map((emp) => (
        <Card key={emp.id} sx={{ cursor: "pointer", transition: "background-color 0.2s", "&:hover": { backgroundColor: "#f0f0f0" } }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">{emp.name}</Typography>
              <Typography variant="body2" color="text.secondary">{emp.department} / {emp.position}</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
