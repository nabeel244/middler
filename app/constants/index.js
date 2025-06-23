import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export const menuItems = [
  { name: "Home", url: "/" },
  { name: "Contact Us", url: "/contact" },
  { name: "Privacy Policy", url: "/privacy-policy" },
  { name: "terms of Service", url: "/terms-of-service" },
];

export const socials = [
  {
    name: "facebook",
    icon: FaFacebookF,
    url: "/",
  },
  {
    name: "twitter",
    icon: FaTwitter,
    url: "/",
  },
  {
    name: "instagram",
    icon: RiInstagramFill,
    url: "/",
  },
  {
    name: "linkedin",
    icon: FaLinkedinIn,
    url: "/",
  },
  {
    name: "youtube",
    icon: FaYoutube,
    url: "/",
  },
];

export const estimateCards = [
  {
    title: "interior estimate",
    desc: "$11,045"
  },
  {
    title: "cabinet estimate",
    desc: "$6,034"
  },
  {
    title: "exterior estimate",
    desc: "$8,709"
  },
  {
    title: "total estimate",
    desc: "$25,788",
    active: true
  },
];

export const questions = [
  {
    id: "insidePainting",
    required: true,
    question: "Are you painting the inside of the house?",
    type: "radio",
    options: ["Yes", "No"],
    next: null
  },
  {
    id: "address",
    required: true,
    title: "Put a Real Price® on painting a house",
    description: "Answer a few questions and in 30 seconds, we’ll give you a price for labor, materials and paint.",
    label: "Enter the address of the house",
    type: "text_dropdown",
    placeholder: "3976 First St., Glendale CA, 98765",
    options: ["39 Sienna, Warszawa, Wojewodztwo mazowieckie 00 - 121", "399 Park Avenue, New York, NY 10022", "3900 Elati Street. Denver, Co 80216", "390 Madison Avenue, New York, NY 10017", "3900 Hemphill Street, Fort Worth, TX 76110"],
    next: "start"
  },
  {
    id: "squareFeet",
    required: true,
    question: "How many square feet is being painted?",
    description: "If you’re painting the whole house enter the total sqft. If your only painting 1 or a few rooms, measure the floor sqft of each room and add them up.",
    type: "number",
    placeholder: "Enter the total SQFT",
    next: "Next"
  },
  {
    id: "paintItems",
    required: true,
    question: "What are you painting?",
    description: "Select all items you are painting",
    type: "multipleOptions",
    options: [
      "Walls", "Ceilings", "Crown Molding", "Interior Door",
      "Baseboard and Trims", "Window + Patio Doors", "Stairs Railing + Spindles"
    ],
    next: "Next"
  },
  {
    id: "homeCondition",
    required: true,
    question: "What condition is the inside of the house in?",
    type: "radio",
    options: ["Fair", "Good", "Great"],
    next: "Next"
  },
  {
    id: "insideDetail",
    required: true,
    question: "How detailed is the inside of the house?",
    type: "radio",
    options: ["Basic", "Some Detail", "Very Detailed"],
    next: "Next"
  },
  {
    id: "extraItems",
    required: false,
    question: "If you're a painter you can add extra items you're painting on the inside of the home.",
    type: "custom-inputs",
    dynamicAdd: true,
    skip: true,
    next: "Next",
  },
  {
    id: "cabinetsPainting",
    required: true,
    question: "Are you painting any cabinets?",
    description: `Cabinets can be <b>anywhere</b>. In the Kitchen, Bathrooms, Hallways, Bedrooms, Offices, Outside, Garage and anywhere in between.`,
    type: "radio",
    options: ["Yes", "No"],
    next: null
  },
  {
    id: "PaintBrand",
    required: true,
    question: "Please select the paint would like to use?",
    type: "dropdown",
    placeholder: "Brand of Paints",
    options: ["Behr", "Sherwin Williams", "Benjamin Moore", "Dunn-Edwards", "PPG", "Valspar"],
    next: "Yes"
  },
  {
    id: "cabinetsNo",
    required: true,
    question: "How many cabinets are you painting?",
    description: `Count every door and drawer, big and small, even if they open or they don’t. Make sure you count every cabinet including in the kitchen, bathrooms, hallways, outside, garage and anywhere in between.`,
    type: "number",
    placeholder: "Enter a #",
    next: "Next"
  },
];
