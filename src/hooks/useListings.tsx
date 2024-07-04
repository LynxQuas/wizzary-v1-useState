import { useEffect, useState } from "react";
import { Listing } from "../types";
import axios from "axios";
const useListings = () => {
    const [listings, setListings] = useState<Listing[] | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getListings = async () => {
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
        getListings();
    }, []);

    return { listings, error, isLoading };
};

export default useListings;
