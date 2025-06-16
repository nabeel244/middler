import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export const menuItems = [
  { name: "Home", url: "/" },
  { name: "About Us", url: "/about" },
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
]

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
]
