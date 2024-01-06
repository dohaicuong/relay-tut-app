import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from 'relay-runtime'

import { Suspense } from 'react'
import { RelayEnvironmentProvider } from 'react-relay'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

const fetchRelay: FetchFunction = async (params, variables) => {
  console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`)

  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  })

  return response.json()
}

export const relayEnvironment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
})

type RelayProviderProps = {
  children: React.ReactNode
}

export const RelayProvider: React.FC<RelayProviderProps> = ({ children }) => {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <ErrorBoundary FallbackComponent={AppErrorFallback}>
        <Suspense fallback={<AppLoading />}>
        {children}
        </Suspense>
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  )
}

const AppLoading = () => (
  <>
    Loading...
  </>
)

const AppErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

