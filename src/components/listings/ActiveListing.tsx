import Card from "./Card";
import ClipLoader from "react-spinners/ClipLoader";
import useListings from "../../hooks/useListings";

const ActiveListing = () => {
    const { listings, isLoading, error } = useListings();

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
        <div className="flex gap-4 md:px-10 flex-wrap md:justify-center">
            {error && <h1 className="text-2xl text-red-500">{error}</h1>}

            {activeListings?.length === 0 && (
                <h1 className="text-2xl my-20 text-center">
                    No active Listings
                </h1>
            )}

            {activeListings?.map((listing) => (
                <Card key={listing._id} listing={listing} />
            ))}
        </div>
    );
};

export default ActiveListing;
