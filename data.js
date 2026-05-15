/**
 * Shared quiz bank when a topic has no `quiz` (or fewer than 5 items) and the series has no `quiz`.
 * Adapted from project 1 legacy bank; aligned to thematic / medium-agnostic prompts.
 */
export const LEGACY_QUIZ_QUESTIONS = [
  {
    question:
      "A contemporary photograph restages a Madonna or saint. What is the most useful first question to ask?",
    options: [
      "Who is allowed to look—and who is framed as worthy of being seen?",
      "Whether the camera brand matches museum acquisition standards",
      "Whether the scene is a literal, factual record of an event",
    ],
    correct: 0,
    explanation:
      "Sacred figures in recent lens-based work usually rework power in looking: who performs holiness, who consumes the image, and what the staging admits about belief.",
    curatorNote:
      "Let address and agency lead; technique almost always serves that argument rather than replacing it.",
  },
  {
    question:
      "Why do curators often group women artists around themes instead of only by biography?",
    options: [
      "Shared problems of form, politics, and reception cut across individual life stories",
      "Birth years alone explain how artworks produce meaning",
      "Auction results are the primary tool for historical interpretation",
    ],
    correct: 0,
    explanation:
      "Thematic study keeps attention on how strategies travel—material choices, refusal, care, scale—without reducing artists to a single identity category.",
    curatorNote:
      "A good theme names a pressure the works answer, not a box the artists are filed into.",
  },
  {
    question: "An artist scrapes paint back to earlier layers. That gesture most often signals:",
    options: [
      "Memory and doubt can live in what the surface refuses to show",
      "The work is primarily about correcting a technical mistake",
      "Faster production is the main conceptual point",
    ],
    correct: 0,
    explanation:
      "Erasure and pentimento make time visible: the painting argues with its own past rather than presenting a single finished illusion.",
    curatorNote:
      "Watch for what is withheld or reopened; absence is often as intentional as detail.",
  },
  {
    question:
      "In sculpture, a polished plane meets a deliberately rough break. That contrast asks you to notice:",
    options: [
      "Ethics of finish—what the maker smooths, reveals, or leaves risky to touch",
      "Only the object’s weight in kilograms",
      "Color trends in interior design",
    ],
    correct: 0,
    explanation:
      "How matter is persuaded into form is part of the content: polish can flatter power; rupture can invite care, warning, or honesty about labor.",
    curatorNote: "Let your body imagine walking around it—scale and touch are part of the meaning.",
  },
  {
    question:
      "In performance, a simple action is repeated until the room’s attention shifts. The repetition is doing conceptual work when:",
    options: [
      "Duration changes stakes—politeness, fatigue, or care become visible",
      "The action is only decorative, with no change over time",
      "The score is random noise with no relation to bodies present",
    ],
    correct: 0,
    explanation:
      "Time-based work often tests what an audience will grant: patience, discomfort, or shared responsibility becomes part of the form.",
    curatorNote:
      "Ask what changes between minute one and minute ten; the shift is usually the thesis.",
  },
];
export const APP_DATA = {
  series: {
    photography: {
      id: "photography",
      label: "Photography",
      icon: "◻",
      topics: {
        identity: {
          id: "identity",
          label: "Identity",
          description:
            "How contemporary photographers stage identity, community, and refusal—often turning the lens back on who gets to look.",
          thesis:
            "Start with the gaze: who is seen, who is erased, and what the frame does to both.",
          keyIdeas:
            "Identity in recent photography is rarely a fixed label—it is negotiated through staging, seriality, and the politics of representation. Pay attention to who controls the camera and who bears the risk of visibility.",
          result: {
            learnedIdeas: [
              "Reading portraiture as argument, not neutral description",
              "Noticing how serial work builds meaning across repeated poses and settings",
              "Tracing how artists redirect or refuse the viewer’s expectations",
            ],
            synthesis:
              "You practiced connecting single images to larger questions of power, care, and community.",
            strongestSkill:
              "Linking visual choices to social context without reducing artists to symbols.",
            nextFocus:
              "Compare two artists’ use of staging—what changes when the scene is domestic versus public?",
          },
          artists: [
            {
              id: "zanele_muholi",
              name: "Zanele Muholi",
              years: "b. 1972",
              image: "images/artists/zanele_muholi.jpg",
              imageAlt: "Photograph of Zanele Muholi.",
              imagePlaceholder: "#2a2a2a",
              insight:
                "Muholi's self-portrait series Somnyama Ngonyama reclaims the Black gaze by manipulating exposure to hyperpigment their skin, turning the camera into an act of resistance.",
              keyWork: "Somnyama Ngonyama (2012–ongoing)",
              movement: "Visual Activism",
              keywords: [
                "Somnyama Ngonyama",
                "LGBTQ",
                "South Africa",
                "visual activism",
                "Black portrait",
              ],
            },
            {
              id: "nan_goldin",
              name: "Nan Goldin",
              years: "b. 1953",
              image: "images/artists/nan_goldin.png",
              imageAlt: "Photograph of Nan Goldin.",
              imagePlaceholder: "#3d2b2b",
              insight:
                "Goldin's The Ballad of Sexual Dependency is an intimate visual diary of her circle — capturing love, addiction, and violence with unflinching honesty in 1970s–80s New York.",
              keyWork: "The Ballad of Sexual Dependency (1986)",
              movement: "Confessional Photography",
            },
            {
              id: "carrie_mae_weems",
              name: "Carrie Mae Weems",
              years: "b. 1953",
              image: "images/artists/carrie_mae_weems.jpg",
              imageAlt: "Photograph of Carrie Mae Weems.",
              imagePlaceholder: "#1a2a3a",
              insight:
                "Weems's Kitchen Table Series uses a single domestic setting to explore the complexity of Black women's lives — relationships, solitude, power, and joy — through staged narrative sequences.",
              keyWork: "Kitchen Table Series (1990)",
              movement: "Conceptual Photography",
            },
          ],
        },
        documentary: {
          id: "documentary",
          label: "Documentary",
          description:
            "Witness, ethics, and the gap between event and image—when documentary work asks who the photograph serves.",
          thesis:
            "Ask what the picture wants from you as a viewer: empathy, action, or complicity.",
          keyIdeas:
            "Documentary photographs do not simply record reality—they shape how histories are remembered and funded. Ethical looking includes questioning assignment, editing, and circulation.",
          result: {
            learnedIdeas: [
              "Separating testimony from spectacle in conflict and crisis imagery",
              "Following how captions and context shift a photograph’s meaning",
            ],
          },
          artists: [
            {
              id: "dorothea_lange",
              name: "Dorothea Lange",
              years: "1895–1965",
              image: "images/artists/dorothea_lange.jpg",
              imageAlt:
                "Black-and-white photograph (Migrant Mother): a weary mother rests her face on her hand; two children turn away from the camera.",
              imagePlaceholder: "#2d2d1e",
              insight:
                "Lange's Migrant Mother became the defining image of the Great Depression — a single photograph that galvanized public support for relief programs and changed how documentary photography was understood.",
              keyWork: "Migrant Mother (1936)",
              movement: "Social Documentary",
            },
            {
              id: "susan_meiselas",
              name: "Susan Meiselas",
              years: "b. 1948",
              image: "images/artists/susan_meiselas.jpg",
              imageAlt: "Photograph of Susan Meiselas.",
              imagePlaceholder: "#1e2d1e",
              insight:
                "Meiselas embedded herself in the 1978–79 Nicaraguan revolution, creating images that blur the boundary between witness and participant — and raised lasting questions about photojournalistic ethics.",
              keyWork: "Nicaragua (1981)",
              movement: "Photojournalism",
            },
            {
              id: "an_my_le",
              name: "An-My Lê",
              years: "b. 1960",
              image: "images/artists/an_my_le.jpg",
              imageAlt: "Portrait photograph of An-My Lê.",
              imagePlaceholder: "#1e2535",
              insight:
                "Lê photographs military re-enactments and training exercises, using the gap between performance and reality to interrogate how America constructs and mythologizes war.",
              keyWork: "Small Wars (1999–2002)",
              movement: "Documentary / War Photography",
              wikipediaTitle: "An-My Lê",
              keywords: ["military reenactment", "Vietnam", "war photography", "Small Wars"],
            },
          ],
        },
        selfPortrait: {
          id: "selfPortrait",
          label: "Self-Portrait",
          description:
            "When the artist is both subject and author—staging, erasing, or fragmenting the self in front of the lens.",
          thesis:
            "Ask whether you are looking at a person, a role, or a refusal to be seen at all.",
          keyIdeas:
            "Self-portraiture here ranges from dissolution into architecture (Woodman) to cinematic archetype (Sherman) to withheld gaze (Simpson). The camera is a tool for questioning who gets to define the self.",
          result: {
            learnedIdeas: [
              "Reading blur and absence as intentional selfhood, not accident",
              "Recognizing archetype and fiction in serial self-imaging",
              "Noticing when text and turned backs refuse the viewer's demand",
            ],
            synthesis:
              "You practiced treating self-portrait as argument—about visibility, role-play, and interiority—not simple likeness.",
            strongestSkill:
              "Connecting formal choices (blur, costume, caption) to questions of identity and power.",
            nextFocus:
              "Compare Sherman’s fictional film stills to Simpson’s turned figures—what changes when the self is role versus refusal?",
          },
          artists: [
            {
              id: "francesca_woodman",
              name: "Francesca Woodman",
              years: "1958–1981",
              image: "images/artists/francesca_woodman.png",
              imageAlt:
                "Black-and-white self-portrait: figure hanging from a doorframe in a tiled room, arms raised.",
              imagePlaceholder: "#2a2020",
              insight:
                "Woodman made hundreds of photographs in decaying interiors, using slow shutter speeds to blur her own body into the architecture — exploring the female self as both present and dissolving.",
              keyWork: "House Series (1975–76)",
              movement: "Surrealist Photography",
            },
            {
              id: "cindy_sherman",
              name: "Cindy Sherman",
              years: "b. 1954",
              image: "images/artists/cindy_sherman.png",
              imageAlt:
                "Cindy Sherman in Renaissance Madonna costume with swaddled infant, lace and velvet backdrop.",
              imagePlaceholder: "#3a2a1a",
              insight:
                "Sherman's Untitled Film Stills features herself as every character — each photograph a constructed archetype drawn from cinema's visual language of femininity, never once depicting 'Cindy Sherman'.",
              keyWork: "Untitled Film Stills (1977–80)",
              movement: "Postmodern Photography",
              keywords: ["Untitled Film Stills", "cinema", "archetype", "role-play", "femininity"],
            },
            {
              id: "lorna_simpson",
              name: "Lorna Simpson",
              years: "b. 1960",
              image: "images/artists/lorna_simpson.jpg",
              imageAlt: "Lorna Simpson in a black top, seated in front of a blue backdrop.",
              imagePlaceholder: "#1a1a2a",
              insight:
                "Simpson pairs photographs of Black women's bodies with fragmented text, refusing the viewer's gaze by showing subjects from behind — insisting on interiority over spectacle.",
              keyWork: "Waterbearer (1986)",
              movement: "Conceptual Photography",
            },
          ],
        },
      },
      quiz: [
        {
          question: "Cindy Sherman's Untitled Film Stills features which recurring subject?",
          options: [
            "Herself staged as fictional female archetypes from cinema",
            "Abstract urban landscapes",
            "Documentary portraits of Hollywood actresses",
            "Her close friends and family",
          ],
          correct: 0,
          explanation:
            "Sherman plays every character herself, examining how cinema constructs femininity. The series contains 69 images — yet Sherman herself is never 'in' them as herself.",
        },
        {
          question: "Nan Goldin's The Ballad of Sexual Dependency began as what?",
          options: [
            "A book commissioned by a New York publisher",
            "A live slideshow shown in nightclubs set to music",
            "A series of magazine commissions",
            "An MFA thesis project",
          ],
          correct: 1,
          explanation:
            "It was a live slideshow screened in clubs like The Mudd Club, documenting Goldin's intimate circle in 1970s–80s New York. The book came later.",
        },
        {
          question:
            "Zanele Muholi describes their practice as 'visual activism'. This primarily refers to their work doing what?",
          options: [
            "Using digital manipulation to alter political photographs",
            "Photographing anti-apartheid protests in South Africa",
            "Documenting Black LGBTQIA+ lives in South Africa that mainstream media ignored",
            "Selling work exclusively to activist organisations",
          ],
          correct: 2,
          explanation:
            "Muholi coined the term to describe photography as a tool for social justice — specifically creating a visual archive of Black queer lives erased from public representation.",
        },
        {
          question: "Dorothea Lange's Migrant Mother was taken during which historical event?",
          options: [
            "World War II",
            "The Dust Bowl migration alone",
            "The Great Depression",
            "The Korean War",
          ],
          correct: 2,
          explanation:
            "Taken in 1936 at a pea-pickers camp in California, it was commissioned by the Farm Security Administration to document conditions during the Great Depression.",
        },
        {
          question: "Francesca Woodman's photographs characteristically feature which quality?",
          options: [
            "Blurred, ghostly self-portraits in decaying architectural spaces",
            "Sharply focused street photography in New York",
            "Staged studio portraits with elaborate props",
            "Aerial landscape photography",
          ],
          correct: 0,
          explanation:
            "Woodman used slow shutter speeds to create motion blur, making her own body merge with or disappear into the crumbling interiors she photographed — a visual metaphor for unstable selfhood.",
        },
      ],
    },

    painting: {
      id: "painting",
      label: "Painting",
      icon: "◼",
      topics: {
        abstraction: {
          id: "abstraction",
          label: "Abstraction",
          description:
            "Color, grid, and gesture as fields of feeling—abstraction claimed by women at the center of modern painting's revolutions.",
          thesis:
            "Look past 'style labels' and ask what emotion, scale, or material process the surface insists on.",
          keyIdeas:
            "These painters stretch from soak-stain immersion (Frankenthaler) to meditative grids (Martin) to explosive collage-energy (Krasner). Abstraction here is never empty decoration—it carries autobiography, joy, and recovery from erasure.",
          result: {
            learnedIdeas: [
              "Connecting technique (stain, grid, collage) to historical movements",
              "Resisting the myth that abstraction is impersonal",
              "Placing women artists inside Color Field and Abstract Expressionist narratives",
            ],
            synthesis:
              "You linked non-figurative painting to invention, emotion, and authorship—not only to formal purity.",
            strongestSkill: "Naming how material process shapes meaning on the canvas.",
            nextFocus:
              "Compare Frankenthaler's stained canvas to Martin's pencil grids—what different kinds of 'quiet' do they propose?",
          },
          artists: [
            {
              id: "helen_frankenthaler",
              name: "Helen Frankenthaler",
              years: "1928–2011",
              image: "images/artists/helen_frankenthaler.jpg",
              imageAlt: "Photograph of Helen Frankenthaler.",
              imagePlaceholder: "#2a1a3a",
              insight:
                "Frankenthaler poured thinned paint directly onto unprimed canvas, inventing the soak-stain technique that defined Color Field painting. Her landmark Mountains and Sea transformed how a generation approached abstraction.",
              keyWork: "Mountains and Sea (1952)",
              movement: "Color Field Painting",
            },
            {
              id: "agnes_martin",
              name: "Agnes Martin",
              years: "1912–2004",
              image: "images/artists/agnes_martin.jpg",
              imageAlt: "Photograph of Agnes Martin.",
              imagePlaceholder: "#dcdcd4",
              insight:
                "Martin's soft pencil grids on pale linen canvases are not cold minimalism but expressions of happiness and innocence — she described them as 'about beauty, and it's a simple subject.'",
              keyWork: "Untitled #1 (1988)",
              movement: "Minimalism",
            },
            {
              id: "lee_krasner",
              name: "Lee Krasner",
              years: "1908–1984",
              image: "images/artists/lee_krasner.jpg",
              imageAlt:
                "Black-and-white photograph of Lee Krasner in a paint-splattered studio with canvases behind her.",
              imagePlaceholder: "#3a2a1a",
              insight:
                "Long overshadowed by her husband Jackson Pollock, Krasner's large-scale Abstract Expressionist works — including the collaged Night Journeys series made after his death — are now recognized as central to the movement.",
              keyWork: "The Seasons (1957)",
              movement: "Abstract Expressionism",
            },
          ],
        },
        figurative: {
          id: "figurative",
          label: "Figurative",
          description:
            "The body returned to painting—portraiture from the margins, flesh at monumental scale, and figures composed from imagination.",
          thesis:
            "Notice who is painted, from what angle, and whether the sitter is real, idealized, or invented.",
          keyIdeas:
            "Figurative work here challenges the canon of the nude and the society portrait. Neel documents neighbors; Saville confronts flesh; Yiadom-Boakye invents Black subjects with interiority withheld from the viewer.",
          result: {
            learnedIdeas: [
              "Reading portraiture as social document, not flattery",
              "Analyzing scale and vantage as feminist arguments about the body",
              "Holding fiction and realism in tension without demanding disclosure",
            ],
            synthesis:
              "You practiced connecting painted bodies to ethics of attention and representation.",
            strongestSkill:
              "Linking pose, scale, and subject choice to whose lives count as art history.",
            nextFocus:
              "Compare Neel's Andy Warhol to Saville's Propped—what changes when the figure is celebrity versus flesh overflowing the frame?",
          },
          artists: [
            {
              id: "alice_neel",
              name: "Alice Neel",
              years: "1900–1984",
              image: "images/artists/alice_neel.jpg",
              imageAlt: "Photograph of Alice Neel.",
              imagePlaceholder: "#1e3a2a",
              insight:
                "Neel painted the people mainstream art ignored: working-class New Yorkers, Black and Latino neighbors, pregnant women, and gay men — creating a radical portrait of 20th-century American life from the margins.",
              keyWork: "Andy Warhol (1970)",
              movement: "Social Realism",
            },
            {
              id: "jenny_saville",
              name: "Jenny Saville",
              years: "b. 1970",
              image: "images/artists/jenny_saville.jpg",
              imageAlt: "Photograph of Jenny Saville.",
              imagePlaceholder: "#3a1a1a",
              insight:
                "Saville paints the female body at monumental scale and from unconventional vantage points — looking down at flesh that overflows the frame — refusing the idealizing traditions of the nude.",
              keyWork: "Propped (1992)",
              movement: "Neo-Expressionism",
            },
            {
              id: "lynette_yiadom_boakye",
              name: "Lynette Yiadom-Boakye",
              years: "b. 1977",
              image: "images/artists/lynette_yiadom_boakye.jpg",
              imageAlt: "Photograph of Lynette Yiadom-Boakye.",
              imagePlaceholder: "#1a2a1a",
              insight:
                "Yiadom-Boakye paints fictional Black figures, composing them from imagination rather than life or reference. Her subjects suggest interiority without disclosure — neither portraits nor allegories.",
              keyWork: "Any Number of Preoccupations (2010)",
              movement: "Figurative Painting",
            },
          ],
        },
        political: {
          id: "political",
          label: "Political",
          description:
            "Painting and mixed media that refuse silence—quilts that tell stories, silhouettes that expose history, surfaces where violence and desire blur.",
          thesis:
            "Ask what history is being shown, satirized, or buried—and who benefits from looking away.",
          keyIdeas:
            "Political painting here uses domestic craft (Ringgold), genteel silhouette (Walker), and turbulent abstraction (Brown) to stage uncomfortable American histories. Form is never separate from power.",
          result: {
            learnedIdeas: [
              "Tracing narrative and symbol in craft-based work",
              "Reading silhouette and scale as confrontational devices",
              "Sustaining attention on layered, unresolved surfaces",
            ],
            synthesis:
              "You connected visual pleasure and discomfort to questions of race, memory, and nation.",
            strongestSkill: "Naming how medium and format carry political argument.",
            nextFocus:
              "Compare Ringgold's story quilt to Walker's sugar sphinx—what changes when narrative is textile versus monumental installation?",
          },
          artists: [
            {
              id: "faith_ringgold",
              name: "Faith Ringgold",
              years: "b. 1930",
              image: "images/artists/faith_ringgold.jpg",
              imageAlt: "Photograph of Faith Ringgold.",
              imagePlaceholder: "#2a1a1a",
              insight:
                "Ringgold's story quilts merge West African textile tradition with American quilt-making and narrative text — using a domestic craft historically associated with Black women to tell stories that museums once refused to exhibit.",
              keyWork: "Tar Beach (1988)",
              movement: "Narrative Art",
            },
            {
              id: "kara_walker",
              name: "Kara Walker",
              years: "b. 1969",
              image: "images/artists/kara_walker.jpg",
              imageAlt: "Photograph of Kara Walker.",
              imagePlaceholder: "#0a0a0a",
              insight:
                "Walker's large-scale black silhouettes stage grotesque tableaux of slavery's violence and sexual exploitation — using a genteel 19th-century art form to force confrontation with histories Americans prefer to obscure.",
              keyWork: "A Subtlety (2014)",
              movement: "Neo-Conceptualism",
              keywords: ["silhouette", "slavery", "sugar sphinx", "domino factory"],
            },
            {
              id: "cecily_brown",
              name: "Cecily Brown",
              years: "b. 1969",
              image: "images/artists/cecily_brown.jpg",
              imageAlt: "Photograph of Cecily Brown.",
              imagePlaceholder: "#2a1a2a",
              insight:
                "Brown's densely layered paintings hover between figuration and abstraction — bodies, landscapes, and violence blur together in surfaces that reward sustained looking and resist easy resolution.",
              keyWork: "Horizontale (2003)",
              movement: "Neo-Expressionism",
            },
          ],
        },
      },
      quiz: [
        {
          question:
            "Helen Frankenthaler developed which painting technique central to Color Field painting?",
          options: [
            "Impasto — applying paint thickly with a palette knife",
            "Soak-stain — pouring thinned paint onto unprimed canvas",
            "Encaustic — painting with heated wax",
            "Fresco — painting on wet plaster",
          ],
          correct: 1,
          explanation:
            "Frankenthaler's soak-stain technique, developed in Mountains and Sea (1952), created luminous color that was of the canvas rather than on it — directly influencing Morris Louis and Kenneth Noland.",
        },
        {
          question:
            "Alice Neel is celebrated for painting subjects largely ignored by the mainstream art world. Which groups did she especially focus on?",
          options: [
            "Wealthy Manhattan socialites",
            "Abstract Expressionist painters",
            "Working-class New Yorkers, pregnant women, and LGBTQ+ individuals",
            "European immigrants in the 1920s",
          ],
          correct: 2,
          explanation:
            "Neel spent decades painting her Harlem and Upper West Side neighbors — a radical act of attention toward people the art world rendered invisible. Her late recognition came only after decades of neglect.",
        },
        {
          question: "Faith Ringgold's story quilts combine which two traditions?",
          options: [
            "Japanese woodblock printing and American folk art",
            "European oil painting and Native American beadwork",
            "Abstract Expressionism and Surrealism",
            "West African textile tradition and American quilt-making",
          ],
          correct: 3,
          explanation:
            "Ringgold began making quilts after museums refused to exhibit her protest paintings. The quilt format let her embed written narrative into a craft form with deep roots in Black women's culture.",
        },
        {
          question:
            "Jenny Saville's large-scale figurative paintings are known for depicting what?",
          options: [
            "Landscapes of the Scottish Highlands",
            "The female body from confrontational, unconventional perspectives at monumental scale",
            "Historical mythological scenes",
            "Tightly controlled still life arrangements",
          ],
          correct: 1,
          explanation:
            "Saville often paints herself or the female body from above or at extreme close range — flesh overflowing the frame — directly challenging the Western tradition of the idealized nude.",
        },
        {
          question: "Agnes Martin described her minimal grid paintings as expressing what?",
          options: [
            "Happiness, innocence, and classical beauty",
            "Industrial alienation and urban anxiety",
            "Political resistance and feminist anger",
            "The unconscious mind and dream imagery",
          ],
          correct: 0,
          explanation:
            "Martin wrote extensively that her paintings were about positive emotional states — joy, beauty, innocence. She resisted the Minimalist label, insisting her work was closer to Abstract Expressionism in intent.",
        },
      ],
    },

    sculpture: {
      id: "sculpture",
      label: "Sculpture",
      icon: "◯",
      topics: {
        body: {
          id: "body",
          label: "Body",
          description:
            "Sculpture that makes the body visible—organs, desire, family memory, and taboo rendered as matter.",
          thesis:
            "Walk around the form: what is inside the skin, and what culture refuses to name?",
          keyIdeas:
            "Body sculpture often externalizes interior life or domestic psychology. Compare symbolic scale (Bourgeois) with anatomical exposure (Smith) and crude readymade wit (Lucas)—each refuses a single, polite image of the female body.",
          result: {
            learnedIdeas: [
              "Reading scale and symbol as personal memory, not decoration",
              "Noticing when sculpture exposes interior or taboo bodily processes",
              "Tracing how everyday objects can carry sexual politics without earnest protest",
            ],
            synthesis:
              "You practiced linking material form to psychology, taboo, and family narrative.",
            strongestSkill:
              "Connecting symbolic or readymade bodies to the social codes they challenge.",
            nextFocus:
              "Compare Bourgeois's spider and Lucas's mattress—what changes when the body is mythic versus domestic?",
          },
          artists: [
            {
              id: "louise_bourgeois",
              name: "Louise Bourgeois",
              years: "1911–2010",
              image: "images/artists/louise_bourgeois.jpg",
              imageAlt: "Photograph of Louise Bourgeois.",
              imagePlaceholder: "#1a1a2a",
              insight:
                "Bourgeois spent seven decades making art about the body, memory, and family. Her giant spider sculptures Maman represent her mother — described as patient, protective, and industrious as a weaver.",
              keyWork: "Maman (1999)",
              movement: "Feminist Art / Surrealism",
            },
            {
              id: "kiki_smith",
              name: "Kiki Smith",
              years: "b. 1954",
              image: "images/artists/kiki_smith.jpg",
              imageAlt: "Photograph of Kiki Smith.",
              imagePlaceholder: "#2a2a1a",
              insight:
                "Smith makes the interior of the body visible — casting organs, trailing viscera, depicting bodily processes that culture renders taboo. Tale features a female figure crawling, with a long tail behind her.",
              keyWork: "Tale (1992)",
              movement: "Feminist Art",
            },
            {
              id: "sarah_lucas",
              name: "Sarah Lucas",
              years: "b. 1962",
              image: "images/artists/sarah_lucas.jpg",
              imageAlt: "Photograph of Sarah Lucas.",
              imagePlaceholder: "#2a1a1a",
              insight:
                "Lucas's sculptures use everyday objects — mattresses, toilets, fried eggs, cigarettes — to deconstruct the sexual objectification of women through crude, sardonic wit rather than earnest protest.",
              keyWork: "Au Naturel (1994)",
              movement: "YBA / Feminist Art",
            },
          ],
          quiz: [
            {
              question:
                "Louise Bourgeois's giant spider sculptures, Maman, represent what personal figure?",
              options: [
                "Her father, who ran a tapestry restoration business",
                "An imaginary childhood monster she feared",
                "Her mother, whom she described as patient, protective, and industrious as a weaver",
                "A symbol of female predation in mythology",
              ],
              correct: 2,
              explanation:
                "Bourgeois often said: 'My best friend was my mother — she was deliberate, clever, patient, soothing, reasonable, dainty, indispensable, neat, and as useful as a spider.'",
            },
            {
              question: "Kiki Smith's Tale (1992) is notable for depicting the female body how?",
              options: [
                "As an idealized classical nude on a pedestal",
                "Crawling, with viscera and bodily processes culture treats as taboo",
                "Only from behind, with the face never shown",
                "Merged with landscape so the figure disappears entirely",
              ],
              correct: 1,
              explanation:
                "Smith makes interior life visible—organs, trailing matter, processes usually hidden—refusing a single polite image of the female body.",
              curatorNote:
                "Ask what the work exposes that galleries usually smooth away; taboo is often the subject, not a shock tactic.",
            },
            {
              question: "Sarah Lucas's Au Naturel (1994) primarily uses what strategy?",
              options: [
                "Cast bronze replicas of ancient fertility figures",
                "Everyday objects such as mattresses and food to mock sexual objectification with sardonic wit",
                "Medical illustrations enlarged to monumental scale",
                "Live performance documented in a single photograph",
              ],
              correct: 1,
              explanation:
                "Lucas deconstructs objectification through crude readymades—mattresses, cigarettes, fried eggs—rather than earnest protest slogans.",
            },
            {
              question:
                "Across Bourgeois, Smith, and Lucas, body sculpture in this topic most often refuses what?",
              options: [
                "Any reference to family or memory",
                "A single, decorous image of the female body",
                "Use of non-traditional materials",
                "Monumental public scale",
              ],
              correct: 1,
              explanation:
                "Each artist externalizes psychology, taboo, or desire in matter—none offers a polite, unified figure.",
            },
            {
              question: "Bourgeois linked the spider form to her mother's role as what?",
              options: [
                "A sculptor who carved marble portraits",
                "A weaver—patient, protective, and industrious",
                "A dancer in the Ballets Russes",
                "A war correspondent during World War II",
              ],
              correct: 1,
              explanation:
                "She described her mother as deliberate and useful 'as a spider,' tying Maman to weaving, care, and labor—not predation alone.",
            },
          ],
        },
        space: {
          id: "space",
          label: "Space",
          description:
            "Works that reshape rooms, memorials, and negative space—architecture without walls.",
          thesis:
            "Notice what the sculpture occupies: a cast void, a cut in earth, or a landscape at human scale.",
          keyIdeas:
            "Spatial sculpture asks you to move through absence and monument. Whiteread solidifies air; Lin cuts memory into the ground; von Rydingsvard builds cedar masses that feel like eroded land or hidden organs—scale is always part of the argument.",
          result: {
            learnedIdeas: [
              "Treating negative space and casts as positive sculptural form",
              "Reading memorial design as refusal or invitation of certain emotions",
              "Following how monumental scale changes bodily relation to the work",
            ],
            synthesis:
              "You practiced reading sculpture as something you walk through, not only look at.",
            strongestSkill:
              "Linking spatial choices to memory, mourning, and public responsibility.",
            nextFocus:
              "Stand in front of a Whiteread cast and a Lin memorial—what does each ask your body to do?",
          },
          artists: [
            {
              id: "rachel_whiteread",
              name: "Rachel Whiteread",
              years: "b. 1963",
              image: "images/artists/rachel_whiteread.jpg",
              imageAlt: "Photograph of Rachel Whiteread.",
              imagePlaceholder: "#d0c8b8",
              insight:
                "Whiteread casts the negative space inside and around ordinary objects — the air under a chair, the inside of a room — making invisible domestic space tangible and monumental.",
              keyWork: "Ghost (1990)",
              movement: "Conceptual Sculpture",
            },
            {
              id: "maya_lin",
              name: "Maya Lin",
              years: "b. 1959",
              image: "images/artists/maya_lin.jpg",
              imageAlt: "Photograph of Maya Lin.",
              imagePlaceholder: "#1a2a1a",
              insight:
                "Lin's Vietnam Veterans Memorial refuses heroic imagery entirely — a black granite chevron cut into the earth, listing 58,000 names. Visitors see their own reflection in the names of the dead.",
              keyWork: "Vietnam Veterans Memorial (1982)",
              movement: "Environmental Art",
            },
            {
              id: "ursula_von_rydingsvard",
              name: "Ursula von Rydingsvard",
              years: "b. 1942",
              image: "images/artists/ursula_von_rydingsvard.jpg",
              imageAlt: "Photograph of Ursula von Rydingsvard.",
              imagePlaceholder: "#3a2a1a",
              insight:
                "Von Rydingsvard builds massive sculptures from thousands of cedar beams, cutting and gouging them with chainsaws and chisels to create surfaces that resemble eroded landscape or interior organs.",
              keyWork: "For Paul (1992)",
              movement: "Contemporary Sculpture",
            },
          ],
          quiz: [
            {
              question: "Rachel Whiteread is best known for casting what?",
              options: [
                "The faces of living subjects in plaster",
                "The negative space inside and around everyday objects",
                "Bronze figurative sculptures of historical figures",
                "Large-scale outdoor landscape interventions",
              ],
              correct: 1,
              explanation:
                "Ghost cast the interior air of an entire Victorian living room. House cast the inside of a condemned terraced house. Whiteread makes absence visible and solid.",
              curatorNote:
                "Cast voids flip your attention from object to air—ask what room or life the solidified absence once held.",
            },
            {
              question: "Maya Lin's Vietnam Veterans Memorial deliberately avoids what?",
              options: [
                "Using the color black",
                "Any reference to the war's geography",
                "Naming individual soldiers",
                "Heroic imagery — it lists only names, cut into the earth",
              ],
              correct: 3,
              explanation:
                "Lin's design was deeply controversial precisely because it refuses triumphalism. There are no soldiers, weapons, or eagles — only names in polished black granite that reflects visitors' own images.",
            },
            {
              question: "Ursula von Rydingsvard's cedar sculptures often evoke what surfaces?",
              options: [
                "Polished machine-finished aluminum",
                "Eroded landscape or interior organs gouged from wood",
                "Neon-lit commercial signage",
                "Glass vitrines containing preserved specimens",
              ],
              correct: 1,
              explanation:
                "She cuts thousands of cedar beams with chainsaws and chisels until the mass feels like land or hidden bodily forms—scale is part of the argument.",
            },
            {
              question:
                "Visitors to Lin's memorial characteristically see what in the polished granite?",
              options: [
                "Only aerial maps of Vietnam",
                "Their own reflection among the names of the dead",
                "Bronze statues of soldiers in action",
                "A continuous loop of news footage",
              ],
              correct: 1,
              explanation:
                "The chevron cut into the earth lists names while mirroring the living viewer—mourning becomes shared, not distant spectacle.",
            },
            {
              question: "Spatial sculpture in this topic asks the viewer to do what first?",
              options: [
                "Read a wall label from a fixed distance only",
                "Move through absence, monument, or scale—not only look from one spot",
                "Ignore material in favor of biography",
                "Compare auction prices across artists",
              ],
              correct: 1,
              explanation:
                "Whiteread's casts, Lin's cut in the earth, and von Rydingsvard's masses all reorganize how your body relates to the work.",
            },
          ],
        },
        material: {
          id: "material",
          label: "Material",
          description:
            "Matter as argument—unstable polymers, recycled metal, cedar labor, and craft at monument scale.",
          thesis:
            "Ask what the material remembers: trade, decay, craft, and the hands that shaped it.",
          keyIdeas:
            "Material-led sculpture treats process and substance as content. Hesse's sagging latex critiques timeless geometry; Anatsui's bottle-cap fields map global trade onto cloth-like surfaces; Leigh fuses figure and vernacular architecture—each insists that what things are made of is never neutral.",
          result: {
            learnedIdeas: [
              "Recognizing impermanence and decay as deliberate sculptural choices",
              "Tracing recycled or industrial materials back to economic histories",
              "Seeing how craft labor and cultural reference merge in monumental form",
            ],
            synthesis:
              "You practiced reading material choice as politics, memory, and bodily metaphor.",
            strongestSkill:
              "Connecting substance and making process to the ideas the work carries.",
            nextFocus:
              "Compare Hesse's unstable hangings with Anatsui's draped metal—what does each material refuse to hide?",
          },
          artists: [
            {
              id: "eva_hesse",
              name: "Eva Hesse",
              years: "1936–1970",
              image: "images/artists/eva_hesse.jpg",
              imageAlt: "Photograph of Eva Hesse.",
              imagePlaceholder: "#c8b89a",
              insight:
                "Hesse transformed Post-Minimalism by introducing latex, rope, and fiberglass — organic, unstable materials that sag, droop, and decay. Her work insists on the absurd and the bodily within geometric form.",
              keyWork: "Hang Up (1966)",
              movement: "Post-Minimalism",
            },
            {
              id: "el_anatsui",
              name: "El Anatsui",
              years: "b. 1944",
              image: "images/artists/el_anatsui.jpg",
              imageAlt: "Photograph of El Anatsui.",
              imagePlaceholder: "#8a6a2a",
              insight:
                "Anatsui creates large-scale tapestry-like sculptures from thousands of flattened bottle caps and aluminum foil, referencing both African kente cloth and the global trade routes that brought alcohol to West Africa.",
              keyWork: "Dusasa I (2007)",
              movement: "Contemporary African Art",
            },
            {
              id: "simone_leigh",
              name: "Simone Leigh",
              years: "b. 1967",
              image: "images/artists/simone_leigh.jpg",
              imageAlt: "Photograph of Simone Leigh.",
              imagePlaceholder: "#5a3a2a",
              insight:
                "Leigh merges the female figure with architectural forms drawn from African vernacular buildings — thatched roofs, granaries, jugs. Brick House rose four stories as the US Pavilion centerpiece at Venice 2022.",
              keyWork: "Brick House (2019)",
              movement: "Black Feminism / Sculpture",
            },
          ],
          quiz: [
            {
              question:
                "Eva Hesse's post-minimalist sculptures are characterized by using what kinds of materials?",
              options: [
                "Industrial and organic materials like latex, rope, and fiberglass that sag and decay",
                "Traditional bronze and marble casting",
                "Welded steel and painted aluminum",
                "Found wooden furniture and domestic objects",
              ],
              correct: 0,
              explanation:
                "Hesse deliberately chose unstable materials that change over time — latex yellows and cracks, rope sags. This impermanence was central to her critique of Minimalism's claim to timeless geometric purity.",
              curatorNote:
                "Decay is part of the work's argument—notice when permanence would have been the more conservative choice.",
            },
            {
              question: "El Anatsui's large draped works are assembled primarily from what?",
              options: [
                "Hand-woven silk threads dyed with plant pigments",
                "Thousands of flattened bottle caps and aluminum foil",
                "Cast concrete blocks arranged in grids",
                "Neon tubing bent into calligraphic lines",
              ],
              correct: 1,
              explanation:
                "He links African textile traditions with the global trade routes that brought alcohol to West Africa—material memory is never neutral.",
            },
            {
              question: "Simone Leigh's Brick House merges the female figure with what?",
              options: [
                "Industrial machinery and scaffolding",
                "Classical Greek architectural columns",
                "Architectural forms referencing African vernacular buildings",
                "Digital projection and neon light",
              ],
              correct: 2,
              explanation:
                "Leigh fused a monumental Black female bust with a skirt resembling a thatched African granary. The title references both the idiom for a large woman and architecture as a carrier of cultural memory.",
            },
            {
              question: "Anatsui's bottle-cap fields most directly reference which traditions?",
              options: [
                "European cathedral stained glass",
                "African kente cloth and patterns of global trade",
                "Japanese origami and paper folding",
                "American Abstract Expressionist drip painting",
              ],
              correct: 1,
              explanation:
                "The shimmering fields read as textile from a distance while carrying the history of commodities and exchange up close.",
            },
            {
              question: "Material-led sculpture in this topic insists that what is never neutral?",
              options: [
                "The artist's birth year alone",
                "What things are made of and the labor that shaped them",
                "Whether the work is displayed indoors",
                "The frame around a photograph",
              ],
              correct: 1,
              explanation:
                "Hesse's decaying polymers, Anatsui's recycled metal, and Leigh's architectural clay all make substance and process part of the meaning.",
            },
          ],
        },
      },
      quiz: [
        {
          question:
            "Louise Bourgeois's giant spider sculptures, Maman, represent what personal figure?",
          options: [
            "Her father, who ran a tapestry restoration business",
            "An imaginary childhood monster she feared",
            "Her mother, whom she described as patient, protective, and industrious as a weaver",
            "A symbol of female predation in mythology",
          ],
          correct: 2,
          explanation:
            "Bourgeois often said: 'My best friend was my mother — she was deliberate, clever, patient, soothing, reasonable, dainty, indispensable, neat, and as useful as a spider.'",
        },
        {
          question: "Rachel Whiteread is best known for casting what?",
          options: [
            "The faces of living subjects in plaster",
            "The negative space inside and around everyday objects",
            "Bronze figurative sculptures of historical figures",
            "Large-scale outdoor landscape interventions",
          ],
          correct: 1,
          explanation:
            "Ghost cast the interior air of an entire Victorian living room. House cast the inside of a condemned terraced house. Whiteread makes absence visible and solid.",
          curatorNote:
            "Cast voids flip your attention from object to air—ask what room or life the solidified absence once held.",
        },
        {
          question: "Maya Lin's Vietnam Veterans Memorial deliberately avoids what?",
          options: [
            "Using the color black",
            "Any reference to the war's geography",
            "Naming individual soldiers",
            "Heroic imagery — it lists only names, cut into the earth",
          ],
          correct: 3,
          explanation:
            "Lin's design was deeply controversial precisely because it refuses triumphalism. There are no soldiers, weapons, or eagles — only names in polished black granite that reflects visitors' own images.",
        },
        {
          question:
            "Eva Hesse's post-minimalist sculptures are characterized by using what kinds of materials?",
          options: [
            "Industrial and organic materials like latex, rope, and fiberglass that sag and decay",
            "Traditional bronze and marble casting",
            "Welded steel and painted aluminum",
            "Found wooden furniture and domestic objects",
          ],
          correct: 0,
          explanation:
            "Hesse deliberately chose unstable materials that change over time — latex yellows and cracks, rope sags. This impermanence was central to her critique of Minimalism's claim to timeless geometric purity.",
          curatorNote:
            "Decay is part of the work's argument—notice when permanence would have been the more conservative choice.",
        },
        {
          question: "Simone Leigh's Brick House merges the female figure with what?",
          options: [
            "Industrial machinery and scaffolding",
            "Classical Greek architectural columns",
            "Architectural forms referencing African vernacular buildings",
            "Digital projection and neon light",
          ],
          correct: 2,
          explanation:
            "Leigh fused a monumental Black female bust with a skirt resembling a thatched African granary. The title references both the idiom for a large woman and architecture as a carrier of cultural memory.",
        },
      ],
    },

    performance: {
      id: "performance",
      label: "Performance",
      icon: "◈",
      topics: {
        bodyAsMedium: {
          id: "bodyAsMedium",
          label: "Body as Medium",
          description:
            "The artist's body as material—endurance, invitation, and imprint in works that cannot exist without live presence or its record.",
          thesis:
            "Ask who risks pain, exposure, or trust—and who in the room holds power over the situation.",
          keyIdeas:
            "Performance here tests presence (Abramović), transfers agency to the audience (Ono), and merges body with land (Mendieta). The body is not a neutral tool; it carries gender, exile, and history.",
          result: {
            learnedIdeas: [
              "Distinguishing endurance from spectacle",
              "Reading audience participation as ethical problem, not gimmick",
              "Connecting earth-body imprints to exile and belonging",
            ],
            synthesis:
              "You practiced linking live action to vulnerability, duration, and social contract.",
            strongestSkill: "Analyzing who controls the gaze when the artist's body is the medium.",
            nextFocus:
              "Compare Ono's Cut Piece to Abramović's silent sitting—how is risk distributed differently?",
          },
          artists: [
            {
              id: "marina_abramovic",
              name: "Marina Abramović",
              years: "b. 1946",
              image: "images/artists/marina_abramovic.jpg",
              imageAlt: "Photograph of Marina Abramović.",
              imagePlaceholder: "#1a1a1a",
              insight:
                "Abramović's The Artist is Present placed her silently opposite museum visitors for 736 hours — testing the limits of presence, endurance, and what it means to truly see and be seen by another person.",
              keyWork: "The Artist is Present (2010)",
              movement: "Performance Art",
            },
            {
              id: "yoko_ono",
              name: "Yoko Ono",
              years: "b. 1933",
              image: "images/artists/yoko_ono.jpg",
              imageAlt: "Photograph of Yoko Ono.",
              imagePlaceholder: "#2a2a2a",
              insight:
                "Cut Piece invited audience members to cut away Ono's clothing with scissors — transferring agency to the viewer and exposing the violence latent in looking, long before this language entered mainstream feminist theory.",
              keyWork: "Cut Piece (1964)",
              movement: "Conceptual Art / Fluxus",
            },
            {
              id: "ana_mendieta",
              name: "Ana Mendieta",
              years: "1948–1985",
              image: "images/artists/ana_mendieta.jpg",
              imageAlt: "Photograph of Ana Mendieta.",
              imagePlaceholder: "#1a2a1a",
              insight:
                "Mendieta's Silueta Series documented her imprinting her body's outline into earth, sand, and natural materials — merging the female form with landscape as a search for belonging between her Cuban heritage and American exile.",
              keyWork: "Silueta Series (1973–80)",
              movement: "Earth-Body Art",
            },
          ],
        },
        duration: {
          id: "duration",
          label: "Duration",
          description:
            "Time made visible through constraint—clocks, discomfort, and repetition that turn everyday life into evidence.",
          thesis:
            "Measure the work in hours and rules, not only in images—what changes when art lasts longer than attention?",
          keyIdeas:
            "Duration performance records life under extreme rules (Hsieh), inserts discomfort into public routine (Piper), or asserts the body as intellectual site (Schneemann). Time is the material as much as the body.",
          result: {
            learnedIdeas: [
              "Reading rule-based endurance as documentation of time itself",
              "Tracing how public intervention exposes social codes",
              "Recognizing the body as source of speech and authority",
            ],
            synthesis:
              "You linked length, repetition, and constraint to meaning—not as background, but as the work.",
            strongestSkill: "Connecting duration and context to political and bodily stakes.",
            nextFocus:
              "Compare Hsieh's year-long clock punching to Piper's subway Catalysis—private rule versus public discomfort.",
          },
          artists: [
            {
              id: "tehching_hsieh",
              name: "Tehching Hsieh",
              years: "b. 1950",
              image: "images/artists/tehching_hsieh.jpg",
              imageAlt:
                "MoMA installation view: a row of small black-and-white portrait photographs of Tehching Hsieh from his One Year Performance.",
              imagePlaceholder: "#1a1a2a",
              insight:
                "Hsieh's One Year Performances subjected his body to extreme constraints for exactly 365 days — punching a time clock every hour, living outdoors, never entering buildings. Art as a record of time itself.",
              keyWork: "One Year Performance (1980–81)",
              movement: "Endurance Art",
              keywords: ["one year performance", "time clock", "endurance", "Taiwanese artist"],
            },
            {
              id: "adrian_piper",
              name: "Adrian Piper",
              years: "b. 1948",
              image: "images/artists/adrian_piper.png",
              imageAlt: "Photograph of Adrian Piper.",
              imagePlaceholder: "#2a1a2a",
              insight:
                "Piper's Catalysis performances took place in public — she rode the subway smelling of vinegar, or wore a sign reading 'Wet Paint' — inserting discomfort into everyday space to expose social codes governing public behavior.",
              keyWork: "Catalysis (1970–71)",
              movement: "Conceptual Art",
            },
            {
              id: "carolee_schneemann",
              name: "Carolee Schneemann",
              years: "1939–2019",
              image: "images/artists/carolee_schneemann.jpg",
              imageAlt: "Photograph of Carolee Schneemann.",
              imagePlaceholder: "#2a2a1a",
              insight:
                "Schneemann's Interior Scroll involved drawing a text from her vagina and reading it aloud — directly asserting the female body as a site of intellectual and creative authority against the erasure of women's voices.",
              keyWork: "Interior Scroll (1975)",
              movement: "Feminist Performance",
            },
          ],
        },
        ritual: {
          id: "ritual",
          label: "Ritual",
          description:
            "Ceremony, satire, and crawl—performance that borrows religious or colonial forms to expose who is allowed in the room.",
          thesis: "Ask what ritual is being invoked, mocked, or reclaimed—and for whose benefit.",
          keyIdeas:
            "Ritual performance stages colonial display (Fusco), crashes white art-world openings (O'Grady), and crawls through public streets (Pope.L). Repetition and costume turn power visible.",
          result: {
            learnedIdeas: [
              "Reading satirical ethnography as institutional critique",
              "Connecting costume and procession to demands for risk in Black art",
              "Seeing abjection and crawl as maps of race and public space",
            ],
            synthesis:
              "You practiced linking ceremonial form to histories of exclusion and resistance.",
            strongestSkill:
              "Tracing how repeated action in public space carries political meaning.",
            nextFocus:
              "Compare Fusco's cage to Pope.L's crawl—spectacle of the other versus abjection in the street.",
          },
          artists: [
            {
              id: "coco_fusco",
              name: "Coco Fusco",
              years: "b. 1960",
              image: "images/artists/coco_fusco.jpg",
              imageAlt: "Photograph of Coco Fusco.",
              imagePlaceholder: "#2a1a1a",
              insight:
                "Fusco and Guillermo Gómez-Peña spent three days in a cage at the 1992 Columbus quincentennial, posing as 'undiscovered Amerindians' — exposing how Western institutions had always displayed colonised bodies as spectacle.",
              keyWork: "Two Undiscovered Amerindians (1992)",
              movement: "Post-Colonial Performance",
            },
            {
              id: "lorraine_ogrady",
              name: "Lorraine O'Grady",
              years: "b. 1934",
              image: "images/artists/lorraine_ogrady.jpg",
              imageAlt: "Photograph of Lorraine O'Grady.",
              imagePlaceholder: "#1a1a1a",
              insight:
                "O'Grady's Mlle Bourgeoise Noire crashed white art world openings wearing a gown made of white gloves, flogging herself and demanding: 'Black art must take more risks!' — a direct confrontation with institutional exclusion.",
              keyWork: "Mlle Bourgeoise Noire (1980–83)",
              movement: "Institutional Critique",
            },
            {
              id: "pope_l",
              name: "Pope.L",
              years: "b. 1955",
              image: "images/artists/pope_l.jpg",
              imageAlt: "Photograph of Pope.L.",
              imagePlaceholder: "#2a2a2a",
              insight:
                "Pope.L's crawl performances — including a 22-mile crawl the length of Broadway — use abjection and endurance to excavate race, poverty, and public space, asking who has the right to occupy a city's streets.",
              keyWork: "The Great White Way (2000–09)",
              movement: "Interventionist Performance",
              wikipediaTitle: "Pope.L",
              keywords: ["crawl", "Broadway", "abjection", "race", "William Pope.L"],
            },
          ],
        },
      },
      quiz: [
        {
          question:
            "Marina Abramović's The Artist is Present at MoMA (2010) involved her doing what?",
          options: [
            "Creating a large-scale painting live over three months",
            "Sitting silently opposite museum visitors for 736 hours across 79 days",
            "Re-enacting her early dangerous performances with a stand-in",
            "Installing mirrors that reflected visitors into infinite space",
          ],
          correct: 1,
          explanation:
            "Abramović sat motionless at a table for the entire duration of the exhibition. Over 1,500 visitors sat opposite her — many reported profound emotional experiences. The queues lasted hours.",
        },
        {
          question: "Yoko Ono's Cut Piece (1964) invited the audience to do what?",
          options: [
            "Cut away her clothing with scissors",
            "Cut their own hair and place it on the stage",
            "Cut paper into shapes spelling words",
            "Cut recorded music tapes into new sequences",
          ],
          correct: 0,
          explanation:
            "Ono sat passively as audience members cut her clothing away piece by piece. The performance made visible the power dynamics of spectatorship — who looks, who is exposed, who controls the gaze.",
        },
        {
          question: "Ana Mendieta's Silueta Series involved which action?",
          options: [
            "Painting self-portraits in her studio using her own blood",
            "Filming her body in free-fall from tall buildings",
            "Imprinting her body's outline into earth, sand, and natural materials",
            "Casting her silhouette in iron and leaving it in public spaces",
          ],
          correct: 2,
          explanation:
            "Mendieta traveled to Mexico and Cuba to make these works, pressing her body into the land. The series responds to her forced exile from Cuba at age 12 — a search for belonging through the body's union with earth.",
        },
        {
          question: "Carolee Schneemann's Interior Scroll (1975) is known for what act?",
          options: [
            "Writing feminist theory on the walls of a gallery in her own blood",
            "Unrolling an enormous canvas scroll across a performance space",
            "Reading aloud from art critics' reviews she had memorized",
            "Drawing a scroll from her vagina and reading it aloud as a text on female creativity",
          ],
          correct: 3,
          explanation:
            "The text on the scroll was a critique of a male filmmaker who dismissed her work as 'personal clutter.' The act insisted the female body is a source of intellectual authority, not merely an object of the male gaze.",
        },
        {
          question:
            "Coco Fusco and Guillermo Gómez-Peña's cage performance Two Undiscovered Amerindians was intended to satirize what?",
          options: [
            "The commercialization of indigenous crafts in tourist markets",
            "The Western history of displaying colonised and indigenous peoples as exotic spectacles",
            "The immigration enforcement system at the US-Mexico border",
            "The failure of art museums to collect Latin American art",
          ],
          correct: 1,
          explanation:
            "Performed at the 1992 Columbus quincentennial, many audiences believed they were seeing real 'undiscovered' people — inadvertently proving that the colonial impulse to exoticize the other had never ended.",
        },
      ],
    },

    videoArt: {
      id: "videoArt",
      label: "Video Art",
      icon: "▶",
      topics: {
        pioneeringSingle: {
          id: "pioneeringSingle",
          label: "Pioneers",
          description:
            "Early women who claimed video as a live, sculptural medium—not television watched from a sofa, but feedback, mirrors, and objects with screens inside.",
          thesis:
            "Notice when the monitor is a tool for performance rather than a window onto a finished film.",
          keyIdeas:
            "Pioneering video often exploits the medium's glitches, latency, and scale. Compare live feedback (Jonas), iconographic overlay (Rosenbach), and embedded monitors in sculpture (Kubota).",
          result: {
            learnedIdeas: [
              "Reading technical 'failure' as rhythmic or political material",
              "Tracing how live video reframes the performing body",
              "Seeing monitors as sculptural elements, not neutral screens",
            ],
            synthesis:
              "You linked early video to embodiment, ritual, and objecthood rather than broadcast entertainment.",
            strongestSkill:
              "Connecting medium-specific devices to the artist's argument about gender and visibility.",
            nextFocus:
              "Compare Jonas's Vertical Roll to Rosenbach's Madonna overlay—what changes when video confronts art history directly?",
          },
          artists: [
            {
              id: "joan_jonas",
              name: "Joan Jonas",
              years: "b. 1936",
              image: "images/artists/joan_jonas.jpg",
              imageAlt: "Photograph of Joan Jonas.",
              imagePlaceholder: "#1a1a2a",
              insight:
                "Jonas was among the first artists to use video as a live feedback tool, incorporating mirrors, masks, and live monitors into performances where image and body deliberately desynchronize. Her Vertical Roll (1972) exploits a TV's rolling malfunction as a rhythmic, hypnotic device.",
              keyWork: "Vertical Roll (1972)",
              movement: "Video / Performance Art",
              keywords: ["Vertical Roll", "video feedback", "mirrors", "performance"],
            },
            {
              id: "ulrike_rosenbach",
              name: "Ulrike Rosenbach",
              years: "b. 1943",
              image: "images/artists/ulrike_rosenbach.jpg",
              imageAlt: "Photograph of Ulrike Rosenbach.",
              imagePlaceholder: "#2a1a2a",
              insight:
                "Rosenbach overlaid live video of her own face onto art-historical images of the Madonna, forcing confrontation between representations of women in Christian iconography and the living female body performing in real time.",
              keyWork: "Don't Believe I Am an Amazon (1975)",
              movement: "Feminist Video Art",
              keywords: ["Madonna", "overlay", "feminist video", "iconography"],
            },
            {
              id: "shigeko_kubota",
              name: "Shigeko Kubota",
              years: "1937–2015",
              image: "images/artists/shigeko_kubota.jpg",
              imageAlt:
                "Black-and-white photograph of a Fluxus performance at the Kurhaus Scheveningen, Netherlands, 13 November 1964.",
              imagePlaceholder: "#1a2a2a",
              insight:
                "Kubota built sculptural furniture and objects containing embedded monitors — her Duchampiana series enclosed video footage inside a physical staircase, forcing the viewer to move through the work rather than simply watch it.",
              keyWork: "Duchampiana: Nude Descending a Staircase (1975–76)",
              movement: "Video Sculpture",
              keywords: ["Duchampiana", "Fluxus", "embedded monitor", "video sculpture"],
            },
          ],
          quiz: [
            {
              question:
                "Joan Jonas's Vertical Roll (1972) uses what device as its central visual element?",
              options: [
                "A camera mounted on a rotating platform",
                "A TV monitor's rolling malfunction exploited as rhythmic repetition",
                "A vertical split screen dividing two simultaneous performances",
                "A scrolling text feed overlaid on footage of her body",
              ],
              correct: 1,
              explanation:
                "Jonas deliberately induced and sustained the rolling glitch in a television monitor, turning a technical failure into a hypnotic pulse — one of the earliest instances of an artist using video's own malfunctions as expressive material.",
              curatorNote:
                "Technical 'failure' in early video often becomes the work's pulse—notice when the medium, not just the scene, is the subject.",
            },
            {
              question:
                "Ulrike Rosenbach's Don't Believe I Am an Amazon overlays live video of her face onto what?",
              options: [
                "News footage of political protests in West Germany",
                "Art-historical images of the Madonna from Christian iconography",
                "Hollywood film stills of action heroines",
                "Surveillance camera feeds from public streets",
              ],
              correct: 1,
              explanation:
                "Rosenbach superimposed her own performing face onto Madonna imagery, forcing confrontation between sacred representation and the living female body in real time.",
              curatorNote:
                "Overlay is an argument about who gets to be 'timeless' in art history—and who must perform in the present.",
            },
            {
              question:
                "Shigeko Kubota's Duchampiana series is notable for placing video inside what kind of form?",
              options: [
                "Handheld viewfinders distributed to the audience",
                "Sculptural objects and furniture with embedded monitors",
                "Projections mapped onto museum facades",
                "Wearable screens attached to performers' bodies",
              ],
              correct: 1,
              explanation:
                "Kubota built sculptural furniture and objects containing embedded monitors — viewers move through the work rather than only watch a wall-mounted screen.",
              curatorNote:
                "When video lives inside an object, your path through space becomes part of the piece.",
            },
            {
              question:
                "Joan Jonas often incorporated which elements into early video performances?",
              options: [
                "Mirrors, masks, and live monitors that desynchronize image and body",
                "Pre-recorded Hollywood dialogue dubbed live",
                "Audience members voting on plot outcomes via keypad",
                "Green-screen compositing before digital editing existed",
              ],
              correct: 0,
              explanation:
                "Jonas used mirrors and masks with live video feedback so the performer and her mediated image could deliberately fall out of sync — questioning stable identity on screen.",
            },
            {
              question:
                "Shigeko Kubota was associated with which movement that treated everyday life and humor as art material?",
              options: ["Fluxus", "Pop Art", "Arte Povera", "The Pictures Generation"],
              correct: 0,
              explanation:
                "Kubota's video sculptures and performances connect to Fluxus's cross-disciplinary, anti-monumental spirit — video as one material among many, not a separate industry.",
            },
          ],
        },
        narrativeIdentity: {
          id: "narrativeIdentity",
          label: "Narrative",
          description:
            "Video as diary, appropriation, and political testimony—when the story is told through loops, confession, and who controls the edit.",
          thesis:
            "Ask whose voice narrates, and whether repetition reveals truth or sells a fantasy back to the viewer.",
          keyIdeas:
            "Narrative video can appropriate broadcast spectacle (Birnbaum), confess in degraded home formats (Benning), or stage public intervention (Kenawy). Looping and low resolution are often part of the meaning, not flaws to fix.",
          result: {
            learnedIdeas: [
              "Reading appropriated TV clips as critique, not homage",
              "Connecting pixelation and toy cameras to intimacy and risk",
              "Tracing how public performance video addresses political constraint",
            ],
            synthesis:
              "You practiced seeing narrative as constructed—through loops, confession, and staging—not as transparent reportage.",
            strongestSkill:
              "Linking editing choices to questions of identity, sexuality, and power.",
            nextFocus:
              "Compare Birnbaum's broadcast loop to Benning's diary pixelvision—what changes when the source is mass media versus the bedroom?",
          },
          artists: [
            {
              id: "dara_birnbaum",
              name: "Dara Birnbaum",
              years: "b. 1946",
              image: "images/artists/dara_birnbaum.jpg",
              imageAlt: "Dara Birnbaum with a calico cat resting on her shoulder.",
              imagePlaceholder: "#2a1a1a",
              insight:
                "Technology/Transformation: Wonder Woman looped the transformation sequence from the TV series, isolating the pyrotechnic spectacle of female power to expose how broadcast television packages and sells a fantasy of women's strength.",
              keyWork: "Technology/Transformation: Wonder Woman (1978–79)",
              movement: "Appropriation Video",
              keywords: ["Wonder Woman", "appropriation", "television loop", "broadcast"],
            },
            {
              id: "sadie_benning",
              name: "Sadie Benning",
              years: "b. 1973",
              image: "images/artists/sadie_benning.jpg",
              imageAlt: "Photograph of Sadie Benning.",
              imagePlaceholder: "#1a1a1a",
              insight:
                "Benning made confessional diary videos as a teenager using a Fisher-Price PXL 2000 toy camera — the deliberately degraded pixelvision image becoming inseparable from the rawness of coming out as a queer teenager in Wisconsin.",
              keyWork: "It Wasn't Love (1992)",
              movement: "Queer Video Diary",
            },
            {
              id: "amal_kenawy",
              name: "Amal Kenawy",
              years: "1974–2012",
              image: "images/artists/amal_kenawy.jpg",
              imageAlt: "Photograph of Amal Kenawy.",
              imagePlaceholder: "#2a2a1a",
              insight:
                "Kenawy's videos fused performance, choreography, and surrealist imagery to address political repression and bodily constraint in Egypt — Silence of the Lambs staged dozens of crawling figures in Cairo's streets as an uninvited public intervention.",
              keyWork: "Silence of the Lambs (2010)",
              movement: "Video / Performance Art",
            },
          ],
          quiz: [
            {
              question:
                "Dara Birnbaum's Technology/Transformation: Wonder Woman isolates which moment from the TV series?",
              options: [
                "The final fight scene",
                "The transformation sequence, looped as spectacular female power",
                "The opening theme song credits only",
                "Wonder Woman's workplace scenes as Diana Prince",
              ],
              correct: 1,
              explanation:
                "By looping the pyrotechnic transformation continuously, Birnbaum strips narrative context — revealing broadcast fantasy packaged and sold to female audiences.",
              curatorNote:
                "Looping one broadcast moment turns plot into pattern—ask what the loop hides and what it sells.",
            },
            {
              question: "Sadie Benning's early diary videos were shot with which device?",
              options: [
                "A Fisher-Price PXL 2000 toy camera producing pixelated 'pixelvision' footage",
                "16mm film transferred to VHS for grain",
                "Studio broadcast cameras on tripods",
                "Drone-mounted HD cameras",
              ],
              correct: 0,
              explanation:
                "Benning used the toy PXL 2000 — degraded image quality became inseparable from the rawness of coming out as a queer teenager in Wisconsin.",
            },
            {
              question: "Amal Kenawy's Silence of the Lambs (2010) took place primarily where?",
              options: [
                "Inside a Cairo gallery with ticketed entry",
                "As an uninvited public intervention with figures crawling in city streets",
                "On Egyptian state television as a sponsored broadcast",
                "In a London white-cube space via live stream only",
              ],
              correct: 1,
              explanation:
                "Kenawy staged dozens of crawling figures in Cairo's streets without invitation — surreal choreography confronting political repression and bodily constraint in public space.",
            },
            {
              question: "Birnbaum's Wonder Woman piece is an example of which strategy?",
              options: [
                "Appropriation — re-editing mass-media footage without permission",
                "Direct cinema — unedited documentary observation",
                "Abstract animation with no recognizable figures",
                "Interactive gaming narratives chosen by viewers",
              ],
              correct: 0,
              explanation:
                "Birnbaum belongs to a generation that treated television clips as raw material — feminist critique through re-cut broadcast spectacle.",
            },
            {
              question: "Benning's It Wasn't Love (1992) is associated with which thematic focus?",
              options: [
                "Queer teenage desire and identity told through confessional video diary",
                "Landscape painting en plein air",
                "Industrial labor strikes in the Midwest",
                "Classical ballet training documentation",
              ],
              correct: 0,
              explanation:
                "Benning's pixelvision diaries merge form and content — low-res intimacy carries the emotional stakes of queer coming-of-age.",
            },
          ],
        },
        installationEnvironment: {
          id: "installationEnvironment",
          label: "Installation",
          description:
            "Room-scale video that wraps the body in color, essay, and multi-screen story—spectatorship becomes spatial, not frontal.",
          thesis:
            "Notice where projections land: floor, ceiling, multiple walls—and how your movement completes the work.",
          keyIdeas:
            "Installation video shifts scale and position. Rist immerses viewers underfoot; Steyerl treats compression and resolution as politics; Ahtila splits narrative across screens so no single seat holds the whole story.",
          result: {
            learnedIdeas: [
              "Reading projection surfaces as part of the argument",
              "Connecting image quality and file format to visibility and power",
              "Assembling meaning by moving between synchronized screens",
            ],
            synthesis:
              "You practiced treating the gallery as an environment to inhabit, not a frame to stand before.",
            strongestSkill:
              "Linking spatial installation choices to how bodies and attention are directed.",
            nextFocus:
              "Walk mentally from Rist's floor projection to Ahtila's multi-screen room—what changes when you must move to understand?",
          },
          artists: [
            {
              id: "pipilotti_rist",
              name: "Pipilotti Rist",
              years: "b. 1962",
              image: "images/artists/pipilotti_rist.jpg",
              imageAlt: "Photograph of Pipilotti Rist.",
              imagePlaceholder: "#1a2a1a",
              insight:
                "Rist projects large-scale video onto floors and ceilings rather than walls, immersing viewers inside lush, distorted color fields — Ever Is Over All shows her smashing car windows with a flower while a police officer smiles in approval.",
              keyWork: "Ever Is Over All (1997)",
              movement: "Video Installation",
            },
            {
              id: "hito_steyerl",
              name: "Hito Steyerl",
              years: "b. 1966",
              image: "images/artists/hito_steyerl.jpg",
              imageAlt: "Photograph of Hito Steyerl.",
              imagePlaceholder: "#0a1a2a",
              insight:
                "Steyerl's essay films treat resolution, compression artifacts, and file formats as political material — How Not to Be Seen: A Fucking Didactic Educational .MOV File uses the logic of surveillance and image degradation to examine visibility and erasure.",
              keyWork: "How Not to Be Seen (2013)",
              movement: "Essay Film / Video Art",
              keywords: ["essay film", "poor image", "compression", "surveillance"],
            },
            {
              id: "eija_liisa_ahtila",
              name: "Eija-Liisa Ahtila",
              years: "b. 1959",
              image: "images/artists/eija_liisa_ahtila.jpg",
              imageAlt: "Photograph of Eija-Liisa Ahtila.",
              imagePlaceholder: "#2a1a2a",
              insight:
                "Ahtila presents narrative across multiple synchronized screens, fragmenting a single story in space so that viewers must move between projections to assemble meaning — Anne, Aki and God uses three screens to depict psychosis from inside the experience.",
              keyWork: "Anne, Aki and God (1998)",
              movement: "Multi-Screen Narrative",
              wikipediaTitle: "Eija-Liisa Ahtila",
              keywords: ["multi-screen", "psychosis", "narrative installation", "Finnish"],
            },
          ],
          quiz: [
            {
              question: "Pipilotti Rist's installations often project video onto which surfaces?",
              options: [
                "Only standard white gallery walls at eye level",
                "Floors and ceilings, immersing viewers inside the image",
                "Outdoor billboards in city centers",
                "Handheld tablets given to each visitor",
              ],
              correct: 1,
              explanation:
                "Projecting beneath and above the viewer collapses conventional distance — viewers become part of the color field rather than detached spectators.",
              curatorNote:
                "Where the image lands in the room is part of the argument—ceiling and floor refuse the neutral 'cinema wall'.",
            },
            {
              question:
                "Hito Steyerl's How Not to Be Seen treats which phenomena as political material?",
              options: [
                "Image compression, file formats, and resolution degradation",
                "Oil painting varnish techniques",
                "Acoustic resonance in concert halls",
                "Bronze casting patinas",
              ],
              correct: 0,
              explanation:
                "Steyerl argues poor-resolution images circulate differently than HD ones — degradation becomes survival, invisibility, and escape from surveillance.",
              curatorNote:
                "Poor images travel differently than pristine ones—compression and format are part of power, not just aesthetics.",
            },
            {
              question: "Eija-Liisa Ahtila's multi-screen works require viewers to do what?",
              options: [
                "Wear VR headsets blocking the physical gallery",
                "Move between projections to assemble narrative distributed in space",
                "Remain seated in a single assigned chair",
                "Solve a puzzle on paper before images play",
              ],
              correct: 1,
              explanation:
                "Splitting one story across synchronized screens makes the viewer's path through the room part of how meaning is constructed.",
              curatorNote:
                "Multi-screen narrative makes your path through space part of the edit—there is no single 'correct' seat.",
            },
            {
              question: "Rist's Ever Is Over All (1997) shows her doing what with a flower?",
              options: [
                "Smashing car windows while a police officer smiles in approval",
                "Planting a community garden on museum grounds",
                "Selling flowers at a street market documentary",
                "Painting still lifes of bouquets in a studio",
              ],
              correct: 0,
              explanation:
                "The slow-motion smash turns playful destruction into feminist spectacle — beauty weaponized against property and propriety.",
            },
            {
              question:
                "Ahtila's Anne, Aki and God (1998) uses multiple screens primarily to depict what?",
              options: [
                "Psychosis from inside the experience of perception",
                "A single landscape with changing weather",
                "Abstract color fields without figures",
                "Sports events from multiple camera angles",
              ],
              correct: 0,
              explanation:
                "Three screens fragment narrative space to mirror disordered perception — empathy through formal structure, not explanatory voice-over alone.",
            },
          ],
        },
      },
    },
  },
};

