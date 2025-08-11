import Image from "next/image";
const testimonials = [
  {
    name: "Robert Johnson",
    image: "/testimonials/boy-eating-food.jpg",
    text: "Being part of their volunteer program has been life-changing. Seeing the direct impact we make in people's lives is incredibly rewarding.",
  },
  {
    name: "Maria Santos",
    image: "/testimonials/child1.jpg",
    text: "Thanks to this amazing organization, my children now have access to nutritious meals every day. They've helped transform our entire community.",
  },
  {
    name: "James Mitchell",
    image: "/testimonials/childrens.jpeg",
    text: "The education programs have given our children hope for a better future. We've seen remarkable improvements in literacy rates since they started working here.",
  },
  {
    name: "Fatima Al-Rahman",
    image: "/testimonials/clothes.jpg",
    text: "The school supplies and educational resources provided have made such a difference. Our students are more engaged and excited about learning.",
  },
  {
    name: "David Brown",
    image: "/testimonials/group.jpg",
    text: "Professional and creative! They transformed my space into something extraordinary. I’m still amazed at the final result.",
  },
  {
    name: "Amara Okafor",
    image: "/testimonials/Volenteer.jpeg",
    text: "When my family lost everything, they provided us with clothing, food, and hope. Their kindness and support helped us get back on our feet.",
  },
  {
    name: "Dr. Sarah Chen",
    image: "/testimonials/plants.jpg",
    text: "Their tree planting initiatives are making a real difference in combating climate change. The reforestation projects have restored entire ecosystems.",
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
              transformed through our work together
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
                      Kenzie Edgar.
                    </h6>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm leading-tight">
                    <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                      "
                    </span>
                    The service was outstanding! From start to finish, the team
                    was professional and attentive to all my needs. Highly
                    recommend!
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
                      Stevie Tifft.
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
                      Tommie Ewart.
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
                      Charlie Howse.
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
                      Nevada Herbertson.
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
                      Kris Stanton.
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
