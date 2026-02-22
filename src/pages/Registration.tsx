// open

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { useToast } from "@/hooks/use-toast";
// import { Badge } from "@/components/ui/badge";
// import { Code2, Users, Rocket, CheckCircle2 } from "lucide-react";

// const formSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters").max(100),
//   email: z.string().email("Invalid email address").max(255),
//   phone: z.string().min(10, "Enter a valid phone number").max(15),
//   department: z.string().min(2, "Department is required").max(100),
//   year: z.string().min(1, "Year is required"),
//   rollNumber: z.string().min(2, "Roll number is required").max(50),
//   role: z.string().min(1, "Please select a role interest"),
//   skills: z.string().min(5, "Please mention at least one skill").max(500),
//   experience: z.string().min(1, "Please select your experience level"),
//   whyJoin: z.string().min(20, "Please write at least 20 characters").max(1000),
//   github: z.string().url("Enter a valid URL").optional().or(z.literal("")),
//   linkedin: z.string().url("Enter a valid URL").optional().or(z.literal("")),
// });

// type FormValues = z.infer<typeof formSchema>;

// const perks = [
//   { icon: <Code2 className="h-5 w-5 text-primary" />, text: "Hands-on coding sessions & workshops" },
//   { icon: <Users className="h-5 w-5 text-accent" />, text: "Network with passionate tech students" },
//   { icon: <Rocket className="h-5 w-5 text-primary" />, text: "Work on real-world projects & hackathons" },
//   { icon: <CheckCircle2 className="h-5 w-5 text-accent" />, text: "Club certificate & recognition" },
// ];

// const Registration = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const { toast } = useToast();

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//       department: "",
//       year: "",
//       rollNumber: "",
//       role: "",
//       skills: "",
//       experience: "",
//       whyJoin: "",
//       github: "",
//       linkedin: "",
//     },
//   });

//   const onSubmit = async (data: FormValues) => {
//     setIsSubmitting(true);
//     await new Promise(resolve => setTimeout(resolve, 1200));
//     console.log("Club membership submission:", data);
//     toast({
//       title: "Application submitted! 🎉",
//       description: "Welcome to Code Wizards! We'll review your application and reach out via email soon.",
//     });
//     setSubmitted(true);
//     setIsSubmitting(false);
//   };

//   if (submitted) {
//     return (
//       <div className="min-h-screen py-20 flex items-center justify-center">
//         <div className="container mx-auto px-4">
//           <Card className="max-w-2xl mx-auto glass-card border-none text-center">
//             <CardContent className="p-12 space-y-6">
//               <div className="flex justify-center">
//                 <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
//                   <CheckCircle2 className="h-10 w-10 text-primary" />
//                 </div>
//               </div>
//               <h1 className="text-4xl font-bold">You're In! 🚀</h1>
//               <p className="text-muted-foreground text-lg leading-relaxed">
//                 Your membership application has been received. Our team will review it and get back to you at your email within <strong>3–5 working days</strong>.
//               </p>
//               <p className="text-muted-foreground">
//                 Meanwhile, follow us on{" "}
//                 <a href="https://instagram.com/codewizards" target="_blank" rel="noopener noreferrer" className="text-primary underline">Instagram</a>{" "}
//                 &{" "}
//                 <a href="https://linkedin.com/company/codewizards" target="_blank" rel="noopener noreferrer" className="text-accent underline">LinkedIn</a>{" "}
//                 to stay updated!
//               </p>
//               <Button variant="outline" onClick={() => { setSubmitted(false); form.reset(); }}>
//                 Submit Another Application
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-20">
//       <div className="container mx-auto px-4">

//         {/* Header */}
//         <div className="text-center mb-16 animate-fade-in space-y-4">
//           <Badge className="text-sm px-4 py-1.5 mb-2">Membership Open</Badge>
//           <h1 className="text-5xl sm:text-7xl font-normal tracking-tight">
//             Join{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
//               Code Wizards
//             </span>
//           </h1>
//           <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
//             Become a member of our student-driven tech community. Build, learn, and grow together.
//           </p>
//         </div>

