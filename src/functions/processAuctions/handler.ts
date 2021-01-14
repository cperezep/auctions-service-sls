import 'source-map-support/register';

import * as createError from 'http-errors';
import { middyfy } from '@libs/lambda';
import { Auction } from 'src/models/auction.model';
import { getEndedAuctions } from '@libs/getEndedAuctions';
import { closeAuction } from '@libs/closeAuction';

const processAuctions = async () => {
  try {
    const auctionsToClose = await getEndedAuctions();
    const auctionsPromises = auctionsToClose.map((auction: Auction) => closeAuction(auction));
    await Promise.all(auctionsPromises);

    return { close: auctionsToClose.length };
  } catch (error) {
    console.error(error);
    throw createError(500, error);
  }
};

export const main = middyfy(processAuctions);
