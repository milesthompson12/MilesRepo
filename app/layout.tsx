import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Colorado Buffaloes Football',
  description: 'Your hub for Colorado Buffaloes football news, recruiting, roster, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0f0f0f] text-white min-h-screen`}>
        <Sidebar />
        <main className="lg:ml-64 min-h-screen">
          {/* Top bar */}
          <div className="bg-cu-black border-b border-cu-gold/20 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
            <div className="lg:hidden w-8" /> {/* spacer for mobile menu button */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cu-gold animate-pulse" />
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Live Updates</span>
            </div>
            <div className="text-xs text-gray-500">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
