import { ChangeEvent } from "react";

export interface User {
    id: string;
    listings: Listing[] | [];
    name: string;
    password: string;
    profile_image: string;
    watchlists: Listing[] | [];
}

export interface Listing {
    _id: string;
    title: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    comments: [];
    status: boolean;
    creator: string;
    createdAt: string;
}

export interface ListingInput {
    title: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
}

export interface Listings {
    listings: Listing[];
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface Register {
    name: string;
    password: string;
    email: string;
    confirmPassword: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}

export interface LoginError {
    message: string;
}

export type InputChangeEvent = ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
