/// <reference types="node" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const apiDevPlugin = (env: Record<string, string>) => ({
  name: "api-dev-middleware",
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      if (req.url?.startsWith("/api/contact") && req.method === "POST") {
        let body = "";
        req.on("data", (chunk: any) => (body += chunk));
        req.on("end", async () => {
          try {
            const data = JSON.parse(body || "{}");
            const resendApiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
            const recipient = env.CONTACT_EMAIL || process.env.CONTACT_EMAIL || "ak1163400@gmail.com";

            if (!resendApiKey) {
              throw new Error("RESEND_API_KEY is not defined in .env");
            }

            const resendRes = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from: "Ankit Portfolio <onboarding@resend.dev>",
                to: [recipient],
                reply_to: data.email || "noreply@portfolio.com",
                subject: `🚀 New Lead: ${data.name || "Client"} (${data.role || "Inquiry"})`,
                html: `
                  <div style="font-family: Arial, sans-serif; padding: 24px; background: #0d0d15; color: white; border-radius: 12px; border: 1px solid #7c3aed;">
                    <h2 style="color: #c084fc; margin-top: 0;">📬 New Portfolio Message</h2>
                    <hr style="border: 0; border-top: 1px solid #332255; margin: 16px 0;" />
                    <p><strong>👤 Name:</strong> ${data.name}</p>
                    <p><strong>📧 Email:</strong> <a href="mailto:${data.email}" style="color: #a855f7;">${data.email}</a></p>
                    <p><strong>🎯 Category:</strong> ${data.role || "Inquiry"}</p>
                    <p><strong>💬 Message:</strong></p>
                    <div style="background: #181528; padding: 14px; border-radius: 8px; border-left: 4px solid #a855f7; margin-top: 8px;">
                      ${data.message}
                    </div>
                  </div>
                `,
              }),
            });

            const resendData = await resendRes.json();
            res.setHeader("Content-Type", "application/json");
            res.statusCode = resendRes.ok ? 200 : 400;
            res.end(JSON.stringify({ success: resendRes.ok, resendData }));
          } catch (e: any) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
        });
        return;
      }
      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), apiDevPlugin(env)],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', 'three-stdlib'],
          'react-three': ['@react-three/fiber', '@react-three/drei'],
          'gsap': ['gsap'],
          'icons': ['react-icons'],
          'vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1200,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2
      },
      format: {
        comments: false
      }
    }
  },
  optimizeDeps: {
    include: ['three', 'gsap', 'lenis', 'react-icons']
  }
};
});
