const solutions = [
  {
    title: "Instant Verification",
    description: "Allows anyone to instantly verify digital credentials without complex manual checks.",
    image: "/assets/images/instan-verification.webp",
    alt: "instan-verification",
    layout: "lg:row-span-2",
    imageContainerClass: "@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm",
    imageWrapperClass: "absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl",
    imageClass: "size-full object-cover object-top ml-0.5",
    extraRounded: "lg:rounded-l-[2rem]",
    extraRoundedCalc: "lg:rounded-l-[calc(2rem+1px)]"
  },
  {
    title: "Trusted Digital Ecosystem",
    description: "Bridges institutions, professionals, and individuals to create a transparent credential ecosystem.",
    image: "/assets/images/ecosystem.png",
    alt: "ecosystem",
    layout: "relative max-lg:row-start-1",
    imageContainerClass: "flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2",
    imageClass: "w-full max-lg:max-w-xs",
    extraRounded: "max-lg:rounded-t-[2rem]",
    extraRoundedCalc: "max-lg:rounded-t-[calc(2rem+1px)]"
  },
  {
    title: "Secure & Immutable",
    description: "Credentials are securely stored on blockchain, making them tamper-proof and trustworthy.",
    image: "/assets/images/security.png",
    alt: "security",
    layout: "relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2",
    imageContainerClass: "@container flex flex-1 items-center max-lg:py-6 lg:pb-2",
    imageClass: "h-[min(152px,40cqw)] object-cover"
  },
  {
    title: "Easily Shareable",
    description: "Users can share their credentials via link or QR code ideal for academic, career, or business use.",
    image: "/assets/images/share.webp",
    alt: "share",
    layout: "lg:row-span-2",
    imageContainerClass: "@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm",
    imageWrapperClass: "absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl",
    imageClass: "size-full object-cover object-top ml-0.5",
    extraRounded: "max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]",
    extraRoundedCalc: "max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]"
  }
];

export default function SolutionSection() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {solutions.map((item, index) => (
            <div key={index} className={`relative ${item.layout || ""}`}>
              <div className={`absolute inset-px rounded-lg bg-[#171717] border ${item.extraRounded || ""}`}></div>
              <div className={`relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] ${item.extraRoundedCalc || ""}`}>
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                    {item.title}
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-[#999999] max-lg:text-center">
                    {item.description}
                  </p>
                </div>
                <div className={item.imageContainerClass}>
                  {item.imageWrapperClass ? (
                    <div className={item.imageWrapperClass}>
                      <img className={item.imageClass} src={item.image} alt={item.alt} />
                    </div>
                  ) : (
                    <img className={item.imageClass} src={item.image} alt={item.alt} />
                  )}
                </div>
              </div>
              <div className={`pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 ${item.extraRounded || ""}`}></div>
            </div>
          ))}
        </div>
        <p className="text-xl mt-8 text-[#999999] font-medium px-10 lg:px-0">
          <span className="text-white">Use one or all.</span> Best of breed products. Integrated as a platform.
        </p>
      </div>
    </div>
  );
}
