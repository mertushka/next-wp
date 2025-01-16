# Next.js & Wordpress

## Configuration

### .env

```bash
WORDPRESS_URL=https://yourwordpress.com
WORDPRESS_HOSTNAME=yourwordpress.com
WORDPRESS_APP_PASSWORD=username:AAAA BBBB CCCC DDDD EEEE FFFF
NODE_ENV=production
```

### site.config.ts

```ts
export const siteConfig: SiteConfig = {
  site_domain: "https://yourdomain.com",
};
```

## Development

```bash
npm run dev
```
