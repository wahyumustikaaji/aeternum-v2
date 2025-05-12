import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    img: "/assets/images/icons/facebook.svg",
  },
  {
    img: "/assets/images/icons/nasdaq.svg",
  },
  {
    img: "/assets/images/icons/microsoft.svg",
  },
  {
    img: "/assets/images/icons/samsung.svg",
  },
  {
    img: "/assets/images/icons/qualcomm.svg",
  },
  {
    img: "/assets/images/icons/google.svg",
  },
  {
    img: "/assets/images/icons/paypal.svg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 1);

const ReviewCard = ({
  img,
}) => {
  return (
    <figure
      className={cn(
        "relative h-fit w-32 overflow-hidden p-4 mt-12",
      )}
    >
      <div className="flex flex-row justify-center items-center gap-2">
        <img className="grayscale" width="90" height="90" alt="" src={img} />
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden max-w-3xl">
      <Marquee className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.img} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
