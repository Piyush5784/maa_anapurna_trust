import { Topbar } from "@/components/custom/topbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Maa Anapurna Trust",
  description:
    "Explore Maa Anapurna Trust's four core services: food distribution, tree plantation, clothing assistance, and blood donation camps across Assam.",
};

export default function ServicesPage() {
  return (
    <>
      <Topbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Services in Assam
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Maa Anapurna Trust serves communities across Assam through four
              dedicated programs focused on nourishment, environment, clothing,
              and healthcare.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Service 1 - Food Distribution */}
            <div className="bg-card p-8 rounded-lg shadow-lg border">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Food Distribution</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our flagship program provides nutritious meals and food packages
                to families in need across Assam. We operate mobile kitchens and
                organize community feeding programs, especially during natural
                disasters and emergencies.
              </p>
              {/* <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Daily meal distribution in rural areas</li>
                <li>• Emergency food relief during floods</li>
                <li>• Community kitchen operations</li>
                <li>• Nutritional support for children</li>
              </ul> */}
            </div>

            {/* Service 2 - Tree Plantation */}
            <div className="bg-card p-8 rounded-lg shadow-lg border">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v18m-4-8l4-4 4 4M8 17h8"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Tree Plantation</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We organize tree plantation drives across Assam to combat
                climate change and improve environmental conditions. Our goal is
                to create greener communities and promote environmental
                awareness.
              </p>
              {/* <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Community tree plantation drives</li>
                <li>• Saplings distribution to villages</li>
                <li>• Environmental awareness programs</li>
                <li>• Maintenance of planted areas</li>
              </ul> */}
            </div>

            {/* Service 3 - Clothing Assistance */}
            <div className="bg-card p-8 rounded-lg shadow-lg border">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                Clothing Assistance
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We distribute clothing and essential items to those in need,
                ensuring dignity and comfort for all community members. Special
                focus on providing warm clothes during winter and school
                uniforms for children.
              </p>
              {/* <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Winter clothing distribution</li>
                <li>• School uniforms for children</li>
                <li>• Essential garments for families</li>
                <li>• Blanket distribution drives</li>
              </ul> */}
            </div>

            {/* Service 4 - Blood Donation */}
            <div className="bg-card p-8 rounded-lg shadow-lg border">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                Blood Donation Camps
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We organize regular blood donation camps in partnership with
                local hospitals to save lives. Our volunteers actively
                participate in these life-saving initiatives throughout Assam.
              </p>
              {/* <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Regular blood donation camps</li>
                <li>• Emergency blood collection drives</li>
                <li>• Partnerships with local hospitals</li>
                <li>• Blood donor awareness programs</li>
              </ul> */}
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="bg-primary text-primary-foreground p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              Our Service Impact
            </h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">15,000+</div>
                <div className="text-primary-foreground/80 text-sm">
                  Meals Distributed
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-primary-foreground/80 text-sm">
                  Trees Planted
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">2,000+</div>
                <div className="text-primary-foreground/80 text-sm">
                  Clothing Items Given
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-primary-foreground/80 text-sm">
                  Blood Units Collected
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Join Our Mission in Assam
            </h2>
            <p className="text-muted-foreground mb-6">
              Whether you want to volunteer for food distribution, participate
              in tree plantation, donate clothes, or join our blood donation
              camps, there are many ways to contribute.
            </p>
            <div className="space-x-4">
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Volunteer Now
              </button>
              <button className="border border-input px-6 py-2 rounded-lg hover:bg-accent transition-colors">
                Donate Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
