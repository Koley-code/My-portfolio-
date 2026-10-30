
export type BlogSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  code?: string;
  codeLanguage?: string;
  codeTitle?: string;
  image?: string;
  imageAlt?: string;
};


export type BlogPost = {
  slug: string;
  number: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  publishedAt: string;
  readTime: string;
  image?: string;
  imageType: 'project' | 'abstract';
  featured?: boolean;
  introduction: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-my-interactive-portfolio',
    number: '01',
    title: 'HOW I BUILT MY INTERACTIVE PORTFOLIO',
    excerpt:
      'I wanted my portfolio to feel more like an experience than a collection of sections. Here is how I approached the design, animations, and the problems I ran into along the way.',
    category: 'Development',
    date: 'OCT 06, 2026',
publishedAt: '2026-10-06T00:00:00.000Z',
readTime: '8 min read',
    image: '/projects/one.webp',
    imageType: 'project',
    featured: true,

    introduction:
      "When I started working on my portfolio, I didn't want it to feel like a page where I'd simply put my name, skills, and project links. I wanted it to show a little of how I think and what I enjoy building. That led me toward a clean, white design with interactive details. The idea sounded simple at first, but getting all those details to work together took quite a bit of experimenting.",

    sections: [
      {
        id: 'the-idea',
        heading: 'The idea behind it',
        paragraphs: [
          "I wanted someone visiting my portfolio to get a sense of my work without having to search for everything. Projects, skills, certificates, and my journey all needed a place of their own, but the whole site still had to feel connected.",
          "Instead of making every section look like a standard card layout, I started exploring different ways to present things. The projects section became more interactive, the journey section used a road-and-milestone idea, and the certificates section turned into something a little more unusual: a book that visitors could open and browse."
        ]
      },
      {
        id: 'design-decisions',
        heading: 'Designing the experience',
        paragraphs: [
          "I settled on a mostly white theme because I wanted the content to feel clean and easy to read. I used spacing, typography, borders, and small animations to give the sections some personality without making the page feel crowded.",
          "The certificate book was one of the details I spent a lot of time refining. I wanted it to open naturally, show the certificate description on one page and the certificate image on the other, and return to the centre when closed. Getting the positioning and page transitions to feel right took more than one attempt.",
          "I approached the other interactive sections in the same way: the effect had to look interesting, but it also had to help present the content. An animation is only useful when it adds something to the experience."
        ]
      },
      {
        id: 'problems-i-faced',
        heading: 'What took more work than expected',
        paragraphs: [
          "One of the biggest lessons came when I started checking the site on smaller screens. A layout that looked balanced on my laptop didn't always behave the same way on a phone. Elements shifted, some spacing felt wrong, and parts of the journey section became difficult to read.",
          "The certificate book had its own set of challenges. Changing its size affected the open and closed states differently, and moving one part sometimes made another part look out of place. I had to keep testing the actual result instead of assuming that a CSS change would fix everything.",
          "There wasn't one magic change that solved all of these problems. I made adjustments, checked the result, found something else that needed attention, and tried again. It was sometimes frustrating, but it helped me understand how much the small details matter in an interactive website."
        ]
      },
      {
        id: 'what-i-learned',
        heading: 'What I learned along the way',
        paragraphs: [
          "This project taught me that building a portfolio isn't just about adding features. It's about making decisions: what deserves attention, what should stay simple, and how the experience changes when someone uses a different device.",
          "I also became more comfortable debugging CSS and working through problems that didn't have an obvious answer. Sometimes the right fix meant rethinking the layout rather than adding another margin or changing a size until it looked okay.",
          "I'm still improving the portfolio, and I don't think a project like this ever has to be completely finished before you learn something new from it. For me, that's part of the fun: build something, see what doesn't work, understand why, and make it better."
        ]
      }
    ]

  },
  {
    slug: 'making-my-portfolio-responsive',
    number: '02',
    title: 'MAKING MY PORTFOLIO RESPONSIVE',
    excerpt:
      'It looked great on my laptop. Then I opened it on my phone. That was when I realized that making something responsive is much more than adding a few media queries.',
    category: 'Development',
    date: 'SEP 29, 2026',
    publishedAt: '2026-09-29T00:00:00.000Z',
    readTime: '6 min read',
    image: '/projects/three.webp',
    imageType: 'project',

    introduction:
      "I used to think that if a website looked good on my laptop, making it work on mobile would mostly mean reducing a few sizes and adding some CSS media queries. Working on my portfolio taught me otherwise. Some sections that looked balanced on a large screen behaved completely differently on a phone. Fixing them became a project of its own.",

    sections: [
      {
        id: 'desktop-is-not-enough',
        heading: 'A good desktop layout is only the beginning',
        paragraphs: [
          "The first thing I noticed was that some elements didn't stay centred on smaller screens. Sections that looked properly spaced on my laptop started feeling cramped or shifted towards one side on my phone.",
          "The Journey section was the most obvious example. It uses a road, cars, and milestone cards to tell the story of my learning journey. On a desktop, there was enough space for the different elements to sit around the road. On mobile, the same arrangement became crowded, and some milestones appeared too close to—or directly on—the road.",
          "It made me realise that mobile responsiveness isn't simply about shrinking a desktop layout. A phone has a different amount of space, a different shape, and a different way of presenting information. Sometimes the layout itself needs to change."
        ]
      },
      {
        id: 'fixing-the-layout',
        heading: 'Working through the layout problems',
        paragraphs: [
          "I started looking at each problem separately instead of trying to fix the entire page with one set of CSS changes. I checked which elements were positioned absolutely, which containers were too wide, and where fixed sizes were making the layout difficult to adapt.",
          "The Journey section needed particular attention. I wanted the road to keep its shape, the cars to remain recognisable, and the milestone cards to stay readable without overlapping the road. Simply reducing the card sizes wasn't enough; their positions and the spacing between elements mattered just as much.",
          "I also had to pay attention to the other sections rather than assuming they would automatically work once the Journey section was fixed. A change that improved one viewport could affect another, so testing on smaller screens after each adjustment became important.",
          "The process involved a lot of small changes and repeated checks. Rather than expecting every adjustment to work immediately, I gradually narrowed down which parts of the layout needed a different approach."
        ]
      },
      {
        id: 'lessons',
        heading: 'What responsive design taught me',
        paragraphs: [
          "The biggest lesson was to think about smaller screens from the beginning, not only after finishing the desktop version. It's much easier to make deliberate layout decisions early than to keep patching a design that was built around a much wider screen.",
          "I also learned that there isn't one universal solution for every section. Some layouts only need smaller spacing and typography, while others need a different arrangement altogether. Positioning, container widths, image proportions, and text readability all work together.",
          "My portfolio is still something I can improve, but debugging its mobile layout has made me more careful about how I build interfaces. I now pay more attention to how a page behaves at different widths instead of judging it only by how it looks on my laptop."
        ]
      }
    ]

  },
  {
    slug: 'what-i-learned-building-my-chess-game',
    number: '03',
    title: 'WHAT I LEARNED BUILDING MY CHESS GAME',
    excerpt:
      'Building a chess game taught me a lot about breaking a large problem into smaller pieces, handling game logic, and debugging things that looked simple at first.',
    category: 'Projects',
    date: 'SEP 20, 2026',
    publishedAt: '2026-09-20T00:00:00.000Z',
    readTime: '7 min read',
    image: '/projects/two.webp',
    imageType: 'project',

    introduction:
      "Chess looks simple when you're playing it: move a piece, think about the next move, and try to outsmart your opponent. Building a chess game from the programming side is a different experience. Suddenly, every move needs to follow a set of rules, the board has to represent the current position correctly, and one small mistake can affect what happens several moves later. Working on this project helped me understand why breaking a big problem into smaller pieces matters so much.",

    sections: [
      {
        id: 'breaking-down-the-problem',
        heading: 'Breaking down the problem',
        paragraphs: [
          "A chess game involves more than drawing an eight-by-eight board and placing pieces on it. The program needs a way to represent the board, identify each piece, handle player moves, and keep track of the current position.",
          "Thinking about all of those requirements at once can make a project feel much bigger than it needs to be. A more manageable approach is to separate the work into smaller parts. The board representation, piece movement, turn handling, and overall game flow can each be understood and tested individually.",
          "This way of thinking changed how I approached the project. Instead of treating the game as one huge problem, I could focus on one rule or behaviour at a time and then consider how it fitted into the rest of the game."
        ]
      },
      {
        id: 'debugging-the-rules',
        heading: 'Debugging the rules',
        paragraphs: [
          "Game logic can be tricky because a move that looks reasonable on the screen is not necessarily a legal move. Each type of chess piece has its own movement rules, and the game needs to distinguish between a move that is allowed and one that should be rejected.",
          "Debugging problems like these requires more than checking whether the piece appears in the right square. It's important to trace what the program believes the current board looks like, how it processes the selected move, and whether the resulting position is correct.",
          "I learned to approach errors by narrowing down the problem instead of changing several things at once. Reproducing the issue, checking the relevant logic, and testing the result makes it easier to understand why something went wrong.",
          "The same approach applies beyond chess. When a program behaves unexpectedly, looking at one step at a time is often more useful than trying to guess the entire cause immediately."
        ]
      },
      {
        id: 'what-stuck-with-me',
        heading: 'What stayed with me',
        paragraphs: [
          "The biggest lesson from building a game is that complicated behaviour becomes easier to manage when the underlying rules are clear. A project can have an attractive interface, but it still depends on the logic working correctly underneath.",
          "I also learned that debugging isn't just a final stage before a project is finished. It is part of the development process itself. Testing small pieces of logic as you build them can make later problems easier to understand.",
          "Most importantly, the project reminded me that learning programming means getting comfortable with problems that don't have an obvious answer at first. You break them down, test your assumptions, learn from mistakes, and gradually put the pieces together.",
          "That's a lesson I want to carry into future projects: understand the problem before rushing into the solution, and make the logic clear enough that I can explain why it works."
        ]
      }
    ]
  },
  {
    slug: 'taking-my-lighthouse-score-from-42',
    number: '04',
    title: 'WHAT A LIGHTHOUSE SCORE OF 42 TAUGHT ME',
    excerpt:
      'Performance was one of the things I ignored until Lighthouse gave me a score I definitely did not want to see.',
    category: 'Performance',
    date: 'SEP 14, 2026',
    publishedAt: '2026-09-14T00:00:00.000Z',
    readTime: '5 min read',
    imageType: 'abstract',

    introduction:
      "Getting a website to look good is one thing. Making it load quickly, work well on mobile, and remain accessible is another. I learned that when I started paying closer attention to Lighthouse reports for my web projects. A score can look disappointing at first, but it also gives you somewhere to start. Instead of guessing what might be wrong, I could investigate the warnings and decide what was actually worth fixing.",

    sections: [
      {
        id: 'reading-the-report',
        heading: 'Learning to read the report',
        paragraphs: [
          "My first instinct was to focus on the overall Performance score. It was the easiest number to notice, and naturally I wanted to make it higher. But the more useful information was underneath that number: the individual metrics, failed audits, and suggestions explaining where the page could improve.",
          "I started paying more attention to metrics such as Largest Contentful Paint, Total Blocking Time, and Cumulative Layout Shift. They help explain different parts of the experience, from how long the main content takes to appear to how much work blocks the browser and whether the layout unexpectedly moves.",
          "I also learned not to treat every warning as proof that my own code was responsible. During one of my audits, some unused JavaScript entries came from browser extensions. Testing in a clean browser session helped separate those external effects from issues that actually belonged to the website."
        ]
      },
      {
        id: 'prioritizing-fixes',
        heading: 'Fixing the biggest problem first',
        paragraphs: [
          "One useful lesson was to avoid changing everything at once. Lighthouse can produce a long list of suggestions, but not every item has the same impact. I needed to understand which issue was affecting the page most before deciding what to change.",
          "Image delivery turned out to be a particularly useful place to investigate on my blog. Lighthouse flagged a featured image that was around 505 KB even though it appeared at a much smaller size on the page. That was a clear opportunity to reduce the amount of data the browser had to download.",
          "I switched the featured image to Next.js's Image component, supplied image dimensions and responsive sizing information, and adjusted its loading behavior. This let Next.js serve optimized image variants instead of relying on the original file at its full size.",
          "I didn't want to remove animations or redesign sections just to chase a better score. Improving the way assets were delivered was a more targeted change, and it allowed me to preserve the appearance of the page while addressing a measurable problem."
        ]
      },
      {
        id: 'measure-again',
        heading: 'Measure, compare, and repeat',
        paragraphs: [
          "After making a change, I ran Lighthouse again rather than assuming the fix had worked. On my blog, the mobile Performance score went from 70 to 99 after the featured-image optimization. Seeing that difference helped me understand why measuring the result matters just as much as making the change.",
          "I also learned to test production builds when checking the final experience. Development mode can behave differently, and a result from one browser session may not tell the whole story. Testing under consistent conditions makes comparisons more useful.",
          "A perfect score isn't the only goal. Readability, responsive layouts, accessibility, and the actual experience of using the website matter too. I want to improve the numbers where it makes sense, but not at the cost of the features and interactions that make the site mine.",
          "The biggest lesson for me is simple: measure first, find the real bottleneck, make one focused change, and measure again. That process is much more useful than randomly changing code and hoping the website gets faster."
        ]
      }
    ]

  },
  {
    slug: 'learning-dsa-one-problem-at-a-time',
    number: '05',
    title: 'LEARNING DSA ONE PROBLEM AT A TIME',
    excerpt:
      'My approach to DSA has changed quite a bit. Instead of trying to memorize every algorithm, I am learning to understand why a solution works.',
    category: 'Learning',
    date: 'SEP 08, 2026',
    publishedAt: '2026-09-08T00:00:00.000Z',
    readTime: '6 min read',
    imageType: 'abstract',

    introduction:
      "Learning data structures and algorithms can feel overwhelming at first. There are arrays, linked lists, stacks, queues, trees, graphs, sorting algorithms, and plenty of problems that seem impossible when you first read them. I've found it more useful to approach DSA one concept at a time instead of worrying about how much there is still to learn. The goal isn't to solve everything immediately. It's to understand a little more with every problem.",

    sections: [
      {
        id: 'understand-before-memorizing',
        heading: 'Understand before memorizing',
        paragraphs: [
          "One thing I've been trying to remind myself of is that knowing the code for an algorithm isn't the same as understanding it. I might be able to follow a solution while watching someone explain it, but that doesn't automatically mean I can solve a similar problem on my own.",
          "I try to begin by understanding what the problem is asking. What is the input? What should the output look like? Are there any constraints? Can I work through a small example by hand before writing code?",
          "Once the basic idea becomes clear, implementing it feels less like copying a pattern and more like translating my own reasoning into code. I also pay attention to time and space complexity because a solution should be evaluated by more than whether it produces the correct answer."
        ]
      },
      {
        id: 'learn-from-stuck-moments',
        heading: 'Learning when I get stuck',
        paragraphs: [
          "Getting stuck is part of solving problems, even when the topic seems familiar. Sometimes I understand the concept but struggle to find the right approach. Other times, the code looks correct at first but fails on an edge case I hadn't considered.",
          "Instead of immediately looking at a complete solution, I try to spend some time identifying what I already know and where my reasoning stops working. A small example, a handwritten trace, or a few carefully chosen test cases can make the missing step easier to see.",
          "When I do look at an explanation, I try to understand why that approach works rather than remembering the final code. Coming back later and attempting the problem again is a useful way to check whether I've actually learned something.",
          "Mistakes can be frustrating, especially when a solution seems obvious after someone else explains it. But that doesn't mean the practice was wasted. Sometimes the most valuable part is understanding exactly what I missed."
        ]
      },
      {
        id: 'keep-going',
        heading: 'Consistency over rushing',
        paragraphs: [
          "There is always another topic, another algorithm, or another problem to solve. It's easy to compare your progress with someone else's and feel like you're moving too slowly. I've found it more helpful to focus on whether I understand today's topic better than I did before.",
          "A manageable routine is more useful to me than trying to solve a huge number of problems in one sitting and then losing momentum. Even one carefully understood problem can teach something about problem-solving, implementation, or complexity.",
          "I'm still learning DSA, and I know there will be topics that take time to understand. I don't expect every problem to become easy. I want to get better at approaching unfamiliar problems, explaining my reasoning, and recognizing patterns when they genuinely apply.",
          "For me, the goal is not just to collect solved problems. It's to become more confident at thinking through a problem independently—and that takes practice, patience, and a willingness to try again."
        ]
      }
    ]

  }
];

export const featuredPost = blogPosts.find(
  (post) => post.featured
) ?? blogPosts[0];

export const latestPosts = blogPosts.filter(
  (post) => post.slug !== featuredPost.slug
);
