import { Play } from "lucide-react";

export const Cards = () => {
  return (
    <>
      <div className="md:pt-10  px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Emergency Relief Card */}
          <div
            className="bg-green-600 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-72 sm:h-80 flex flex-col justify-between relative overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/testimonials/boy-eating-food.jpg)",
            }}
          >
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-1 sm:gap-2">
              {/* <button className="bg-black/30 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm">
                Donate now
              </button>
              <button className="bg-white/20 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-1">
                <Play size={12} className="sm:w-4 sm:h-4" /> Watch Video
              </button> */}
            </div>
            <div className="mt-8 sm:mt-12 relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold mb-2">65%</h3>
              <p className="text-xs sm:text-sm opacity-90">
                17 Thousand People Died,
                <br />
                Thousands Injured, Houses
                <br />
                and Buildings Destroyed,
                <br />
                Turkey-Syria Grieves
              </p>
            </div>
            <button className="bg-white/20 text-white px-4 sm:px-6 py-2 rounded-full self-start flex items-center gap-2 text-sm relative z-10">
              Donate now
              <span className="bg-white text-green-600 rounded-full p-1">
                <svg
                  width="12"
                  height="12"
                  className="sm:w-4 sm:h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Health Card */}
          <div
            className=" text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-72 sm:h-80 flex flex-col justify-between relative overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/cards/joinUs.jpeg)",
            }}
          >
            <div className="bg-gray-700/80 rounded-lg p-2 self-start mb-4 relative z-10">
              <span className="text-xs sm:text-sm">Health</span>
            </div>
            <div className="mt-8 sm:mt-12 relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold mb-2">78%</h3>
              <p className="text-xs sm:text-sm opacity-90">
                Lifeskills for
                <br />
                2,587 Children
                <br />
                in South Africa
                <br />
                Health Improvement Rate
              </p>
            </div>
            {/* <button className="bg-white/20 text-white px-4 sm:px-6 py-2 rounded-full self-start flex items-center gap-2 text-sm relative z-10">
              Learn More
              <span className="bg-white text-gray-700 rounded-full p-1">
                <svg
                  width="12"
                  height="12"
                  className="sm:w-4 sm:h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            </button> */}
          </div>

          {/* Join Community Card
          <div
            className="bg-gray-100 border-black border text-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-72 sm:h-80 flex flex-col justify-center items-center text-center sm:col-span-2 lg:col-span-1 bg-cover bg-center relative"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url(/Volenteer.jpeg)",
            }}
          >
            <div className="relative text-white z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                Join 5000+
              </h3>
              <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                People Donate
              </h4>
              <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-2 text-sm sm:text-base">
                Join community
                <span className="bg-white text-black rounded-full p-1">
                  <svg
                    width="12"
                    height="12"
                    className="sm:w-4 sm:h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
              </button>
            </div>
          </div> */}

          {/* Education Card */}
          <div
            className="bg-gray-700 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-72 sm:h-80 flex flex-col justify-between relative overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/cards/littleBoyEatingAvocado.jpg)",
            }}
          >
            <div className="bg-gray-600/80 rounded-lg p-2 self-start mb-4 relative z-10">
              <span className="text-xs sm:text-sm">Education</span>
            </div>
            <div className="mt-8 sm:mt-12 relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold mb-2">92%</h3>
              <p className="text-xs sm:text-sm opacity-90">
                Sponsor food,
                <br />
                education to
                <br />
                Orphans Kenya
                <br />
                Literacy Rate Achieved
              </p>
            </div>
            {/* <button className="bg-white/20 text-white px-4 sm:px-6 py-2 rounded-full self-start flex items-center gap-2 text-sm relative z-10">
              Support Now
              <span className="bg-white text-gray-700 rounded-full p-1">
                <svg
                  width="12"
                  height="12"
                  className="sm:w-4 sm:h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};
