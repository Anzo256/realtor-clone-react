import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {collection, getDocs, limit, orderBy, query, startAfter, where} from "firebase/firestore";
import {db} from "../firebase";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router-dom";

export default function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchListing ] = useState(null);
  const params = useParams()
  useEffect(()=>{
    async function fetchListings(){
     try {
      //create refrence or address
      const listingRef = collection(db,"listings")
      //making the query
      const q = query(listingRef,where("type","==",params.categoryName),orderBy("timestamp","desc"),limit(8));
      //excute the query
      const querySnap = await getDocs(q);
      const laastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchListing(laastVisible);
      const listings = [];
      querySnap.forEach((doc)=>{
        return listings.push({
         id: doc.id,
         data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
     } catch (error) {
      toast.error("Couldn't fetch listings");
     }
    }
    fetchListings();
  },[params.categoryName])
  
  async function onFetchMoreListings(){
    try {
      //create refrence or address
      const listingRef = collection(db,"listings")
      //making the query
      const q = query(listingRef,where("type","==",params.categoryName),orderBy("timestamp","desc"),
      startAfter(lastFetchedListing),
      limit(4));
      //excute the query
      const querySnap = await getDocs(q);
      const laastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchListing(laastVisible);
      const listings = [];
      querySnap.forEach((doc)=>{
        return listings.push({
         id: doc.id,
         data: doc.data(),
        });
      });
      setListings((prevState)=>[...prevState,...listings]);
      setLoading(false);
     } catch (error) {
      toast.error("Couldn't fetch listings");
     }

  }
  return <div className="max-w-6xl mx-auto px-3">
     <h1 className="text-3xl text-center mt-6
     font-bold mb-6">
        {params.categoryName === "rent" ? "Places for rent" : "Places for sale"}
     </h1>
     {loading ? (
       <Spinner/>
     ) : listings && listings.length > 0 ? (
      <>
        <main>
          <ul className="sm:grid sm:grid-cols-2 
            lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {listings.map((listing)=>(
              <ListingItem key={listing.id}
              id={listing.id}
              listing={listing.data}/>
            ))}
          </ul>
        </main>
        {lastFetchedListing &&(
          <div className=" flex justify-center
          items-center">
            <button onClick={onFetchMoreListings} className="bg-white px-3 
            py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6
            hover:border-slate-600 rounded transition duration-150 ease-in-out">Load more</button>
          </div>
        )}
      </>
     ) :(
      <p>There are no current  offers</p>
     )}
  </div>;
          

  
}

