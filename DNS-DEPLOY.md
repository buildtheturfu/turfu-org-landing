# Deploying turfu.org

Instructions for pointing the turfu.org domain to the Vercel deployment.

**Prerequisite:** Only proceed when FR, EN, and TR translations are validated and the site has been visually verified across all locales.

---

## Step 1: Verify Vercel preview deployment

Ensure the latest deployment is working correctly:

```bash
npx vercel --prod
```

Check the generated preview URL in your browser. Navigate all pages (home, /vision, /publications, /ecosystem, /join, /research) in all three locales (/fr, /en, /tr).

## Step 2: Add domain in Vercel

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the **turfu-org-landing** project
3. Navigate to **Settings** > **Domains**
4. Add `turfu.org` as a domain
5. Vercel will provide DNS configuration instructions

## Step 3: Configure DNS records

At your DNS provider (where turfu.org is registered), create the following records:

| Type  | Name  | Value                    |
|-------|-------|--------------------------|
| A     | @     | 76.76.21.21              |
| CNAME | www   | cname.vercel-dns.com     |

**Note:** If your DNS provider doesn't support CNAME for the root domain, you may need to use Vercel's nameservers instead. Vercel will guide you through this in the domain settings.

## Step 4: Wait for DNS propagation

DNS changes can take up to 48 hours to propagate globally, though they typically resolve within 1-2 hours.

You can check propagation status at:
- https://dnschecker.org/#A/turfu.org
- https://www.whatsmydns.net/#A/turfu.org

## Step 5: Verify SSL certificate

Vercel automatically provisions an SSL certificate via Let's Encrypt once DNS is properly configured. Verify by visiting:

- https://turfu.org (should load with valid HTTPS)
- https://www.turfu.org (should redirect to turfu.org or vice versa)

## Troubleshooting

- **SSL not working:** Wait for DNS propagation to complete, then check Vercel domain settings for certificate status.
- **404 errors:** Verify the production deployment is active in Vercel dashboard.
- **Redirect loops:** Check that your DNS provider isn't adding its own SSL/proxy (like Cloudflare's orange cloud). If using Cloudflare, set SSL mode to "Full (strict)".
