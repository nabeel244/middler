import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export const menuItems = [
  { name: "Home", url: "/" },
  { name: "Contact Us", url: "/contact-us" },
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
    url: "https://www.instagram.com/middler_com/",
  },
  {
    name: "linkedin",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/company/middler/",
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

export const interiorItemsToBePainted = [
  {
    id: '1',
    type: 'walls',
    title: 'Walls'
  },
  {
    id: '2',
    type: 'ceilings',
    title: 'Ceilings'
  },
  {
    id: '3',
    type: 'crown_molding',
    title: 'Crown Molding'
  },
  {
    id: '4',
    type: 'interior_doors',
    title: 'Interior Doors'
  },
  {
    id: '5',
    type: 'baseboards_and_trim',
    title: 'Baseboards and Trims'
  },
  {
    id: '6',
    type: 'windows_patio_doors',
    title: 'Windows + Patio Doors'
  },
  {
    id: '7',
    type: 'stair_railing_spindles',
    title: 'Stair Railing + Spindles'
  }
];

export const interiorConditions = [
  {
    type: 'fair',
    title: 'Fair',
    description: 'A lot of prep work and cleaning. Drywall needs repair. Dark colors that need to be covered. Extra caulking needed. Etc.'
  },
  {
    type: 'good',
    title: 'Good',
    description: 'Average prep work with little cleaning. Medium to light colors to cover. Caulk nail holes and small cracks only. Etc.'
  },
  {
    type: 'very_good',
    title: 'Great',
    description: 'Very little prep work. Walls ready to paint. All light colors to cover. Etc.'
  }
];

export const interiorDetails = [
  {
    type: 'basic',
    title: 'Basic',
    description: 'Smooth walls. Simple square style trim. Using only 1 or 2 colors. Home is vacant with no furniture to cover. Etc.'
  },
  {
    type: 'some_detail',
    title: 'Some Detail',
    description: 'Some wood work to paint such as wainscoting. Up to 3 different colors being used. Furniture to cover. Etc.'
  },
  {
    type: 'very_detailed',
    title: 'Very Detailed',
    description: 'Lots of wood to paint. Many different colors being used. A lot of furniture to cover. Oversized crown molding and or baseboards. Etc.'
  }
];

export const individualItem = [
  {
    title: '',
    price: '',
    gallons: ''
  }
];

export const cabinetImages = [
  { src: '/images/cabinets/1.webp', alt: 'Cabinet Door 1' },
  { src: '/images/cabinets/2.webp', alt: 'Cabinet Drawer 2' },
  { src: '/images/cabinets/3.webp', alt: 'Cabinet Combo 3' },
  { src: '/images/cabinets/4.webp', alt: 'Cabinet Door 4' },
];

export const cabinetConditions = [
  {
    type: 'fair',
    title: 'Fair',
    description: 'A lot of prep work such as heavy cleaning, fixing doors, drawers and frames with heavy sanding, and patching.'
  },
  {
    type: 'good',
    title: 'Good',
    description: 'Average amount of sanding with little fixing of doors, drawers and frame.'
  },
  {
    type: 'very_good',
    title: 'Great',
    description: 'Little to no fixing doors, drawers and frames. Very light sanding to get ready for paint.'
  }
];

export const cabinetDetail = [
  {
    type: 'basic',
    title: 'Basic',
    description: 'One color, standard cabinets such as Shaker style with very little prep work to tape off.'
  },
  {
    type: 'some_detail',
    title: 'Some Detail',
    description: 'One or 2 colors, semi custom cabinets with a few pull outs, basic molding detail, and average taping off needed.'
  },
  {
    type: 'very_detailed',
    title: 'Very Detailed',
    description: '2 colors or more or staining, custom cabinets with many pull outs, detailed molding, a lot of taping off needed.'
  }
]

export const exteriorItemsToBePainted = [
  {
    id: '1',
    type: 'walls',
    title: 'Walls'
  },
  {
    id: '2',
    type: 'trims',
    title: 'Trims'
  },
  {
    id: '3',
    type: 'garage_doors',
    title: 'Garage Doors'
  },
  {
    id: '4',
    type: 'windows_patio_doors',
    title: 'Windows + Patio Doors'
  },
  {
    id: '5',
    type: 'gutters_downspouts',
    title: 'Gutters + Downspouts'
  }
]

export const exteriorConditions = [
  {
    type: 'fair',
    title: 'Fair',
    description: 'A lot of wood repair. Heavy caulking. Patch stucco. More than 2 coats needed. A lot of plants in the way. Heavy cleaning needed. Etc.'
  },
  {
    type: 'good',
    title: 'Good',
    description: 'Very little wood repair. Standard caulking. Medium colors to paint over. Little amount of plants and furniture in the way. Pressure wash. Etc.'
  },
  {
    type: 'very_good',
    title: 'Very Good',
    description: 'Little to no wood or stucco repair. Light colors to paint over. Little caulking. Surfaces ready to paint with light pressure wash.'
  }
]

export const exteriorDetails = [
  {
    type: 'basic',
    title: 'Basic',
    description: 'Stucco siding. Spray paint walls and trim around eaves only. 1 or 2 colors being used. Little to no plants in the way. Etc.'
  },
  {
    type: 'some_detail',
    title: 'Some Detail',
    description: 'Mainly stucco. Extra trim. Some wood or rock detailing. Up to 3 colors. Spray and hand roll paint. Etc.'
  },
  {
    type: 'very_detailed',
    title: 'Very Detailed',
    description: 'Wood siding. Heavy rock to paint. Corbols. Columns. Lots of trim. More than 3 colors being used. Mainly roll and brush paint. Etc.'
  }
]

export const paintList = [
  {
    type: 'behr',
    title: 'Behr',
    image: "/images/brands/1.png"
  },
  {
    type: 'sherwin_williams',
    title: 'Sherwin Williams',
    image: "/images/brands/2.png"
  },
  {
    type: 'benjamin_moore',
    title: 'Benjamin Moore',
    image: "/images/brands/3.png"
  },
  {
    type: 'dunn_edwards',
    title: 'Dunn Edwards',
    image: "/images/brands/4.png"
  },
  {
    type: 'ppg',
    title: 'PPG',
    image: "/images/brands/5.png"
  },
  {
    type: 'valspar',
    title: 'Valspar',
    image: "/images/brands/6.png"
  }
];

export const paintEstimateSteps = [
  {
    step: "1",
    label: "Property",
    title: 'Property Information'
  },
  {
    step: "2",
    label: "Interior",
    title: 'Interior Square Feet'
  },
  {
    step: "2.1",
    label: "Interior Condition",
    title: 'Interior Condition'
  },
  {
    step: "2.2",
    label: "Interior Details",
    title: 'Interior Details'
  },
  {
    step: "2.3",
    label: "Interior Items",
    title: 'Interior Items to Be Painted'
  },
  {
    step: "2.4",
    label: "Individual Items",
    title: 'Interior Individual Items'
  },
  {
    step: "2.5",
    label: "Doors and Drawers",
    title: 'Cabinets'
  },
  {
    step: "3",
    label: "Exterior",
    title: 'Exterior Square Feet'
  },
  {
    step: "3.1",
    label: "Exterior Condition",
    title: 'Exterior Condition'
  },
  {
    step: "3.2",
    label: "Exterior Details",
    title: 'Exterior Details'
  },
  {
    step: "3.3",
    label: "Exterior Items",
    title: 'Exterior Items to Be Painted'
  },
  {
    step: "3.4",
    label: "Individual Items",
    title: 'Exterior Individual Items'
  },
  // {
  //   step: "3.5",
  //   label: "Painters and Time",
  //   title: 'Painters & Time'
  // },
  {
    step: "3.5",
    label: "Terms",
    title: 'Terms'
  },
  // {
  //   step: "3.6",
  //   label: "Materials",
  //   title: 'Materials'
  // },
  {
    step: "4",
    label: "Summary",
    title: 'Summary'
  },
  {
    step: "5",
    label: "Estimate",
    title: 'Estimate Preview'
  }
];

export const buyWhere = [
  {
    title: 'Home',
    type: 'home_depot'
  },
  {
    title: 'Lowes',
    type: 'lowes'
  },
  {
    title: 'amazon',
    type: 'amazon'
  }
]

export const buyWhy = [
  {
    title: 'Price',
    type: 'price'
  },
  {
    title: 'Convenience',
    type: 'convenience'
  },
  {
    title: 'They Deliver',
    type: 'delivery'
  }
]

export const questions = [
  {
    id: "address",
    required: true,
    title: "Put a Real Price® on painting a house",
    description:
      "Answer a few questions and in 30 seconds, we’ll give you a price for labor, materials and paint.",
    label: "Enter the address of the house",
    type: "text_dropdown",
    placeholder: "3976 First St., Glendale CA, 98765",
    options: [
      "39 Sienna, Warszawa, Wojewodztwo mazowieckie 00 - 121",
      "399 Park Avenue, New York, NY 10022",
      "3900 Elati Street. Denver, Co 80216",
      "390 Madison Avenue, New York, NY 10017",
      "3900 Hemphill Street, Fort Worth, TX 76110",
    ],
    next: "start",
  },
  {
    id: "insidePainting",
    required: true,
    question: "Are you painting the inside of the house?",
    type: "radio",
    options: ["Yes", "No"],
    next: null,
  },
  {
    id: "squareFeet",
    required: true,
    question: "How many square feet is being painted?",
    description:
      "If you’re painting the whole house enter the total sqft. If your only painting 1 or a few rooms, measure the floor sqft of each room and add them up.",
    type: "number",
    placeholder: "Enter the total SQFT",
    next: "Next",
  },
  {
    id: "paintItems",
    required: true,
    question: "What are you painting?",
    description: "Select all items you are painting",
    type: "multipleOptions",
    options: [
      "Walls",
      "Ceilings",
      "Crown Molding",
      "Interior Door",
      "Baseboard and Trims",
      "Window + Patio Doors",
      "Stairs Railing + Spindles",
    ],
    next: "Next",
  },
  {
    id: "homeCondition",
    required: true,
    question: "What condition is the inside of the house in?",
    type: "radio",
    options: ["Fair", "Good", "Great"],
    next: "Next",
  },
  {
    id: "insideDetail",
    required: true,
    question: "How detailed is the inside of the house?",
    type: "radio",
    options: ["Basic", "Some Detail", "Very Detailed"],
    next: "Next",
  },
  {
    id: "insideExtraItems", //  ⬅ renamed
    required: false,
    question:
      "If you're a painter you can add extra items you're painting on the inside of the home.",
    type: "custom-inputs",
    dynamicAdd: true,
    skip: true,
    next: "Next",
  },
  {
    id: "cabinetsPainting",
    required: true,
    question: "Are you painting any cabinets?",
    description:
      `Cabinets can be <b>anywhere</b>. In the Kitchen, Bathrooms, Hallways, Bedrooms, Offices, Outside, Garage and anywhere in between.`,
    type: "radio",
    options: ["Yes", "No"],
    next: null,
  },
  {
    id: "cabinetsNo",
    required: true,
    question: "How many cabinets are you painting?",
    description:
      "Count every door and drawer, big and small, even if they open or they don’t. Make sure you count every cabinet including in the kitchen, bathrooms, hallways, outside, garage and anywhere in between.",
    type: "number",
    placeholder: "Enter a #",
    suggetions: ["1.webp", "2.webp", "3.webp", "4.webp"],
    next: "Next",
  },
  {
    id: "cabinetsInsidePainting",
    required: true,
    question: "Are you painting the inside of the cabinets?",
    type: "radio",
    options: ["Yes", "No"],
    suggetions: [
      {
        title: "The blue part is the inside",
        src: "inside.webp",
      },
    ],
    next: null,
  },
  {
    id: "cabinetsCondition",
    required: true,
    question: "What condition are the cabinets in?",
    type: "radio",
    options: ["Fair", "Good", "Great"],
    next: "Next",
  },
  {
    id: "cabinetsDetail",
    required: true,
    question: "How detailed are the cabinets?",
    type: "radio",
    options: ["Basic", "Some Detail", "Very Detailed"],
    next: "Next",
  },
  {
    id: "outsidePainting",
    required: true,
    question: "Are you painting the outside of the house?",
    type: "radio",
    options: ["Yes", "No"],
    next: null,
  },
  {
    id: "outsideSquareFeet",
    required: true,
    question: "How many square feet is being painted?",
    description: "If you’re painting the whole house enter the total sqft.",
    type: "number",
    placeholder: "Enter the total SQFT",
    next: "Next",
  },
  {
    id: "outsidePaintItems",
    required: true,
    question: "What are you painting?",
    description: "Select all items you are painting",
    type: "multipleOptions",
    options: [
      "Walls",
      "Trims",
      "Garage Doors",
      "Windows + Patio Doors",
      "Gutters + Downspouts",
    ],
    next: "Next",
  },
  {
    id: "outsideCondition",
    required: true,
    question: "What condition is the outside of the house in?",
    type: "radio",
    options: ["Fair", "Good", "Great"],
    next: "Next",
  },
  {
    id: "outsideDetail",
    required: true,
    question: "How detailed is the outside of the house?",
    type: "radio",
    options: ["Basic", "Some Detail", "Very Detailed"],
    next: "Next",
  },
  {
    id: "outsideExtraItems", //  ⬅ renamed
    required: false,
    question:
      "If you're a painter you can add extra items you're painting on the outside of the home.",
    type: "custom-inputs",
    dynamicAdd: true,
    skip: true,
    next: "Next",
  },
  {
    id: "PaintBrand",
    required: true,
    question: "Please select the paint would like to use?",
    type: "dropdown",
    placeholder: "Brand of Paints",
    options: [
      "Behr",
      "Sherwin Williams",
      "Benjamin Moore",
      "Dunn-Edwards",
      "PPG",
      "Valspar",
    ],
    next: "Yes",
  },
];

