"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import Button from "../ui/Button";

const Hero = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const [predictionsWithZip, setPredictionsWithZip] = useState([]);
  const [userTyped, setUserTyped] = useState(false);
  const [cookies, setCookie] = useCookies(["address"]);

  const { getPlacePredictions, placePredictions } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_ADDRESS_VALIDATION_API_KEY,
  });

  useEffect(() => {
    if (address.length > 0 && userTyped) {
      setDropdown("address");
      getPlacePredictions({ input: address });
    }
  }, [address, userTyped]);

  useEffect(() => {
    if (placePredictions && placePredictions.length > 0) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      const fetchZipCodes = async () => {
        const updatedPredictions = await Promise.all(
          placePredictions.map(async (prediction) => {
            return new Promise((resolve) => {
              service.getDetails(
                { placeId: prediction.place_id },
                (result, status) => {
                  if (
                    status === window.google.maps.places.PlacesServiceStatus.OK
                  ) {
                    const addressComponents = result.address_components;

                    const streetNumber =
                      addressComponents.find((component) =>
                        component.types.includes("street_number")
                      )?.long_name || "";

                    const route =
                      addressComponents.find((component) =>
                        component.types.includes("route")
                      )?.long_name || "";

                    if (!streetNumber || !route) {
                      // Skip if incomplete
                      return resolve(null);
                    }

                    const zipCode =
                      addressComponents.find((component) =>
                        component.types.includes("postal_code")
                      )?.long_name || "";

                    const city =
                      addressComponents.find((component) =>
                        component.types.includes("locality")
                      )?.long_name || "";

                    const state =
                      addressComponents.find((component) =>
                        component.types.includes("administrative_area_level_1")
                      )?.short_name || "";

                    const formattedAddress = `${streetNumber} ${route}, ${city}, ${state} ${zipCode}`;

                    resolve({ ...prediction, formattedAddress, zipCode });
                  } else {
                    resolve(null); // Skip invalid
                  }
                }
              );
            });
          })
        );

        // Filter out nulls (incomplete or errored predictions)
        const filteredPredictions = updatedPredictions.filter(
          (p) => p !== null
        );
        setPredictionsWithZip(filteredPredictions);
      };

      fetchZipCodes();
    }
  }, [placePredictions]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (address.trim() === "") {
      setError(true);
      return;
    }

    const matched = predictionsWithZip.find(
      (item) => item.formattedAddress === address
    );

    if (!matched) {
      setError(true);
      return;
    }

    // Store address in cookie for the paint estimator page
    setCookie(
      "address",
      JSON.stringify({
        formattedAddress: matched.formattedAddress,
        zipCode: matched.zipCode,
      }),
      {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      }
    );

    router.push("/paint-estimator");
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setUserTyped(true);
    if (error) setError(false);
  };

  const handleAddressSelect = (selectedItem) => {
    setAddress(selectedItem.formattedAddress);
    setDropdown("");
    setUserTyped(false);
    if (error) setError(false);
  };

  return (
    <section className="relative mt-14 lg:mt-20 pt-12 lg:pt-20 pb-10 px-0 lg:px-10">
      <div className="absolute -left-4 top-[126px] h-[540px] w-[250px] lg:-left-10 lg:top-1/2 lg:-translate-y-1/2 lg:size-1/2 bg-center bg-no-repeat bg-[url('/images/hero_el2.png')] lg:bg-[url('/images/hero_el.png')] bg-contain"></div>
      <div className="container xl:px-10! 2xl:w-[1300px]!">
        <div className="row gap-y-14 lg:gap-y-8 gap-x-5 justify-center xl:gap-x-20 items-center max-lg:text-center">
          <div className="lg:w-6/12 xl:w-5/12 max-lg:order-1">
            <div className="flex flex-col max-lg:px-5">
              <h1 className="font-bold text-[40px] leading-14 lg:text-6xl lg:leading-[1.2] mb-5">
                <span className="text-primary">Calculate </span> The Price To
                Paint!
              </h1>
              <p className="text-base lg:text-2xl leading-6 lg:leading-snug">
                Get the accurate, True Price for labor, materials, and paint for
                any painting project in seconds.
              </p>
            </div>
          </div>
          <div className="lg:w-6/12 max-lg:hidden">
            <div className="relative size-full text-right">
              <img
                src="/images/hero_img.png"
                className="inline-block rounded-2xl object-contain max-h-[320px]"
                alt=""
              />
            </div>
          </div>
          <div className="mx-auto flex justify-center max-lg:order-2">
            <div className="border border-primary-300 w-full bg-white p-3 max-lg:pb-10 max-lg:pt-7 lg:p-[30px] shadow-[0_4px_40px] shadow-primary/20 rounded-[20px] flex flex-col gap-[15px] lg:gap-5">
              <div className="relative py-4 lg:px-1.5 border-b-[1.5px] border-[rgba(51,51,51,0.15)] after:h-[3px] after:w-[89px] after:absolute after:-bottom-px after:left-0 after:bg-primary">
                <p className="max-[400px]:text-[3.45vw]! text-[3.5vw] lg:text-2xl font-semibold">
                  Enter address of the property that's being painted
                </p>
              </div>
              <form
                className="w-full flex gap-2.5 lg:gap-[30px] items-stretch"
                onSubmit={handleFormSubmit}
              >
                <div className="py-3 px-2 lg:p-3 rounded-xl grow bg-[#f3f3f3] flex flex-col gap-2 lg:gap-2.5 relative">
                  <div className="flex gap-2 lg:gap-2.5 items-center">
                    <span>
                      <svg
                        className="size-3.5 lg:size-6"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 17.5L21.5 21.5"
                          stroke="#141B34"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.5 11.5C19.5 7.08172 15.9183 3.5 11.5 3.5C7.08172 3.5 3.5 7.08172 3.5 11.5C3.5 15.9183 7.08172 19.5 11.5 19.5C15.9183 19.5 19.5 15.9183 19.5 11.5Z"
                          stroke="#141B34"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={address}
                      onChange={handleAddressChange}
                      className="inline-block w-full grow outline-none! text-lg max-lg:text-[10px]"
                      placeholder="3976 First St, Glendale CA, 98765"
                    />
                  </div>

                  {/* Address Dropdown */}
                  {dropdown === "address" && (
                    <div className="absolute w-full mt-2 bg-white shadow-[0_0_20px] shadow-black/20 rounded-[10px] z-10 max-h-[260px] overflow-y-auto top-full left-0">
                      {address &&
                        predictionsWithZip &&
                        predictionsWithZip.map((item, idx) => (
                          <div
                            key={idx}
                            className="px-5 py-2 cursor-pointer hover:bg-primary/5 text-[#656E81]"
                            onClick={() => handleAddressSelect(item)}
                          >
                            {item.formattedAddress}
                          </div>
                        ))}
                    </div>
                  )}

                  {error && (
                    <small className="text-red-600 text-xs lg:text-sm absolute top-full left-2 mt-1">
                      Please select a valid address from the dropdown *
                    </small>
                  )}
                </div>
                <Button
                  type="submit"
                  className="rounded-xl! max-lg:py-3! max-lg:px-3! max-lg:whitespace-nowrap max-lg:text-xs cursor-pointer"
                >
                  Start Calculating
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
