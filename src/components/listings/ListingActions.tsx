import { Listing, User } from "../../types";

interface ListingActionsProps {
    curUser: User | null;
    creator: User | null;
    curListing: Listing | null;
    handleCloseListing: () => void;
}

const ListingActions = ({
    curUser,
    creator,
    curListing,
    handleCloseListing,
}: ListingActionsProps) => {
    if (!curUser || !curListing?.status) return;
    return (
        <div>
            <div className="flex gap-4">
                {creator?.id !== curUser?.id && (
                    <button className="bg-neutral-700 font-semibold text-white w-[10rem] px-4 py-2 rounded-md">
                        Add Bid
                    </button>
                )}

                {creator?.id === curUser?.id && (
                    <button
                        className="bg-amber-600 font-semibold text-white w-[10rem] px-4 py-2 rounded-md"
                        onClick={handleCloseListing}
                    >
                        Close
                    </button>
                )}
            </div>
        </div>
    );
};

export default ListingActions;