function normalizeQuestion(q) {
  return {
    question: q.question,
    options: q.options,
    correct: q.correct,
    explanation: q.explanation,
    curatorNote: q.curatorNote || q.explanation,
  };
}

/**
 * Active bank: topic `quiz` if exactly 5 items, else series `quiz` if exactly 5, else LEGACY_QUIZ_QUESTIONS.
 */
export function getQuizQuestions(seriesId, topicId) {
  const series = APP_DATA.series[seriesId];
  const topic = series.topics[topicId];
  const tq = topic.quiz;
  if (Array.isArray(tq) && tq.length === 5) {
    return tq.map(normalizeQuestion);
  }
  const sq = series.quiz;
  if (Array.isArray(sq) && sq.length === 5) {
    return sq.map(normalizeQuestion);
  }
  return LEGACY_QUIZ_QUESTIONS.map(normalizeQuestion);
}

/** True when the quiz uses the shared cross-topic bank (not topic- or series-specific questions). */
export function isLegacyQuizBank(seriesId, topicId) {
  const series = APP_DATA.series[seriesId];
  const topic = series.topics[topicId];
  const tq = topic.quiz;
  if (Array.isArray(tq) && tq.length === 5) return false;
  const sq = series.quiz;
  if (Array.isArray(sq) && sq.length === 5) return false;
  return true;
}

export function quizQuestionCount(seriesId, topicId) {
  return getQuizQuestions(seriesId, topicId).length;
}

/** Curated anchors for the landing “5-minute tour” (live series/topics only). */
export const SHORT_SESSION_POOL = [
  { seriesId: "photography", topicId: "identity", artistId: "zanele_muholi" },
  { seriesId: "photography", topicId: "documentary", artistId: "dorothea_lange" },
  { seriesId: "painting", topicId: "figurative", artistId: "alice_neel" },
  { seriesId: "painting", topicId: "abstraction", artistId: "helen_frankenthaler" },
  { seriesId: "performance", topicId: "duration", artistId: "tehching_hsieh" },
  { seriesId: "sculpture", topicId: "body", artistId: "louise_bourgeois" },
  { seriesId: "videoArt", topicId: "pioneeringSingle", artistId: "joan_jonas" },
];

/**
 * Deterministic editorial pick for a calendar day (UTC), for a short browse session.
 * @param {Date} [date]
 */
export function shortSessionAnchorForDay(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const key = `${y}-${m}-${d}`;
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const idx = (Math.abs(h) >>> 0) % SHORT_SESSION_POOL.length;
  return SHORT_SESSION_POOL[idx];
}
