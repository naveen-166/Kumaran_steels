import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { BiLocationPlus } from "react-icons/bi";

export default function AddressPop() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <a onClick={handleOpen}>
        <img
          className="size-7 hover:shadow-black hover:shadow-2xl cursor-pointer" // Added cursor-pointer
          src="https://img.icons8.com/ios/50/marker--v1.png"
          alt="marker icon"
        />
      </a>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="max-w-xl rounded-2xl shadow-2xl bg-white" // Improved styling
      >
        <DialogHeader className="flex items-center space-x-2 p-4 border-b border-gray-200">
          <BiLocationPlus className="text-2xl text-blue-600" />
          <span className="text-xl font-semibold text-gray-800">Address</span>
        </DialogHeader>
        <DialogBody className="p-6 space-y-4">
          <div className="space-y-2">
            <p className="font-semibold text-lg text-gray-800">Our Address:</p>
            <p className="text-gray-700">
              <strong>322/13, KanjiKovil Road, Near Bypass, Perundurai, Erode-Dt</strong>
              <br />
              Pincode: 638 052
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-lg text-gray-800">Contact Numbers:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>9843511222</li>
              <li>7010748292</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-lg text-gray-800">Location on Google Maps:</p>
            <div className="mt-2">
              <iframe
                title="Location Map"
                className="w-full h-60 rounded-xl shadow-md" // Improved styling
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d467.26767579339736!2d77.58537279567895!3d11.289665558678445!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96d15e9992bf3%3A0x3e77903f6cf827d!2sKumaran%20Weaving%20Park!5e1!3m2!1sen!2sus!4v1739684525735!5m2!1sen!2sus"
                allowFullScreen
              />
            </div>
          </div>
        </DialogBody>

        <DialogFooter className="p-4 border-t border-gray-200">
          <Button
            variant="text"
            color="gray"
            onClick={handleOpen}
            className="text-sm text-gray-600 hover:bg-gray-100" // Improved styling
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}