"use client";

import React, { useState } from "react";
import { signOutAction } from "@/app/(auth-pages)/actions";
import Button from "@/components/atoms/Button";
import { INavItem, IUser } from "@/utils/types";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Tooltip,
  User,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import bloodWarriorsLogo from "@/assets/logos/BW Long Logo.png";
import { usePathname } from "next/navigation";

interface Props {
  items: INavItem[];
  user: IUser;
}

const MobileNav = ({ items }: Props) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Navbar isBlurred onMenuOpenChange={setIsOpen}>
        <NavbarContent>
          <NavbarBrand>
            <Image
              src={bloodWarriorsLogo}
              className="h-12 w-auto"
              alt="Blood Warriors Logo"
            />
          </NavbarBrand>
          <NavbarMenuToggle
            aria-label={isOpen ? "Close menu" : "Open menu"}
            // className="sm:hidden"
          />
        </NavbarContent>
        <NavbarMenu>
          {items.map((item) => (
            <NavbarMenuItem key={item.label}>
              <Link href={item.path ?? "#"}>
                <div
                  className={`${
                    item.path && pathname.includes(item.path)
                      ? "text-"
                      : "text-default-500"
                  } w-full text-base`}
                >
                  {item.label}
                </div>
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <div
              className="w-full text-base text-danger"
              onClick={async () => await signOutAction()}
            >
              Logout
            </div>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
};

const SideNav = ({ items, user }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <div className="sm:hidden w-full">
        <MobileNav items={items} user={user} />
      </div>
      <div className="sm:flex flex-col justify-between sm:visible hidden max-w-72 min-w-64 shadow-small h-svh text-sm bg-content1">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-inherit py-2 px-3">
            <Image
              src={bloodWarriorsLogo}
              className="h-12 w-auto"
              alt="Blood Warriors Logo"
            />
          </p>
          <div className="flex flex-col gap-1 px-3 overflow-y-auto h-[calc(100vh-9rem)]">
            {items.map((item) => (
              <>
                <Link key={`navitem-${item.label}`} href={item.path ?? "#"}>
                  <div
                    className={`${
                      item.path && pathname.includes(item.path)
                        ? "bg-shadow"
                        : ""
                    } w-full hover:bg-shadow h-10 shadow-sm rounded-lg flex items-center`}
                  >
                    <span className="material-symbols-rounded mx-2.5 text-default-500">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
        <div className="flex gap-2 m-2 p-2 items-center justify-between border-t-1 border-default-300">
          <div className="flex items-center gap-2 px-3">
            <User
              avatarProps={{
                showFallback: true,
                // isBordered: true,
                radius: "full",
                color: "primary",
                size: "sm",
                className: "uppercase",
                name: user.name,
                src: user.image,
              }}
              description={user.email}
              name={user.name}
            />
          </div>
          <form>
            <Tooltip content="Logout" showArrow offset={0}>
              <Button
                type="submit"
                isIconOnly
                variant="faded"
                className="border-0 text-default-500"
                formAction={signOutAction}
              >
                <span className="material-symbols-rounded cursor-pointer">
                  logout
                </span>
              </Button>
            </Tooltip>
          </form>
        </div>
      </div>
    </>
  );
};

export default SideNav;
