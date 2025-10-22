import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.141.ir",
            }
        ],
    },
    // Webpack config for production
    webpack(config) {
        // Exclude svg from the default asset loader
        config.module.rules.forEach((rule: any) => {
            if (
                typeof rule === "object" &&
                rule !== null &&
                "test" in rule &&
                rule.test instanceof RegExp &&
                rule.test.test(".svg")
            ) {
                rule.exclude = /\.svg$/;
            }
        });
        // Add SVGR loader
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: "@svgr/webpack",
                    options: {
                        icon: true,
                        svgo: true,
                    },
                },
            ],
        });

        return config;
    },

    // turbopack config for development
    turbopack: {
        rules: {
            "*.svg": {
                loaders: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            icon: true,
                        },
                    },
                ],
                as: "*.ts",
            },
        },
    },
};

const configWithIntl = withNextIntl(nextConfig);

export default configWithIntl;