//         <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

//           {/* Perks Sidebar */}
//           <div className="space-y-6 lg:sticky lg:top-24">
//             <Card className="glass-card border-none">
//               <CardHeader>
//                 <CardTitle className="text-lg">Why Join Us?</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {perks.map((perk, i) => (
//                   <div key={i} className="flex items-start gap-3">
//                     <div className="mt-0.5 flex-shrink-0">{perk.icon}</div>
//                     <p className="text-sm text-muted-foreground leading-relaxed">{perk.text}</p>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>

//             <Card className="glass-card border-none">
//               <CardContent className="p-5 space-y-2">
//                 <p className="text-sm font-semibold text-primary">📬 Questions?</p>
//                 <p className="text-sm text-muted-foreground">
//                   Reach us at{" "}
//                   <a href="mailto:codewizards.atu@gmail.com" className="underline text-foreground">
//                     codewizards.atu@gmail.com
//                   </a>
//                 </p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Main Form */}
//           <div className="lg:col-span-2">
//             <Card className="glass-card border-none">
//               <CardHeader>
//                 <CardTitle className="text-2xl">Membership Application</CardTitle>
//                 <CardDescription>
//                   Fill in your details below. All fields marked with * are required.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Form {...form}>
//                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

//                     {/* Personal Info */}
//                     <div className="space-y-4">
//                       <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
//                         Personal Information
//                       </h3>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <FormField
//                           control={form.control}
//                           name="name"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Full Name *</FormLabel>
//                               <FormControl>
//                                 <Input placeholder="e.g. Arjun Sharma" {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         <FormField
//                           control={form.control}
//                           name="email"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Email Address *</FormLabel>
//                               <FormControl>
//                                 <Input type="email" placeholder="you@example.com" {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                       <FormField
//                         control={form.control}
//                         name="phone"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Phone Number *</FormLabel>
//                             <FormControl>
//                               <Input type="tel" placeholder="e.g. 9876543210" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>

//                     {/* Academic Info */}
//                     <div className="space-y-4">
//                       <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
//                         Academic Details
//                       </h3>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <FormField
//                           control={form.control}
//                           name="department"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Department *</FormLabel>
//                               <FormControl>
//                                 <Input placeholder="e.g. Computer Science" {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         <FormField
//                           control={form.control}
//                           name="rollNumber"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Roll Number *</FormLabel>
//                               <FormControl>
//                                 <Input placeholder="e.g. CS2023001" {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                       <FormField
//                         control={form.control}
//                         name="year"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Year of Study *</FormLabel>
//                             <Select onValueChange={field.onChange} defaultValue={field.value}>
//                               <FormControl>
//                                 <SelectTrigger>
//                                   <SelectValue placeholder="Select your year" />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent>
//                                 <SelectItem value="1">1st Year</SelectItem>
//                                 <SelectItem value="2">2nd Year</SelectItem>
//                                 <SelectItem value="3">3rd Year</SelectItem>
//                                 <SelectItem value="4">4th Year</SelectItem>
//                               </SelectContent>
//                             </Select>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>

