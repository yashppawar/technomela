import mongoose, { Schema } from "mongoose";

const TestimonialSchema = new Schema({
  name: {type: String},
  description: {type: String},
});

const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

export default Testimonial;