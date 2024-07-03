import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import TextArea from "../components/ui/TextArea";
import { Listing } from "../types";
import axios from "axios";
import InputError from "../components/ui/InputError";
import { useNavigate } from "react-router-dom";

const options = [
    { label: "Magic Wands", value: "magic-wands" },
    { label: "Portions", value: "portions" },
    { label: "Pets", value: "pets" },
    { label: "Brooms", value: "brooms" },
    { label: "Others", value: "others" },
];

const CreateListingPage = ({
    isEditing,
    editingListing,
}: {
    isEditing?: boolean;
    editingListing?: Listing;
}) => {
    const [createListingInputs, setCreateListingInputs] = useState({
        title: editingListing?.title || "",
        description: editingListing?.description || "",
        price: editingListing?.price || "",
        image_url: editingListing?.image_url || "",
        category: editingListing?.category || "others",
    });

    const [err, setErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputsChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        name: string
    ) => {
        setCreateListingInputs((prev) => ({ ...prev, [name]: e.target.value }));
    };

    const handleCreateListing = async (e: FormEvent) => {
        e.preventDefault();
        let response;
        setIsLoading(true);
        try {
            if (!isEditing) {
                response = await axios.post(
                    "http://localhost:5000/api/listing",
                    createListingInputs
                );
            } else {
                response = await axios.patch(
                    `http://localhost:5000/api/listing/${editingListing?._id}`,
                    createListingInputs
                );
            }

            navigate(`/active-listings/${response.data.listing._id}`);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErr(err.response?.data.message || "something went wrong.");
            } else {
                setErr("An unknown error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center md:pt-12 md:my-0 my-20 mx-2">
            <form
                onSubmit={handleCreateListing}
                className="w-[45rem] bg-gray-50 px-3 md:px-5 py-10 md:p-5 rounded-md shadow-md flex flex-col gap-4"
            >
                {err && <InputError err={err} />}

                <Input
                    type="text"
                    className="w-full bg-gray-200 h-[3rem] rounded-md px-5 outline-1"
                    placeholder="Title"
                    name="title"
                    value={createListingInputs.title}
                    onChange={(e) => handleInputsChange(e, "title")}
                />

                <Input
                    type="text"
                    className="w-full bg-gray-200 h-[3rem] rounded-md px-5 outline-1"
                    placeholder="Image"
                    name="image_url"
                    value={createListingInputs.image_url}
                    onChange={(e) => handleInputsChange(e, "image_url")}
                />

                <TextArea
                    className="w-full bg-gray-200 h-[14rem] py-2 resize-none text-start rounded-md px-5 outline-1"
                    placeholder="Description"
                    name="description"
                    value={createListingInputs.description}
                    onChange={(e) => handleInputsChange(e, "description")}
                >
                    {createListingInputs.description}
                </TextArea>

                <div className="flex gap-3">
                    <Input
                        type="number"
                        className="w-full bg-gray-200 h-[3rem] rounded-md px-5 outline-1 "
                        placeholder="Price"
                        name="price"
                        value={createListingInputs.price}
                        readOnly={isEditing}
                        onChange={(e) => handleInputsChange(e, "price")}
                    />
                    <Select
                        name="category"
                        id="category"
                        options={options}
                        onChange={(e) => handleInputsChange(e, "category")}
                        className="bg-gray-200 px-5 w-full rounded-md mx-2"
                        value={createListingInputs.category}
                    ></Select>
                </div>

                {!isEditing && (
                    <Button
                        type="submit"
                        label={isLoading ? "Submitting" : "Create"}
                        className="bg-neutral-700 h-[3rem] text-white rounded-md"
                    />
                )}

                {isEditing && (
                    <div className="w-full flex gap-4 flex-col md:flex-row">
                        <Button
                            type="submit"
                            label={isLoading ? "Editing" : "Edit"}
                            className="bg-neutral-700 h-[3rem] w-full text-white rounded-md"
                        />
                        <Button
                            type="button"
                            label="Cancel"
                            onClick={() =>
                                navigate(
                                    `/active-listings/${editingListing?._id}`
                                )
                            }
                            className="bg-red-500 h-[3rem] w-full text-white rounded-md"
                        />
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateListingPage;
