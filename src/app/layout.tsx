import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
title: 'TCAS69 Portfolio',
description: 'Portfolio สำหรับสมัคร TCAS69',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="th">
<body className="min-h-screen bg-gray-100">{children}</body>
</html>
)
}