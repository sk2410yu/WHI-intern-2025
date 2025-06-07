import { EmployeeDetailsContainer } from "@/components/EmployeeDetailsContainer";
import { GlobalContainer } from "@/components/GlobalContainer";
import { Suspense } from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "タレントマネジメントシステム - 社員詳細",
  description: "社員の詳細情報を表示します。",
};

export default function EmployeePage() {
  return (
    <GlobalContainer subtitle ="社員詳細">
      { /* Mark EmployeeDetailsContainer as CSR */ }
      <Suspense>
        <EmployeeDetailsContainer />
      </Suspense>
    </GlobalContainer>
  );
}
