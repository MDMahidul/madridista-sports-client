import ReactDOM from 'react-dom/client'
import { Toaster } from "sonner";
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <Provider store={store}>
        <Toaster richColors position="top-center" />
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </HelmetProvider>
);
