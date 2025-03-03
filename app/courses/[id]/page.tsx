import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  // Return an array of possible values for [id]
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
    // Add more IDs as needed
  ]
}

const reviews = [
  {
    id: 1,
    name: "Leonardo Da Vinci",
    avatar:
      "https://ui-avatars.com/api/?name=L+V&background=random",
    comment:
      "Loved the course. I've learned some very subtle techniques, especially on leaves.",
  },
  {
    id: 2,
    name: "Titania S",
    avatar:
      "https://ui-avatars.com/api/?name=Titania+S&background=random",
    comment:
      "Loved the course, it had been a while since I had experimented with watercolors and now I will.",
  },
  {
    id: 3,
    name: "Zhirkov",
    avatar:
      "https://ui-avatars.com/api/?name=Z+K&background=random",
    comment:
      "Loved the course. I've learned some very subtle techniques, especially on leaves.",
  },
  {
    id: 4,
    name: "Miphoska",
    avatar:
      "https://ui-avatars.com/api/?name=M+P&background=random",
    comment:
      "Loved the course. I've learned some very subtle techniques, especially on leaves.",
  },
];

export default function CourseDetailPage() {
  {/* const [isWishlisted, setIsWishlisted] = useState(false); */}

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="aspect-video relative bg-black rounded-lg overflow-hidden mb-8">
              <Image
                src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80"
                alt="Course Preview"
                fill
                className="object-cover"
              />
            </div>

            {/* Course Title */}
            <h1 className="text-2xl font-bold mb-6">VUE JS SCRATCH COURSE</h1>

            {/* Instructor */}
            <div className="flex items-center gap-4 mb-8">
              <Image
                src="https://ui-avatars.com/api/?name=K+S&background=random"
                alt="Kitani Studio"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <div className="font-medium">Kitani Studio</div>
                <div className="text-sm text-muted-foreground">
                  Design Studio
                </div>
              </div>
            </div>

            {/* About Course */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About Course</h2>
              <p className="text-muted-foreground">
                Vue (pronounced /vjuː/, like view) is a progressive framework
                for building user interfaces. Unlike other monolithic
                frameworks, Vue is designed from the ground up to be
                incrementally adoptable. The core library is focused on the view
                layer only, and is easy to pick up and integrate with other
                libraries or existing projects. On the other hand, Vue is also
                perfectly capable of powering sophisticated Single-Page
                Applications when used in combination with modern tooling and
                supporting libraries.
              </p>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{review.name}</div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-52 mx-auto flex items-center">
                  Load more reviews
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold">US$ 22.40</div>
                    <div className="text-sm text-muted-foreground line-through">
                      $30.13
                    </div>
                  </div>
                  <div className="bg-yellow-100 text-amber-500 text-sm font-medium px-2.5 py-0.5 rounded">
                    20% OFF
                  </div>
                </div>

                <div className="space-y-4">
                  <form action="/api/embedded-checkout" method="POST">
                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 hover:shadow-md" size="lg">
                      Buy
                    </Button>
                  </form>
                  {/* <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart
                      className={`mr-2 h-4 w-4 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                    Wishlist
                  </Button> */}
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center">
                      📚
                    </div>
                    <div>22 Sections</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center">
                      📝
                    </div>
                    <div>152 Lectures</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center">
                      ⏱️
                    </div>
                    <div>21h 33m total lengths</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center">
                      🌐
                    </div>
                    <div>English</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
