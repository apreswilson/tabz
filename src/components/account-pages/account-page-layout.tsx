"use client"
import NavigationMenu from "./navigation-menu/navigation-menu";
import TopBar from "./top-bar/top-bar";
import styles from "./account-page-layout.module.scss";
import { useEffect, useMemo, useState } from "react";

interface LayoutProps {
   children: React.ReactNode;
}

export default function AccountPageLayout({ children }: Readonly<LayoutProps>) {
   const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(true);


   const changeMenuView = () => {
      setIsMenuExpanded(!isMenuExpanded);
   }

   return (
      <main className={isMenuExpanded ? styles.account_page_layout : styles.account_page_layout__minimized_menu}>
         <NavigationMenu isMenuExpanded={isMenuExpanded} toggleMenuView={changeMenuView} />
         <TopBar />
         {children}
      </main>
   )
}