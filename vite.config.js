import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: "0.0.0.0",
    allowedHosts: [
      "0.0.0.0",
      ".app",
      "5ee5936-f028-4d54-a9ad-fb9c9a69642c-00-3q5myi34ml4gr.spock.replit.dev",
    ],
  },
});
