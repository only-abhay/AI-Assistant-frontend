import './globals.css';
import { Toaster } from "sonner";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from '../components/Header/SiteHeader';
import serverApi from '../../utils/serverApi';

export const metadata = {
  title: 'AI Workspace',
  description: 'Create blogs and prepare your resume for the right role.',
};

export default async function RootLayout({ children }) {
     const User = await serverApi()

  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" richColors />
        <div className="flex min-h-screen flex-col">
          <SiteHeader User={User} />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
