import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function CarouselC() {
  return (
    <div className="flex bg-gray-600 justify-center items-center space-x-6 pl-4 pr-4 overflow-x-hidden pt-10 pb-10 h-screen">      {/* Check the height  */}
      {/* First Card */}
      
      <Card
        shadow={true}
        floated={true}
        className="relative grid h-[20rem] hover:h-[25rem] w-full w-[50rem] hover:w-[70rem] items-end justify-center overflow-hidden text-center rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full w-full rounded-lg bg-[url('https://arsgroup.in/wp-content/uploads/2024/09/quality-tmt-bar-2.webp')] bg-cover bg-center hover:opacity-90 duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        </CardHeader>
        <CardBody className="relative py-14 px-8 md:px-12">
          <Typography
            variant="h2"
            color="white"
            className="mb-6 font-semibold text-xl md:text-4xl leading-tight"
          >
            High Quality Steel
          </Typography>
          <Typography
            color="white"
            className="text-sm md:text-base opacity-75"
          >
            Premium TMT Bars
          </Typography>
        </CardBody>
      </Card>

      {/* Second Card */}
      <Card
        shadow={true}
        className="relative grid h-[20rem] hover:h-[25rem] w-full w-[50rem] hover:w-[70rem] items-end justify-center overflow-hidden text-center rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full w-full rounded-lg bg-[url('https://www.fencingwiredealer.com/images/slider_img.jpg')] bg-cover bg-center hover:opacity-90 duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        </CardHeader>
        <CardBody className="relative py-14 px-8 md:px-12">
          <Typography
            variant="h2"
            color="white"
            className="mb-6 font-semibold text-xl md:text-4xl leading-tight"
          >
            Fencing Solutions
          </Typography>
          <Typography
            color="white"
            className="text-sm md:text-base opacity-75"
          >
            Durable fencing for every need
          </Typography>
        </CardBody>
      </Card>

      {/* Third Card */}
      <Card
        shadow={true}
        className="relative grid h-[20rem] hover:h-[25rem] w-full w-[50rem] hover:w-[70rem] items-end justify-center overflow-hidden text-center rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
      >
        <CardHeader
          floated={true}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full w-full rounded-lg bg-[url('https://th.bing.com/th/id/OIP.VQ2iwwYUsQ5DoVmn1x6csAHaFj?rs=1&pid=ImgDetMain')] bg-cover bg-center hover:opacity-90 duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        </CardHeader>
        <CardBody className="relative py-14 px-8 md:px-12">
          <Typography
            variant="h2"
            color="white"
            className="mb-6 font-semibold text-xl md:text-4xl leading-tight"
          >
            Innovative Design
          </Typography>
          <Typography
            color="white"
            className="text-sm md:text-base opacity-75"
          >
            For modern spaces
          </Typography>
        </CardBody>
      </Card>

      {/* Fourth Card */}
      <Card
        shadow={true}
        className="relative grid h-[20rem] hover:h-[25rem] w-full w-[50rem] hover:w-[70rem] items-end justify-center overflow-hidden text-center rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full w-full rounded-lg bg-[url('https://www.metalroofportstlucie.com/wp-content/uploads/2020/10/Commercial-Metal-Roofing-Port-St.-Lucie-Metal-Roofing-Company.jpg')] bg-cover bg-center hover:opacity-90 duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        </CardHeader>
        <CardBody className="relative py-14 px-8 md:px-12">
          <Typography
            variant="h2"
            color="white"
            className="mb-6 font-semibold text-xl md:text-4xl leading-tight"
          >
            Custom Solutions
          </Typography>
          <Typography
            color="white"
            className="text-sm md:text-base opacity-75"
          >
            Tailored designs
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}
