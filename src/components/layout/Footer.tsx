export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-text-muted">
          © {new Date().getFullYear()} Lume Labs. All rights reserved.
        </p>
        <p className="text-sm text-text-muted">hello@lumelabs.dev</p>
      </div>
    </footer>
  );
}