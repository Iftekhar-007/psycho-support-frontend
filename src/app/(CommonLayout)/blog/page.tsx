// import React from "react";

// const BlogPage = () => {
//   return <div className="min-h-screen">Okay here blog page</div>;
// };

// export default BlogPage;

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { Search, Calendar, Clock3, ArrowRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Understanding Anxiety Disorders",
    description:
      "Learn how anxiety affects daily life and discover evidence-based coping strategies.",
    image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800",
    author: "Dr. Sarah Ahmed",
    category: "Psychology",
    date: "July 14, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Science of Better Sleep",
    description:
      "Explore how sleep influences mental health and cognitive performance.",
    image: "https://images.unsplash.com/photo-1455642305367-68834a7b598e?w=800",
    author: "Dr. Hasan",
    category: "Mental Health",
    date: "July 12, 2026",
    readTime: "7 min read",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen max-w-9/12 mx-auto">
      <section className="space-y-5 text-center py-16">
        <Badge>Psychology Support</Badge>

        <h1 className="text-5xl font-bold">Our Latest Blogs</h1>

        <p className="mx-auto max-w-2xl text-muted-foreground">
          Discover evidence-based psychology articles, mental health tips and
          research written by professionals.
        </p>

        <div className="mx-auto max-w-lg relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search blogs..." className="pl-10" />
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <Badge variant="default">All</Badge>
        <Badge variant="secondary">Psychology</Badge>
        <Badge variant="secondary">Research</Badge>
        <Badge variant="secondary">Depression</Badge>
        <Badge variant="secondary">Therapy</Badge>
        <Badge variant="secondary">Stress</Badge>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-52 w-full object-cover"
            />

            <CardHeader>
              <Badge className="w-fit">{blog.category}</Badge>

              <h2 className="text-xl font-semibold leading-7">{blog.title}</h2>

              <p className="text-muted-foreground">{blog.description}</p>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {blog.date}
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="h-4 w-4" />
                {blog.readTime}
              </div>
            </CardContent>

            <Separator />

            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {blog.author
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <span className="text-sm">{blog.author}</span>
              </div>

              <Button variant="ghost">
                Read
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
