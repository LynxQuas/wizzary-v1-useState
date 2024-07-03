import { useEffect, useState } from "react";
import CreateListingPage from "./CreateListingPage";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditListingPage = () => {
    const { id } = useParams();
    const [curListing, setCurListing] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        const getListing = async () => {
            setIsLoading(true);
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/api/listing/${id}`
                );
                setCurListing(data.listing);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        getListing();
    }, []);
    if (err) {
        return <h1>{err}</h1>;
    }
    if (isLoading) {
        return <h1>loading...</h1>;
    }
    return (
        <div>
            <CreateListingPage isEditing={true} editingListing={curListing} />
        </div>
    );
};

export default EditListingPage;
