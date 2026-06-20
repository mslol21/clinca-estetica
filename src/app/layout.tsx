import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { DatabaseProvider } from "@/context/DatabaseContext";
import { ToastProvider } from "@/components/ui/Toast";
import { SiteLayoutWrapper } from "@/components/site/SiteLayoutWrapper";
import { clinicConfig } from "@/config/clinic-config";
import { themeConfig } from "@/config/theme-config";

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
  title: clinicConfig.seo.title,
  description: clinicConfig.seo.description,
  keywords: clinicConfig.seo.keywords,
  authors: [{ name: clinicConfig.name }],
  openGraph: {
    title: clinicConfig.seo.title,
    description: clinicConfig.seo.description,
    url: "https://localhost:3000",
    siteName: clinicConfig.name,
    images: [{ url: clinicConfig.seo.ogImage }],
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
        {/* Dynamic theme injections */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --luxe-primary: ${themeConfig.colors.primary};
                --luxe-secondary: ${themeConfig.colors.secondary};
                --luxe-accent: ${themeConfig.colors.accent};
                --luxe-bg-light: ${themeConfig.colors.backgroundLight};
                --luxe-bg-dark: ${themeConfig.colors.backgroundDark};
              }
            `,
          }}
        />
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
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 font-sans transition-colors duration-300">
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
