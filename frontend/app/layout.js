export const metadata = {
  title: "SmartStock - OmniKon 2026",
  description: "Inventory decision-support system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}