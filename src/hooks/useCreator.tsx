import { useEffect, useState } from "react";
import { User } from "../types";
import axios from "axios";

const useCreator = (userId: string | undefined) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        const getCreator = async () => {
            if (!userId) return;
            setIsLoading(true);
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/api/user/${userId}`
                );

                setUser(data.user);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setErr(
                        err.response?.data.message || "Something went wrong."
                    );
                } else {
                    setErr("Unknow error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        getCreator();
    }, [userId]);

    return { user, isLoading, err };
};

export default useCreator;
