"use client";
import config from "@/lib/config";
import { IKImage } from "imagekitio-next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Book, Calendar } from "lucide-react";

interface BorrowedBookCardProps {
  id: string;
  title: string;
  genre: string;
  coverColor: string;
  coverUrl: string;
  borrowedBook: any;
}

function hexToRgba(hex: string, alpha: number): string {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const BorrowedBookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  borrowedBook,
}: BorrowedBookCardProps) => {
  const formattedDate = borrowedBook.borrowDate
    ? new Date(borrowedBook.borrowDate).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : "Unknown Date";
  return (
    <div className="flex items-center justify-center p-4">
      <Card
        className="w-[280px] h-[484px] text-white border-0"
        style={{
          background: "linear-gradient(#12141D, #12151F)",
        }}
      >
        <CardHeader className="space-y-6">
          <Link
            href={`/books/${id}`}
            className="relative w-full flex items-center justify-center"
            style={{
              backgroundColor: hexToRgba(coverColor, 0.3),
              width: "240px",
              height: "247px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <BookCover
              coverColor={coverColor}
              coverImage={coverUrl}
              className="w-[144px] h-[199px] shadow-xl"
            />
          </Link>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="text-[20px] font-semibold font-ibm-plex-sans">
              {title.length > 50 ? `${title.substring(0, 30)}...` : title}
            </h2>
            <p
              className={`text-light-100 text-[16px] font-light font-ibm-plex-sans`}
            >
              {genre}
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Image src="/icons/book-2.svg" alt="logo" width={18} height={18} />
            <span>Borrowed on {formattedDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <Image
                src="/icons/calendar.svg"
                alt="logo"
                width={18}
                height={18}
              />
              <span>06 days left to due</span>
            </div>
            <div
              style={{
                backgroundColor: hexToRgba(coverColor, 0.3),
                width: "26px",
                height: "26px",
                gap: "10px",
                borderRadius: "4px",
                overflow: "hidden",
              }}
              className="items-center flex justify-center cursor-pointer"
            >
              <Image
                src="/icons/receipt.svg"
                alt="logo"
                width={18}
                height={18}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowedBookCard;
