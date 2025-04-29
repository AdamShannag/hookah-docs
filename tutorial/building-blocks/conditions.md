---
sidebar_position: 3
---

# Conditions

Conditions in Hookah are used to determine whether a matched event should trigger a request to the destination webhook.
They define rules that check if specific values in the incoming request meet certain criteria before forwarding the
event.

## Condition Syntax

Conditions use a simple and readable templating language. The basic syntax is:

```text
{<left-value>} {<operator>} {<right-value>}
```

Where:

- `{Header.X-Foo}` refers to a request header or query parameter.
- `{Body.foo.bar}` refers to a nested field in the request body.
- `{Body.foo[].bar}` performs **array projection**, collecting all `.bar` fields from the array `foo`.
- `{Body.items[0].name}` accesses a specific index in an array (e.g., the first item in the `items` array).

This syntax allows for powerful and flexible matching based on various parts of the request payload.

---

## Examples

### Match Header and Body

```json
"{Header.x-user-id} {eq} {Body.user.id}"
```

Checks if the `x-user-id` header matches the `user.id` field in the request body.

### Value Not Equal

```json
"{Body.user.age} {ne} {30}"
```

Checks if `user.age` is not equal to `30`.

### Check Value in Array

```json
"{Header.x-label} {in} {Body.labels[].title}"
```

Checks if the value of the `x-label` header exists in any of the `title` fields in the `labels` array.

### String Starts With

```json
"{Body.username} {startsWith} {admin_}"
```

Checks if the `username` starts with the string `"admin_"`.

---

## Supported Operators

The following operators can be used to compare the values:

| Operator       | Description                                                       |
|----------------|-------------------------------------------------------------------|
| `{eq}`         | Equal to                                                          |
| `{ne}`         | Not equal to                                                      |
| `{in}`         | Left-hand value exists in the right-hand list or array projection |
| `{notIn}`      | Left-hand value does **not** exist in the right-hand list         |
| `{contains}`   | Left-hand string contains the right-hand string                   |
| `{startsWith}` | Left-hand string starts with the right-hand string                |
| `{endsWith}`   | Left-hand string ends with the right-hand string                  |

These operators allow for a wide variety of conditions to match your webhook events, ensuring only the relevant requests
are forwarded.

---

## Array Support

You can access and manipulate array elements in conditions in two key ways:

- **Indexed Access**:  
  You can access specific items in an array by index. For example, `{Body.items[0].name}` retrieves the `name` of the
  first item in the `items` array.

- **Array Projection**:  
  Projecting over arrays allows you to collect all values of a specific field from an array. For example,
  `{Body.items[].name}` returns a list of all `name` fields from the `items` array. This is particularly useful with
  operators like `{in}` and `{notIn}` to check if a value exists in any array element.