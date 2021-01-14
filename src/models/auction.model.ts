export interface Auction {
  id: string;
  title: string;
  status?: AuctionStatus;
  createdAt: string;
  endingAt: string;
  highestBid?: Bid;
}

interface Bid {
  amount: number;
}

export enum AuctionStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}
