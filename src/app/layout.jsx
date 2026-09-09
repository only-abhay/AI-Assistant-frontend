import './globals.css';
import { Toaster } from "sonner";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";


export const metadata = {
  title: 'AI Workspace',
  description: 'Create blogs and prepare your resume for the right role.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" richColors />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
