import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "社員検索",
//   description: "シンプルなタレントマネジメントシステム",
// };
// // ページごとにメタデータを設定して
// // いくつかのページでは、メタデータを上書きすることができます。
// // 例えば、`app/page.tsx`では、`metadata.title`を"ホーム"に設定することができます。
// // ただし、`app/layout.tsx`で設定されたメタデータは、
// // すべてのページで共通して使用されます。
// // これにより、アプリケーション全体で一貫したメタデータを提供できます。
// // さらに、`app/layout.tsx`で設定されたメタデータは、
// // すべてのページでデフォルトのメタデータとして使用されます。


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
