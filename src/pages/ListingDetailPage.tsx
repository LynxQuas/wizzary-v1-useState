import { useParams } from "react-router-dom";
import LisingControls from "../components/listings/ListingControls";
import { useEffect } from "react";

import { ClipLoader } from "react-spinners";
import { useListing } from "../context/ListingContext";
import { useAuth } from "../context/AuthContext";
import useCreator from "../hooks/useCreator";
import ListingCreator from "../components/listings/ListingCreator";
import ListingActions from "../components/listings/ListingActions";
import ListingStatus from "../components/listings/ListingStatus";

const ListingDetailPage = () => {
    const { id } = useParams();
    const { user: curUser, token } = useAuth();
    const {
        state: listing,
        fetchListing,
        deleteListing,
        editListing,
    } = useListing();
    const { user: creator, isLoading } = useCreator(listing.listing?.creator);

    const handleDeleteListing = async () => {
        const confirm = window.confirm("Are you sure ?");
        if (!confirm) return;
        token && deleteListing(id, token);
    };

    const handleCloseListing = () => {
        if (!listing.listing || !token) return;
        editListing(
            listing?.listing?._id,
            { ...listing.listing, status: false },
            token
        );
    };

    useEffect(() => {
        if (id) {
            fetchListing(id);
        }
    }, [id]);

    if (listing.isLoading) {
        return (
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <ClipLoader
                    color="orange"
                    loading={listing.isLoading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    if (listing.error) {
        return (
            <h1 className="text-2xl text-center my-20 text-red-500">
                {listing.error}
            </h1>
        );
    }

    return (
        <div className="my-4 relative -z-0">
            <div className="flex flex-col md:flex-col lg:flex-row gap-6 bg-white py-10 px-5 rounded-md shadow-md md:mx-4 mx-2">
                <LisingControls
                    onDelete={handleDeleteListing}
                    creator={creator}
                    curUser={curUser}
                />

                <div className="shrink-0 w-full md:w-1/2">
                    <img
                        src={listing.listing?.image_url}
                        className="w-full md:w-[550px] md:h-[450px] rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-8">
                    <ListingCreator
                        createdAt={listing.listing?.createdAt}
                        creator={creator}
                    />

                    <h1 className="text-3xl font-bold text-amber-400 text-gary-200">
                        {listing.listing?.title}
                    </h1>

                    <p>{listing.listing?.description}</p>

                    <ListingStatus listing={listing.listing} />

                    <p className=" font-bold">
                        Price:{" "}
                        <span className="text-amber-700 mx-5">
                            ${Number(listing.listing?.price).toFixed(2)}
                        </span>
                    </p>

                    {!isLoading && (
                        <ListingActions
                            curUser={curUser}
                            creator={creator}
                            handleCloseListing={handleCloseListing}
                            curListing={listing?.listing}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListingDetailPage;
