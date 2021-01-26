import React from 'react';
import BooksService from '../services/books-service';
import DataFromServiceProvider from './render-with-data-from-service.jsx';

function BookList({ data, theme }) {
  if (!data.length) {
    return null;
  }

  return (
    <ul className={theme}>
      {data.map((book) => (
        <li key={book.id}>Title: {book.title}</li>
      ))}
    </ul>
  );
}

const BookListWithServiceDataProvider = ({ theme }) => (
  <DataFromServiceProvider
    initialData={[]}
    serviceMethod={new BooksService().getBooks}
    render={(data) => <BookList data={data} theme={theme} />}
  />
);

export default BookListWithServiceDataProvider;
