import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string() .min(1, "Last name is required"),
  username: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-zA-Z]/, "Password must contain at least one alphabetic character")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character"),
  
});

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),  
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', data);
      toast.success('Signup successful! Redirecting to dashboard...'); // Success message
      localStorage.setItem("token",response.data.token);
      navigate('/dashboard'); 
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message); // Error message from backend
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };


  return (
    <div className='w-1/4 h-screen mx-auto rounded-md bg-gradient-to-r from-cyan-500 via-indigo-500 via-emerald-600 to-lime-500 p-1'>
    <div className='flex-col justify-center h-full w-full bg-white p-10'>
      <div className='flex justify-center text-sky-600 font-bold text-2xl pb-2'>Sign Up</div>
      <div className='text-center text-neutral-500 px-15'>Enter your information to create an account</div>
    <div className='pt-5'>
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className='mb-2'>
        <label className='text-sky-600'>First Name</label>
        <div className='mt-2'>
        <input className='w-full focus:outline-none' placeholder="Ratan" {...register("firstName")} />
        {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
        </div>
      </div>

      <div className='mb-2'>
        <label className='text-sky-600'>Last Name</label>
        <div className='mt-2'>
        <input className='w-full focus:outline-none' placeholder="Tata" {...register("lastName")} />
        {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
        </div>
      </div>

      <div className='mb-2'>
        <label className='text-sky-600'>Username</label>
        <div className='mt-2'>
        <input className='w-full focus:outline-none' placeholder="ratan123@gmail.com" {...register("username")} />
        {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
        </div>
      </div>

      <div className='mb-2'>
        <label className='text-sky-600'>Password</label>
        <div className='mt-2'>
        <input className='w-full focus:outline-none' placeholder="Password" type="password" {...register("password")} />
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        </div>
      </div>
      <div className='text-center px-5 py-2 my-2 bg-sky-400 rounded-lg border-2 border-sky-400 hover:bg-white'>
      <button className='w-full' type="submit">Sign Up</button>
      </div>
    </form>
      <Link to="/signin" className="text-sky-600 hover:underline">
            Already have an account? Sign In
      </Link>
    </div>
    </div>  
    </div>
  );
};

export default SignupForm;
