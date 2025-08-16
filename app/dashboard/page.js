import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Twitter, Briefcase } from 'lucide-react'; // Import relevant icons

// Array to hold our tool information - makes it easy to add more later!
const tools = [
  {
    title: 'Viral Tweet Hook Generator',
    description: 'Generate catchy, attention-grabbing hooks for your tweets.',
    href: '/dashboard/tools/hook-generator',
    icon: <Twitter className="h-8 w-8 text-sky-500" />,
    bgColor: 'bg-sky-50',
  },
  {
    title: 'AI Career Co-pilot',
    description: 'Tailor your resume and prepare for interviews for a specific job.',
    href: '/dashboard/tools/career-copilot',
    icon: <Briefcase className="h-8 w-8 text-emerald-500" />,
    bgColor: 'bg-emerald-50',
  },
  // You can easily add a new tool here in the future
  // {
  //   title: 'New Tool Coming Soon',
  //   description: 'A description for the next amazing tool.',
  //   href: '#',
  //   icon: <AnotherIcon />,
  // },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tools Dashboard</h1>
        <p className="text-gray-500">
          Select a tool below to get started.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link href={tool.href} key={tool.title}>
            <Card className="hover:shadow-lg hover:border-gray-300 transition-all duration-200 ease-in-out h-full flex flex-col">
              <CardHeader>
                <div className={`mb-4 p-3 rounded-lg w-fit ${tool.bgColor}`}>
                  {tool.icon}
                </div>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}