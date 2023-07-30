import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthProvider from "./providers/AuthProvider";
import FixedContainer from "./components/FixedContainer/FixedContainer";
import 'react-toastify/dist/ReactToastify.css';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    
      <QueryClientProvider client={queryClient}>

        <RouterProvider router={router} />
      </QueryClientProvider>
  
  </AuthProvider>

);