"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { AddSectionForm } from "../forms/add-section-form";
import { AddGroupForm } from "../forms/add-group-form";
import { ShoppingCart } from "lucide-react";
import CheckoutCartBody from "../checkout/checkout-cart-body";

export const CheckoutCartModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "checkoutCart";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        overlayClassName="bg-black/60 dialogBlur"
        className="checkoutDialog w-full max-w-md rounded-lg">
        <DialogHeader className="space-y-2 flex items-start">
          <div className="flex items-center gap-4">
            <ShoppingCart className="h-5 w-5 text-white" />
            <DialogTitle className="text-2xl font-medium text-left">
              Purchase
            </DialogTitle>
          </div>
          <DialogDescription className="text-[#E3DEDE] text-sm text-left">
            Courses that must be followed in a specific order. When a <br />{" "}
            user wants to purchase a course, they must start from the <br />{" "}
            beginning or continue in sequence.
          </DialogDescription>
        </DialogHeader>
        <CheckoutCartBody />
      </DialogContent>
    </Dialog>
  );
};
