import { dashboard, wallet, purchase } from "./icons";

export const menuInfo = [
  {
    name: "dashboard",
    title: "Dashboard",
    icon: dashboard,
    isMenu: false,
    href: "/",
    subMenu: [],
  },
  {
    name: "payments",
    title: "Payments",
    icon: wallet,
    isMenu: true,
    href: "#",
    subMenu: [
      {
        name: "wallets",
        title: "Wallet",
        href: "/wallets",
      },
    ],
  },
  {
    name: "purchases",
    title: "Purchase",
    icon: purchase,
    isMenu: true,
    href: "#",
    subMenu: [
      {
        name: "purchase-new",
        title: "Create",
        href: "/purchases/new",
      },
      {
        name: "purchase-all",
        title: "All purchases",
        href: "/purchases",
      },
    ],
  },
];
