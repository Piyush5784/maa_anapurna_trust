import { Topbar } from "@/components/custom/topbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | MAT",
  description:
    "Learn about our mission, values, and the impact we're making in our community through dedicated service and support.",
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Executive Director",
      bio: "With over 15 years in nonprofit management, Sarah leads our organization with passion and vision.",
      image: "/team/sarah.jpg",
    },
    {
      name: "Michael Chen",
      role: "Program Director",
      bio: "Michael oversees our community programs and ensures we're meeting the needs of those we serve.",
      image: "/team/michael.jpg",
    },
    {
      name: "Dr. Maria Rodriguez",
      role: "Health Services Coordinator",
      bio: "Dr. Rodriguez brings medical expertise and compassion to our health and wellness initiatives.",
      image: "/team/maria.jpg",
    },
    {
      name: "James Thompson",
      role: "Youth Programs Manager",
      bio: "James works with young people in our community, providing mentorship and leadership opportunities.",
      image: "/team/james.jpg",
    },
  ];

  const values = [
    {
      title: "Compassion",
      description:
        "We approach every interaction with empathy and understanding, recognizing the dignity in every person.",
      icon: "heart",
    },
    {
      title: "Integrity",
      description:
        "We are transparent, honest, and accountable in all our actions and use of resources.",
      icon: "shield",
    },
    {
      title: "Empowerment",
      description:
        "We believe in building capacity and helping people achieve self-sufficiency and independence.",
      icon: "trending-up",
    },
    {
      title: "Community",
      description:
        "We foster connections and collaboration, knowing that together we can achieve more.",
      icon: "users",
    },
    {
      title: "Innovation",
      description:
        "We continuously seek creative solutions to address evolving community needs.",
      icon: "lightbulb",
    },
    {
      title: "Excellence",
      description:
        "We strive for the highest standards in our programs and services.",
      icon: "star",
    },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Foundation Established",
      description:
        "MAT was founded by a group of community leaders dedicated to making a difference.",
    },
    {
      year: "2020",
      title: "First Community Center",
      description:
        "Opened our first community center, providing a hub for services and programs.",
    },
    {
      year: "2021",
      title: "1,000 Lives Impacted",
      description:
        "Reached our milestone of helping 1,000 community members through various programs.",
    },
    {
      year: "2022",
      title: "Youth Leadership Program",
      description:
        "Launched our flagship youth development and leadership training program.",
    },
    {
      year: "2023",
      title: "Healthcare Initiative",
      description:
        "Expanded services to include healthcare access and wellness programs.",
    },
    {
      year: "2024",
      title: "Regional Recognition",
      description:
        "Received state recognition for outstanding community service and impact.",
    },
  ];

  return (
    <>
      <Topbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About MAT</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Making A Tomorrow (MAT) is dedicated to creating positive change
              in our community through comprehensive support services,
              education, and empowerment programs.
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
                To empower individuals and families in our community by
                providing essential resources, educational opportunities, and
                support services that promote self-sufficiency, dignity, and
                hope for a better tomorrow.
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
                A community where every person has access to the resources and
                opportunities they need to thrive, regardless of their
                background or circumstances. We envision a future built on
                equity, compassion, and collective prosperity.
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
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From humble beginnings to community-wide impact, here's how
                we've grown over the years.
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

          {/* Impact Statistics */}
          <div className="bg-primary text-primary-foreground p-12 rounded-xl text-center mb-20">
            <h2 className="text-3xl font-bold mb-8">
              Our Impact by the Numbers
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">2,500+</div>
                <div className="text-primary-foreground/80">
                  Lives Transformed
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-primary-foreground/80">
                  Community Partners
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15</div>
                <div className="text-primary-foreground/80">
                  Active Programs
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-primary-foreground/80">
                  Volunteer Hours Monthly
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether through volunteering, donating, or partnering with us,
              there are many ways to get involved and make a difference in our
              community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Volunteer With Us
              </button>
              <button className="border border-input px-8 py-3 rounded-lg hover:bg-accent transition-colors font-medium">
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
