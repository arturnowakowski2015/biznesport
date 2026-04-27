import "./globals.css";
import Providers from "./providers";

import { cn } from "@/lib/utils";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={cn("font-sans", "bg-background text-foreground")}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}