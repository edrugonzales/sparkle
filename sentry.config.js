import * as Sentry from "@sentry/browser"
import { BrowserTracing } from "@sentry/tracing"

Sentry.init({
  dsn: process.env.REACT_SENTRY_DSN,
  sampleRate: 1.0, // Adjust this value in production
  environment: process.env.REACT_SENTRY_ENV,
  integrations: [new BrowserTracing()],
  beforeSend(event) {
    //
    return event
  },
  beforeBreadcrumb(breadcrumb, hint) {
    if (breadcrumb.category === "console") {
      return null
    }
    return breadcrumb
  },
  // ...
})
