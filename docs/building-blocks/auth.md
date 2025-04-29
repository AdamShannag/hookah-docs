---
sidebar_position: 2
---

# Authentication (`auth`)

Each **receiver** in Hookah must define an `auth` block to control and validate incoming webhook requests. This block
specifies how to authenticate requests based on the chosen flow.

## Supported Authentication Flows

Hookah supports the following authentication methods:

| Flow           | Description                                                                                                                                          |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `none`         | No authentication. Accepts all requests.                                                                                                             |
| `plain secret` | Matches the request header against the configured `secret`.                                                                                          |
| `basic auth`   | Verifies that the `username:password` pair in the basic auth header matches the configured `secret`.                                                 |
| `gitlab`       | Compares the configured `secret` with the GitLab token header using constant-time comparison (SHA-512).                                              |
| `github`       | Verifies the HMAC SHA-256 signature in the header (e.g., `X-Hub-Signature-256` or custom header) using the configured `secret` and the request body. |

### Fields in auth Block

- `flow`: The authentication method to use. One of `gitlab`, `github`, `basic auth`, `plain secret`, or `none`.
- `header_secret_key`: The name of the header where the token is expected (e.g., `X-Gitlab-Token` or `X-Custom-Token`).
- `secret`: The expected secret value. For `basic auth`, this should be the `username:password` pair.

## Example

```json
[
  {
    "receiver": "gitlab",
    "auth": {
      "flow": "gitlab",
      "header_secret_key": "X-Gitlab-Token",
      "secret": "my-gitlab-webhook-secret-token"
    },
    "event_type_in": "body",
    "event_type_key": "event_type",
    "events": []
  }
]
```

In this example, the `auth` block for the `gitlab` receiver uses the `gitlab` flow, extracting the GitLab token from the
`X-Gitlab-Token` header and comparing it with the configured `secret`.

