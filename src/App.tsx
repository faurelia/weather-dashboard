import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CurrentWeather from "./components/current-weather";
import { Suspense } from "react";
import ForecastWeather from "./components/forecast-weather";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="max-w-6xl mx-auto py-8 flex flex-col gap-8">
        <Suspense fallback={<div>Loading current weather...</div>}>
          <CurrentWeather />
        </Suspense>
        <Suspense fallback={<div>Loading forecast weather...</div>}>
          <ForecastWeather />
        </Suspense>
      </main>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
