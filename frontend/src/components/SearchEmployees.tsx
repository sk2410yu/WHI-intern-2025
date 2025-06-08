"use client";
import { Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  type SelectChangeEvent, Box } from "@mui/material";
import { useState } from "react";
import { EmployeeListContainer } from "./EmployeeListContainer";
import Link from "next/link";
import { Button } from "@mui/material";
import { PersonAddOutlined } from "@mui/icons-material";
import { useEmployeeNames } from "./EmployeeNames";

/** ★ 会社で使う選択肢を API で取る場合は SWR 等に置き換えてください */
const departments = [
  { value: "",          label: "すべての所属" },
  { value: "営業部",     label: "営業部" },
  { value: "開発部",     label: "開発部" },
  { value: "人事部",     label: "人事部" },
];

const positions = [
  { value: "",        label: "すべての役職" },
  { value: "一般",     label: "一般" },
  { value: "マネージャー", label: "マネージャー" },
  { value: "役員",     label: "役員" },
];

export function SearchEmployees() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [department, setDepartment]     = useState<string>("");
  const [position,   setPosition]       = useState<string>("");
  const employeeNames = useEmployeeNames(); // 全社員の名前を取得するカスタムフック

  const handleDeptChange = (e: SelectChangeEvent) => setDepartment(e.target.value);
  const handlePosChange  = (e: SelectChangeEvent) => setPosition(e.target.value);
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flex: 1,
        p: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Autocomplete
        freeSolo
        options={employeeNames.map((e) => e.name)} // EmployeeNamesから名前のリストを取得

        // optionから選択した場合の処理
        onChange={(event, value) => {
          setSearchKeyword(typeof value === "string" ? value : ""); // valueがstring型の場合のみ設定し、それ以外は空文字にする
          console.log("選択された氏名:", value);
        }}
        // style ={{ width: 600 }}
        sx={{ flex: 1, mr: 2 }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="氏名を入力してください"
            value={searchKeyword}
            onChange={(e) => { setSearchKeyword(e.target.value); console.log(e.target.value); }}
          />
        )}
      />
        <Link href="/new" passHref>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddOutlined />}
          >
            新規社員登録
          </Button>
        </Link>
      </Box>


      {/* 所属ドロップダウン */}
      <FormControl fullWidth>
        <InputLabel id="dept-label">所属</InputLabel>
        <Select
          labelId="dept-label"
          label="所属"
          value={department}
          onChange={handleDeptChange}
        >
          {departments.map((d) => (
            <MenuItem key={d.value} value={d.value}>
              {d.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 役職ドロップダウン */}
      <FormControl fullWidth>
        <InputLabel id="pos-label">役職</InputLabel>
        <Select
          labelId="pos-label"
          label="役職"
          value={position}
          onChange={handlePosChange}
        >
          {positions.map((p) => (
            <MenuItem key={p.value} value={p.value}>
              {p.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 結果リスト */}
      <EmployeeListContainer
        /** key を付け替えるとフィルタ変更時にリフレッシュされる */
        key={`${searchKeyword}-${department}-${position}`}
        filterText={searchKeyword}
        department={department}
        position={position}
      />
    </Paper>
  );
}
