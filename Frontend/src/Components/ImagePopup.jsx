import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

const ImagePopup = ({ open, onClose, images }) => {
  return (
    <Dialog open={open} handler={onClose} className="max-w-4xl rounded-xl shadow-lg">
      <DialogHeader className="text-center font-bold text-lg">Gallery</DialogHeader>
      <DialogBody className="p-4 grid grid-cols-3 gap-4">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`img-${index}`} className="w-full h-auto rounded-lg shadow-md" />
        ))}
      </DialogBody>
      <DialogFooter className="text-center">
        <Button variant="text" color="gray" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ImagePopup;
