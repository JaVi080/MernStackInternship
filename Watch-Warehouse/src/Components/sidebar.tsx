
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface sidebarLink {
    label: string; // Text that appears on the screen, e.g. "Home"
    path: string;  // URL the link goes to, e.g. "/shop"
}

const sidebarLinks: sidebarLink[] = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
];
