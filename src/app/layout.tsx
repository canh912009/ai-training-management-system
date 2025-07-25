import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/ui/toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AI Training Management System',
    description: 'Hệ thống quản lý file training AI cho Set Top Box',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="vi">
        <body className={inter.className}>
        <ToastProvider>
            {children}
        </ToastProvider>
        </body>
        </html>
    )
}