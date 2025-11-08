export const metadata = {
  title: 'Kitchen Comedy',
  description: 'Husband-Wife Kitchen Comedy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
