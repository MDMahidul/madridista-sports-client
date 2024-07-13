import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from "sonner";
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster richColors position="top-center"/>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
