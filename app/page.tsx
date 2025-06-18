"use client";

import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail } from "lucide-react";
import { Tilt_Warp } from "next/font/google";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

const cameraRoll = ["/3.JPG", "/1.JPG", "/4.JPG", "/2.JPG", "/5.JPG"];

const luckiestGuy = Tilt_Warp({
  subsets: ["latin"],
  weight: "400",
});

const RESUME_DATA = {
  name: "Neel Patel-Shah",
  title: "PRODUCT & FULL STACK ENGINEER",
  contact: {
    email: "neelpatelshahl@gmail.com",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/neelpatelshah",
        icon: Github,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/neel-patel-shah-bb372117b/",
        icon: Linkedin,
      },
    ],
  },
  about:
    "I’m a full-stack engineer with an eye for good UX who can deliver fun, polished products and features on my own or with a team. I can take a vague problem and research, wireframe, build, test, and deliver, with an eye for detail while still making tradeoffs to ship fast and often.",
  skills: [
    "TypeScript",
    "React",
    "React Native",
    "Next.js",
    "Python",
    "FastAPI",
    "PostgreSQL",
  ],
  experience: [
    {
      company: "Somewhere Cool",
      title: "Something Fun",
      date: "TOMORROW",
      description: [
        "I'm uprooting my life and moving to LA for a year , and I'm on the lookout for an opportunity that will let me maximize this life change and keep myself growing while I work on something awesome.",
      ],
      tags: [],
    },
    {
      company: "Lineup",
      title: '"Founder"',
      date: "APRIL 2025",
      description: [
        "Just a personal project to do something fun with concerts and social behavior, two things I'm pretty into. The goal is to get people to care about music and shows for what they are instead of Instagram fodder, through social sharing and discovery. It'd also be pretty cool to build something that boosts small capacity venues and brings out some hidden gems.",
      ],
      tags: ["SwiftUI", "TypeScript", "Ticketmaster API", "Web Scraping"],
    },
    {
      company: "Amaro",
      title: "Founding Engineer",
      date: "APRIL 2024",
      description: [
        "Pivoted through a range of products, building core features on my own and with my team, whatever the situation needed. Built social, then graph based creator tools, then a GenAI powered image editor, and finally an AI powered social media marketing anayltics tool.",
        "As the 5th hire and senior-most member, I helped my team grow, focusing on build and stack decisions, problem solving, and company ops. It was my first time in that position and I hope it's not the last.",
      ],
      tags: [
        "Next.js",
        "React Native",
        "FastAPI",
        "PostgreSQL",
        "GCP",
        "Vercel",
        "GenAI",
        "OpenAI API",
        "Anthropic API",
        "Fabric.js",
      ],
    },
    {
      company: "Le Rock",
      title: "Barback",
      date: "OCTOBER 2023",
      description: [
        "A change of pace. Pursued my interest in cocktail creation and experienced a different industry. Made syrups, juices, garnish, and drinks while supporting bartenders and serving guests. I learned to spend time on my feet, think ahead and think fast, and show up with a smile no matter what. Taking time to work here is one of the better decisions I've made.",
      ],
      tags: [],
    },
    {
      company: "Somethings",
      title: "Founding Engineer",
      date: "NOVEMBER 2022",
      description: [
        "Built a mobile app 0-1 for chat and video calling to give mentors and teens a safe place to connect and help teens work through their problems with they can relate to, who is trained to help them without the therapy waitlists.",
        "Being the 3rd hire, I had my first taste doing recruiting to interviewing to onboarding of other employees, and was actively involved in design, marketing, and ops strategy. It was the first time I really saw myself work in multiple areas as needed and I loved it.",
      ],
      tags: ["React Native", "Sendbird", "Zoom SDK", "AWS S3"],
    },
    {
      company: "Snackpass",
      title: "Software Engineer",
      date: "AUGUST 2020",
      description: [
        "I built a 3D engine inside a mobile app to creative a digital chicken coop game that was social and meant to increase customer engagement. It was a fun project but a wild entry into startups that I am forver grateful for.",
        "I worked on lots of other more traditional full-stack features after this, really launching my career doing product engineering. This stuff ranged from Time & Attendance to building v0 of a first party POS for restaurants.",
      ],
      tags: ["React Native", "Three.js", "API Integration"],
    },
  ],
};

