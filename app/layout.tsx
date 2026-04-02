import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '1043地球 - 行星疗愈团',
  description: '能量匹配平台 · 开启你的觉醒进程',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-on-background">
          {children}
        </div>
      </body>
    </html>
  )
}