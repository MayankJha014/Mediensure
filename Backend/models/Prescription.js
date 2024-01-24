const mongoose = require("mongoose");

const PrescriptionModel = mongoose.Schema({
  consultation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consult",
  },
  description: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now()
}
,
  medicines: [
    {
      medName: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      timing: {
        type: String,
        required: true,
        enum: ["Before", "After"],
      },
    },
  ],
});

const Prescription = mongoose.model("Prescription", PrescriptionModel);
module.exports = Prescription;
