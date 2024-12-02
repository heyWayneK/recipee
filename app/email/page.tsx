"use client";
import Button from "@/components/Button";

function page() {
  return (
    <div className=" flex place-items-center justify-center h-dvh bg-lime-500">
      <div className=" bg-red-600 p-5">
        <Button text="click to send email" onClick={() => {}}></Button>
      </div>
    </div>
    // <div className="relative h-screen bg-lime-500 align-middle">
    //   <div className=" absolute inset-0 m-auto w-fit h-fit bg-red-600 p-5">
    //     <Button text="click to send email" onClick={() => {}}></Button>
    //   </div>
    // </div>
  );
}

export default page;
