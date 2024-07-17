import { useNavigate } from "react-router-dom";
import { truncateAfterDomain } from "../utilities/shortenUrl";
import ShowRating from "./ShowRating";

const BusinessCard = ({ business }) => {
  const navigate = useNavigate();

  const mailToLink = `
        mailto:info@${business.email}?subject=Inquiry%20About%20${business.name}&body=Hello%20${business.name}%2C%0A%0AI%20am%20interested%20in%20learning%20more%20about%20your%20services.%20Please%20contact%20me%20at%20your%20earliest%20convenience.%0A%0AThank%20you%2C%0A%0A%5BYour%20Name%5D
      `;

  const handleClick = (e, path) => {
    const btnValue = e.target.innerText;

    if (btnValue === "Contact Us") {
      window.open(mailToLink, "_blank", "noopener,noreferrer");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="bg-background text-foreground p-6 md:p-8 lg:p-10 rounded-lg shadow-lg max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={business.photo}
            alt="Business Photo"
            width="500"
            height="300"
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
            style={{ aspectRatio: "500/300", objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
            <h1 className="text-2xl font-bold text-white">
              {business.name}
            </h1>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{business.name}</h1>

              <ShowRating business={business} />
            </div>
            <p className="text-muted-foreground">
              {business.address}
            </p>
            <p className="text-muted-foreground">
              {business.description}
            </p>
          </div>
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <img src="/phone.svg" />
              <a href={"tel:" + business.phone}>{business.phone}</a>
            </div>
            <div className="flex items-center gap-2">
              <img src="/web.svg" />
              <a
                className="underline text-muted-foreground"
                href={business.website}
                target="_blank"
                rel="noreferrer"
              >
                {truncateAfterDomain(business.website)}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) =>
                handleClick(e, `/businesses/${business._id}`)
              }
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-sm"
            >
              View Details
            </button>
            <button
              onClick={(e) => handleClick(e, business.email)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
