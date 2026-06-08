import './globals.css';

export const metadata = {
  title: 'CityCare Hospital | Advanced Medical Care',
  description: 'CityCare is a leading multispecialty hospital providing advanced medical treatments with a compassionate touch.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
