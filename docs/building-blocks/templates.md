---
sidebar_position: 6
---

# Templates

Templates in Hookah define the body payloads that will be sent to your target webhooks.

Template files must be placed inside the configured `TEMPLATES_PATH` directory, and use Go's standard templating
language.

When a webhook is triggered, Hookah will load the specified template file (defined in the hook's `body` field) and
render it using the original webhook payload.

## Accessing Payload Data

Inside a template, you can reference fields from the incoming request body using **dot notation**:

```gohtml
{{ .some.path }}
```

For example, if the incoming webhook payload includes:

```json
{
  "user": {
    "name": "Jane Doe"
  }
}
```

You can access `name` inside the template like this:

```gohtml
{{ .user.name }}
```

## Built-in Template Functions

Hookah enriches the template engine with several helpful functions:

| Function    | Description                                                                                                     |
|-------------|-----------------------------------------------------------------------------------------------------------------|
| `now`       | Returns the current time.                                                                                       |
| `format`    | Formats a `time.Time` object using Go's time layout. Example: `{{ format now "2006-01-02" }}`                   |
| `parseTime` | Parses a string into a `time.Time` using the given layout. Example: `{{ parseTime "2023-01-01" "2006-01-02" }}` |
| `pastTense` | Forms the past tense of a word. Example: `{{ pastTense "open" }}` → `opened`                                    |
| `lower`     | Converts a string to lowercase. Example: `{{ lower "HELLO" }}` → `hello`                                        |
| `upper`     | Converts a string to uppercase. Example: `{{ upper "hello" }}` → `HELLO`                                        |
| `title`     | Converts a string to title case. Example: `{{ title "hello world" }}` → `HELLO WORLD`                           |
| `trim`      | Removes leading and trailing whitespace. Example: `{{ trim "  hello  " }}` → `hello`                            |
| `contains`  | Checks if a string contains a substring. Example: `{{ contains "hello world" "world" }}` → `true`               |
| `replace`   | Replaces all occurrences of a substring. Example: `{{ replace "hello world" "world" "Go" }}` → `hello Go`       |
| `default`   | Returns a fallback value if the field is missing or empty. Example: `{{ default .user.name "Guest" }}`          |

## Important Notes

- Templates must generate **valid JSON** after rendering, as they are directly sent in outgoing HTTP requests.
- If a template cannot be rendered properly (syntax errors, missing fields, etc.), the webhook call will fail for that
  hook.
- It's good practice to use `default` functions when referencing optional fields to avoid empty or invalid JSON output.