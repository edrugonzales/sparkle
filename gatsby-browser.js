const React = require("react")
const { ErrorBoundary } = require("@sentry/react")
const { Fallback } = require("./src/components/ErrorBoundary")

// 4 // Logs when the client route changes
// exports.onRouteUpdate = ({ location, prevLocation }) => {
//
//
// }
// Wraps every page in a component
// exports.wrapRootElement = ({ element }) => {
//   return <ErrorBoundary fallback={Fallback}>{element}</ErrorBoundary>
// }

exports.onServiceWorkerUpdateReady = () => {
  if (
    window.confirm(
      "Sparkle has been updated. Do you wish to reload the app to get the new data?"
    )
  ) {
    window.location.reload(true)
  }
}
// => window.location.reload(true);
