import "./globals.css";
export const metadata = {
  title: "SmartStock",
  description: "Inventory decision support system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}