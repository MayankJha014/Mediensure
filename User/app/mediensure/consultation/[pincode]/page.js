"use client";
import { getNetwork } from "@/store/Action/auth";
import { useParams } from "next/navigation";
import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConsultationPin from "./ConsultationPin";
import Nav from "@/Components/Nav/Nav";

export async function getStaticProps(context) {
  return {
    props: { page }, // will be passed to the page component as props
  };
}

const page = () => {
  const { pincode } = useParams();
  const { network } = useSelector((state) => state.auth);
  const { imgLink } = useSelector((state) => state.others);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNetwork(pincode));
  }, []);
  console.log(network, 496);
  return (
    <div>
      <Nav />
      <ConsultationPin doctor={network} imgLink={imgLink} />
    </div>
  );
};

export default page;
