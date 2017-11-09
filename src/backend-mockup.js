import * as firebase from "firebase";
// import config file to initialize DB for firebase
import fb from "./Components/jsx/firebase-config";

const assert = require("assert");
// const admin = require("firebase-admin");
// import all methods for firebase

const database = firebase.database();

/*
Before implementing the login functionality, use this function to generate a new UID every time.
It will decrease your iteration time.
*/
function genUID() {
  return Math.floor(Math.random() * 100000000);
}

/*
initializeUserIfNeeded adds the UID to our database unless it's already there
parameter: [uid] the UID of the user.
returns: A promise - DONE
*/

// get the itemsBought from firebase databse and check if the user is already there - otherwsie push a new user to the DB

async function initializeBuyerIfNeeded(uid) {
  const responseBuyers = await database.ref("/itemsBought").once("value");
  let buyerInDB = false;

  for (const buyerID in responseBuyers.val()) {
    // REFAC, anything better to check ? object.keys and iterate over every ?
    if (buyerID == uid) {
      buyerInDB = true;
    }
  }
  if (!buyerInDB) {
    const test = database.ref(`/itemsBought/${uid}`).set(["initial state"]);
  }
}
// get the itemsSold from firebase databse and check if the user is already there - otherwsie push a new user to the DB

async function initializeSellerIfNeeded(uid) {
  const responseSellers = await database.ref("/itemsSold").once("value");
  let sellerInDB = false;

  for (const sellerID in responseSellers.val()) {
    // REFAC, anything better to check ? object.keys and iterate over every ?
    if (sellerID == uid) {
      sellerInDB = true;
    }
  }
  if (!sellerInDB) {
    return database.ref(`/itemsSold/${uid}`).set(["initial state"]);
  }
}

function initializeUserIfNeeded(uid) {
  return Promise.all([
    initializeBuyerIfNeeded(uid),
    initializeSellerIfNeeded(uid)
  ]);
}
/* 
createListing adds a new listing to our global state.
This function is incomplete. You need to complete it.
    parameters: 
      [sellerID] The ID of the seller
      [price] The price of the item
      [blurb] A blurb describing the item
    returns: A promise containing the ID of the new listing
*/
async function createListing(sellerID, productName, price, blurb, imageUrl) {
  const listingID = `${sellerID}H${genUID()}`; // QUESTION to check with MAX - what he thinks about how to generate ID ?  a voir si on refac pour un code unique en v2

  const listingItem = {
    sellerID,
    productName,
    price,
    blurb,
    available: true,
    listingID,
    imageUrl
  };
  database
    .ref("/listing")
    .child(listingID)
    .set(listingItem);

  return listingID;
}

/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: A promise that contains an object containing the price and blurb properties.
*/
async function getItemDescription(listingID) {
  listingID;
  const response = await database.ref(`/listing/${listingID}`).once("value");

  const itemToReturn = {
    price: response.val().price,
    blurb: response.val().blurb,
    productName: response.val().productName,
    sellerID: response.val().sellerID,
    price: response.val().price,
    listingID: response.val().listingID,
    blurb: response.val().blurb,
    imageUrl: response.val().imageUrl
  };
  itemToReturn;

  return itemToReturn;
}

/* 
buy changes the global state.
Another buyer will not be able to purchase that listing
The listing will no longer appear in search results
The buyer will see the listing in his history of purchases - DONE
The seller will see the listing in his history of items sold - DONE
    parameters: 
     [buyerID] The ID of buyer
     [sellerID] The ID of seller
     [listingID] The ID of listing
    returns: a promise
*/
async function buy(buyerID, sellerID, listingID) {
  // take the previous value of itemsBought and concat if with the new bought item ID
  async function pushToItemsBought() {
    const responseItemsToBought = await database
      .ref(`/itemsBought/${buyerID}`)
      .once("value");

    let itemsBoughtArray = responseItemsToBought.val();
    if (itemsBoughtArray[0] === "initial state") {
      itemsBoughtArray = [];
    }

    itemsBoughtArray = itemsBoughtArray.concat([listingID]);

    return database.ref(`/itemsBought/${buyerID}`).set(itemsBoughtArray);
  }

  // take the previous value of itemsBought and concat if with the new bought item ID
  async function pushToItemsSold() {
    const responseItemsToSold = await database
      .ref(`/itemsSold/${sellerID}`)
      .once("value");

    let itemsSoldArray = responseItemsToSold.val();
    if (itemsSoldArray[0] === "initial state") {
      itemsSoldArray = [];
    }

    itemsSoldArray = itemsSoldArray.concat([listingID]);

    return database.ref(`/itemsSold/${sellerID}`).set(itemsSoldArray);
  }

  //   remove items from items available by updating the available at off
  const response = await database
    .ref(`/listing/${listingID}`)
    .update({ available: false });

  return Promise.all([pushToItemsBought(), pushToItemsSold()]);

  // push the purchase to the itemsBought Db

  //     response.val().available = false

  //   if (listing[listingID].available) {
  //     itemsBought[buyerID] = itemsBought[buyerID].concat([listingID]); //QUESTION  : should we include the listing ID ? at the top we're considering ItemsBought as an array The buyer will see the listing in his history of purchases
  //     itemsSold[sellerID] = itemsSold[sellerID].concat([listingID]); //The seller will see the listing in his history of items sold
  //     listing[listingID].available = false;
  //   } else {
  //     return "item already sold";
  //   }
}

