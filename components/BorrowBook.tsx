"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { borrowBook } from "@/lib/actions/book";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
  isBorrowed: boolean;
  dueDate?: string;
}

const BorrowBook = ({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
  isBorrowed,
  dueDate,
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return;
    }
    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });
      if (result.success) {
        toast({
          title: "Success",
          description: "Book borrowed successfully",
        });
        router.push("/my-profile");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while borrowing the book",
        variant: "destructive",
      });
    } finally {
      setBorrowing(false);
    }
  };

  useEffect(() => {
    if (isBorrowed && dueDate) {
      const calculateTimeLeft = () => {
        const now = new Date();
        const due = new Date(dueDate);
        const difference = due.getTime() - now.getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft("Time's up!");
        }
      };

      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }
  }, [dueDate, isBorrowed]);

  return (
    <div>
      {isBorrowed ? (
        <div className="">
          <Button className="book-overview_btn" disabled={isBorrowed}>
            Borrowed
          </Button>
          <p className="text-light-300 text-sm mt-5">Due in {timeLeft}</p>
        </div>
      ) : (
        <Button
          className="book-overview_btn"
          onClick={handleBorrowBook}
          disabled={borrowing}
        >
          <Image src="/icons/book.svg" alt="book" width={20} height={20} />
          <p className="font-bebas-neue text-xl text-dark-100">
            {borrowing ? "Borrowing ..." : "Borrow Book"}
          </p>
        </Button>
      )}
    </div>
  );
};

export default BorrowBook;