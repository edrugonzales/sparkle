import * as Sentry from "@sentry/browser"

export function sentryCatchException({ error }) {
  Sentry.captureException(error)
}

export function sentryCatchMessage({ message }) {
  Sentry.captureMessage(message)
}
