// import { Link } from "react-router-dom";
// import InputError from "../components/ui/InputError";
// import Input from "../components/ui/Input";
// import PasswordInput from "../components/ui/PasswordInput";
// import Button from "../components/ui/Button";
// import useRegister from "../hooks/useRegister";

// // components

// const RegisterPage = () => {
//     const { registerInput, handleInputChange, handleRegister, err } =
//         useRegister();

//     console.log(err);

//     return (
//         <div className="md:w-[30rem] bg-white shadow-md rounded-lg w-full md:p-10 py-10 px-4 flex flex-col gap-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
//             <h1 className="text-center text-3xl font-bold">Register</h1>
//             {err && <InputError err={err} />}
//             <form onSubmit={handleRegister} className="flex flex-col gap-4">
//                 <Input
//                     type="text"
//                     className="w-full h-[3rem] px-2 bg-gray-200 border border-black"
//                     value={registerInput.name}
//                     placeholder="Name"
//                     name="name"
//                     onChange={(e) => handleInputChange(e, "name")}
//                 />

//                 <Input
//                     type="email"
//                     className="w-full h-[3rem] px-2 bg-gray-200 border border-black"
//                     value={registerInput.email}
//                     placeholder="Email"
//                     name="email"
//                     onChange={(e) => handleInputChange(e, "email")}
//                 />

//                 <PasswordInput
//                     value={registerInput.password}
//                     name="password"
//                     placeholder="Password"
//                     onChange={(e) => handleInputChange(e, "password")}
//                 />

//                 <PasswordInput
//                     value={registerInput.confirmPassword}
//                     name="confirmPassword"
//                     placeholder="Confirm Password"
//                     onChange={(e) => handleInputChange(e, "confirmPassword")}
//                 />

//                 <Button
//                     label="Register"
//                     className="bg-neutral-700 text-white py-3"
//                 />
//             </form>
//             <p>
//                 Already have an account?{" "}
//                 <Link className="text-blue-400" to="/login">
//                     Login
//                 </Link>
//             </p>
//         </div>
//     );
// };

// export default RegisterPage;
