// import { ChangeEvent, FormEvent, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Input from "../components/ui/Input";
// import PasswordInput from "../components/ui/PasswordInput";
// import Button from "../components/ui/Button";
// import InputError from "../components/ui/InputError";
// import { AppDispatch, RootState } from "../redux/store";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../redux/userSlice";
// import { LoginInput } from "../types";

// const LoginPage = () => {
//     const [userInput, setUserInput] = useState<LoginInput>({
//         email: "",
//         password: "",
//     });

//     const { err, isLoading, token, user } = useSelector(
//         (state: RootState) => state.user
//     );
//     const dispatch: AppDispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleInputChange = (
//         e: ChangeEvent<HTMLInputElement>,
//         name: string
//     ) => {
//         setUserInput((prev) => ({ ...prev, [name]: e.target.value }));
//     };

//     const handleLogin = async (e: FormEvent) => {
//         e.preventDefault();

//         try {
//             const res = await dispatch(loginUser(userInput)).unwrap();

//             if (!res.error) {
//                 navigate("/active-listings");
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     console.log(token, user);

//     return (
//         <form
//             method="POST"
//             onSubmit={handleLogin}
//             className="md:w-[30rem] bg-white shadow-md rounded-lg w-full md:p-10 py-10 px-4 flex flex-col gap-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
//         >
//             <h1 className="text-center text-3xl font-bold">Login</h1>

//             {err && <InputError err={err} />}

//             <Input
//                 type="email"
//                 value={userInput.email}
//                 className="w-full h-[3rem] px-2 bg-gray-200 border-black  border"
//                 placeholder="email"
//                 name="email"
//                 onChange={(e) => handleInputChange(e, "email")}
//             />
//             <PasswordInput
//                 name="password"
//                 value={userInput.password}
//                 placeholder="Password"
//                 onChange={(e) => handleInputChange(e, "password")}
//             />
//             <Button
//                 label={isLoading ? "Logging In..." : "Login"}
//                 type="submit"
//                 disabled={isLoading}
//                 className="bg-neutral-700 text-white py-3 disabled:cursor-not-allowed"
//             />
//             <p>
//                 Don't have an account?{" "}
//                 <Link className="text-blue-400" to="/register">
//                     Register
//                 </Link>
//             </p>
//         </form>
//     );
// };

// export default LoginPage;
