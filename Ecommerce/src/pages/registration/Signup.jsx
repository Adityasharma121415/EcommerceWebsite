/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

const Signup = () => {

        const context=useContext(myContext);
        const {loading,setLoading}=context;

        const navigate=useNavigate();

        const [userSignup,setUserSignup] =useState({
            name:"",
            email:"",
            password:"",
            role:"user"
           
        });

        // user sign up function

        const userSignupFunction= async () => {
            if(userSignup.name==="" || userSignup.email==="" || userSignup.password==="" )
            {
                return toast.error("All fields are Mandatory");
            }

            setLoading(true);

            try{
                const users=await createUserWithEmailAndPassword(auth,userSignup.email,userSignup.password);

                const user={
                    name:userSignup.name,
                    email:users.user.email,
                    uid:users.user.uid,
                    role:userSignup.role,
                    time:Timestamp.now(),
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    )
                }

                const userReference=collection(fireDB,"user");
                addDoc(userReference,user);

                setUserSignup({
                    name:"",
                    email:"",
                    password:"",
                })

                toast.success("Sign Up Successful");

                setLoading(false);

                navigate('/login');

            }catch(err){
                console.log(err);
                setLoading(false);
                toast.error(err.message);

            }

        }




    return (
        <Layout>
            <div className='flex justify-center items-center h-screen'>

            {loading && <Loader/>}

            {/* Login Form  */}
            <div className="login_Form bg-black px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-white '>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e)=>{
                            setUserSignup({
                                ...userSignup,
                                name: e.target.value,
                            })

                        }}
                        className='bg-gray-600 border border-red-600 px-2 py-2 w-96 rounded-md outline-none placeholder-white text-white'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e)=>{
                            setUserSignup({
                                ...userSignup,
                                email: e.target.value,
                            })

                        }}
                        className='bg-gray-600 border border-red-600 px-2 py-2 w-96 rounded-md outline-none placeholder-white text-white'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userSignup.password}
                        onChange={(e)=>{
                            setUserSignup({
                                ...userSignup,
                                password: e.target.value,
                            })

                        }}
                        className='bg-gray-600 border border-red-600 px-2 py-2 w-96 rounded-md outline-none placeholder-white text-white'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        onClick={userSignupFunction}
                        type='button'
                        className='bg-red-500 hover:bg-green-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-pink-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
        </Layout>
        
    );
}

export default Signup;