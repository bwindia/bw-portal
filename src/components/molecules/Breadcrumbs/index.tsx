"use client";
import { LANDING_PAGE_ROUTE } from "@/utils/routes";
import {
  Breadcrumbs as NextUiBreadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

interface Props {
  path?: { label: string; href?: string }[];
}

const Breadcrumbs = ({ path }: Props) => {
  const pathname = usePathname();
  const getPathBasedOnLocation = () => {
    const pathnameSegments = pathname.split("/");
    const segments = pathnameSegments.filter(Boolean).map((label, index) => ({
      label: index === 0 ? "Home" : label.replace(/-/g, " "),
      href:
        index !== pathnameSegments.length - 1
          ? index !== 0
            ? `/${pathnameSegments.slice(0, index).join("/")}`
            : LANDING_PAGE_ROUTE
          : "#",
    }));
    return segments;
  };

  const getBreadcrumbItemsForPath = (path: Props["path"]) => {
    if (path) {
      const segments = [{ label: "Home", href: LANDING_PAGE_ROUTE }];
      path.map((item) =>
        segments.push({
          label: item.label.replace(/-/g, " "),
          href: item.href || "#",
        })
      );
      return segments;
    }
    return getPathBasedOnLocation();
  };

  const breadcrumbItems = getBreadcrumbItemsForPath(path);

  return (
    <NextUiBreadcrumbs className="mb-6">
      {breadcrumbItems.map((item, index) => (
        <BreadcrumbItem
          key={`breadcrumb-${item.label}-${index}`}
          className="capitalize"
          href={item.href || "#"}
        >
          {item.label}
        </BreadcrumbItem>
      ))}
    </NextUiBreadcrumbs>
  );
};

export default Breadcrumbs;
