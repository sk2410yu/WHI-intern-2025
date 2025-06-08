import { SearchEmployees } from "../components/SearchEmployees";
import { GlobalContainer } from "@/components/GlobalContainer";
import type { Metadata } from "next";
import { Switching } from "@/components/Switching";

export const metadata: Metadata = {
  title: "タレントマネジメントシステム - 社員検索",
  description: "シンプルなタレントマネジメントシステム",
};

export default function Home() {
  return (
    <GlobalContainer subtitle="社員検索">
       <Switching/>
       <SearchEmployees/>
    </GlobalContainer>
  );
}
