import axios from "axios";
import { useEffect, useState } from "react";
import { Listing } from "../../types";
import Card from "./Card";
import ClipLoader from "react-spinners/ClipLoader";

const ActiveListing = () => {
    const [listings, setListings] = useState<Listing[] | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getListing = async () => {
            setIsLoading(true);
            setError("");
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/listing"
                );
                setListings(data.listings);
            } catch (err) {
                setError("Could not get the active listings.Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        getListing();
    }, []);

    const activeListings = listings?.filter(
        (listing) => listing.status === true
    );

    if (isLoading) {
        return (
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <ClipLoader
                    color="orange"
                    loading={isLoading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    return (
        <div className="flex gap-4 md:px-10 flex-wrap md:justify-normal">
            {error && <h1>{error}</h1>}

            {activeListings?.length === 0 && <h1>No active Listings</h1>}

            {activeListings?.map((listing) => (
                <Card key={listing._id} listing={listing} />
            ))}
        </div>
    );
};

export default ActiveListing;
