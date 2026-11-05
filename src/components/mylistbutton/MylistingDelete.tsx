
"use client";

import { useState, type MouseEvent } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getTokenFormClient } from "@/lib/getTokenFormClient";

type Studio = {
  _id: string;
  title: string;
};

interface DeleteProps {
  studio: Studio;
  onDeleted: (id: string) => void;
}

const MylistingDelete = ({ studio, onDeleted }: DeleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Delete Studio
  const handleDelete = async (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const token = await getTokenFormClient()

    try {
      setIsDeleting(true);

      const res = await fetch(
        `http://localhost:5000/delete-studio/${studio._id}`,
        {
          method: "DELETE",
          headers:{
             Authorization: `Bearer ${token}`,
          }
        }
      );
      const data = await res.json()
      console.log("Delete Response:", data);

      

      // Success Toast
      toast.success("Studio deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
        
      });
      window.location.reload()

    } catch (error) {
      console.error("Delete Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!isDeleting) {
          setIsOpen(open);
        }
      }}
    >
      {/* Delete Button */}
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white text-sm font-semibold text-red-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <FiTrash2 size={16} />
            Delete
          </Button>
        }
      />

      {/* Confirmation Dialog */}
      <AlertDialogContent className="rounded-2xl border border-[#E5E7EB] bg-white sm:max-w-md">

        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading text-xl font-bold text-[#1E1E1E]">
            Delete Studio Listing?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm leading-6 text-[#6B7280]">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#1E1E1E]">
              {studio.title}
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>

          {/* Cancel Button */}
          <AlertDialogCancel
            disabled={isDeleting}
            className="rounded-xl border-[#E5E7EB] text-[#1E1E1E]"
          >
            Cancel
          </AlertDialogCancel>

          {/* Confirm Delete */}
          <AlertDialogAction
            disabled={isDeleting}
            onClick={handleDelete}
            className="rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </AlertDialogAction>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MylistingDelete;
