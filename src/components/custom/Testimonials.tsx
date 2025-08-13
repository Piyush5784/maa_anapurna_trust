import Image from "next/image";
const testimonials = [
  {
    name: "Rahul Sharma",
    image: "/testimonials/boy-eating-food.jpg",
    text: "When floods hit our village in Assam, Maa Anapurna Trust was the first to reach us with hot meals. Their mobile kitchen saved our family during the most difficult time.",
  },
  {
    name: "Priya Devi",
    image: "/testimonials/child1.jpg",
    text: "My children were malnourished before Maa Anapurna Trust started their food distribution program in our area. Now they receive nutritious meals daily and are healthier than ever.",
  },
  {
    name: "Mukesh Baruah",
    image: "/testimonials/childrens.jpeg",
    text: "As a volunteer with their tree plantation drive, I've seen how we've transformed barren lands into green spaces. We've planted over 500 trees in our district this year alone.",
  },
  {
    name: "Anita Gogoi",
    image: "/testimonials/clothes.jpg",
    text: "During winter, Maa Anapurna Trust provided warm clothes for my elderly mother and newborn baby. Their clothing distribution program is a blessing for poor families like ours.",
  },
  {
    name: "Dr. Biman Das",
    image: "/testimonials/group.jpg",
    text: "I've been coordinating with Maa Anapurna Trust's blood donation camps. Their volunteers are dedicated and have helped save numerous lives in our local hospital.",
  },
  {
    name: "Ruma Kalita",
    image: "/testimonials/Volenteer.jpeg",
    text: "Being a volunteer with Maa Anapurna Trust has taught me the joy of giving. Whether it's serving food or organizing blood camps, every activity brings hope to our community.",
  },
  {
    name: "Jyoti Borah",
    image: "/testimonials/plants.jpg",
    text: "Thanks to their environmental initiatives, our village now has cleaner air and better soil. The saplings they provided have grown into beautiful trees that benefit everyone.",
  },
];

const Testimonials = () => {
  return (
    <div className="min-w-screen min-h-screen bg-customOrange flex items-center justify-center">
      <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-16 text-gray-800">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-5 text-black">
              Stories of Hope <br />
              and Change.
            </h1>
            <h3 className="text-xl mb-5 font-light">
              Hear from the communities and volunteers whose lives have been
              transformed through our work together in Assam
            </h3>
            <div className="text-center mb-10">
              <span className="inline-block w-1 h-1 rounded-full bg-black ml-1"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-black ml-1"></span>
              <span className="inline-block w-40 h-1 rounded-full bg-black"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-black ml-1"></span>
              <span className="inline-block w-1 h-1 rounded-full bg-black ml-1"></span>
            </div>
          </div>
          <div className="-mx-3 md:flex items-start">
            <div className="px-3 md:w-1/3">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-4 items-center">
                  <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <Image
                      src={testimonials[0].image}
                      alt={testimonials[0].name}
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10"
                    />
                  </div>
                  <div className="flex-grow pl-3">
                    <h6 className="font-bold text-sm uppercase text-gray-600">
                      {testimonials[0].name}
                    </h6>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm leading-tight">
                    <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                    {testimonials[0].text}
                    <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                      "
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-4 items-center">
                  <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <Image
                      src={testimonials[1].image}
                      alt={testimonials[1].name}
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10"
                    />
                  </div>
                  <div className="flex-grow pl-3">
                    <h6 className="font-bold text-sm uppercase text-gray-600">
                      {testimonials[1].name}
                    </h6>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm leading-tight">
                    <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                    {testimonials[1].text}
                    <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                      "
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="px-3 md:w-1/3">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-4 items-center">
                  <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <Image
                      src={testimonials[2].image}
                      alt={testimonials[2].name}
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10"
                    />
                  </div>
                  <div className="flex-grow pl-3">
                    <h6 className="font-bold text-sm uppercase text-gray-600">
                      {testimonials[2].name}
                    </h6>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm leading-tight">
                    <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                    {testimonials[2].text}
                    <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                      "
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-4 items-center">
                  <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <Image
                      src={testimonials[3].image}
                      alt={testimonials[3].name}
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10"
                    />
                  </div>
                  <div className="flex-grow pl-3">
                    <h6 className="font-bold text-sm uppercase text-gray-600">
                      {testimonials[3].name}
                    </h6>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm leading-tight">
                    <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                    {testimonials[3].text}
                    <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                      "
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="px-3 md:w-1/3">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-4 items-center">
                  <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <Image
                      src={testimonials[4].image}
                      alt={testimonials[4].name}
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10"
                    />
                  </div>
                  <div className="flex-grow pl-3">
                    <h6 className="font-bold text-sm uppercase text-gray-600">
                      {testimonials[4].name}
                    </h6>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm leading-tight">
                    <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                    {testimonials[4].text}
                    <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                      "
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-4 items-center">
                  <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                    <Image
                      src={testimonials[5].image}
                      alt={testimonials[5].name}
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10"
                    />
                  </div>
                  <div className="flex-grow pl-3">
                    <h6 className="font-bold text-sm uppercase text-gray-600">
                      {testimonials[5].name}
                    </h6>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm leading-tight">
                    <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                    {testimonials[5].text}
                    <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                      "
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
