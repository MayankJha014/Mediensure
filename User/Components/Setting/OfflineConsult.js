import { Tag } from "antd";
import Link from "next/link";
import React from "react";

const OfflineConsult = ({ data }) => {
  return (
    <div className="w-full p-10">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                TeLe Id
              </th>
              <th scope="col" class="px-6 py-3">
                Doctor Name
              </th>
              <th scope="col" class="px-6 py-3">
                Consultation Fess
              </th>
              <th scope="col" class="px-6 py-3">
                Prescription
              </th>
              <th scope="col" class="px-6 py-3">
                Video Call
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((dets, index) => (
              <tr class="bg-white border-b " key={index}>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium whitespace-nowraptext-white"
                >
                  {dets?.tele}
                </th>
                <td class="px-6 py-4">{dets?.doctor?.firstname} {dets?.doctor?.lastname}</td>
                <td class="px-6 py-4">{dets?.fees}</td>
                <td>
            {dets?.prescription ? (
                    <Link href={`/mediensure/prescription/${dets?.prescription?._id}`}>
                          <Tag
                      color={"green"}
                      style={{ display: "flex", width: "fit-content" }}
                      className="p-2 cursor-pointer hover:bg-green-200"
                    >
                      Prescription{" "}
                      <img
                        className="h-5 w-5 object-contain"
                        src="/prescriptionP.png"
                        alt=""
                      />
                    </Tag>
                    </Link>
              
                  ) : (
                    <Tag
                      // onClick={() => setId(dets?._id)}
                      color={"cyan"}
                      style={{ display: "flex", width: "fit-content" }}
                      className="p-2 cursor-pointer hover:bg-cyan-500 hover:text-white"
                    >
                      Not Submitted{" "}
                      <img
                        className="h-5 w-5 object-contain"
                        src="/prescriptionP.png"
                        alt=""
                      />
                    </Tag>
                  )}
            </td>
            <td>
              {
                dets?.doctorJoin === true ? 
                <Link href={`/meeting/${dets?.tele}`}> 
                <Tag
                  color={"gold"}
                  style={{ display: "flex", width: "fit-content" }}
                  className="p-2 cursor-pointer hover:bg-orange-200 gap-2 hover:text-black"
                  
                >
                  Video Call{" "}
                  <img
                    className="h-5 w-5 object-contain"
                    src="/video.png"
                    alt=""
                  />
                </Tag>
                </Link> :        
                  <Tag
                    color={"gold"}
                    style={{ display: "flex", width: "fit-content" }}
                    className="p-2 cursor-pointer bg-gray-200  hover:bg-gray-200 gap-2 hover:text-black"
                    
                  >
                    Video Call{" "}
                    <img
                      className="h-5 w-5 object-contain"
                      src="/video.png"
                      alt=""
                    />
                  </Tag>

              }
     
            </td>
                <td class="px-6 py-4">
                <Tag color={"green"}>
              {dets?.status.toUpperCase()}
            </Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfflineConsult;
