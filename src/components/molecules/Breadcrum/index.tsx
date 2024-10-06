"use client";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";

interface Props {
  path?: string[];
}

const Breadcrumb = ({ path }: Props) => {
  const pathname = usePathname();
  const getPathBasedOnLocation = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments;
  };
  const breadcrumbItems = path || getPathBasedOnLocation();
  
  return (
    <Breadcrumbs className="mb-3">
      {breadcrumbItems.map((item) => (
        <BreadcrumbItem key={`breadcrumb-${item}`}>{item}</BreadcrumbItem>
      ))}
      <BreadcrumbItem>Home</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default Breadcrumb;
