import logo from './vacaystay.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";
import roomIcon from "./meeting-room-stroke-rounded.svg";
import hotelIcon from "./hotel-02-stroke-rounded.svg";
import paymentIcon from "./credit-card-pos-stroke-rounded.svg";
import userIcon2 from "./user-account-stroke-rounded.svg";
import cityIcon from "./city.svg";
import bookingsIcon from "./brand-booking.svg";
import support from "./support.svg";



export const assets = {
    logo,
    searchIcon,
    userIcon,
    support,
    bookingsIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
    roomIcon,
    hotelIcon,
    paymentIcon,
    userIcon2,
    cityIcon,
}

export const cities = [
    "Dubai",
    "Singapore",
    "New York",
    "London",
];


const offerTitles = [
  "Summer Escape Package",
  "Romantic Getaway",
  "Luxury Retreat",
  "Family Adventure Deal",
  "Weekend Relaxation Offer",
];

const offerDescriptions = [
  "Enjoy a complimentary night and daily breakfast.",
  "Special couples package including spa treatment.",
  "Book early and save at our top luxury properties.",
  "Create unforgettable memories with your loved ones.",
  "Exclusive weekend offer with spa and dining benefits.",
];

const offerImages = [
  exclusiveOfferCardImg1,
  exclusiveOfferCardImg2,
  exclusiveOfferCardImg3
];

const offerExpiryDates = ["Aug 31", "Sep 15", "Sep 20", "Oct 05"];

const testimonialNames = [
  "Emma Rodriguez",
  "Liam Johnson",
  "Sophia Lee",
  "James Carter",
  "Olivia Brown",
  "Noah Wilson",
];

const testimonialAddresses = [
  "Barcelona, Spain",
  "New York, USA",
  "Seoul, South Korea",
  "London, UK",
  "Tokyo, Japan",
  "Toronto, Canada",
];

const testimonialImages = [
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
];

const testimonialReviews = [
  "Amazing experience! Highly recommended.",
  "QuickStay made booking so easy and smooth.",
  "Excellent service and top-notch hotels.",
  "A very personalized and premium experience.",
  "The best platform for luxury accommodation!",
];


function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateExclusiveOffers(count = 3) {
  return Array.from({ length: count }).map((_, i) => ({
    _id: i + 1,
    title: randomItem(offerTitles),
    description: randomItem(offerDescriptions),
    priceOff: Math.floor(Math.random() * 30) + 10, 
    expiryDate: randomItem(offerExpiryDates),
    image: randomItem(offerImages),
  }));
}

function generateTestimonials(count = 3) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: randomItem(testimonialNames),
    address: randomItem(testimonialAddresses),
    image: randomItem(testimonialImages),
    rating: Math.floor(Math.random() * 2) + 4,
    review: randomItem(testimonialReviews),
  }));
}


export const exclusiveOffers = generateExclusiveOffers();
export const testimonials = generateTestimonials();


export const facilityIcons = {
    "Free WiFi": assets.freeWifiIcon,
    "Free Breakfast": assets.freeBreakfastIcon,
    "Room Service": assets.roomServiceIcon,
    "Mountain View": assets.mountainIcon,
    "Pool Access": assets.poolIcon,
};


export const roomCommonData = [
    { icon: assets.homeIcon, title: "Clean & Safe Stay", description: "A well-maintained and hygienic space just for you." },
    { icon: assets.badgeIcon, title: "Enhanced Cleaning", description: "This host follows Staybnb's strict cleaning standards." },
    { icon: assets.locationFilledIcon, title: "Excellent Location", description: "90% of guests rated the location 5 stars." },
    { icon: assets.heartIcon, title: "Smooth Check-In", description: "100% of guests gave check-in a 5-star rating." },
];

