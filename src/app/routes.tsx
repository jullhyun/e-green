import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { DeliveryManagement } from "./pages/DeliveryManagement";
import { DeliveryAddressCheck } from "./pages/DeliveryAddressCheck";
import { DeliveryDetail } from "./pages/DeliveryDetail";
import { DeliveryResults } from "./pages/DeliveryResults";
import { PublicNotification } from "./pages/PublicNotification";
import { PublicNotificationExport } from "./pages/PublicNotificationExport";
import { InPersonReceipt } from "./pages/InPersonReceipt";
import { DeliveryInquiry } from "./pages/DeliveryInquiry";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <Navigate to="/delivery" replace /> },
      { path: "delivery", Component: DeliveryManagement },
      { path: "delivery/:id", element: <Navigate to="address" replace /> },
      { path: "delivery/:id/address", Component: DeliveryAddressCheck },
      { path: "delivery/:id/work", Component: DeliveryDetail },
      { path: "delivery/:id/result", Component: DeliveryResults },
      { path: "public-notification", Component: PublicNotification },
      { path: "public-notification/export", Component: PublicNotificationExport },
      { path: "in-person", Component: InPersonReceipt },
      { path: "inquiry", Component: DeliveryInquiry },
    ],
  },
]);
