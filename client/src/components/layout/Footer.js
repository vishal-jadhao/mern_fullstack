import React from "react";

export default function Footer() {
  return (
    <footer className="text-center p-3">
      {`@ Copyright ${new Date().getFullYear()}`}
    </footer>
  );
}
