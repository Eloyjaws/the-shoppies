import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { persistWithLocalStorage } from 'react-query/persist-localstorage-experimental';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from './components/ThemeProvider';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './helpers/reportWebVitals';
import App from './App';

// Tried to implement a cache. Ran out of time
const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  //     staleTime: 1000 * 60 * 60 * 24, // 24 hours
  //     refetchIntervalInBackground: false,
  //     refetchOnWindowFocus: false,
  //     keepPreviousData: true,
  //   },
  // },
});

persistWithLocalStorage(queryClient);

ReactDOM.render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
