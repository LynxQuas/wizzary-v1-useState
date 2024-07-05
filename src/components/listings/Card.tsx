import { Link } from "react-router-dom";
import { Listing } from "../../types";
import { timeFormatter } from "../../utils/helper";

const Card = ({ listing }: { listing: Listing }) => {
    return (
        <div className="flex w-full bg-white justify-between flex-col rounded-md shadow-md p-6 md:w-[20rem]">
            <div className="rounded-md overflow-clip shrink-0 self-center">
                <img src={listing.image_url} width={240} height={100} />
            </div>

            <div className="flex flex-col gap-3 flex-wrap">
                <h1 className="md:text-2xl text-xl text-amber-500 font-bold">
                    {listing.title}
                </h1>
                <p>
                    <span className="text-gray-400">
                        {timeFormatter(listing.createdAt!)}
                    </span>{" "}
                </p>
                <p className="">{listing.description.slice(0, 60)}...</p>
                <p>
                    Price: $<b>{listing.price}</b>
                </p>

                <Link
                    to={`${listing._id}`}
                    className="bg-amber-500 text-white font-semibold p-2 w-[6rem] rounded-md shadow-sm  text-center"
                >
                    Details
                </Link>
            </div>
        </div>
    );
};

export default Card;
