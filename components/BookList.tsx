import React from "react";
import BookCard from "./BookCard";
import BorrowedBookCard from "./BorrowedBookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
  borrowedBook?: any;
}

const BookList = ({
  title,
  books,
  containerClassName,
  borrowedBook,
}: Props) => {
  if (books.length === 0) return;
  console.log("borrowedBook", borrowedBook);
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {title === "Borrowed Books"
          ? books.map((book,index) => (
              <BorrowedBookCard
                key={book.title}
                {...book}
                borrowedBook={borrowedBook ? borrowedBook[index] : {}}
              />
            ))
          : books.map((book) => <BookCard key={book.title} {...book} />)}
      </ul>
    </section>
  );
};
export default BookList;
