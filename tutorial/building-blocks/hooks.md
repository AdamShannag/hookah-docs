---
sidebar_position: 6
---

# Hooks

Hooks define **where** and **what** to send once an event's conditions are satisfied.  
Each event can trigger one or multiple hooks.

A **hook** specifies:

- Which external service to notify (e.g., Discord, Slack, custom endpoints).
- How to build the outgoing webhook payload (via templates).
- Where to fetch the destination URL dynamically from the incoming request.

## Hook Structure

Each `hook` is defined with the following fields:

```json
{
  "name": "discord",
  "endpoint_key": "x-discord-url",
  "body": "template_file_name.some_extension"
}
```

| Field          | Description                                                                                     |
|----------------|-------------------------------------------------------------------------------------------------|
| `name`         | A simple label for the hook (e.g., `discord`, `slack`).                                         |
| `endpoint_key` | The header key or query parameter from which to extract the **target webhook URL** dynamically. |
| `body`         | The name of the template file used to render the webhook payload. Must produce valid JSON.      |

## How Hooks Work

1. When a matching event occurs and all conditions are satisfied, Hookah reads the `endpoint_key` from the incoming
   request.
2. It uses that value as the target URL for the outgoing webhook call.
3. It renders the template specified in the `body` field, injecting data from the original webhook payload.
4. It sends the rendered body to the resolved target endpoint.

You can configure multiple hooks per event, and they will all be triggered **concurrently**.

## Important Notes

- **Dynamic Endpoints**: The webhook URL is not hardcoded inside the configuration. Instead, it is dynamically extracted
  at runtime from either:
    - The request headers.
    - Or the URL query parameters.

- **Template Rendering**:  
  The `body` field points to a file in your templates' directory. This template can interpolate data from the incoming
  webhook payload using Go's native template engine.

  > After rendering, the final output **must be a valid JSON** object, because Hookah sends it directly in the body of
  the outgoing HTTP request.

## Example Hook

```json
{
  "name": "discord",
  "endpoint_key": "x-discord-url",
  "body": "discord_message.tmpl"
}
```

In this example:

- Hookah will fetch the target webhook URL from the `x-discord-url` header (or query parameter).
- It will render the `discord_message.tmpl` file.
- The resulting JSON will be posted to the extracted URL.
