import React from "react";
import { signOutAction } from "@/app/(auth-pages)/actions";
import Button from "@/components/atoms/Button";
import { INavItem, IUser } from "@/utils/types";
import { Tooltip, User } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import bloodWarriorsLogo from "@/assets/logos/BW Long Logo.png";

interface Props {
  items: INavItem[];
  user: IUser;
}

const SideNav = ({ items, user }: Props) => {
  return (
    <div className="sm:flex flex-col justify-between sm:visible hidden max-w-72 min-w-64 bg-card_hover h-svh">
      <div className="flex flex-col gap-6 px-3">
        <p className="font-bold text-inherit py-3 pointer">
          <Image
            src={bloodWarriorsLogo}
            className="h-12 w-auto"
            alt="Blood Warriors Logo"
          />
        </p>
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <>
              <Link
                key={`navitem-${item.path}`}
                href={item.path ? item.path : "#"}
              >
                <div className="w-full hover:bg-shadow rounded-lg p-2 flex gap-3 text-black">
                  <span className="material-symbols-rounded w-[24px]">
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
        <div className="flex items-center gap-2">
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
  );
};

export default SideNav;
