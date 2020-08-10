const books = [
  {
    id: 1,
    title: 'Book 1',
    author: 'Someone 1',
  },
  {
    id: 2,
    title: 'Book 2',
    author: 'Someone 2',
  },
  {
    id: 3,
    title: 'Book 3',
    author: 'Someone 3',
  },
  {
    id: 4,
    title: 'Book 4',
    author: 'Someone 4',
  },
];

class BooksService {
  getBooks() {
    return Promise.resolve(books);
  }
}

export default BooksService;
