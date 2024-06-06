import mongoose from 'mongoose';
//since it creates a separate side we are having this outside
const menuItemsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: {type:Number, required: true}
}
)

const restaurantSchema = new mongoose.Schema({
  //creating a reference to user document
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: [{ type: String, required: true }], //array of strings
  menuItems: [menuItemsSchema],
  imageUrl: { type: String, required: true }, //get back from cloudniry
  lastUpdated: {type:Date, required: true}
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