//                     {/* Club Interest */}
//                     <div className="space-y-4">
//                       <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
//                         Club Interest & Skills
//                       </h3>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <FormField
//                           control={form.control}
//                           name="role"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Area of Interest *</FormLabel>
//                               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                 <FormControl>
//                                   <SelectTrigger>
//                                     <SelectValue placeholder="What excites you most?" />
//                                   </SelectTrigger>
//                                 </FormControl>
//                                 <SelectContent>
//                                   <SelectItem value="web-dev">Web Development</SelectItem>
//                                   <SelectItem value="app-dev">App Development</SelectItem>
//                                   <SelectItem value="ml-ai">ML / AI</SelectItem>
//                                   <SelectItem value="dsa-cp">DSA & Competitive Programming</SelectItem>
//                                   <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
//                                   <SelectItem value="open-source">Open Source</SelectItem>
//                                   <SelectItem value="design">UI/UX & Design</SelectItem>
//                                   <SelectItem value="management">Event Management</SelectItem>
//                                   <SelectItem value="content">Content & Social Media</SelectItem>
//                                   <SelectItem value="other">Other</SelectItem>
//                                 </SelectContent>
//                               </Select>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         <FormField
//                           control={form.control}
//                           name="experience"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Experience Level *</FormLabel>
//                               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                 <FormControl>
//                                   <SelectTrigger>
//                                     <SelectValue placeholder="How experienced are you?" />
//                                   </SelectTrigger>
//                                 </FormControl>
//                                 <SelectContent>
//                                   <SelectItem value="beginner">Beginner – Just starting out</SelectItem>
//                                   <SelectItem value="intermediate">Intermediate – Some projects done</SelectItem>
//                                   <SelectItem value="advanced">Advanced – Strong portfolio</SelectItem>
//                                 </SelectContent>
//                               </Select>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                       <FormField
//                         control={form.control}
//                         name="skills"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Skills / Technologies *</FormLabel>
//                             <FormControl>
//                               <Input placeholder="e.g. Python, React, Figma, C++" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="whyJoin"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Why do you want to join Code Wizards? *</FormLabel>
//                             <FormControl>
//                               <Textarea
//                                 placeholder="Tell us your motivation, what you hope to contribute, and what you'd like to gain from the club..."
//                                 className="min-h-[120px] resize-none"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>

//                     {/* Social Links (Optional) */}
//                     <div className="space-y-4">
//                       <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
//                         Social Links <span className="normal-case font-normal">(optional)</span>
//                       </h3>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <FormField
//                           control={form.control}
//                           name="github"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>GitHub Profile</FormLabel>
//                               <FormControl>
//                                 <Input placeholder="https://github.com/username" {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         <FormField
//                           control={form.control}
//                           name="linkedin"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>LinkedIn Profile</FormLabel>
//                               <FormControl>
//                                 <Input placeholder="https://linkedin.com/in/username" {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                     </div>

//                     <Button
//                       type="submit"
//                       className="w-full gradient-primary text-base py-6 font-semibold"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? "Submitting Application..." : "Submit Membership Application 🚀"}
//                     </Button>

//                     <p className="text-xs text-center text-muted-foreground">
//                       By submitting, you agree to be contacted by Code Wizards regarding your membership.
//                     </p>
//                   </form>
//                 </Form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Registration;

// closed 
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { site } from "@/data/site";
import { CalendarClock, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div className="min-h-screen py-20 flex items-center justify-center">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <Badge variant="outline" className="text-sm px-4 py-1.5 border-muted-foreground/40 text-muted-foreground">
            Membership Closed
          </Badge>
          <h1 className="text-5xl sm:text-7xl font-normal tracking-tight">
            Join{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Code Wizards
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Become a member of our student-driven tech community and grow with us.
          </p>
        </div>

        {/* Closed Notice Card */}
        <Card className="max-w-2xl mx-auto glass-card border-none">
          <CardContent className="p-10 sm:p-14 flex flex-col items-center text-center space-y-6">

            {/* Icon */}
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
              <CalendarClock className="h-9 w-9 text-primary" />
            </div>

            {/* Message */}
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold">Registrations are Closed</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Club membership for the current academic year is now closed. New registrations will open at the start of the{" "}
                <span className="text-foreground font-medium">2026–27 academic year</span>.
              </p>
              <p className="text-muted-foreground">
                Follow our social media channels for the official announcement when registrations open again!
              </p>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-border" />

            {/* Stay Connected */}
            <div className="space-y-3 w-full">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Stay Updated</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium w-full sm:w-auto justify-center"
                >
                  <Instagram className="h-4 w-4 text-pink-500" />
                  Instagram
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium w-full sm:w-auto justify-center"
                >
                  <Linkedin className="h-4 w-4 text-blue-500" />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium w-full sm:w-auto justify-center"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  Email Us
                </a>
              </div>
            </div>

            {/* Back to Home */}
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              ← Back to Home
            </Link>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Registration;
