/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fireDB,auth } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
    
    const context=useContext(myContext);
    const {loading,setLoading}=context;

    const navigate=useNavigate();

    const [userLogin,setUserLogin]=useState({
        email:"",
        password:""
    })

    //userLoginFunction
    const userLoginFunction= async()=>{
        if(userLogin.email==="" || userLogin.password==="")
        {
            toast.error("All fields are Mandatory");
        }

        setLoading(true);
        try{
            const users = await signInWithEmailAndPassword(auth,userLogin.email,userLogin.password);

            try{
                const q= query(collection(fireDB,"user"),where('uid','==',users?.user?.uid)
            );
            const data=onSnapshot(q,(QuerySnapshot)=>{
                let user;
                QuerySnapshot.forEach((doc)=>user=doc.data());
                localStorage.setItem("users",JSON.stringify(user))
                setUserLogin({
                    email:"",
                    password:""
                })
                toast.success("Login Successful");
                setLoading(false);
                if(user.role==="user"){
                    navigate('/user-dashboard');
                }else{
                    navigate('/admin-dashboard');
                }
            });
            return ()=>data;
            }catch(err){
                console.log(err);
                setLoading(false);
            }

        }catch(err){
            console.log(err);
            setLoading(false);
            toast.error(err.message);

        }
    }

    return (
        <Layout>
            
            <div className='flex justify-center items-center h-screen'>
            {/* Login Form  */}
            {loading && <Loader/>}
            <div className="login_Form bg-black px-1 lg:px-8 py-6 border border-gray-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-white '>
                        Login
                    </h2>
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userLogin.email}
                        onChange={(e)=>
                        {
                            setUserLogin({
                                ...userLogin,
                                email:e.target.value
                            })
                        }
                        }
                        className='bg-gray-600 border border-red-600 px-2 py-2 w-96 rounded-md outline-none placeholder-white text-white'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userLogin.password}
                        onChange={(e)=>
                        {
                            setUserLogin({
                                ...userLogin,
                                password:e.target.value
                            })
                        }
                        }
                        className='bg-gray-600 border border-red-600 px-2 py-2 w-96 rounded-md outline-none placeholder-white text-white '/>
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                    
                        type='button'
                        onClick={userLoginFunction}
                        className='bg-red-500 hover:bg-green-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-white'>Don't Have an account <Link className=' text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
        </Layout>
        
    );
}

export default Login;