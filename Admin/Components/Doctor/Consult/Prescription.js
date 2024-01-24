import { submitPrescription } from "@/store/Action/Authentication";
import { DeleteFilled } from "@ant-design/icons";
import { AddTwoTone } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
const Prescription = ({consult,setconsult}) => {
    const [medicineList, setMedicineList] = useState([
        {
          medName: "",
          dosage: "",
          duration: "",
          quantity: "",
          timing: "",
        },
      ]);
      
  const handleAddFields = () => {
    setMedicineList([
      ...medicineList,
      {
        medName: "",
        dosage: "",
        duration: "",
        quantity: "",
        timing: "",
      },
    ]);
  };
  const handleChangeInput = (id, event) => {
    const newMedicineList = medicineList.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setMedicineList(newMedicineList);
  };
  const handleRemoveFields = (id) => {
    const values = [...medicineList];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setMedicineList(values);
  };
  const dispatch = useDispatch()
  const prescriptionSubmit = (e) => {
    e.preventDefault();
  console.log(medicineList,e.target.description.value,1235);
    console.log("Form Prescription  submitted");
const info = {
    medicines:medicineList,
    description:e.target.description.value
}
dispatch(submitPrescription(consult,info))
    // if(error){
    //   alert.error(error);
    // }
  };
  

  return (
    <>
      <div className="p-4  rounded-3xl w-fit bg-slate-100 flex flex-col gap-4 min-h-fit">
      <i className="ri-arrow-left-line text-3xl cursor-pointer" onClick={()=>setconsult("")}></i>
        <div>
          <form onSubmit={prescriptionSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
            </div>
            <div class="mb-6">
              <label
                for="chief-history"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Procedure Conducted :
              </label>

              <textarea
                id="chief-history"
                rows="3"
                name="description"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Write about your Complaint history here..."
              ></textarea>
            </div>
            {/* <div className="grid gap-3 md:grid-cols-5"> */}
            {medicineList.map((inputField) => (
                      // <div key={inputField.id}>
                      <div
                        className="grid gap-3 md:grid-cols-5"
                        key={inputField.id}
                      >
                        <div>
                          <label
                            for="med"
                            class="block mb-2 text-sm font-medium text-gray-900 w-fit"
                          >
                            Medicine Name :
                          </label>
                          <input
                            type="text"
                            id="med"
                            name="medName"
                            value={inputField.medName}
                            onChange={(event) =>
                              handleChangeInput(inputField.id, event)
                            }
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                            placeholder="Paracitamol"
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="dosage"
                            class="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Dosage :
                          </label>
                          <input
                            type="text"
                            id="dosage"
                            name="dosage"
                            value={inputField.dosage}
                            onChange={(event) =>
                              handleChangeInput(inputField.id, event)
                            }
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                            placeholder="1 Morning, 1 Night"
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="duration"
                            class="block mb-2 text-sm font-medium overflow-clip text-gray-900"
                          >
                            Duration (in Days):
                          </label>
                          <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={inputField.duration}
                            onChange={(event) =>
                              handleChangeInput(inputField.id, event)
                            }
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-1/2"
                            placeholder="18"
                            required
                          />
                        </div>
                        <div className="">
                          <label
                            for="quantity"
                            class="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Quantity :
                          </label>
                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={inputField.quantity}
                            onChange={(event) =>
                              handleChangeInput(inputField.id, event)
                            }
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                            placeholder="30"
                            required
                          />
                        </div>
                        <div className="flex w-full">
                          <div class="flex items-center justify-evenly">
                            <input
                              id="inline-radio"
                              // type="radio"
                              type="checkbox"
                              name="timing"
                              value="Before"
                              onChange={(event) =>
                                handleChangeInput(inputField.id, event)
                              }
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            />
                            <label
                              for="inline-radio"
                              class="ml-2 text-sm font-medium text-gray-900"
                            >
                              Before Food{" "}
                            </label>
                          </div>
                          <div class="flex items-center ">
                            <input
                              id="inline-2-radio"
                              // type="radio"
                              type="checkbox"
                              name="timing"
                              value="After"
                              onChange={(event) =>
                                handleChangeInput(inputField.id, event)
                              }
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            />
                            <label
                              for="inline-2-radio"
                              className="ml-2 text-sm font-medium text-gray-900"
                            >
                              After Food{" "}
                            </label>
                            <DeleteFilled
                              onClick={handleRemoveFields}
                              className="w-10"
                            />
                            <AddTwoTone
                              onClick={handleAddFields}
                              className="w-10"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
            {/* </div> */}
            <button
              type="submit"
              class="text-white my-4 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-red-300 font-medium rounded-lg text-lg font-roboto px-5 py-2 text-center mr-2 mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Prescription;
