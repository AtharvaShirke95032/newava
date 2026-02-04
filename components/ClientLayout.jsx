"use client";

import React from "react";
import Navbar from "@/components/navbar";
import RegistrationModal from "@/components/RegistrationModal";
import { useRegistration } from "@/components/RegistrationContext";

export default function ClientLayout({ children }) {
    const { isModalOpen, closeModal } = useRegistration();

    return (
        <>
            <Navbar />
            {children}
            <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}
