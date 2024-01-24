import { Tag } from "antd";
import React from "react";

const DocConsult = () => {
  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Tele Id</th>
              <th>Patient Name</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>
                <Tag color={"green"}>Red</Tag>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DocConsult;
