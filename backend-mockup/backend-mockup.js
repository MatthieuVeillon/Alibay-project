const assert = require("assert");

function genUID() {
  return Math.floor(Math.random() * 100000000);
}

let itemsBought = {}; // global variable that keeps track of all the items a user has bought
let itemsSold = {}; // global variable that keeps track of all the items a seller has sold
let listing = {}; // QUESTION ARRAY or OBJECT - we choose object

// You'll need to add many more global variables

/*
initializeUserIfNeeded adds the UID to our global state unless it's already there
parameter: [uid] the UID of the user.
returns: undefined
*/

function initializeUserIfNeeded(uid) {
  // If the user is not in our global state, add him

  //   QUESTION : global state is different from react right ? right now the logic
  //   I understand is if user is not in our state => add a property to itemSold which doesn't make sense to me

  if (!(uid in itemsBought)) itemsBought[uid] = [];
  // There are many more things to do

  if (!(uid in itemsSold)) itemsSold[uid] = [];
}

/* 
createListing adds a new listing to our global state.
    parameters: 
      [sellerID] The ID of the seller
      [price] The price of the item
      [blurb] A blurb describing the item
    returns: the ID of the new listing
*/
function createListing(sellerID, price, blurb) {
  let listingID = genUID(); // QUESTION to check with MAX - what he thinks about how to generate ID ?  a voir si on refac pour un code unique en v2

  let listingItem = {
    sellerID: sellerID,
    price: price,
    blurb: blurb,
    available: true
  };

  listing[listingID] = listingItem;

  return listingID;
}

/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: an object that contains the price and the blurb
*/
function getItemDescription(listingID) {
  let itemToReturn = {
    price: listing[listingID].price,
    blurb: listing[listingID].blurb
  };
  return itemToReturn;
}

/* 
buy changes the global state.
Another buyer will not be able to purchase that listing - DONE with the one below - do we need to do anything more specific ? 
The listing will no longer appear in search results - DONE
The buyer will see the listing in his history of purchases - DONE 
The seller will see the listing in his history of items sold - DONE 
    parameters: 
     [buyerID] The ID of buyer
     [sellerID] The ID of seller
     [listingID] The ID of listing
    returns: undefined
*/
function buy(buyerID, sellerID, listingID) {
  if (listing[listingID].available) {
    itemsBought[buyerID] = itemsBought[buyerID].concat([listingID]); //QUESTION  : should we include the listing ID ? at the top we're considering ItemsBought as an array The buyer will see the listing in his history of purchases
    itemsSold[sellerID] = itemsSold[sellerID].concat([listingID]); //The seller will see the listing in his history of items sold
    listing[listingID].available = false;
  } else {
    return "item already sold";
  }
}

/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs - QUESTION not array with ID AND full object information ? 
*/
function allItemsSold(sellerID) {
  return itemsSold[sellerID];
}

/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: an array of listing IDs
*/
function allItemsBought(buyerID) {
  return itemsBought[buyerID];
}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: an array of listing IDs
*/
function allListings() {
  let availableList = [];
  for (let item in listing) {
    if (listing[item].available === true) {
      availableList.push(item);
    }
  }

  return availableList;
  // return Object.keys(listing).filter(item => listing[item].available === true);
}

/*
searchForListings returns the IDs of all the listings currently on the market and which match the searchterm
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: an array of listing IDs
*/
function searchForListings(searchTerm) {
  let matchedSearchedItems = [];

  for (let item in listing) {
    if (listing[item].available === true) {
      if (listing[item].blurb.includes(searchTerm)) {
        matchedSearchedItems.push(item);
      }
    }
  }
  return matchedSearchedItems;
}

// The tests
let sellerID = genUID();
let buyerID = genUID();
initializeUserIfNeeded(sellerID);
initializeUserIfNeeded(buyerID);
let listing1ID = createListing(sellerID, 500000, "A very nice boat");
let listing2ID = createListing(sellerID, 1000, "Faux fur gloves");
let listing3ID = createListing(sellerID, 100, "Running shoes");
let product2Description = getItemDescription(listing2ID);

buy(buyerID, sellerID, listing2ID);
buy(buyerID, sellerID, listing3ID);

let allSold = allItemsSold(sellerID);
let soldDescriptions = allSold.map(getItemDescription);

let allBought = allItemsBought(buyerID);
let allBoughtDescriptions = allBought.map(getItemDescription);

let listings = allListings();
let boatListings = searchForListings("boat");
let shoeListings = searchForListings("shoes");

let boatDescription = getItemDescription(listings[0]);
let boatBlurb = boatDescription.blurb;
let boatPrice = boatDescription.price;

assert(allSold.length == 2); // The seller has sold 2 items
assert(allBought.length == 2); // The buyer has bought 2 items
assert(listings.length == 1); // Only the boat is still on sale
assert(boatListings.length == 1); // The boat hasn't been sold yet
assert(shoeListings.length == 0); // The shoes have been sold
assert(boatBlurb == "A very nice boat");
assert(boatPrice == 500000);
console.log("complete");

module.export = {
  initializeUserIfNeeded,
  createListing,
  getItemDescription,
  buy,
  allItemsSold,
  allItemsBought,
  allListings,
  searchForListings
};
