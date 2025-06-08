// 全社員の名前のみを取得するuseSWRを実装
import useSWR from "swr";
import * as t from "io-ts";
import { isLeft } from "fp-ts/Either";
import { Employee } from "../models/Employee";
import { useEffect } from "react";
// import { EmployeeNameListItem } from "./EmployeeNameListItem";

const EmployeesNameT = t.array(t.type({
  id: t.string,
  name: t.string,
  age: t.number,
  affiliation: t.string,
  post: t.string,
}));

const employeesNameFetcher = async (url: string): Promise<Employee[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch employees at ${url}`);
  }
  const body = await response.json();
  const decoded = EmployeesNameT.decode(body);
  if (isLeft(decoded)) {
    throw new Error(`Failed to decode employees ${JSON.stringify(body)}`);
  }
  return decoded.right;
}

export function useEmployeeNames(): Employee[] {
  const { data, error, isLoading } = useSWR<Employee[], Error>(
    `/api/employees`,
    employeesNameFetcher
  );

  useEffect(() => {
    if (error != null) {
      console.error(`Failed to fetch employees`, error);
    }
  }, [error]);

  useEffect(() => {
    if (data != null) {
      console.error(`EmployeeNames data`, data);
    }
  }, [data]);

  if (data != null) {
    return data;
  }
  return [];
}
