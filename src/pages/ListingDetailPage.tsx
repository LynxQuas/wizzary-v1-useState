import { useNavigate, useParams } from "react-router-dom";
import LisingControls from "../components/listings/ListingControls";
import { useEffect, useState } from "react";
import axios from "axios";
import { Listing } from "../types";
import { ClipLoader } from "react-spinners";

const ListingDetailPage = () => {
    const { id } = useParams();
    console.log(id);

    const [curListing, setCurListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleDeleteListing = async () => {
        const confirm = window.confirm("Are you sure ?");

        if (!confirm) return;

        try {
            const deletedListing = await axios.delete(
                `http://localhost:5000/api/listing/${id}`
            );
            navigate("/active-listings");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getListing = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/api/listing/${id}`
                );
                setCurListing(data.listing);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setErr(
                        err.response?.data.message || "something went wrong."
                    );
                } else {
                    setErr("An unknow error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };
        getListing();
    }, []);

    if (loading) {
        return (
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <ClipLoader
                    color="orange"
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    if (err) {
        return (
            <h1 className="text-2xl text-center my-20 text-red-500">{err}</h1>
        );
    }

    return (
        <div className="my-4 relative -z-0">
            <div className="flex flex-col md:flex-col lg:flex-row gap-6 bg-white py-10 px-5 rounded-md shadow-md">
                <LisingControls onDelete={handleDeleteListing} />

                <div className="shrink-0 w-full md:w-1/2">
                    <img
                        src={curListing?.image_url}
                        className="w-full md:w-[550px] md:h-[450px] rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-8">
                    <div className="flex gap-8 items-center md:mb-2">
                        <div className="flex items-center gap-4">
                            <div className="w-[3rem] h-[3rem] bg-black rounded-full"></div>
                            <p className="font-bold">
                                {/* {listingCreator?.user.name} */}
                            </p>
                        </div>
                        <small className="text-gray-400">
                            Created at {curListing?.createdAt}
                        </small>
                    </div>
                    <h1 className="text-3xl font-bold text-amber-400 text-gary-200">
                        {curListing?.title}
                    </h1>
                    <p>{curListing?.description}</p>
                    <p className="font-bold">
                        status:{" "}
                        <span
                            className={`text-white px-2 mx-4 py-1 rounded-md ${
                                curListing?.status === true
                                    ? "bg-green-500 "
                                    : "bg-red-500"
                            }`}
                        >
                            {curListing?.status === true ? "Open" : "Close"}
                        </span>
                    </p>
                    <p className=" font-bold">
                        Price:{" "}
                        <span className="text-amber-700 mx-5">
                            ${Number(curListing?.price).toFixed(2)}
                        </span>
                    </p>

                    <div className="flex gap-4">
                        <button className="bg-neutral-700 font-semibold text-white w-[10rem] px-4 py-2 rounded-md">
                            Add Bid
                        </button>

                        <button className="bg-amber-600 font-semibold text-white w-[10rem] px-4 py-2 rounded-md">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetailPage;
