import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListing } from "../context/ListingContext";
import CreateListingPage from "./CreateListingPage";

const EditListingPage = () => {
    const { id } = useParams();
    const { state, fetchListing } = useListing();

    useEffect(() => {
        if (id) {
            fetchListing(id);
        }
    }, [id]);

    if (state.error) {
        return <h1>{state.error}</h1>;
    }
    if (state.isLoading) {
        return <h1>loading...</h1>;
    }
    return (
        <div>
            <CreateListingPage
                isEditing={true}
                editingListing={state.listing}
            />
        </div>
    );
};

export default EditListingPage;
