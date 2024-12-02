import ButtonCheckout from "./ButtonCheckout";

export const data = {
  title: "Pricing",
  description: "Spend 1 hour to run your Micro SaaS startup and start making",
  text: "MONEY NOW!",
  dollars_off: "$100 off",
  days: "next 14 days",
  pricing_card: [
    {
      id: 1,
      priceId:
        process.env.NODE_ENV === "development"
          ? "prod_REHM6OmA9sLpHx"
          : "prod_REHM6OmA9sLpHx",
      price_before: "$150",
      price_now: "$75",
      btn_txt: "Dietitian Package",
      is_best_deal: false,
      btn_link: "",
      features: [
        {
          id: 1,
          text: "NextJS boilerplate",
        },
        {
          id: 2,
          text: "SEO",
        },
        {
          id: 3,
          text: "SEO Blog CMS",
        },
        {
          id: 4,
          text: "ReSend emails",
        },
        {
          id: 5,
          text: "Stripe",
        },
        {
          id: 6,
          text: "PostgreSQL",
        },
        {
          id: 7,
          text: "Google Oauth & Magic Links",
        },
        {
          id: 8,
          text: "Components & animations",
        },
        {
          id: 9,
          text: "Docker container",
        },
        {
          id: 10,
          text: "Admin CMS Dashboard",
        },
      ],
    },
    {
      id: 2,
      priceId:
        process.env.NODE_ENV === "development"
          ? "prod_REHNsm5W5X2P5m"
          : "prod_REHNsm5W5X2P5m",
      price_before: "$350",
      price_now: "$302",
      btn_txt: "Professional",
      is_best_deal: true,
      btn_link: "",
      features: [
        {
          id: 11,
          text: "NextJS boilerplate",
        },
        {
          id: 12,
          text: "SEO",
        },
        {
          id: 13,
          text: "SEO Blog CMS",
        },
        {
          id: 14,
          text: "ReSend emails",
        },
        {
          id: 15,
          text: "Stripe",
        },
        {
          id: 16,
          text: "PostgreSQL",
        },
        {
          id: 17,
          text: "Google Oauth & Magic Links",
        },
        {
          id: 18,
          text: "Components & animations",
        },
        {
          id: 19,
          text: "Docker container",
        },
        {
          id: 20,
          text: "Admin CMS Dashboard",
        },
        {
          id: 21,
          text: "Waiting List",
        },
        {
          id: 22,
          text: "Marketing launch fast guide",
        },
        {
          id: 23,
          text: "Discord founders community",
        },
        {
          id: 24,
          text: "Lifetime update",
        },
      ],
    },
  ],
};

