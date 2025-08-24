function Footer() {
    return (
        <footer className="fixed bottom-0 w-full" style={{ padding: "1rem", background: "#222", color: "#fff", textAlign: "center" }}>
            <small>&copy; {new Date().getFullYear()} IPL Dashboard</small>
        </footer>
    );
}

export default Footer;