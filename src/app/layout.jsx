import { Poppins } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from '@/context/NotificationContext'

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Auth Next",
  description: "Sistema de gestion de tareas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
       <NotificationProvider>
       <main className="flex min-h-screen flex-col items-center">
          {children}
        </main>
       </NotificationProvider>
      </body>
    </html>
  );
}
