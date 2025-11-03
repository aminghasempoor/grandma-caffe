module.exports = {
    apps: [
        {
            name: "GrandMa", // ✅ نام برنامه در pm2
            script: "pnpm",   // ✅ اجرای دستور با pnpm
            args: "exec next start --port 3002 --hostname 0.0.0.0", // ✅ اجرای دقیق next
            interpreter: "none", // ✅ چون pnpm خودش interpreter هست
            cwd: "/var/www/website", // ✅ مسیر پروژه روی سرور
            env: {
                NODE_ENV: "production", // ✅ محیط تولید
            },
        },
    ],
};
