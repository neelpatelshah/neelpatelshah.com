"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import { Tilt_Warp } from "next/font/google";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import React from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const luckiestGuy = Tilt_Warp({
  subsets: ["latin"],
  weight: "400",
});

const RESUME_DATA = {
  name: "Neel Patel-Shah",
  title: "PRODUCT & FULL STACK ENGINEER",
  contact: {
    email: "neel@example.com",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/your-github",
        icon: Github,
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/your-linkedin",
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
      company: "Amaro",
      title: "Founding Engineer",
      date: "April 2024 - Present",
      description: [
        "Worked on multiple products and features using NextJS, React Native, FastAPI, Postgres, GCP, Vercel (+ AI SDK), countless GenAI APIs, OpenAI & Anthropic APIs, FabricJS, and more.",
        "Built two core product features, both solo and in tandem with team members, from rudimentary design to polished, responsive, platform enriching features. Oversaw development of the entire dashboard for the analytics product.",
        "As the 5th hire and senior-most member, I led professional development and training, focusing on build and stack decisions, problem solving, and company ops.",
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
      company: "Somethings",
      title: "Founding Engineer",
      date: "November 2022 - August 2023",
      description: [
        "Built a mobile app 0-1 with React Native and a full backend, using Sendbird, Zoom Video SDK, S3, and other integrations to create a unique chat and video calling app.",
        "Developed user-collected, PLG focused, and formulaically inferred metrics to measure user satisfaction, averaging 4/5 on user enjoyment.",
        "Core role in growth from being the 3rd hire, from recruiting to interviewing to onboarding, and was actively involved in design, marketing, and ops strategy.",
      ],
      tags: ["React Native", "Sendbird", "Zoom SDK", "AWS S3"],
    },
    {
      company: "Snackpass",
      title: "Software Engineer",
      date: "August 2020 - July 2022",
      description: [
        "Lead on a 3D rewards-based game in React Native to promote app interaction, reaching 12% (70k+) WAU.",
        "Lead on mobile-order integration to expand storefronts to Uber Eats, GrubHub, etc., leveraging third-party APIs for menu sync and order intake.",
      ],
      tags: ["React Native", "Three.js", "API Integration"],
    },
    {
      company: "Le Rock",
      title: "Barback",
      date: "October 2023 - April 2024",
      description: [
        "A change of pace. Pursued my interest in cocktail creation and experienced a different industry. Made syrups, juices, garnish, and drinks while supporting bartenders and serving guests.",
      ],
      tags: [],
    },
    {
      company: "Lineup",
      title: '"Founder"',
      date: "April 2025 - Present",
      description: [
        "Current personal project to socialize concert-going. Uses Ticketmaster API, scrapers, and workers to keep events synced. Building natively in SwiftUI (plus TS).",
      ],
      tags: ["SwiftUI", "TypeScript", "Ticketmaster API", "Web Scraping"],
    },
  ],
};

const TimelineItem = ({
  exp,
  scrollYProgress,
  index,
  totalItems,
}: {
  exp: (typeof RESUME_DATA.experience)[0];
  scrollYProgress: MotionValue<number>;
  index: number;
  totalItems: number;
}) => {
  const start = index / totalItems;
  const end = (index + 1) / totalItems;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.div
      className="relative py-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute -left-6 top-4 h-[2px] w-3 -translate-y-1/2 bg-muted" />
      <motion.div
        className="absolute -left-6 top-4 h-[2px] w-3 -translate-y-1/2 bg-primary"
        style={{ opacity }}
      />
      <div className="flex flex-col">
        <div className="text-sm text-muted-foreground">{exp.date}</div>
        <h5>
          {exp.title} @ {exp.company}
        </h5>
      </div>
      <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
        {exp.description.map((desc, i) => (
          <li key={i}>{desc}</li>
        ))}
      </ul>
      {exp.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
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

  return (
    <main className="mx-auto max-w-4xl space-y-4 md:p-0">
      <ScrollProgress className="top-0" />
      <SmoothCursor />
      <section className="flex flex-col w-full items-center text-center">
        <div className="flex w-full justify-between">
          <h1
            className={`text-[96px]/[72px] font-bold tracking-tight ${luckiestGuy.className}`}
          >
            {RESUME_DATA.name}
          </h1>
          <div className="flex flex-col gap-2 justify-center md:justify-start">
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
        </div>
        <p className="text-xl text-muted-foreground tracking-wider">
          {RESUME_DATA.title}
        </p>
      </section>

      <section>
        <p className="text-muted-foreground">{RESUME_DATA.about}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {RESUME_DATA.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="rounded-none">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      <section ref={timelineRef} className="relative">
        <div className="absolute left-2 top-0 h-full w-0.5 -translate-x-1/2 bg-muted" />
        <motion.div
          className="absolute left-2 top-0 h-full w-0.5 -translate-x-1/2 origin-top bg-primary"
          style={{ scaleY: scrollYProgress }}
        />
        <div className="ml-8 space-y-8">
          {RESUME_DATA.experience.map((exp, i) => (
            <TimelineItem
              key={exp.company}
              exp={exp}
              scrollYProgress={scrollYProgress}
              index={i}
              totalItems={experienceCount}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
