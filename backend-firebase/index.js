const assert = require("assert");
const admin = require("firebase-admin");

/* Put your firebase code here */
const serviceAccount = require("/Users/matthieuveillon/Desktop/Alibay-project/backend-mockup/alibay-project-firebase-adminsdk-lrf6s-bbc6cf1745.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://alibay-project.firebaseio.com"
});

const database = admin.database();

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
  let responseBuyers = await database.ref("/itemsBought").once("value");
  let buyerInDB = false;

  for (let buyerID in responseBuyers.val()) {
    //REFAC, anything better to check ? object.keys and iterate over every ?
    if (buyerID == uid) {
      buyerInDB = true;
    }
  }
  if (!buyerInDB) {
    let test = database.ref("/itemsBought/" + uid).set(["initial state"]);
  }
}
// get the itemsSold from firebase databse and check if the user is already there - otherwsie push a new user to the DB

async function initializeSellerIfNeeded(uid) {
  let responseSellers = await database.ref("/itemsSold").once("value");
  let sellerInDB = false;

  for (let sellerID in responseSellers.val()) {
    //REFAC, anything better to check ? object.keys and iterate over every ?
    if (sellerID == uid) {
      sellerInDB = true;
    }
  }
  if (!sellerInDB) {
    return database.ref("/itemsSold/" + uid).set(["initial state"]);
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
async function createListing(sellerID, price, blurb) {
  let listingID = `${sellerID}H${genUID()}`; // QUESTION to check with MAX - what he thinks about how to generate ID ?  a voir si on refac pour un code unique en v2

  let listingItem = {
    sellerID: sellerID,
    price: price,
    blurb: blurb,
    available: true
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
  let response = await database.ref(`/listing/${listingID}`).once("value");

  console.log(response.val());

  let itemToReturn = {
    price: response.val().price,
    blurb: response.val().blurb
  };
  console.log(2 + 2);
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
    let responseItemsToBought = await database
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
    let responseItemsToSold = await database
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
  let response = await database
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
  let response = await database.ref(`/itemsSold/${sellerID}`).once("value");
  console.log(response.val());
  return response.val();
}

/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: a promise containing an array of listing IDs
*/
async function allItemsBought(buyerID) {
  buyerID;
  let response = await database.ref(`/itemsBought/${buyerID}`).once("value");
  console.log(response.val());
  return response.val();
}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: a promise containing an array of listing IDs
*/
async function allListings() {
  let response = await database.ref("/listing").once("value");
  console.log(response);
  response.val();

  let availableList = [];

  for (let item in response.val()) {
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
  let response = await database.ref("/listing").once("value");
  console.log(response);
  response.val();

  let availableList = [];

  for (let item in response.val()) {
    if (response.val()[item].available === true) {
      if (response.val()[item].blurb.includes(searchTerm)) {
        availableList.push(item);
      }
    }
  }
  availableList;
  return availableList;
}

// The tests
async function test() {
  await database.ref("/").set(null);
  let sellerID = genUID();
  let buyerID = genUID();

  await initializeUserIfNeeded(sellerID);
  await initializeUserIfNeeded(buyerID);

  let listing1ID = await createListing(sellerID, 500000, "A very nice boat");
  let listing2ID = await createListing(sellerID, 1000, "Faux fur gloves");
  let listing3ID = await createListing(sellerID, 100, "Running shoes");
  let product2Description = await getItemDescription(listing2ID);

  await buy(buyerID, sellerID, listing2ID);
  await buy(buyerID, sellerID, listing3ID);

  let allSold = await allItemsSold(sellerID);
  let soldDescriptions = await Promise.all(allSold.map(getItemDescription));
  console.log("hello");
  let allBought = await allItemsBought(buyerID);
  console.log("hello");
  let allBoughtDescriptions = await Promise.all(
    allBought.map(getItemDescription)
  );
  console.log("hello");
  let listings = await allListings();
  let boatListings = await searchForListings("boat");
  let shoeListings = await searchForListings("shoes");
  console.log("hello");
  let boatDescription = await getItemDescription(listings[0]);
  let boatBlurb = boatDescription.blurb;
  let boatPrice = boatDescription.price;
  console.log("hello");

  assert(allSold.length == 2); // The seller has sold 2 items
  assert(allBought.length == 2); // The buyer has bought 2 items
  assert(listings.length == 1); // Only the boat is still on sale
  assert(boatListings.length == 1); // The boat hasn't been sold yet
  assert(shoeListings.length == 0); // The shoes have been sold
  assert(boatBlurb == "A very nice boat");
  assert(boatPrice == 500000);
  console.log("complete");
}
test();
