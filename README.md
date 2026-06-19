# Smart Scheduling Assistant

Calendar plugin for CortexPrism — Google Calendar, Outlook Calendar, and Cal.com integration for
intelligent meeting scheduling with conflict avoidance and automated rescheduling.

## Installation

```bash
cortex plugin install github:CortexPrism/cortex-plugin-scheduling
```

## Tools

| Tool                   | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `sched_find_slots`     | Find open meeting slots across calendars and attendees   |
| `sched_create_event`   | Create calendar event with optional prep brief           |
| `sched_list_events`    | List upcoming events with search and date filters        |
| `sched_get_busy_times` | Get busy/free time blocks for availability visualization |
| `sched_reschedule`     | Reschedule event, notify attendees, suggest alternatives |

## Configuration

```json
{
  "plugins": {
    "cortex-plugin-scheduling": {
      "defaultDuration": 30,
      "workingHoursStart": 9,
      "workingHoursEnd": 17,
      "timezone": "America/Chicago",
      "googleClientId": "your-google-oauth-client-id",
      "googleClientSecret": "your-google-oauth-secret",
      "outlookClientId": "your-azure-client-id",
      "outlookClientSecret": "your-azure-client-secret"
    }
  }
}
```

## Supported Platforms

- **Google Calendar** — OAuth2
- **Outlook Calendar** — Azure AD OAuth2
- **Cal.com** — API key

## License

MIT
