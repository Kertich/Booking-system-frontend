import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <nav className="navbar">
                    <div className="nav-left">
                        <Link href="/bookings">Bookings App</Link>
                    </div>
                    <div className="nav-right">
                        <Link href="/bookings">My Bookings</Link>
                        <Link href="/admin/approvals">Admin Dashboard</Link>
                        <Link href="/login">Login</Link>
                    </div>
                </nav>

                <main className="container">{children}</main>
                 </body>
        </html>
    );
}
                  
                