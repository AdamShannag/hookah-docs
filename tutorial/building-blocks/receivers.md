---
sidebar_position: 1
---

# Receivers

A **receiver** is the primary entry point in Hookah. It represents a named webhook endpoint that external services like
**GitLab**, **GitHub**, or any other webhook provider can send requests to.

Each receiver configuration tells Hookah how to authenticate incoming requests, where to extract the event type from,
and how to handle matched events.

## Receiver Structure

A receiver typically includes:

- `receiver`: A name for the receiver.
- `auth`: authentication configuration.
- `event_type_in`: Specifies where to extract the event type from — either `"body"` or `"header"`.
- `event_type_key`: The key used to extract the event type.
- `events`: An array of events and their corresponding hook configurations.

### Event Type Resolution

Hookah determines the event type using the following keys:

```json
"event_type_in": "body",
"event_type_key": "event_type"
```

- `event_type_in`: Where to look — `"body"` or `"header"`.
- `event_type_key`: The key used to extract the event name.

Hookah will then match this event name against entries in the `events` array.

### Example

```json
[
  {
    "receiver": "gitlab",
    "auth": {},
    "event_type_in": "body",
    "event_type_key": "event_type",
    "events": []
  }
]
```

## Multiple Receivers

Hookah supports multiple receivers, each with independent configuration, allowing you to route webhooks from different
sources:

```json
[
  {
    "receiver": "gitlab",
    ...
  },
  {
    "receiver": "github",
    ...
  }
]
```

This makes Hookah flexible and scalable for handling diverse webhook sources with isolated rules and behaviors.
