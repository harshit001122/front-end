import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerSchema } from "../../validations";
import { register } from "../../redux/slices/registerSlice.js";
import Cookies from "js-cookie";

const inputElement = [
  {
    name: "name",
    placeHolder: "Name",
    type: "text",
  },
  {
    name: "phone",
    placeHolder: "Phone Number",
    type: "text",
  },
  {
    name: "email",
    placeHolder: "Email",
    type: "email",
  },
  {
    name: "password",
    placeHolder: "Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    placeHolder: "Confirm Password",
    type: "password",
  },
];

const Register = () => {
  const dispatch = useDispatch();
  const registerData = useSelector((state) => state.register);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        const payload = {
          username: values.name,
          mobile: values.phone,
          email: values.email,
          password: values.password,
          isAdmin: true,
        };
        try {
          const res = await dispatch(register(payload));
          if (res.payload.success === true) {
            Cookies.set('token', res.payload.token);
            toast.success(res.payload.message);
          } else {
            toast.error(res.payload.message);
          }
        } catch (error) {
          console.log(error);
        }
      },
    });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {inputElement.map((input, i) => (
            <div key={i} className="mb-4">
              <label htmlFor={input.name} className="block text-sm font-medium text-gray-700">
                {input.placeHolder}
              </label>
              <input
                type={input.type}
                name={input.name}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder={input.placeHolder}
                value={values[input.name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors[input.name] && touched[input.name] && (
                <p className="mt-2 text-sm text-red-600">{errors[input.name]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {registerData.status === "loading" ? (
              <div className="flex justify-center items-center">
                <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-white"></div>
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
