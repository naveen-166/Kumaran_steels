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
      <a
        onClick={handleOpen}

      >
        <img
          className="size-7 hover:shadow-black hover:shadow-2xl"
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
        className="max-w-xl rounded-lg shadow-lg bg-white bg-opacity-85"
      >
        <DialogHeader className="text-xl font-semibold text-gray-800"><BiLocationPlus/> Address</DialogHeader>
        <DialogBody className="text-gray-700 space-y-2">
          <p className="text">
            <strong>322/13, KanjiKovil Road, Near Bypass,<br /> Perundurai, Erode-Dt</strong>
            Pincode: 638 052
          </p>
          <p className="text-lg font-semibold">Contact Numbers:</p>
          <ul className=" pl-5">
            <li>9843511222</li>
            <li>7010748292</li>
          </ul>

          <div className="mt-6">
            <p className="font-semibold text-lg">Location on Google Maps:</p>
            <div className="mt-2">
              <iframe
                title="Location Map"
                className="w-full h-60 rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d467.26767579339736!2d77.58537279567895!3d11.289665558678445!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96d15e9992bf3%3A0x3e77903f6cf827d!2sKumaran%20Weaving%20Park!5e1!3m2!1sen!2sus!4v1739684525735!5m2!1sen!2sus"
                allowFullScreen
              />
            </div>
          </div>
          
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 text-sm text-gray-600 hover:bg-gray-200"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
