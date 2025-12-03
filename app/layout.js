import { Inter } from 'next/font/google';\nimport './global.css';\n
const inter = Inter({ subsets: ['latin'] });\n
export const metadata = {\n  title: 'AI Email/DM Rewriter MVP',\n  description: 'Rewrite your emails and DMs with AI in various moods.',\n};\n
export default function RootLayout({ children }) {\n  return (\n    <html lang="en">\n      <body className={inter.className}>{children}</body>\n    </html>\n  );\n}