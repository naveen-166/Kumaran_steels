import { Button } from "@material-tailwind/react";
import AddressPop from "./AddressPop";

export default function NavBar() {
  return (
    <nav className=" relative bg-red-50 shadow-md rounded-md  lg:py-3">
      <div className="container flex flex-wrap items-center mx-auto text-slate-800">
        {/* Left Side: Company Logo */}
        <a href="#" className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold">
          Sri Kumaran Steel
        </a>

        {/* Centered Navigation Links */}
        <div className="flex flex-grow justify-center">
          <ul className="flex gap-6">
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className=" size-6" viewBox="0 0 48 48">
<path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z"></path>
</svg>
              <a href="#" className="flex items-center">Home</a>
            </li>
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6 text-slate-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
              </svg>
              <a href="#" className="flex items-center">Products</a>
            </li>
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
            <img className="size-6 " src="https://img.icons8.com/pastel-glyph/64/information--v1.png" alt="information--v1"/>
              <a href="#" className="flex items-center">About Us</a>
            </li>
            <li className="flex items-center p- text-sm gap-x-2 text-slate-600">
            <img className="size-6" src="https://img.icons8.com/ios/50/add-contact-to-company.png" alt="add-contact-to-company"/>
              <a href="#" className="flex items-center">Contact Us</a>
            </li>

          </ul>
        </div>

        {/* Call Button */}
        <div className="ml-auto flex space-x-4 ">
          <Button variant="gradient" color="green" className="px-6 py-3 text-white hover:bg-blue-600"
          href="tel:+919159800">
            Call Now
          </Button>
          <span className=" mr-3 mt-1">
          <AddressPop/>
          </span>
        </div>
      </div>
    </nav>
  );
}
