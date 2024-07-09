import { useState } from "react";
import { Listing, User } from "../../types";
import { Modal } from "@mui/material";
import ModalContent from "../ui/ModalContent";

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
    const [open, setOpen] = useState(false);

    const handleModelOpen = () => {
        setOpen((prev) => !prev);
    };

    if (!curUser || !curListing?.status) return;
    return (
        <>
            <Modal
                open={open}
                onClose={handleModelOpen}
                // slots={{ backdrop: StyledBackdrop }}
            >
                <ModalContent>
                    <div className="w-50 bg-white p-10 h-50">
                        <h1>Add Bids</h1>
                        <input type="number" placeholder="Add Bids" />
                    </div>
                </ModalContent>
            </Modal>
            <div>
                <div className="flex gap-4">
                    {creator?.id !== curUser?.id ? (
                        <button
                            onClick={handleModelOpen}
                            className="bg-neutral-700 font-semibold text-white w-[10rem] px-4 py-2 rounded-md"
                        >
                            Add Bid
                        </button>
                    ) : (
                        <button
                            className="bg-amber-600 font-semibold text-white w-[10rem] px-4 py-2 rounded-md"
                            onClick={handleCloseListing}
                        >
                            Close
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default ListingActions;
