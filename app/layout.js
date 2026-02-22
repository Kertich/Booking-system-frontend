import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                <nav className="navbar">
                    <div className="nav-left">
                        <Link href="/bookings">Bookings App</Link>
                    </div>
                    <div className="nav-right">
                        < Navbar />
                        <Link href="/bookings">My Bookings</Link>
                        <Link href="/admin/approvals">Admin Dashboard</Link>
                        <Link href="/login">Login</Link>
                        <Link href="/signup">Sign Up</Link>
                    </div>
                </nav>

                <main className="container">{children}</main>
                </AuthProvider>
                 </body>
        </html>
    );
}
                  
                