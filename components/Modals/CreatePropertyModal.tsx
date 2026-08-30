"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { useCreatePropertyModalStore } from "@/store/useCreatePropertyModalStore";
import Button from "../ui/Button";
import { propertyTypes } from "@/constants/PropertyTypes";
import PropertyTypeCard from "../Properties/PropertyTypeCard";
import Input from "../ui/Input";
import Counter from "../Properties/Counter";
import ImageUpload from "../Properties/ImageUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  DETAILS: 2,
  FEATURES: 3,
  IMAGE: 4,
  PRICING: 5,
};

const CreatePropertyModal = () => {
  const [step, setStep] = useState(STEPS.TYPE);
  const { isOpen, close } = useCreatePropertyModalStore();
  const router = useRouter();

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:
        return "Select property type";
      case STEPS.LOCATION:
        return "Where is the property located?";
      case STEPS.DETAILS:
        return "Share some basics about your place";
      case STEPS.FEATURES:
        return "Property description";
      case STEPS.IMAGE:
        return "Upload property image";
      case STEPS.PRICING:
        return "Set Property price";
      default:
        return "";
    }
  };
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [parkingSpaces, setParkingSpaces] = useState(0);
  const [area, setArea] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<null | File>(null);
  const [preview, setPreview] = useState<null | string>(null);
  const [listingType, setListingType] = useState<"rent" | "sale">("sale");
  const [price, setPrice] = useState("");

  const handleImageChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleClose = () => {
    setStep(STEPS.TYPE);
    setPropertyType("");
    setLocation("");
    setAddress("");
    setBedrooms(1);
    setBathrooms(1);
    setParkingSpaces(0);
    setArea("");
    setTitle("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setPrice("");
    close();
  };

  const createListing = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("location", location);
      formData.append("address", address);
      formData.append("area", area);
      formData.append("propertyType", propertyType);
      formData.append("listingType", listingType);
      formData.append("bedrooms", String(bedrooms));
      formData.append("bathrooms", String(bathrooms));
      formData.append("parkingSpaces", String(parkingSpaces));

      if (image) {
        formData.append("image", image);
      }

      await axios.post("/api/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Property created successfully");
      router.replace("/properties");
      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || "Something went wrong");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={handleClose} isOpen={isOpen} title="Create a new listing">
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span>Step {step + 1} of 6</span>
        <span className="font-medium text-gray-700">{stepTitle()}</span>
      </div>

      <div className="min-h-55 rounded-xl text-gray-400 p-6 border border-dashed border-gray-300">
        {step === STEPS.TYPE && (
          <div className="grid grid-cols-2 gap-4 w-full max-h-[50vh] overflow-y-scroll no-scrollbar">
            {propertyTypes.map((item) => (
              <PropertyTypeCard
                label={item.label}
                icon={item.icon}
                selected={propertyType === item.slug}
                onClick={() => setPropertyType(item.slug)}
                key={item.slug}
              />
            ))}
          </div>
        )}

        {step === STEPS.LOCATION && (
          <div className="space-y-6 w-full">
            <Input
              name="location"
              label="Location"
              value={location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
            />
            <Input
              name="address"
              label="Address"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
            />
          </div>
        )}

        {step === STEPS.DETAILS && (
          <div className="space-y-4">
            <Counter
              title="Bedrooms"
              subTitle="How many bedrooms"
              value={bedrooms}
              onChange={setBedrooms}
            />
            <Counter
              title="Bathrooms"
              subTitle="How many bathrooms"
              value={bathrooms}
              onChange={setBathrooms}
            />
            <Counter
              title="Parking spaces"
              subTitle="How many parking spaces"
              value={parkingSpaces}
              onChange={setParkingSpaces}
            />

            <Input
              name="area"
              label="Property Area (sqft)"
              type="number"
              value={area}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArea(e.target.value)
              }
            />
          </div>
        )}

        {step === STEPS.FEATURES && (
          <div className="space-y-6">
            <Input
              name="title"
              label="Property Title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <Input
              as="textarea"
              name="description"
              label="Property Description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>
        )}

        {step === STEPS.IMAGE && (
          <ImageUpload preview={preview} onChange={handleImageChange} />
        )}

        {step === STEPS.PRICING && (
          <div className="space-y-6">
            <select
              value={listingType}
              onChange={(e) =>
                setListingType(e.target.value as "sale" | "rent")
              }
              className="h-13 w-full rounded-2xl border border-black/10 px-4"
            >
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>

            <Input
              name="price"
              label={listingType === "sale" ? "Sale Price" : "Monthly Rent"}
              type="number"
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value)
              }
            />
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        {step > STEPS.TYPE && (
          <Button
            variant="outline"
            fullWidth
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </Button>
        )}
        <Button
          fullWidth
          onClick={() =>
            step < STEPS.PRICING ? setStep((prev) => prev + 1) : createListing()
          }
          loading={loading}
        >
          {step === STEPS.PRICING ? "Create listing" : "Next"}
        </Button>
      </div>
    </Modal>
  );
};

export default CreatePropertyModal;
