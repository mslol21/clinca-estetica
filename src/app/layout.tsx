import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { DatabaseProvider } from "@/context/DatabaseContext";
import { ToastProvider } from "@/components/ui/Toast";
import { SiteLayoutWrapper } from "@/components/site/SiteLayoutWrapper";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Luxe Estética Premium | Harmonização, Botox e Alta Tecnologia",
  description:
    "Clínica de estética de luxo em São Paulo. Especialista em Harmonização Facial, Botox, Laser Lavieen e rejuvenescimento corporal de alto padrão.",
  keywords: [
    "clinica de estetica de luxo",
    "estetica premium",
    "harmonizacao facial faria lima",
    "botox sao paulo",
    "laser lavieen",
    "clinica de estetica itaim bibi",
  ],
  authors: [{ name: "Luxe Estética" }],
  openGraph: {
    title: "Luxe Estética Premium | Clínica de Estética de Luxo",
    description:
      "A arte de realçar sua beleza natural com exclusividade, ética e alta tecnologia.",
    url: "https://luxeestetica.com.br",
    siteName: "Luxe Estética",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('luxe_theme') === 'dark' || (!('luxe_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 font-sans">
        <AuthProvider>
          <DatabaseProvider>
            <ToastProvider>
              <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
            </ToastProvider>
          </DatabaseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
