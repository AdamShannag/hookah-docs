---
sidebar_position: 1
---

# Quick Introduction

**Hookah** is a lightweight, stateless, zero-dependency **webhook router** written in Go. It acts as a bridge between
webhook sources (like GitLab, GitHub, etc.) and destination targets (such as Discord), forwarding events **only when
they match defined rules**.

- **Webhook Receiver**  
  Accepts incoming webhooks from various services.

- **Rule Engine**  
  Filters events based on headers, URL query parameters, or request body content.

- **Conditional Forwarding**  
  Forwards messages to a target webhook only if all specified conditions are met.

- **Reusable Templates**  
  Define templates once and reuse them across different configurations and scenarios.

- **Dynamic Payloads**  
  Generate outbound messages dynamically using data extracted from the incoming webhook payload.

- **UI Configuration Builder**  
  A companion project, [**hookah-ui**](https://github.com/your-org/hookah-ui), provides a visual interface to configure
  Hookah easily.
