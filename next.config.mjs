import nextra from 'nextra';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:subdomain*',
        has: [
          {
            type: 'header',
            key: 'x-redirect-me',
          },
        ],
        destination: '/',
        permanent: true,
      },
    ];
  },
};

const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.jsx'
  })

export default withNextra(nextConfig);
