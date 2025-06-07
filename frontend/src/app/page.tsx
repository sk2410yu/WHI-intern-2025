import { SearchEmployees } from "../components/SearchEmployees";
import { GlobalContainer } from "@/components/GlobalContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "タレントマネジメントシステム - 社員検索",
  description: "シンプルなタレントマネジメントシステム",
};

export default function Home() {
  return (
    <GlobalContainer subtitle="社員検索">
      <SearchEmployees />
    </GlobalContainer>
  );
}
