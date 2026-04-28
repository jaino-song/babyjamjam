# API Routes

Next.js API routes that proxy requests to the BabyJamJam backend.

## Configuration

| Variable | Default | Description |
| -------- | ------- | ----------- |
| `BJJ_API_URL` | `https://api.babyjamjam.com` | Backend base URL |

## Endpoints

### Pricing (`/api/pricing`)

| Method | Path | Description |
| ------ | ---- | ----------- |
| `POST` | `/api/pricing` | Fetch pricing plans and add-on services. |

**Request body:**

```json
{
  "typeCode": "string (voucher type code)",
  "year": 2026,
  "isSubsidized": true
}
```

**Response:** `{ plans: Plan[], addons: Addon[] }`

- When `isSubsidized` is true, fetches from backend `/voucher-price-infos/type`
- When false, returns hardcoded unsubsidized plans

### Ribbon Banner (`/api/ribbon`)

| Method | Path | Description |
| ------ | ---- | ----------- |
| `GET` | `/api/ribbon` | Fetch ribbon banner configuration from backend. |

**Response:**

```json
{
  "enabled": true,
  "message": "리본 메시지",
  "backgroundColor": "#004AAD",
  "textColor": "#FFFFFF",
  "linkText": "자세히 보기",
  "linkHref": "/pricing",
  "linkColor": "#FFB27B"
}
```

- Proxies to backend `GET /settings/ribbon-config`
- Revalidates every 60 seconds (ISR)
- Returns `{ enabled: false }` on any error
