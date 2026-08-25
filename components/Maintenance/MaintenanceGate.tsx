"use client";

import { useGetMaintenanceStatusQuery } from "@/redux/features/company/companyApi";
import MaintenanceScreen from "./MaintenanceScreen";

/**
 * Wraps the whole app. While maintenance mode is OFF (or the check hasn't
 * resolved yet — fail-open so a slow/failed API call never bricks the
 * site), children render as normal. The instant it's ON, children are not
 * rendered at all — only <MaintenanceScreen /> is — so there is nothing
 * left in the DOM to click or navigate through, on every route.
 */
const MaintenanceGate = ({ children }: { children: React.ReactNode }) => {
  const { data } = useGetMaintenanceStatusQuery(undefined, {
    pollingInterval: 20000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (data?.is_maintenance === true) {
    return <MaintenanceScreen message={data?.message} />;
  }

  return <>{children}</>;
};

export default MaintenanceGate;
