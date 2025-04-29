---
sidebar_position: 5
---

# Events

In Hookah, events are used to define specific actions based on the incoming webhook data. An event matches the
`event_type` extracted from the request, and if all conditions are satisfied, it triggers the corresponding **hooks**.
Each event can contain multiple conditions and hooks.

## Event Structure

Each event is defined with the following properties:

- **event**: The name of the event (e.g., `merge_request`, `push`, etc.), which corresponds to the `event_type` in the
  incoming request.
- **conditions**: An array of conditions that must be satisfied for the event to trigger. Each condition is a logical
  expression that compares values from the request headers, query parameters, or body.
- **hooks**: An array of hooks that will be triggered if the conditions are met. Each hook defines a target
  destination (such as Discord or Slack) and the associated payload.

## Example Event Configuration

Here's an example of an event that listens for a `merge_request` event from GitLab. The event has conditions and
triggers two hooks, one for Discord and one for Slack:

```json
{
  "events": [
    {
      "event": "merge_request",
      "conditions": [
        "{Header.x-gitlab-label} {in} {Body.object_attributes.labels[].title}"
      ],
      "hooks": [
        {
          "name": "discord",
          ...
        },
        {
          "name": "slack",
          ...
        }
      ]
    }
  ]
}
```

### How It Works

1. **Event Matching**:
    - The `event_type` from the incoming webhook is compared to the `event` field in the event configuration (
      `merge_request` in this case).

2. **Condition Evaluation**:
    - The conditions for this event are checked. In this example, it verifies whether the `x-gitlab-label` header is
      present in the `labels` array in the body. If the condition is satisfied, the event is triggered.

3. **Triggering Hooks**:
    - Once the conditions are met, the hooks are triggered. In this case:
        - A message will be sent to Discord.
        - A message will also be sent to Slack.

## Key Points:

- **event**: The event name to match against the `event_type` in the request.
- **conditions**: An array of conditions that must evaluate to `true` to trigger the hooks.
- **hooks**: An array of hook configurations, each with a target service (e.g., Discord, Slack)