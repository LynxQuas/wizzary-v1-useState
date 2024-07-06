import { Listing } from "../../types";

const ListingStatus = ({ listing }: { listing: Listing | null }) => {
    return (
        <p className="font-bold">
            status:{" "}
            <span
                className={`text-white px-2 mx-4 py-1 rounded-md ${
                    listing?.status === true ? "bg-green-500 " : "bg-red-500"
                }`}
            >
                {listing?.status === true ? "Open" : "Close"}
            </span>
        </p>
    );
};

export default ListingStatus;
