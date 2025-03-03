'use client'
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { css, cx } from '@emotion/css';
import Head from 'next/head';
import { FcMultipleDevices,FcSettings,FcApproval} from "react-icons/fc";
import { IoIosPlayCircle } from "react-icons/io";
import { FaQuoteLeft } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa"
import { useState, useEffect, useRef } from 'react'

const programs = [
  {
    title: "Engineering Programs",
    description: "Build the future with our engineering programs. Explore mechanical, electrical, civil, and more through practical applications and real-world problem-solving. Gain hands-on experience and shape the world.",
    image: "https://exploreengineering.ca/sites/default/files/2020-02/NEM_mechanical.jpg",
    href: "/courses?search=ENGINEERING"
  },
  {
    title: "Science Programs",
    description: "Stay curious and explore the wonders of nature with our innovative science programs. Dive into subjects like astrophysics, biology, chemistry, and more through immersive experiments and real-world applications.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80",
    href: "/courses?search=PHYSICS,CHEMISTRY"
  },
  {
    title: "Technology Programs",
    description: "Stay ahead in the tech world with our advanced technology programs. Master programming, AI, cybersecurity, and more through hands-on learning and real-world projects.Gain in-demand skills to innovate and excel in the digital era.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
    href: "/courses?search=FRONTEND,PROGRAMMING"
  }
]

const features = [
  {
    icon: <FcMultipleDevices />,
    title: "Digital Platform",
    description: "Access our comprehensive e-learning platform designed for modern needs"
  },
  {
    icon: "💡",
    title: "Optimal Ideation",
    description: "Innovative teaching and learning approaches for better understanding"
  },
  {
    icon: <FcSettings />,
    title: "Favorable Setting",
    description: "Create the perfect learning environment that suits your schedule and preferences"
  },
  {
    icon: "🤝",
    title: "Effective Interaction",
    description: "Engage with instructors and peers through our interactive learning tools"
  },
  {
    icon: "⏰",
    title: "Flexible Time",
    description: "Learn at your own pace with flexible scheduling options"
  },
  {
    icon: <FcApproval />,
    title: "Reliable",
    description: "Trusted by thousands of students with consistently high satisfaction rates"
  }
]

const enrollmentSteps = [
  { number: "01", title: "Choose a Program" },
  { number: "02", title: "Enroll and Submit Documents" },
  { number: "03", title: "Choose a Date and Time" },
  { number: "04", title: "Pick an Instructor" },
  { number: "05", title: "Then Start" }
]

const Circle1 = () => {
  const circleStyle = css`
    width: 180px;
    height: 180px;
    background-color: #fccf47;
    border-radius: 50%;
    position: relative;
    transform: translate(-90%, -95%);
  `;

  return (
    <div className={cx(circleStyle)}></div>
  );
};

const Circle2 = () => {
  const circleStyle = css`
    width: 130px;
    height: 130px;
    background-color: #fccf47;
    border-radius: 50%;
    position: relative;
    transform: translate(835%, -240%);
  `;

  return (
    <div className={cx(circleStyle)}></div>
  );
};

const Circle3 = () => {
  const circleStyle = css`
    width: 200px;
    height: 200px;
    background-color: #5f60ec;
    border-radius: 50%;
    position: relative;
    transform: translate(-240%, 860%);
    z-index: 1;
  `;

  return (
    <div className={cx(circleStyle)}></div>
  );
};

const Circle4 = () => {
  const circleStyle = css`
    width: 150px;
    height: 150px;
    background-color: #5f60ec;
    border-radius: 50%;
    position: relative;
    transform: translate(480%, 1625%);
    z-index: 1;
  `;

  return (
    <div className={cx(circleStyle)}></div>
  );
};

