import classNames from "classnames"

import Link from "next/link"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: "--font-inter" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={classNames('flex flex-col h-full', inter.variable)}>
      <nav className="h-6 p-4 flex items-center gap-6 filter backdrop-blur-xl">
        <Link href={"/lava-lamp"}>lava lamp</Link>
        <Link href={"/grid-noise"}>grid noise</Link>
      </nav>
      {children}
    </div>
  )
}