const PricingCard = ({ item }: any) => {
  return (
    <div
      className={`relative max-w-[350px] w-full pb-5 pt-10 bg-[#131211] px-4 min-h-full border rounded-[16px] scale-1 hover:scale-[1.025] transition-all duration-300 ${
        !item?.is_best_deal ? "border-[#222222]" : "border-[#006FEE]"
      }`}
    >
      <div className="flex flex-col justify-between h-full mb-4">
        <div>
          <div className="flex items-center justify-center mb-8 gap-2 pr-5">
            {item?.price_before && (
              <p className="text-center text-[#95959D] font-inter font-bold text-2xl line-through">
                {item?.price_before}
              </p>
            )}
            <p className="text-center text-white font-inter font-bold text-5xl">
              {item?.price_now}
            </p>
          </div>
          <p className="text-white font-inter font-bold mb-4">Key features:</p>
          {item?.features?.map((cardItem: any, index: number) => (
            <div key={index} className="flex gap-2 mb-3">
              <div className="text-[#95959D]">
                <svg
                  width="23"
                  height="13"
                  viewBox="0 0 23 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.70711 6.29302C6.31658 5.90249 5.68342 5.90249 5.29289 6.29302C4.90237 6.68354 4.90237 7.3167 5.29289 7.70723L6.70711 6.29302ZM10.9497 11.9499L10.2426 12.657C10.6332 13.0475 11.2663 13.0475 11.6568 12.657L10.9497 11.9499ZM22.2639 2.05038C22.6544 1.65987 22.6544 1.0267 22.2639 0.63617C21.8734 0.245637 21.2402 0.245624 20.8497 0.63614L22.2639 2.05038ZM1.75691 6.34331C1.36639 5.95278 0.733222 5.95278 0.342698 6.34331C-0.0478264 6.73383 -0.0478264 7.367 0.342698 7.75752L1.75691 6.34331ZM5.29245 12.7073C5.68297 13.0978 6.31613 13.0978 6.70666 12.7073C7.09718 12.3167 7.09718 11.6836 6.70666 11.2931L5.29245 12.7073ZM17.3131 2.10066C17.7037 1.71014 17.7037 1.07697 17.3131 0.686448C16.9226 0.295924 16.2895 0.295924 15.8989 0.686448L17.3131 2.10066ZM10.5956 5.98975C10.2051 6.38027 10.2051 7.01344 10.5956 7.40396C10.9862 7.79449 11.6193 7.79449 12.0098 7.40396L10.5956 5.98975ZM5.29289 7.70723L10.2426 12.657L11.6569 11.2428L6.70711 6.29302L5.29289 7.70723ZM11.6568 12.657L22.2639 2.05038L20.8497 0.63614L10.2427 11.2427L11.6568 12.657ZM0.342698 7.75752L5.29245 12.7073L6.70666 11.2931L1.75691 6.34331L0.342698 7.75752ZM15.8989 0.686448L10.5956 5.98975L12.0098 7.40396L17.3131 2.10066L15.8989 0.686448Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className={`text-[#95959D] font-inter text-sm`}>
                {cardItem?.text}
              </p>
            </div>
          ))}
        </div>
        <ButtonCheckout priceId={item?.priceId} />
      </div>
      {item?.is_best_deal && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#006FEE] text-white font-inter text-sm py-1 px-3 rounded-full">
          Best deal
        </div>
      )}
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="flex justify-center items-center my-24 w-full">
      <div className="max-w-[1440px] w-full px-4 sm:px-12">
        <div className="w-full flex flex-col items-center">
          <h2
            className={`font-inter text-[32px] sm:text-[48px] leading-[38px] sm:leading-[57px] font-bold text-center mb-4 max-w-[700px] text-transparent bg-gradient-to-r from-[#73B8FF] to-[#00458C] inline-block bg-clip-text`}
          >
            {data?.title}
          </h2>
          <p
            className={`text-[#95959D] font-inter text-base sm:text-xl text-center max-w-[600px]`}
          >
            {data?.description}{" "}
            {data?.text && <span className="text-white">{data?.text}</span>}
          </p>
        </div>
        <div className="flex gap-3 items-center mt-4 justify-center">
          <svg
            width="23"
            height="20"
            viewBox="0 0 23 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.03518 0.5C5.45006 0.5 4.90366 0.792427 4.57909 1.27927L0.98987 6.66311C0.770137 6.99271 0.74386 7.41478 0.921015 7.76909C2.88512 11.6973 5.61467 15.1932 8.94923 18.0514L10.7 19.5521C11.1603 19.9467 11.8397 19.9467 12.3 19.5521L14.0508 18.0514C17.3853 15.1932 20.1149 11.6973 22.079 7.76909C22.2561 7.41478 22.2299 6.99271 22.0101 6.66311L18.4209 1.27927C18.0963 0.792427 17.5499 0.5 16.9648 0.5H6.03518ZM5.82717 2.11132C5.87353 2.04178 5.95159 2 6.03518 2H8.37499L6.45987 6.59629C6.41576 6.70216 6.38246 6.81135 6.36002 6.92224C5.65619 6.86985 4.95296 6.80669 4.25057 6.73276L2.84486 6.58479L5.82717 2.11132ZM2.77865 8.08611C4.57205 11.3761 6.94021 14.3214 9.77321 16.7812L6.64775 8.44667C5.79541 8.38808 4.94387 8.31402 4.09355 8.22452L2.77865 8.08611ZM8.28481 8.54016L11.5 17.114L14.7152 8.54016C12.5728 8.63762 10.4272 8.63762 8.28481 8.54016ZM16.3523 8.44667L13.2268 16.7812C16.0598 14.3214 18.4279 11.3761 20.2213 8.08611L18.9064 8.22452C18.0561 8.31402 17.2046 8.38807 16.3523 8.44667ZM20.1551 6.58479L18.7494 6.73276C18.047 6.80669 17.3438 6.86985 16.64 6.92224C16.6175 6.81135 16.5842 6.70216 16.5401 6.59629L14.625 2H16.9648C17.0484 2 17.1265 2.04178 17.1728 2.11133L20.1551 6.58479ZM15.0917 7.02005C12.6988 7.14432 10.3012 7.14432 7.9083 7.02005L9.99999 2H13L15.0917 7.02005Z"
              fill="#52DE82"
            />
          </svg>
          <p className="font-inter text-xl text-[#52DE82]">
            {data?.dollars_off}{" "}
            <span className="text-[#95959D]">{data?.days}</span>
          </p>
        </div>
        <div>
          <div className="flex flex-wrap gap-8 justify-center mt-12">
            {data?.pricing_card?.map((item: any, index: number) => (
              <PricingCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
