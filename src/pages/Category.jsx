import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/listingItem";

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get a reference
        const listingsRef = collection(db, "listings");

        //create a query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc", limit(10))
        );

        // execute the query (we get something called the snapshot)
        const querySnap = await getDocs(q);

        // We have to loop this snapshot
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could Not fetch Listings");
      }
    };

    fetchListings();
  }, [params.categoryName]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for Rent"
            : "Places for Sale"}
        </p>
      </header>
      {loading === true ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No Listing for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
