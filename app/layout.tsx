import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Main } from "@/components/craft";
import { mainMenu, contentMenu } from "@/menu.config";
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

import Logo from "@/public/logo.svg";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { getAllPages, getSettings } from "@/lib/wordpress";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Next.js ile Wordpress",
  description: "Next.js ile Wordpress.",
  metadataBase: new URL("https://wp.mertushka.pw"),
};

// Revalidate content every hour
export const revalidate = process && process.env.NODE_ENV ? 30 : 3600; //3600

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <Main>{children}</Main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

const Nav = async ({ className, children, id }: NavProps) => {
  const pages = await getAllPages();
  const settings = await getSettings();

  return (
    <nav
      className={cn(
        "sticky z-50 top-0 bg-background",
        "border-b",
        "fade-in",
        className
      )}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-2 items-center"
          href="/"
        >
          <h2 className="sr-only">{settings.title}</h2>
          <Image
            src={Logo}
            alt="Logo"
            className="dark:invert"
            width={84}
            height={30.54}
          ></Image>
        </Link>
        {children}
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button key={href} asChild variant="ghost" size="sm">
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
            {pages.map((page: any) => (
              <Button key={page.id} asChild variant="ghost" size="sm">
                <Link href={`/${page.slug}`}>{page.title.rendered}</Link>
              </Button>
            ))}
          </div>
          <MobileNav pages={pages} />
        </div>
      </div>
    </nav>
  );
};

const Footer = async () => {
  const settings = await getSettings();
  const pages = await getAllPages();
  return (
    <footer>
      <Section>
        <Container className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
          <div className="flex flex-col gap-6 not-prose">
            <Link href="/">
              <h3 className="sr-only">brijr/components</h3>
              <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={27.27}
                className="dark:invert hover:opacity-75 transition-all"
              ></Image>
            </Link>
            <p>
              <Balancer>{metadata.description}</Balancer>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">{settings.title}</h5>
            {Object.entries(mainMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
            {pages.map((page: any) => (
              <Link
                className="hover:underline underline-offset-4"
                key={page.id}
                href={`/${page.slug}`}
              >
                {page.title.rendered}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Blog</h5>
            {Object.entries(contentMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
        </Container>
        <Container className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <ThemeToggle />
          <p className="text-muted-foreground">
            © <a href="https://mertushka.pw">mertushka</a>. Tüm hakları saklı
            değildir çünkü ders projem.
          </p>
        </Container>
      </Section>
    </footer>
  );
};
