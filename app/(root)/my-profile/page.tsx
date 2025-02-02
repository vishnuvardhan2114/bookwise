import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  const borrowedBooks = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, session?.user?.id))
    .orderBy(desc(borrowRecords.createdAt));

  if (borrowedBooks.length === 0) {
    return null;
  }

  const borrowedBookDetails = await Promise.all(
    borrowedBooks.map(async (borrowedBook) => {
      return await db
        .select()
        .from(books)
        .where(eq(books.id, borrowedBook.bookId));
    })
  );
  const flattenedBookDetails = borrowedBookDetails.flat();

  return (
    <>
      <BookList
        title="Borrowed Books"
        //@ts-ignore
        books={flattenedBookDetails}
        borrowedBook={borrowedBooks}
      />
    </>
  );
};

export default Page;