/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: a promise containing an array of listing IDs
*/
async function allItemsSold(sellerID) {
  sellerID;
  const response = await database.ref(`/itemsSold/${sellerID}`).once("value");

  return response.val();
}

/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: a promise containing an array of listing IDs
*/
async function allItemsBought(buyerID) {
  buyerID;
  const response = await database.ref(`/itemsBought/${buyerID}`).once("value");

  return response.val();
}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: a promise containing an array of listing IDs
*/
async function allListings() {
  const response = await database.ref("/listing").once("value");
  console.log(response);
  response.val();

  const availableList = [];

  for (const item in response.val()) {
    if (response.val()[item].available === true) {
      availableList.push(item);
    }
  }
  availableList;

  return availableList;
}

/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: a promise containing an array of listing IDs
*/
async function searchForListings(searchTerm) {
  const response = await database.ref("/listing").once("value");
  const itemsInListing = response.val();
  console.log("itemsInListing", itemsInListing);
  const matchedID = [];

  for (const item in itemsInListing) {
    if (itemsInListing[item].available) {
      console.log(itemsInListing[item].blurb.includes(searchTerm));
      if (itemsInListing[item].blurb.includes(searchTerm)) {
        matchedID.push(item);
      }
    }
  }
  console.log("matchID", matchedID);
  return matchedID;
}

// // The tests
// async function test() {
//   // await database.ref("/").set(null);
//   const sellerID = genUID();
//   const buyerID = genUID();

//   await initializeUserIfNeeded(sellerID);
//   await initializeUserIfNeeded(buyerID);

//   const listing1ID = await createListing(sellerID, 500000, "A very nice boat");
//   const listing2ID = await createListing(sellerID, 1000, "Faux fur gloves");
//   const listing3ID = await createListing(sellerID, 100, "Running shoes");
//   const product2Description = await getItemDescription(listing2ID);

//   await buy(buyerID, sellerID, listing2ID);
//   await buy(buyerID, sellerID, listing3ID);

//   const allSold = await allItemsSold(sellerID);
//   const soldDescriptions = await Promise.all(allSold.map(getItemDescription));
//   console.log("1step");
//   const allBought = await allItemsBought(buyerID);
//   console.log("2step");
//   const allBoughtDescriptions = await Promise.all(
//     allBought.map(getItemDescription)
//   );
//   console.log("before Search");
//   const listings = await allListings();
//   const boatListings = await searchForListings("boat");
//   console.log("boatListings", boatListings);
//   const shoeListings = await searchForListings("shoes");
//   console.log("shoelistng", shoeListings);
//   console.log("after search");
//   const boatDescription = await getItemDescription(listings[0]);
//   const boatBlurb = boatDescription.blurb;
//   const boatPrice = boatDescription.price;
//   console.log("last step before assert");

//   assert(allSold.length == 2); // The seller has sold 2 items
//   assert(allBought.length == 2); // The buyer has bought 2 items
//   assert(listings.length == 1); // Only the boat is still on sale
//   assert(boatListings.length == 1); // The boat hasn't been sold yet
//   assert(shoeListings.length == 0); // The shoes have been sold
//   assert(boatBlurb == "A very nice boat");
//   assert(boatPrice == 500000);
//   console.log("complete");
// }
// test();

export {
  genUID,
  initializeUserIfNeeded,
  createListing,
  getItemDescription,
  buy,
  allItemsSold,
  allItemsBought,
  allListings,
  searchForListings
};
