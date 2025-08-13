import { Topbar } from "@/components/custom/topbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Maa Anapurna Trust",
  description:
    "Learn about Maa Anapurna Trust's mission to feed communities, plant trees, provide clothing, and organize blood donation camps across Assam.",
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Raj Poddar",
      role: "Founder & Chairman",
      bio: "A dedicated social worker from Assam who started Maa Anapurna Trust with the vision of eliminating hunger from the state.",
      image: "/team/ramesh.jpg",
    },
    {
      name: "Mira Devi",
      role: "President",
      bio: "Dr. Kalita oversees our blood donation camps and ensures medical safety protocols in all our health-related activities.",
      image: "/team/priya.jpg",
    },
    {
      name: "Guddu Shah",
      role: "Co-founder",
      bio: "Leading our tree plantation initiatives across Assam, Mukesh has coordinated the planting of over 10,000 trees.",
      image: "/team/mukesh.jpg",
    },
    {
      name: "Unknown Person",
      role: "Community Outreach Manager",
      bio: "Anita manages our food and clothing distribution programs, ensuring we reach the most vulnerable communities in rural Assam.",
      image: "/team/anita.jpg",
    },
  ];

  const values = [
    {
      title: "Compassion",
      description:
        "We serve with love and empathy, treating every person with dignity and respect, regardless of their circumstances.",
      icon: "heart",
    },
    {
      title: "Service",
      description:
        "Our commitment to selfless service drives us to help those in need through food, clothing, and environmental care.",
      icon: "shield",
    },
    {
      title: "Community",
      description:
        "We believe in the power of community action and work together with volunteers to create lasting positive change.",
      icon: "users",
    },
    {
      title: "Sustainability",
      description:
        "Through tree plantation and environmental initiatives, we work towards a greener and more sustainable Assam.",
      icon: "trending-up",
    },
    {
      title: "Health & Wellness",
      description:
        "Our blood donation camps and health initiatives ensure the well-being of our community members.",
      icon: "lightbulb",
    },
    {
      title: "Transparency",
      description:
        "We maintain complete transparency in our operations and ensure every donation reaches those who need it most.",
      icon: "star",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Foundation Established",
      description:
        "Maa Anapurna Trust was founded in Assam with the mission to eliminate hunger and support communities in need.",
    },
    {
      year: "2019",
      title: "First Food Distribution",
      description:
        "Launched our first food distribution program, serving 200 families in rural Assam during the monsoon floods.",
    },
    {
      year: "2020",
      title: "Tree Plantation Initiative",
      description:
        "Started our environmental program with the planting of 1,000 saplings across various districts in Assam.",
    },
    {
      year: "2021",
      title: "Blood Donation Camps",
      description:
        "Organized our first blood donation camp, collecting 100 units of blood for local hospitals during the pandemic.",
    },
    {
      year: "2022",
      title: "Clothing Distribution Program",
      description:
        "Launched clothing assistance program, providing warm clothes to over 500 families during harsh winters.",
    },
    {
      year: "2023",
      title: "5,000 Lives Impacted",
      description:
        "Reached the milestone of directly helping 5,000 individuals through our four core programs across Assam.",
    },
    {
      year: "2024",
      title: "Community Recognition",
      description:
        "Received recognition from the Assam government for outstanding community service and disaster relief efforts.",
    },
  ];

  return (
    <>
      <Topbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Maa Anapurna Trust
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Named after the Hindu goddess of food and nourishment, Maa
              Anapurna Trust is dedicated to serving communities across Assam
              through food distribution, tree plantation, clothing assistance,
              and blood donation programs.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-primary/5 p-8 rounded-xl border border-primary/10">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To nourish and support communities across Assam by providing
                essential food assistance, promoting environmental
                sustainability through tree plantation, distributing clothing to
                those in need, and organizing life-saving blood donation camps.
              </p>
            </div>

            <div className="bg-secondary/5 p-8 rounded-xl border border-secondary/10">
              <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-secondary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To create a hunger-free, environmentally sustainable Assam where
                every individual has access to nutritious food, adequate
                clothing, and healthcare support. We envision thriving
                communities built on compassion, environmental stewardship, and
                collective care.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do and shape how we serve
                our community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, idx) => (
                <div
                  key={idx}
                  className="bg-card p-6 rounded-lg border shadow-sm"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {value.icon === "heart" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      )}
                      {value.icon === "shield" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      )}
                      {value.icon === "trending-up" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      )}
                      {value.icon === "users" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      )}
                      {value.icon === "lightbulb" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      )}
                      {value.icon === "star" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      )}
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Story / Timeline */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Journey in Assam</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From a small initiative to feed the hungry to a comprehensive
                community service organization serving thousands across Assam.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>

              <div className="space-y-12">
                {milestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    className={`relative flex items-center ${
                      idx % 2 === 0 ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full border-4 border-background md:transform md:-translate-x-1/2 z-10"></div>

                    {/* Content */}
                    <div
                      className={`ml-12 md:ml-0 md:w-5/12 ${
                        idx % 2 === 0
                          ? "md:mr-auto md:pr-8"
                          : "md:ml-auto md:pl-8"
                      }`}
                    >
                      <div className="bg-card p-6 rounded-lg border shadow-sm">
                        <div className="text-2xl font-bold text-primary mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-lg font-semibold mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our dedicated team of professionals and volunteers work
                tirelessly to serve our community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-muted-foreground"
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
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Join Our Mission in Assam
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether through volunteering at food distribution drives,
              participating in tree plantation, donating clothes, or joining
              blood donation camps, there are many ways to contribute to our
              cause in Assam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Volunteer With Us
              </button>
              <button className="border  border-input px-8 py-3 rounded-lg hover:bg-accent transition-colors font-medium">
                Make a Donation
              </button>
              <button className="border border-input px-8 py-3 rounded-lg hover:bg-accent transition-colors font-medium">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
