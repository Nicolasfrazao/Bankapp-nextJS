
import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./styles/globals.css";
import { dynamic } from './api/sentry-example-api/route';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

const ibmPlexSerif = IBM_Plex_Serif( {
  subsets: [ 'latin' ],
  weight: [ '500', '700' ],
  variable: '--font-ibm-plex-serif'
} );

export const metadata: Metadata = {
  title: "BankJS",
  description: "Bankapp build with nextJS",

  icons: {
    icon: '/public/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ `${inter.className} ${ibmPlexSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
