"use client";

import React, { useState } from "react";
import { Form, Input, Select, Label, Description, ListBox, Checkbox, CheckboxGroup, Button } from "@heroui/react";
import { Calendar, Person, Ticket } from "@gravity-ui/icons";
import { createTickets } from "@/lib/actions/tickets";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Bus, Train, Plane, Car } from "lucide-react";

export default function AddTicketForm() {
  const [loading, setLoading] = useState(false);
  const [perks, setPerks] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [transportType, setTransportType] = useState("");

  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const transportTypes = [
    { key: "bus", label: "Bus", desc: "Comfortable road trips" },
    { key: "train", label: "Train", desc: "Fast tracks, no traffic" },
    { key: "air", label: "Air", desc: "Fly high and save time" },
    { key: "launch", label: "Launch/Ship", desc: "Scenic river journey" },
  ];

  const uploadToImgbb = async (file) => {
    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_UPLOAD_API;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) return result.data.url;
      throw new Error("Imgbb upload failed");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to create a ticket.");
      return;
    }

    if (!transportType) {
      toast.error("Please select a transport type.");
      return;
    }
    
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const formValues = Object.fromEntries(formData);

      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadToImgbb(imageFile);
        if (!imageUrl) {
          setLoading(false);
          return;
        }
      }

      const ticketPayload = {
        title: formValues.title,
        fromLocation: formValues.fromLocation,
        toLocation: formValues.toLocation,
        transportType: transportType,
        price: parseFloat(formValues.price),
        quantity: parseInt(formValues.quantity),
        departureDateTime: formValues.departureDateTime,
        perks: perks,
        imageUrl: imageUrl,
        vendorName: user.name,  
        vendorEmail: user.email,
        status: "pending",
      };

      const res = await createTickets(ticketPayload);

      if (res) {
        toast.success("Ticket added successfully! Awaiting verification.");
        e.target.reset();
        setPerks([]);
        setImageFile(null);
        setTransportType("");
        
        router.push("/dashboard/vendor/tickets");
      } else {
        toast.error("Failed to save ticket to database.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred while saving the ticket.");
    } finally {
      setLoading(false);
    }
  };

  const availablePerks = ["AC", "WiFi", "Food", "TV", "Charging Port", "Breakfast"];

  if (isPending) {
    return <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 bg-white transition-colors duration-300">
      
      {/* Dynamic Animated Transport Center Core */}
      <div className="relative flex items-center justify-center w-20 h-20 mb-6">
        
        {/* Soft Outer Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-blue-50 animate-ping opacity-75" />
        
        {/* Main Spinning Border Tracker */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin" />
        
        {/* Core Shifting Icon Layout Wrapper */}
        <div className="relative z-10 flex items-center justify-center bg-white rounded-full p-3 shadow-sm border border-slate-100">
          <Bus className="w-6 h-6 text-blue-600 animate-pulse" strokeWidth={2.5} />
        </div>
      </div>

      {/* Text Context Indicators */}
      <div className="flex flex-col items-center space-y-2 text-center max-w-sm">
        <h3 className="text-sm font-bold tracking-wide text-slate-800">
          Form are loading...
        </h3>
        
        {/* Small Horizontal Vehicle Tracking Badges */}
        <div className="flex items-center space-x-3 text-slate-400 pt-1">
          <Car className="w-4 h-4" />
          <span className="text-xs">•</span>
          <Bus className="w-4 h-4 text-blue-500 font-bold" />
          <span className="text-xs">•</span>
          <Train className="w-4 h-4" />
          <span className="text-xs">•</span>
          <Plane className="w-4 h-4" />
        </div>
      </div>
    </div>;
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-[#f8fafc] border border-gray-100 rounded-xl shadow-sm">
      <div className="flex items-center justify-center gap-2 mb-6 text-blue-500">
        <Ticket className="w-6 h-6 transform rotate-45" />
        <h2 className="text-2xl font-bold tracking-wide">Add New Ticket</h2>
      </div>

      <Form validationBehavior="native" onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Ticket Title */}
        <Input
          required
          name="title"
          placeholder="Ticket Title"
          variant="bordered"
          className="bg-white rounded-lg"
        />

        {/* Location Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Input
            required
            name="fromLocation"
            placeholder="From (Location)"
            variant="bordered"
            className="bg-white rounded-lg"
          />
          <Input
            required
            name="toLocation"
            placeholder="To (Location)"
            variant="bordered"
            className="bg-white rounded-lg"
          />
        </div>

        {/* Hero UI v3 Select Component */}
        <div className="w-full flex flex-col gap-1.5">
          <Select
            placeholder="Select Transport Type"
            value={transportType}
            onChange={(val) => setTransportType(val)}
            className="w-full"
          >
            <Select.Trigger className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg text-gray-700">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            
            <Select.Popover className="bg-white border border-gray-200 rounded-lg shadow-md p-1 min-w-[240px]">
              <ListBox>
                {transportTypes.map((type) => (
                  <ListBox.Item 
                    key={type.key}
                    id={type.key} 
                    textValue={type.label}
                    className="p-2 cursor-pointer hover:bg-gray-100 rounded transition-colors flex flex-col items-start text-gray-700 data-[selected=true]:bg-teal-50 data-[selected=true]:text-teal-700"
                  >
                    <Label className="font-semibold block">{type.label}</Label>
                    <Description className="text-xs text-gray-400 block">{type.desc}</Description>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Price & Quantity Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Input
            required
            name="price"
            type="number"
            placeholder="Price (per unit)"
            variant="bordered"
            className="bg-white rounded-lg"
          />
          <Input
            required
            name="quantity"
            type="number"
            placeholder="Ticket Quantity"
            variant="bordered"
            className="bg-white rounded-lg"
          />
        </div>

        {/* Departure Date & Time */}
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Departure Date & Time</label>
          <div className="relative flex items-center w-full">
            <Input
              required
              name="departureDateTime"
              type="datetime-local"
              variant="bordered"
              className="bg-white rounded-lg w-full"
            />
            <div className="absolute right-3 pointer-events-none text-gray-400">
              <Calendar />
            </div>
          </div>
        </div>

        {/* Perks Checkboxes */}
        <div className="w-full flex flex-col gap-2 my-1">
          <CheckboxGroup
            value={perks}
            onChange={(selectedValues) => setPerks(selectedValues)}
            className="w-full flex flex-col gap-2"
          >
            <Label className="text-sm font-semibold text-gray-700">Perks</Label>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
              {availablePerks.map((perk) => (
                <Checkbox 
                  key={perk} 
                  value={perk} 
                  className="group w-full cursor-pointer select-none rounded-xl border border-gray-200 bg-white p-3 transition-all hover:bg-gray-50 data-[selected=true]:border-teal-500 data-[selected=true]:bg-teal-50/40"
                >
                  <Checkbox.Content className="w-full flex items-center gap-3">
                    <Checkbox.Control className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center transition-colors bg-white group-data-[selected=true]:bg-teal-600 group-data-[selected=true]:border-teal-600">
                      <Checkbox.Indicator className="text-white text-[10px]" />
                    </Checkbox.Control>
                    
                    <Label className="cursor-pointer text-sm font-medium text-gray-700 group-data-[selected=true]:text-teal-900">
                      {perk}
                    </Label>
                  </Checkbox.Content>
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        </div>

        {/* Image Upload Input */}
        <div className="w-full flex flex-col gap-1.5">
          <Input
            required
            type="file"
            accept="image/*"
            variant="bordered"
            className="bg-white rounded-lg file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        {/* Read-only Vendor Data Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="relative flex items-center w-full">
            <div className="absolute left-3 z-10 text-gray-400">
              <Person />
            </div>
            <Input
              readOnly
              name="vendorName"
              defaultValue={user?.name || ""}
              key={user?.name} 
              variant="flat"
              className="bg-gray-100 rounded-lg opacity-80 w-full pl-7"
            />
          </div>
          <Input
            readOnly
            name="vendorEmail"
            defaultValue={user?.email || ""}
            key={user?.email}
            variant="flat"
            className="bg-gray-100 rounded-lg opacity-80"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={loading}
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-base py-6 rounded-lg transition-all shadow-md hover:opacity-90"
        >
          {loading ? "Adding Ticket..." : "Add Ticket"}
        </Button>
      </Form>
    </div>
  );
}