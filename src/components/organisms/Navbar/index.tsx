"use client";

import {
  Navbar as NextUiNavbar,
  NavbarContent,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import bloodWarriorsLogo from "@/assets/logos/BW Long Logo.png";
import { HOME_PAGE_ROUTE, SIGN_IN_PATH } from "@/utils/routes";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    
  return (
    <>
      <NextUiNavbar isBlurred onMenuOpenChange={setIsOpen}>
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
          />
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem>
            <Link href={HOME_PAGE_ROUTE}>
              <div className={`w-full text-base`}>Home</div>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href={SIGN_IN_PATH}>
              <div className={`w-full text-base`}>Sign In</div>
            </Link>
          </NavbarMenuItem>
          {/* <NavbarMenuItem>
            <div
              className="w-full text-base text-danger"
              onClick={async () => await signOutAction()}
            >
              Logout
            </div>
          </NavbarMenuItem> */}
        </NavbarMenu>
      </NextUiNavbar>
    </>
  );
};

export default Navbar;
