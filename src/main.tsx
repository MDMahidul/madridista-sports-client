import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from "sonner";
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <Toaster position="top-center" />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
