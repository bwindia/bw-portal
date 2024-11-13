"use client";
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
    const segments = pathname
      .split("/")
      .filter(Boolean)
      .map((label) => ({ label }));
    return segments;
  };
  const breadcrumbItems = path || getPathBasedOnLocation();

  return (
    <NextUiBreadcrumbs className="mb-6" variant="bordered">
      {breadcrumbItems.map((item) => (
        <BreadcrumbItem
          key={`breadcrumb-${item.label}`}
          className="capitalize"
          href={item?.href || "#"}
        >
          {item.label}
        </BreadcrumbItem>
      ))}
    </NextUiBreadcrumbs>
  );
};

export default Breadcrumbs;