const TimelineItem = ({
  exp,
  scrollYProgress,
  index,
  totalItems,
  isFirst,
}: {
  exp: (typeof RESUME_DATA.experience)[0];
  scrollYProgress: MotionValue<number>;
  index: number;
  totalItems: number;
  isFirst?: boolean;
}) => {
  const start = index / totalItems;
  const end = (index + 1) / totalItems;

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [20, 0]);

  const motionStyle = isFirst ? { opacity: 1, y: 0 } : { opacity, y };

  return (
    <motion.div className="relative py-1" style={motionStyle}>
      <div className="absolute -right-6 top-4 h-[2px] w-4 -translate-y-1/2 bg-muted" />
      <motion.div
        className="absolute -right-6 top-4 h-[2px] w-4 -translate-y-1/2 bg-primary"
        style={{ opacity: isFirst ? 1 : opacity }}
      />
      <div className="flex justify-between items-center">
        <h5 className={`${luckiestGuy.className}`}>
          {exp.title} @ {exp.company}
        </h5>
        <div className="tracking-wider font-light text-muted-foreground">
          {exp.date}
        </div>
      </div>
      <div className="flex flex-col space-y-2 text-sm text-zinc-600">
        {exp.description.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
      </div>
      {exp.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-none">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function PortfolioPage() {
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"],
  });
  const experienceCount = RESUME_DATA.experience.length;

  const nameRef = useRef<HTMLHeadingElement>(null);
  const [nameFontSize, setNameFontSize] = useState(308); // Start with a large size

  useEffect(() => {
    const calculateFontSize = () => {
      if (nameRef.current) {
        const targetWidth = window.innerWidth * 1.03;
        const currentWidth = nameRef.current.scrollWidth;
        const currentFontSize = parseFloat(
          window.getComputedStyle(nameRef.current).fontSize
        );

        if (currentWidth > 0) {
          const newSize = (targetWidth / currentWidth) * currentFontSize;
          setNameFontSize(newSize);
        }
      }
    };

    // Wait for font to be loaded to get correct measurements
    document.fonts.ready.then(() => {
      calculateFontSize();
    });

    window.addEventListener("resize", calculateFontSize);

    return () => {
      window.removeEventListener("resize", calculateFontSize);
    };
  }, []);

  return (
    <main className="mx-0 max-w-screen space-y-4 md:p-0 flex flex-col items-center">
      <SmoothCursor />
      <section className="flex flex-col w-full items-center text-center space-y-1">
        <div
          className="w-full overflow-hidden flex items-end"
          style={{ height: nameFontSize * 0.7 }}
        >
          <h1
            ref={nameRef}
            className={`w-full text-nowrap font-bold tracking-[-0.115em] ${luckiestGuy.className} text-left`}
            style={{
              fontSize: nameFontSize,
              lineHeight: 0.8,
              marginLeft: "-2.5vw",
            }}
          >
            {RESUME_DATA.name}
          </h1>
        </div>
        <div className="flex gap-2 justify-center md:justify-start">
          <a
            href={`mailto:${RESUME_DATA.contact.email}`}
            className="p-1 hover:bg-white hover:text-zinc-500 cursor-none"
          >
            <Mail className="h-4 w-4" />
          </a>
          {RESUME_DATA.contact.social.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-white hover:text-zinc-500 cursor-none"
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <p className="text-sm text-muted-foreground tracking-wider font-light">
          {RESUME_DATA.title}
        </p>
      </section>

      <section className="max-w-4xl">
        <p className="text-zinc-600">{RESUME_DATA.about}</p>
      </section>

      <section ref={timelineRef} className="relative mt-8 max-w-4xl">
        <div className="absolute right-2 top-0 pt-4 pb-48 h-full">
          <div className="h-full w-0.5 translate-x-1/2 bg-muted relative">
            <motion.div
              className="absolute top-0 left-0 h-full w-0.5 translate-x-1/2 origin-top bg-primary"
              style={{ scaleY: scrollYProgress }}
            />
          </div>
        </div>
        <div className="mr-8 pb-12 space-y-12">
          {RESUME_DATA.experience.map((exp, i) => (
            <TimelineItem
              key={exp.company}
              exp={exp}
              scrollYProgress={scrollYProgress}
              index={i}
              totalItems={experienceCount}
              isFirst={i === 0}
            />
          ))}
        </div>
      </section>

      <section className="max-w-4xl">
        <p className="text-zinc-600">
          {
            "Some other things to know about me are that New York City is my favorite place in the world, even if I'm going to live at the beach for a year, that I am a proud California Golden Bear, my main driver in this kind of work is getting to work on problems that include anticipating how users think and behave, and that this is my first swing at a personal website in about 9 years."
          }
        </p>
        <p className="text-zinc-600 mt-2">
          {
            "P.S. I built this in about a day. Scientifically, if you gave me a week, I could make 5 of these."
          }
        </p>
        <p className="text-zinc-200 mt-2 text-xs">
          {
            "I'm kidding I just meant that I can ideate and execute quickly and that days like this stack up."
          }
        </p>
      </section>

      <section className="w-full mt-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-zinc-600 text-right">
            {"Some recent less than perfect exposures to liven up the place."}
          </p>
        </div>
        <div className="flex flex-col w-full mt-4">
          {cameraRoll.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Camera Roll Image ${index + 1}`}
              width={1600}
              height={1200}
              className="object-cover cursor-none w-full h-auto"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
