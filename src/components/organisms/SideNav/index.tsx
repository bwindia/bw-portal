import { signOutAction } from "@/app/actions";
import Button from "@/components/atoms/Button";
import { INavItem, IUser } from "@/utils/types";
import { Avatar, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface Props {
  items: INavItem[];
  user: IUser;
}

const SideNav = ({ items, user }: Props) => {
  return (
    <div className="flex flex-col justify-between max-w-72 min-w-64 bg-card_hover h-svh">
      <div className="flex flex-col gap-6 px-3">
        <p className="font-bold text-inherit py-3">Blood Warriors</p>
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
      <div className="flex gap-2 m-2 p-2 items-center justify-between border rounded-lg">
        <div className="flex items-center gap-2">
          <Avatar
            showFallback
            isBordered
            radius="full"
            color="primary"
            size="md"
            name={user.email}
            src={user.image}
          />

          <span>{user.name}</span>
        </div>
        <form>
        <Tooltip content="Logout" showArrow offset={0}>
          <Button type="submit" isIconOnly variant="faded" className="border-0 text-black" formAction={signOutAction}>
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