function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const enrollmentRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToEnrollment = () => {
    if (enrollmentRef.current) {
      enrollmentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (window.location.hash === "#about") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    
    const handleHashChange = () => {
      if (window.location.hash === "#about") {
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <main className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl tracking-tight">
                Online <span className="text-indigo-500 font-bold">Learning</span> <br />
                <span className="text-indigo-500 font-bold">you can access</span> any<br />
                where easily!
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Transform your life through education. World-class courses from expert instructors anywhere, anytime. Start your learning journey today!
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Button size="lg" asChild className="text-black font-bold bg-gradient-to-r from-amber-300 to-amber-400">
                  <Link href="/courses">JOIN COURSE</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-none pl-5 font-bold" onClick={scrollToEnrollment}>
                  <Play className="mr-2 h-4 w-4" />
                  See how it works?
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
                alt="Student learning online"
                width={600}
                height={600}
                className="rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-indigo-500 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-0 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white">150+</div>
              <div className="mt-2 text-primary-foreground">Total Courses</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white">250</div>
              <div className="mt-2 text-primary-foreground">Total Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-white">35K+</div>
              <div className="mt-2 text-primary-foreground">Total Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* Circle Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-left items-center">
            <Circle1 />
            <Circle2 />
            <Circle3 />
            <Circle4 />
          </div>
        </div>
      </section>

      {/* Why we are better section */}
      <section className="-translate-y-28">
        <section className="bg-slate-50">
          <div className="-translate-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl text-center mb-16 -translate-y-5">
              <span className="font-bold text-indigo-500">Why we are</span> better than others?
            </h1>
            <div className="text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-center text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="pt-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl text-center mb-20">
              <span className="text-indigo-500 font-bold">About</span> Eduminati
            </h2>
            <div className="relative rounded-[2.5vw] overflow-hidden mb-20">
              <Image
                src="https://i0.wp.com/corwin-connect.com/wp-content/uploads/2023/06/pexels-tima-miroshnichenko-5428003-scaled.jpg?resize=1200%2C800&ssl=1"
                alt="Students in classroom"
                width={1000}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <IoIosPlayCircle className="text-white text-8xl transition-transform transform hover:scale-110 hover:text-slate-400 duration-200 drop-shadow-lg cursor-pointer" />
              </div>
            </div>
          </div>
        </section>
    
        {/* Enrollment Process Section */}
        <section ref={enrollmentRef} className="bg-amber-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/student.png"
                  alt="Student enrolling"
                  width={600}
                  height={600}
                  className="rounded-2xl -translate-x-5"
                />
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-10">Effortless Enrollment</h1>
                <div className="space-y-6">
                  {enrollmentSteps.map((step) => (
                    <div
                      key={step.number}
                      className="flex items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-3xl font-bold text-primary mr-2">{step.number}</span>
                      <span className="text-2xl mr-2 text-black text-opacity-40">|</span>
                      <span className="text-xl font-bold">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="bg-slate-50 pt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl text-center mb-20">
              <span className="font-bold text-indigo-500">Our</span> Programs
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="px-6 pt-6 pb-4 flex justify-center flex-col gap-3">
                    <h3 className="text-center text-xl font-semibold">{program.title}</h3>
                    <p className="text-center text-muted-foreground pb-2">{program.description}</p>
                    <Link href={program.href} className="flex justify-center">
                      <Button className="mx-auto w-40 p-6 bg-amber-300 hover:bg-amber-400" variant="outline">READ MORE</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="pt-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl text-center mb-12">
              <span className="font-bold text-indigo-500">What</span> our students Say
            </h1>
            <FaQuoteLeft className="text-5xl" />
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white p-8 rounded-2xl relative">
              <p className="text-lg text-center mb-8 relative z-10">
              This e-learning platform has completely changed the way I study. The courses are well-structured, 
              interactive, and easy to follow. The hands-on projects and expert guidance helped me gain real-world skills.
               Highly recommended for anyone looking to upskill!
              </p>
            </div>
            <div className="flex items-center flex-col gap-2 transform -translate-y-10">
              <div className="flex items-center border-4 border-gray-200 rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                  alt="James Thomas"
                  width={100}
                  height={100}
                  className="rounded-xl"
                />
              </div>
              <div>
                <div className="font-semibold text-center text-xl">Amit S.</div>
                <div className="text-sm opacity-75 text-center">INDIA</div>
              </div>
            </div>
          </div>
        </section>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-100 right-12 text-indigo-500 hover:text-indigo-600 transition-all duration-300 z-50"
            aria-label="Scroll to top"
          >
            <FaArrowCircleUp className="text-5xl" />
          </button>
        )}

        {/* Footer */}
        <footer className="bg-[#0F172A] text-white pt-20 pb-20 transform translate-y-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div>
                <Link href="/" className="flex items-center space-x-2 mb-6">
                  <span className="text-2xl font-bold">Edu<span className="text-indigo-500">minati</span></span>
                </Link>
                <p className="text-gray-400 mb-6">
                  Transform your life through education. World-class courses from expert instructors!
                </p>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    <FaFacebook className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    <FaInstagram className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    <FaYoutube className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    <FaTwitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/courses" className="text-gray-400 hover:text-white transition-colors">
                      Our Courses
                    </Link>
                  </li>
                  <li>
                    <Link href="/teachers" className="text-gray-400 hover:text-white transition-colors">
                      Our Teachers
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6">Support</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
                <ul className="space-y-4 text-gray-400">
                  <li>
                    <p>1234 Education Street</p>
                    <p>Learning City, ED 12345</p>
                  </li>
                  <li>
                    <p>+1 (555) 123-4567</p>
                  </li>
                  <li>
                    <p>support@eduminati.com</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm mb-4 md:mb-0">
                  © {new Date().getFullYear()} Eduminati. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Terms
                  </Link>
                  <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Privacy
                  </Link>
                  <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Cookies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </main>
  )
}

export default Home