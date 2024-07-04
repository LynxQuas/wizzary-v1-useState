import { FormEvent, useReducer } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import TextArea from "../components/ui/TextArea";
import { InputChangeEvent, Listing } from "../types";
import InputError from "../components/ui/InputError";
import { useNavigate } from "react-router-dom";
import { listingInputReducer } from "../components/reducers/listingInputReducer";
import { listing_category } from "../constants";
import { useListing } from "../context/ListingContext";
import { listingInputInitialState } from "../components/reducers/listingInputReducer";

export interface CreateListingProps {
    isEditing: boolean;
    editingListing?: Listing | null;
}

const CreateListingPage = ({
    isEditing,
    editingListing,
}: CreateListingProps) => {
    const navigate = useNavigate();
    const { state: listing, createListing, editListing } = useListing();

    const [state, dispatch] = useReducer(listingInputReducer, {
        ...listingInputInitialState,
        ...editingListing,
    });

    const handleInputsChange = (e: InputChangeEvent) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FIELD", fieldName: name, payload: value });
    };

    const handleCreateListing = async (e: FormEvent) => {
        e.preventDefault();
        console.log(state);
        if (isEditing && editingListing?._id) {
            const id = editingListing._id;
            editListing(id, state);
        } else {
            createListing(state);
        }
    };

    return (
        <div className="flex justify-center items-center md:pt-12 md:my-0 my-20 mx-2">
            <form
                onSubmit={handleCreateListing}
                className="w-[45rem] bg-gray-50 px-3 md:px-5 py-10 md:p-5 rounded-md shadow-md flex flex-col gap-4"
            >
                {listing.error && <InputError err={listing.error} />}

                <Input
                    type="text"
                    className="w-full bg-gray-200 h-[3rem] rounded-md px-5 outline-1"
                    placeholder="Title"
                    name="title"
                    value={state.title}
                    onChange={handleInputsChange}
                />

                <Input
                    type="text"
                    className="w-full bg-gray-200 h-[3rem] rounded-md px-5 outline-1"
                    placeholder="Image"
                    name="image_url"
                    value={state.image_url}
                    onChange={handleInputsChange}
                />

                <TextArea
                    className="w-full bg-gray-200 h-[14rem] py-2 resize-none text-start rounded-md px-5 outline-1"
                    placeholder="Description"
                    name="description"
                    value={state.description}
                    onChange={handleInputsChange}
                >
                    {state.description}
                </TextArea>

                <div className="flex gap-3">
                    <Input
                        type="number"
                        className="w-full bg-gray-200 h-[3rem] rounded-md px-5 outline-1 "
                        placeholder="Price"
                        name="price"
                        value={state.price}
                        readOnly={isEditing}
                        onChange={handleInputsChange}
                    />
                    <Select
                        name="category"
                        id="category"
                        options={listing_category}
                        onChange={handleInputsChange}
                        className="bg-gray-200 px-5 w-full rounded-md mx-2"
                        value={state.category}
                    ></Select>
                </div>

                {!isEditing && (
                    <Button
                        type="submit"
                        label={listing.isLoading ? "Submitting" : "Create"}
                        className="bg-neutral-700 h-[3rem] text-white rounded-md"
                    />
                )}

                {isEditing && (
                    <div className="w-full flex gap-4 flex-col md:flex-row">
                        <Button
                            type="submit"
                            label={listing.isLoading ? "Editing" : "Edit"}
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
