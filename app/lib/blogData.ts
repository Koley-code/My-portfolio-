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
    title: 'Building a Portfolio That Feels Like an Experience',
    excerpt:
      'I did not want another page that simply listed my skills and projects. I wanted exploring the site to feel like part of the work itself.',
    category: 'Development',
    date: 'OCT 06, 2026',
    publishedAt: '2026-10-06T00:00:00.000Z',
    readTime: '8 min read',
    image: '/projects/one.webp',
    imageType: 'project',
    featured: true,
    introduction:
      'A portfolio sounds simple enough at first: introduce yourself, show a few projects, add your skills, and include a way to get in touch. That was more or less where I started. But I did not want the finished site to feel like a checklist. I wanted someone visiting it to get a small sense of how I think about design and development. That pushed me towards a clean, mostly white interface, with interactions and a little 3D atmosphere. The tricky part was making those details feel interesting without letting them get in the way of the actual work.',
    sections: [
      {
        id: 'the-idea',
        heading: 'I wanted the sections to tell a story',
        paragraphs: [
          'The first thing I had to figure out was what the portfolio should say about me. My projects, skills, certificates, and learning journey were all worth showing, but I did not want them to feel like unrelated blocks placed one after another.',
          'So I tried giving each section its own way of presenting the information. The projects section puts the work in focus. The Journey section uses a road, cars, and milestones to show progress. The certificates section became a book that visitors can open and browse. They are different ideas, but they still belong to the same site.',
          'I also learned to question an interaction before keeping it. Does it help someone explore the content, or is it only there because it looks interesting? That small question helped me avoid adding effects just for the sake of adding them.'
        ]
      },
      {
        id: 'design-decisions',
        heading: 'Making the design feel alive, not busy',
        paragraphs: [
          'I went with a mostly white look because I wanted the content to feel open and easy to read. Typography, spacing, borders, small colour details, and animation then gave the interface its personality. I like a futuristic touch, but I did not want every element glowing or moving at the same time.',
          'The certificate book took more experimenting than I expected. It had to feel convincing as a closed cover and still work when opened, with the description on one side and the certificate image on the other. A change that improved one state could make the other feel unbalanced, so I had to keep checking the whole interaction instead of judging one screen in isolation.',
          'That became a useful rule for the rest of the site too: the interaction can catch someone’s attention, but the content should remain the reason they are there.'
        ]
      },
      {
        id: 'problems-i-faced',
        heading: 'The details that refused to behave',
        paragraphs: [
          'The real test started when I opened the site on smaller screens. A layout that looked balanced on my laptop did not automatically make sense on a phone. Some elements shifted, spacing felt tight, and parts of the Journey section became crowded.',
          'The certificate book had its own set of problems. Changing its dimensions could improve the closed cover but make the open pages look awkward. I had to test both states, make one focused adjustment, and check the result again. There was rarely a shortcut that fixed everything at once.',
          'A lot of the work was simply noticing what felt wrong, finding the part responsible, changing it, and testing again. It was not always exciting, but those small rounds of debugging made the finished details feel much more considered.'
        ]
      },
      {
        id: 'what-i-learned',
        heading: 'What this project changed for me',
        paragraphs: [
          'Before this project, I often thought adding more features was a good way to make a portfolio stand out. I now try to ask a different question: does this feature make the experience better? Sometimes simplifying something is a stronger decision than adding another animation.',
          'I also became more comfortable debugging layout problems that did not have an obvious answer. A quick margin adjustment can hide a symptom, but understanding how the elements are positioned usually leads to a cleaner fix.',
          'I still see the portfolio as a work in progress. There will always be another detail to improve or an idea I want to try. For now, I am happy that it feels like something I made rather than a template filled with my information. The process of building, testing, and refining it has been as valuable as the final result.'
        ]
      }
    ]
  },
  {
    slug: 'making-my-portfolio-responsive',
    number: '02',
    title: 'The Mobile Test Changed How I Build Interfaces',
    excerpt:
      'My portfolio looked balanced on a laptop. On my phone, a few sections told a different story, and I had to rethink what responsive design really meant.',
    category: 'Development',
    date: 'SEP 29, 2026',
    publishedAt: '2026-09-29T00:00:00.000Z',
    readTime: '6 min read',
    image: '/projects/three.webp',
    imageType: 'project',
    introduction:
      'For a while, I treated responsive design as something to finish near the end: reduce a few font sizes, add some media queries, and make sure nothing overflows. Working on my portfolio changed that. Sections that felt spacious on a laptop became cramped on a phone, and a few elements did not sit where I expected them to. It reminded me that a phone is not just a smaller desktop. People use the space differently, and sometimes the layout needs to change rather than simply shrink.',
    sections: [
      {
        id: 'desktop-is-not-enough',
        heading: 'A layout can work on desktop and still be wrong',
        paragraphs: [
          'I noticed the first problems as soon as I opened the site on my phone. Some elements no longer felt centred, spacing became tight, and a few sections seemed to pull towards one side. Nothing looked quite as settled as it did on my laptop.',
          'The Journey section made the problem especially clear. It uses a road, cars, and milestone cards to represent my learning journey. On a wide screen, there is room for those pieces to sit around the road. On a phone, the same arrangement became crowded, and some milestone cards came too close to the road or overlapped it.',
          'That was when I stopped thinking of responsive design as desktop design at a smaller scale. A phone has less room and a different shape, so the arrangement itself sometimes needs to change to keep the information clear.'
        ]
      },
      {
        id: 'fixing-the-layout',
        heading: 'Debugging one layout problem at a time',
        paragraphs: [
          'Instead of changing the whole page at once, I started checking individual elements. I looked at which parts used absolute positioning, whether a container was wider than it needed to be, and whether fixed dimensions were stopping the layout from adapting.',
          'The Journey section needed more than smaller cards. The road had to keep its shape, the cars needed enough room, and the milestone cards had to remain readable without sitting on top of the road. Their positions and the gaps between them mattered just as much as their size.',
          'I also learned not to assume that fixing one section meant the rest of the page was safe. A change that looks right at one width can cause trouble at another. Checking the page after each focused adjustment made it easier to understand what had actually improved.'
        ]
      },
      {
        id: 'lessons',
        heading: 'What I now check earlier in the process',
        paragraphs: [
          'The biggest change in my approach is that I no longer want to leave mobile testing until the end. Looking at smaller screens early makes it easier to make deliberate decisions instead of patching a layout that was designed only for a wide display.',
          'I have also stopped expecting one responsive rule to solve every section. Some areas need only more flexible spacing and typography. Others need a different structure altogether. Container width, positioning, image proportions, and even the length of the text all affect the result.',
          'My portfolio still has room to improve, but this process has made me think more about the person using the site. A page is not finished just because it looks good on my screen. It should feel considered on the screens other people actually use.'
        ]
      }
    ]
  },
  {
    slug: 'what-i-learned-building-my-chess-game',
    number: '03',
    title: 'What Building a Chess Game Taught Me About Logic',
    excerpt:
      'A chessboard looks simple from the outside. Turning its rules into code showed me why clear logic, small steps, and careful debugging matter.',
    category: 'Projects',
    date: 'SEP 20, 2026',
    publishedAt: '2026-09-20T00:00:00.000Z',
    readTime: '7 min read',
    image: '/projects/two.webp',
    imageType: 'project',
    introduction:
      'When you play chess, the interaction feels straightforward: choose a piece, make a move, and think about what comes next. Building a chess game is a different experience. The program has to keep track of the board, understand whose turn it is, and check whether a move follows the rules. A small mistake in one part can affect what happens later. Working on this project gave me a practical reason to slow down, split a big problem into smaller pieces, and understand what each part of the code was responsible for.',
    sections: [
      {
        id: 'breaking-down-the-problem',
        heading: 'An eight-by-eight board is only the beginning',
        paragraphs: [
          'Drawing the board and placing the pieces is only the visible part of a chess game. The program also needs to know what each square contains, which player has the turn, how each piece can move, and how the board should change after a move.',
          'Thinking about all of those requirements together can make the project feel bigger than it needs to be. It became easier to reason about once I separated the responsibilities: represent the board, handle piece movement, manage turns, and then connect those parts into the overall game flow.',
          'That changed how I approached the work. I did not need to solve the whole game in one sitting. I could focus on one behaviour, understand what it should do, and then check how it fitted into the rest of the program.'
        ]
      },
      {
        id: 'debugging-the-rules',
        heading: 'When a move looks right but is still wrong',
        paragraphs: [
          'Chess is a good example of why a program cannot judge a result only by how it looks on screen. A piece might appear in a new square, but that does not automatically make the move legal. Each piece has its own movement rules, and the game needs to know which moves to accept and which to reject.',
          'When something went wrong, I found it more useful to trace what the program thought was happening than to stare only at the interface. Which square did it think the piece was on? Which move had been selected? What position did the program produce afterwards? Those questions helped me narrow down where the behaviour went off track.',
          'Working through one issue at a time also stopped me from changing several parts of the logic at once. Reproducing the problem, checking the relevant step, and testing the result gave me a much clearer path towards a fix.',
          'That approach applies well beyond chess. When software behaves unexpectedly, following the sequence of events is usually more useful than guessing at the cause.'
        ]
      },
      {
        id: 'what-stuck-with-me',
        heading: 'The lesson I want to carry into other projects',
        paragraphs: [
          'The project reminded me that complicated behaviour becomes easier to manage when the rules underneath it are clear. An interface can make a game enjoyable to use, but the experience still depends on the logic working properly.',
          'I also stopped thinking of debugging as something that happens only after the main work is finished. Testing small pieces of logic while building them makes it easier to understand a problem before it gets mixed up with everything else.',
          'The most useful lesson was learning to stay with a problem even when the answer was not obvious. Break it down, test an assumption, inspect what the program is doing, and try again. That is a habit I want to carry into the next project too.'
        ]
      }
    ]
  },
  {
    slug: 'taking-my-lighthouse-score-from-42',
    number: '04',
    title: 'What a Lighthouse Score of 42 Taught Me',
    excerpt:
      'A low Performance score was hard to ignore. The useful lesson was not about chasing a perfect number; it was about finding the real bottleneck.',
    category: 'Performance',
    date: 'SEP 14, 2026',
    publishedAt: '2026-09-14T00:00:00.000Z',
    readTime: '5 min read',
    imageType: 'abstract',
    introduction:
      'Getting a website to look the way I imagined was one challenge. Making it load quickly, behave well on mobile, and remain accessible was another. Lighthouse made that difference clear when one of my early audits returned a Performance score of 42. It was not the result I wanted to see, but at least it gave me somewhere concrete to start. Instead of changing random parts of the code, I could look at the report, work out what was affecting the experience, and choose one improvement to test.',
    sections: [
      {
        id: 'reading-the-report',
        heading: 'Looking beyond the big number',
        paragraphs: [
          'My eyes went straight to the Performance score. It is the easiest number to notice, but it does not explain what is happening on its own. The useful clues were in the metrics and audits underneath it.',
          'I started paying closer attention to Largest Contentful Paint, Total Blocking Time, and Cumulative Layout Shift. They describe different parts of the experience: when the main content appears, how much work keeps the browser busy, and whether the layout moves unexpectedly while the page loads.',
          'I also learned to check whether a warning actually came from my website. During one audit, some unused JavaScript entries were related to browser extensions. Testing in a clean browser session helped me separate those external effects from issues I could fix in my own code.'
        ]
      },
      {
        id: 'prioritizing-fixes',
        heading: 'Fixing a measurable problem first',
        paragraphs: [
          'Lighthouse can produce a long list of suggestions, but treating every warning as equally important is not a useful strategy. I needed to understand which issue was having the biggest effect before deciding what to change.',
          'Image delivery became a clear place to investigate on my blog. One featured image was around 505 KB, even though it appeared much smaller on the page. In other words, the browser was downloading more image data than the displayed size seemed to need.',
          'I switched that image to the Next.js Image component, supplied its dimensions and responsive sizing information, and adjusted its loading behaviour. This allowed Next.js to serve optimised image variants instead of relying on the original file at its full size.',
          'I did not want to remove the visual details and animations that give the site its character just to chase a higher score. Improving the way an asset was delivered was a more focused change: it addressed a measurable issue while allowing me to keep the design.'
        ]
      },
      {
        id: 'measure-again',
        heading: 'Make a change, then measure it again',
        paragraphs: [
          'After changing the image, I ran Lighthouse again rather than assuming the fix had worked. In that blog audit, the mobile Performance score moved from 70 to 99. Seeing the difference made the value of measuring the result very real to me.',
          'I also learned to check a production build when evaluating the final experience. Development mode can behave differently, and results from different browser sessions are not always directly comparable. Keeping the testing conditions consistent makes the numbers more useful.',
          'A perfect score is not the whole goal. Readability, accessibility, responsive behaviour, and the actual experience of using the site matter just as much. I want to improve performance without removing the features that make the portfolio feel like my own.',
          'The process I took away was simple: measure first, find the bottleneck, make one focused change, and measure again. It is a lot more reliable than changing several things at once and hoping the page gets faster.'
        ]
      }
    ]
  },
  {
    slug: 'learning-dsa-one-problem-at-a-time',
    number: '05',
    title: 'Learning DSA Without Rushing the Process',
    excerpt:
      'There is always another algorithm to learn. I am trying to focus less on memorising solutions and more on understanding why they work.',
    category: 'Learning',
    date: 'SEP 08, 2026',
    publishedAt: '2026-09-08T00:00:00.000Z',
    readTime: '6 min read',
    imageType: 'abstract',
    introduction:
      'Data structures and algorithms can feel like a very long list when you are getting started: arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, and then a seemingly endless collection of problems. It is easy to focus on how much is left to learn. I am trying to approach it differently. I want to understand one concept, work through a problem, and give myself enough time to see why a solution works. Progress feels more meaningful when it comes from understanding rather than memorising another block of code.',
    sections: [
      {
        id: 'understand-before-memorizing',
        heading: 'Knowing the code is not the same as knowing the idea',
        paragraphs: [
          'I can follow an algorithm while someone explains it and still struggle to use the same idea in a new problem. That gap has reminded me that recognising a solution is not the same as understanding it.',
          'Before writing code, I try to slow down and ask a few basic questions. What is the input? What should the output be? Are there any constraints? Can I work through a small example by hand? These questions turn a statement that first looks confusing into something I can reason about.',
          'Once the idea becomes clearer, implementation feels less like copying a pattern and more like putting my own reasoning into code. I also try to consider time and space complexity, because a solution should be judged by more than whether it produces the expected output.'
        ]
      },
      {
        id: 'learn-from-stuck-moments',
        heading: 'Getting stuck is part of the work',
        paragraphs: [
          'Sometimes I understand the topic but cannot see the right approach. Other times, the code looks correct until an edge case exposes a mistake. Neither situation feels great, but both can show me exactly where my understanding needs more work.',
          'Before looking at a complete solution, I try to find the point where my reasoning stops. A small example, a handwritten trace, or a few carefully chosen test cases can make the missing step easier to spot.',
          'When I do read an explanation, I try to focus on why the approach works instead of memorising the final code. Coming back to the problem later and attempting it again is a better test of what I actually understood.',
          'It can be frustrating when a solution seems obvious after someone else explains it. I am learning not to treat that feeling as wasted effort. Understanding what I missed is part of learning the concept.'
        ]
      },
      {
        id: 'keep-going',
        heading: 'Consistency matters more than rushing',
        paragraphs: [
          'There is always another topic or another problem waiting. Comparing my progress with someone else can make it feel as though I am moving too slowly. I am trying to pay more attention to what I understand now that I did not understand before.',
          'I would rather work through a problem carefully than rush through a long list of solutions without knowing what I learned from them. Even one problem can be worthwhile when it helps me think more clearly about an approach, an implementation detail, or complexity.',
          'I am still learning DSA, and I expect some topics to take time. I do not expect every problem to become easy. I want to become more comfortable approaching unfamiliar questions, explaining my reasoning, and recognising patterns when they genuinely fit.',
          'For me, the goal is not simply to collect solved problems. It is to become more confident at thinking through a problem independently. That takes practice, patience, and the willingness to try again.'
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
