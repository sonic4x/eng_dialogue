import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./error-page";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import Contact, { loader as contactLoader } from "./routes/contact";
import Index from "./routes/index";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

/*Errors bubble up to the nearest errorElement*/

// Another style of define router:
// const router = createBrowserRouter([
//   {

//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     loader: rootLoader,
//     action: rootAction,
//     children: [
//       { index: true, element: <Index /> },
//       {
//         path: "contacts/:contactId",
//         element: <Contact />,
//         loader: contactLoader,
//         action: contactAction,
//       },
//       {
//         path: "contacts/:contactId/edit",
//         element: <EditContact />,
//         loader: editLoader,
//         action: editAction,
//       },
//       {
//         path: "contacts/:contactId/destroy",
//         action: destroyAction,
//         errorElement: <div>Oops! There was an error when delete contact.</div>,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path='contacts/:contactId'
          element={<Contact />}
          loader={contactLoader}
          // action={contactAction}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
