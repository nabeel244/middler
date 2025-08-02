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
  const [typed, setTyped] = useState(false);
  const [predictions, setPred] = useState([]);
  const [selectedAddr, setSelected] = useState(null);
  const { getPlacePredictions, placePredictions } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_ADDRESS_VALIDATION_API_KEY,
  });
  const [, setCookie] = useCookies(["address"]);

  useEffect(() => {
    if (typed && address.length) getPlacePredictions({ input: address });
  }, [address]);

  useEffect(() => {
    if (!placePredictions?.length) return;
    const svc = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    (async () => {
      const enriched = await Promise.all(
        placePredictions.map(
          (p) =>
            new Promise((resolve) => {
              svc.getDetails({ placeId: p.place_id }, (res, status) => {
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                  const c = res.address_components;
                  const street = c.find((x) =>
                    x.types.includes("street_number")
                  )?.long_name;
                  const route = c.find((x) =>
                    x.types.includes("route")
                  )?.long_name;
                  if (!street || !route) return resolve(null);
                  const zip = c.find((x) =>
                    x.types.includes("postal_code")
                  )?.long_name;
                  const city = c.find((x) =>
                    x.types.includes("locality")
                  )?.long_name;
                  const st = c.find((x) =>
                    x.types.includes("administrative_area_level_1")
                  )?.short_name;
                  resolve({
                    ...p,
                    formattedAddress: `${street} ${route}, ${city}, ${st} ${zip}`,
                    zipCode: zip,
                  });
                } else resolve(null);
              });
            })
        )
      );
      setPred(enriched.filter(Boolean));
    })();
  }, [placePredictions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAddr) {
      setError(true);
      return;
    }
    setCookie(
      "address",
      JSON.stringify({
        formattedAddress: selectedAddr.formattedAddress,
        zipCode: selectedAddr.zipCode,
      }),
      { path: "/", maxAge: 60 * 60 * 24 * 7 }
    );
    router.push("/paint-estimator?step=2");
  };

  return (
    <section className="relative mt-14 lg:mt-20 pt-12 lg:pt-20 pb-3 sm:pb-10 px-0 lg:px-10">
      <div className="absolute -left-4 top-[126px] h-[540px] w-[250px] lg:-left-10 lg:top-1/2 lg:-translate-y-1/2 lg:size-1/2 bg-center bg-no-repeat bg-[url('/images/hero_el2.png')] lg:bg-[url('/images/hero_el.png')] bg-contain" />
      <div className="container xl:px-10! 2xl:w-[1300px]!">
        <div className="row gap-y-8 sm:gap-y-14 lg:gap-y-8 gap-x-5 justify-center xl:gap-x-20 items-center max-lg:text-center">
          <div className="lg:w-6/12 xl:w-5/12 max-lg:order-1">
            <div className="flex flex-col max-lg:px-5">
              <h1 className="font-bold text-[40px] leading-14 lg:text-6xl lg:leading-[1.2] mb-3 lg:mb-5">
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
            {/* <form
              onSubmit={handleSubmit}
              className="border border-primary-300 w-full bg-white p-3 max-lg:pb-10 max-lg:pt-7 lg:p-[30px] shadow-[0_4px_40px] shadow-primary/20 rounded-[20px] flex flex-col gap-[15px] lg:gap-5"
            >
              <div className="relative py-4 lg:px-1.5 border-b-[1.5px] border-[rgba(51,51,51,0.15)] after:h-[3px] after:w-[89px] after:absolute after:-bottom-px after:left-0 after:bg-primary">
                <p className="max-[400px]:text-[3.45vw]! text-[3.5vw] lg:text-2xl font-semibold">
                  Enter address of the property that's being painted
                </p>
              </div> */}
            <form
              onSubmit={handleSubmit}
             className="border border-primary-300 w-full bg-white p-2 sm:p-3 max-lg:pb-5 max-lg:pt-2 lg:p-[30px] shadow-[0_4px_40px] shadow-primary/20 rounded-[20px] flex flex-col gap-2 lg:gap-5"
            >
              <div className="relative py-2 lg:px-1.5 border-b-[1.5px] border-[rgba(51,51,51,0.15)] after:h-[3px] after:w-[89px] after:absolute after:-bottom-px after:left-0 after:bg-primary">
                <p className="max-[400px]:text-[3.45vw]! text-[3.5vw] lg:text-2xl font-semibold max-sm:mt-2">
                  Enter address of the property that's being painted
                </p>
              </div>
              <div className="w-full flex flex-col sm:flex-row gap-2.5 lg:gap-[30px] items-stretch">
                <div className="py-3 px-2 lg:p-3 rounded-xl grow bg-[#f3f3f3] flex flex-col gap-2 relative">
                  <div className="flex gap-2 items-center">
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
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setTyped(true);
                        setSelected(null);
                        if (error) setError(false);
                      }}
                      placeholder="3976 First St, Glendale CA, 98765"
                      className="inline-block w-full grow outline-none! text-lg max-lg:text-[10px] ios-nozoom"
                      style={{
                        fontSize: '16px', // Ensuring the font size is 16px
                      }}
                    // style={
                    //   /iPad|iPhone|iPod/.test(
                    //     typeof navigator !== "undefined"
                    //       ? navigator.userAgent
                    //       : ""
                    //   )
                    //     ? {
                    //         fontSize: "16px",
                    //         transform: "scale(.625)",
                    //         transformOrigin: "left center",
                    //       }
                    //     : {}
                    // }
                    />
                  </div>
                  {typed && predictions.length > 0 && (
                    <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.15)] z-10 max-h-60 overflow-y-auto">
                      {predictions.map((p) => (
                        <div
                          key={p.place_id}
                          className="px-2 lg:px-4 lg:py-2 lg:first:pt-4 lg:last:pb-4 py-1 first:pt-2 last:pb-2 hover:bg-primary/10 cursor-pointer text-[10px] text-left lg:text-base text-[#656E81]"
                          onClick={() => {
                            setAddress(p.formattedAddress);
                            setSelected(p);
                            setTyped(false);
                            setPred([]);
                          }}
                        >
                          {p.formattedAddress}
                        </div>
                      ))}
                    </div>
                  )}
                  {error && (
                    <small className="text-red-600 text-xs absolute top-full left-2 mt-1">
                      Please select a valid address *
                    </small>
                  )}
                </div>
                <Button
                  type="submit"
                  className={`rounded-xl! max-lg:py-3! max-lg:px-3! max-lg:whitespace-nowrap max-lg:text-xs cursor-pointer ${error ? "max-lg:mt-4" : ""
                    }`}
                >
                  Start Calculating
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
