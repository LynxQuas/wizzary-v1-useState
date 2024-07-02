import { FormEvent, useReducer, useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import TextArea from "../components/ui/TextArea";
import { ListingInput } from "../types";
import axios from "axios";
import InputError from "../components/ui/InputError";
import { useUser } from "../ctx/authContext";
import { redirect, useNavigate } from "react-router-dom";

const options = [
    { label: "Magic Wands", value: "magic-wands" },
    { label: "Portions", value: "portions" },
    { label: "Pets", value: "pets" },
    { label: "Brooms", value: "brooms" },
    { label: "Others", value: "others" },
];

const INITIAL_STATE = {
    title: "",
    image_url: "",
    price: "",
    description: "",
    category: "magic-wands",
};

const reducer = (state: ListingInput, action: any) => {
    switch (action.type) {
        case "create/title":
            return { ...state, title: action.payload };
        case "create/image_url":
            return { ...state, image_url: action.payload };
        case "create/price":
            return { ...state, price: action.payload };
        case "create/description":
            return { ...state, description: action.payload };
        case "create/category":
            return { ...state, category: action.payload };
    }
    return state;
};

const CreateListingPage = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user, token } = useUser();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErr("");
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/listing",
                { ...state, creator: user._id },
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Barer ${token}`,
                    },
                }
            );

            navigate(`/active-listings/${data.listing._id}`);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data);
                setErr(err.response?.data.message || "something went wrong.");
            } else {
                setErr("An unknow error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center md:pt-12 md:my-0 my-20 mx-2">
            <form
                onSubmit={handleSubmit}
                className="w-[45rem] bg-gray-50 px-3 md:px-5 py-10 md:p-5 rounded-md shadow-md flex flex-col gap-4"
            >
                {err && <InputError err={err} />}

                <Input
                    type="text"
                    className="w-full bg-gray-200 h-[3rem] rounded-md px-5 outline-1"
                    placeholder="Title"
                    name="title"
                    value={state.title}
                    onChange={(e) =>
                        dispatch({
                            type: "create/title",
                            payload: e.target.value,
                        })
                    }
                />

                <Input
                    type="text"
                    className="w-full bg-gray-200 h-[3rem] rounded-md px-5 outline-1"
                    placeholder="Image"
                    name="image_url"
                    value={state.image_url}
                    onChange={(e) =>
                        dispatch({
                            type: "create/image_url",
                            payload: e.target.value,
                        })
                    }
                />

                <TextArea
                    className="w-full bg-gray-200 h-[14rem] py-2 resize-none text-start rounded-md px-5 outline-1"
                    placeholder="Description"
                    name="description"
                    value={state.description}
                    onChange={(e) =>
                        dispatch({
                            type: "create/description",
                            payload: e.target.value,
                        })
                    }
                />

                <div className="flex gap-3">
                    <Input
                        type="number"
                        className="w-full bg-gray-200 h-[3rem] rounded-md px-5 outline-1 "
                        placeholder="Price"
                        name="price"
                        value={state.price}
                        onChange={(e) =>
                            dispatch({
                                type: "create/price",
                                payload: e.target.value,
                            })
                        }
                    />
                    <Select
                        name="category"
                        id="category"
                        options={options}
                        onChange={(e) =>
                            dispatch({
                                type: "create/category",
                                payload: e.target.value,
                            })
                        }
                        className="bg-gray-200 px-5 w-full rounded-md mx-2"
                        value={state.category}
                    ></Select>
                </div>

                <Button
                    type="submit"
                    label={loading ? "Submitting" : "Create"}
                    className="bg-neutral-700 h-[3rem] text-white rounded-md"
                />
            </form>
        </div>
    );
};

export default CreateListingPage;
