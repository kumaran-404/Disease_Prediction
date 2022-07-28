import "./App.css"
import {QueryClient,QueryClientProvider} from "react-query"
import Router from "./Router"

const client = new QueryClient()


function App() {

  return (
    <QueryClientProvider client={client}>
        <Router/>
    </QueryClientProvider>
    
  );
}

export default App;
