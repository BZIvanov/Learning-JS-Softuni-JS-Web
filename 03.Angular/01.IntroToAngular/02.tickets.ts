let data = [
  'Philadelphia|94.20|available',
  'New York City|95.99|available',
  'New York City|95.99|sold',
  'Boston|126.20|departed',
];

// let sortItem = 'destination';
let sortItem = 'price';
// let sortItem = 'status';

class Ticket {
  destination: string;
  price: number;
  status: string;

  constructor(destination: string, price: number, status: string) {
    this.destination = destination;
    this.price = price;
    this.status = status;
  }
}

let ticketsArray: Ticket[] = data.map((t: string) => {
  let splited: string[] = t.split('|');
  let price: number = Number(splited.splice(1, 1));
  return new Ticket(splited[0], price, splited[1]);
});

let sortedArray = ticketsArray.sort((a: Ticket, b: Ticket) => {
  if (sortItem === 'destination' || sortItem === 'status') {
    return a[sortItem].localeCompare(b[sortItem]);
  }
  if (sortItem === 'price') {
    return a[sortItem] - b[sortItem];
  }
});

console.log(sortedArray);
