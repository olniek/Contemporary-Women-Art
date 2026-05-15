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
    question: "Why do curators often group women artists around themes instead of only by biography?",
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
    curatorNote:
      "Let your body imagine walking around it—scale and touch are part of the meaning.",
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
            strongestSkill: "Linking visual choices to social context without reducing artists to symbols.",
            nextFocus: "Compare two artists’ use of staging—what changes when the scene is domestic versus public?",
          },
          artists: [
            {
              id: "zanele_muholi",
              name: "Zanele Muholi",
              years: "b. 1972",
              image: "images/artists/zanele_muholi.jpg",
              imageAlt: "Neutral placeholder tile for Zanele Muholi — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a2a2a",
              insight: "Muholi's self-portrait series Somnyama Ngonyama reclaims the Black gaze by manipulating exposure to hyperpigment their skin, turning the camera into an act of resistance.",
              keyWork: "Somnyama Ngonyama (2012–ongoing)",
              movement: "Visual Activism"
            },
            {
              id: "nan_goldin",
              name: "Nan Goldin",
              years: "b. 1953",
              image: "images/artists/nan_goldin.png",
              imageAlt: "Neutral placeholder tile for Nan Goldin — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#3d2b2b",
              insight: "Goldin's The Ballad of Sexual Dependency is an intimate visual diary of her circle — capturing love, addiction, and violence with unflinching honesty in 1970s–80s New York.",
              keyWork: "The Ballad of Sexual Dependency (1986)",
              movement: "Confessional Photography"
            },
            {
              id: "carrie_mae_weems",
              name: "Carrie Mae Weems",
              years: "b. 1953",
              image: "images/artists/carrie_mae_weems.jpg",
              imageAlt: "Neutral placeholder tile for Carrie Mae Weems — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1a2a3a",
              insight: "Weems's Kitchen Table Series uses a single domestic setting to explore the complexity of Black women's lives — relationships, solitude, power, and joy — through staged narrative sequences.",
              keyWork: "Kitchen Table Series (1990)",
              movement: "Conceptual Photography"
            }
          ]
        },
        documentary: {
          id: "documentary",
          label: "Documentary",
          description:
            "Witness, ethics, and the gap between event and image—when documentary work asks who the photograph serves.",
          thesis: "Ask what the picture wants from you as a viewer: empathy, action, or complicity.",
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
              imageAlt: "Black-and-white photograph (Migrant Mother): a weary mother rests her face on her hand; two children turn away from the camera.",
              imagePlaceholder: "#2d2d1e",
              insight: "Lange's Migrant Mother became the defining image of the Great Depression — a single photograph that galvanized public support for relief programs and changed how documentary photography was understood.",
              keyWork: "Migrant Mother (1936)",
              movement: "Social Documentary"
            },
            {
              id: "susan_meiselas",
              name: "Susan Meiselas",
              years: "b. 1948",
              image: "images/artists/susan_meiselas.jpg",
              imageAlt: "Neutral placeholder tile for Susan Meiselas — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1e2d1e",
              insight: "Meiselas embedded herself in the 1978–79 Nicaraguan revolution, creating images that blur the boundary between witness and participant — and raised lasting questions about photojournalistic ethics.",
              keyWork: "Nicaragua (1981)",
              movement: "Photojournalism"
            },
            {
              id: "an_my_le",
              name: "An-My Lê",
              years: "b. 1960",
              image: "images/artists/an_my_le.jpg",
              imageAlt: "Neutral placeholder tile for An-My Lê — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1e2535",
              insight: "Lê photographs military re-enactments and training exercises, using the gap between performance and reality to interrogate how America constructs and mythologizes war.",
              keyWork: "Small Wars (1999–2002)",
              movement: "Documentary / War Photography"
            }
          ]
        },
        selfPortrait: {
          id: "selfPortrait",
          label: "Self-Portrait",
          artists: [
            {
              id: "francesca_woodman",
              name: "Francesca Woodman",
              years: "1958–1981",
              image: "images/artists/francesca_woodman.png",
              imageAlt:
                "Black-and-white self-portrait: figure hanging from a doorframe in a tiled room, arms raised.",
              imagePlaceholder: "#2a2020",
              insight: "Woodman made hundreds of photographs in decaying interiors, using slow shutter speeds to blur her own body into the architecture — exploring the female self as both present and dissolving.",
              keyWork: "House Series (1975–76)",
              movement: "Surrealist Photography"
            },
            {
              id: "cindy_sherman",
              name: "Cindy Sherman",
              years: "b. 1954",
              image: "images/artists/cindy_sherman.png",
              imageAlt:
                "Cindy Sherman in Renaissance Madonna costume with swaddled infant, lace and velvet backdrop.",
              imagePlaceholder: "#3a2a1a",
              insight: "Sherman's Untitled Film Stills features herself as every character — each photograph a constructed archetype drawn from cinema's visual language of femininity, never once depicting 'Cindy Sherman'.",
              keyWork: "Untitled Film Stills (1977–80)",
              movement: "Postmodern Photography"
            },
            {
              id: "lorna_simpson",
              name: "Lorna Simpson",
              years: "b. 1960",
              image: "images/artists/lorna_simpson.jpg",
              imageAlt: "Neutral placeholder tile for Lorna Simpson — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1a1a2a",
              insight: "Simpson pairs photographs of Black women's bodies with fragmented text, refusing the viewer's gaze by showing subjects from behind — insisting on interiority over spectacle.",
              keyWork: "Waterbearer (1986)",
              movement: "Conceptual Photography"
            }
          ]
        }
      },
      quiz: [
        {
          question: "Cindy Sherman's Untitled Film Stills features which recurring subject?",
          options: [
            "Herself staged as fictional female archetypes from cinema",
            "Abstract urban landscapes",
            "Documentary portraits of Hollywood actresses",
            "Her close friends and family"
          ],
          correct: 0,
          explanation: "Sherman plays every character herself, examining how cinema constructs femininity. The series contains 69 images — yet Sherman herself is never 'in' them as herself."
        },
        {
          question: "Nan Goldin's The Ballad of Sexual Dependency began as what?",
          options: [
            "A book commissioned by a New York publisher",
            "A live slideshow shown in nightclubs set to music",
            "A series of magazine commissions",
            "An MFA thesis project"
          ],
          correct: 1,
          explanation: "It was a live slideshow screened in clubs like The Mudd Club, documenting Goldin's intimate circle in 1970s–80s New York. The book came later."
        },
        {
          question: "Zanele Muholi describes their practice as 'visual activism'. This primarily refers to their work doing what?",
          options: [
            "Using digital manipulation to alter political photographs",
            "Photographing anti-apartheid protests in South Africa",
            "Documenting Black LGBTQIA+ lives in South Africa that mainstream media ignored",
            "Selling work exclusively to activist organisations"
          ],
          correct: 2,
          explanation: "Muholi coined the term to describe photography as a tool for social justice — specifically creating a visual archive of Black queer lives erased from public representation."
        },
        {
          question: "Dorothea Lange's Migrant Mother was taken during which historical event?",
          options: [
            "World War II",
            "The Dust Bowl migration alone",
            "The Great Depression",
            "The Korean War"
          ],
          correct: 2,
          explanation: "Taken in 1936 at a pea-pickers camp in California, it was commissioned by the Farm Security Administration to document conditions during the Great Depression."
        },
        {
          question: "Francesca Woodman's photographs characteristically feature which quality?",
          options: [
            "Blurred, ghostly self-portraits in decaying architectural spaces",
            "Sharply focused street photography in New York",
            "Staged studio portraits with elaborate props",
            "Aerial landscape photography"
          ],
          correct: 0,
          explanation: "Woodman used slow shutter speeds to create motion blur, making her own body merge with or disappear into the crumbling interiors she photographed — a visual metaphor for unstable selfhood."
        }
      ]
    },

    painting: {
      id: "painting",
      label: "Painting",
      icon: "◼",
      topics: {
        abstraction: {
          id: "abstraction",
          label: "Abstraction",
          artists: [
            {
              id: "helen_frankenthaler",
              name: "Helen Frankenthaler",
              years: "1928–2011",
              image: "images/artists/helen_frankenthaler.jpg",
              imageAlt: "Neutral placeholder tile for Helen Frankenthaler — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a1a3a",
              insight: "Frankenthaler poured thinned paint directly onto unprimed canvas, inventing the soak-stain technique that defined Color Field painting. Her landmark Mountains and Sea transformed how a generation approached abstraction.",
              keyWork: "Mountains and Sea (1952)",
              movement: "Color Field Painting"
            },
            {
              id: "agnes_martin",
              name: "Agnes Martin",
              years: "1912–2004",
              image: "images/artists/agnes_martin.jpg",
              imageAlt: "Neutral placeholder tile for Agnes Martin — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#dcdcd4",
              insight: "Martin's soft pencil grids on pale linen canvases are not cold minimalism but expressions of happiness and innocence — she described them as 'about beauty, and it's a simple subject.'",
              keyWork: "Untitled #1 (1988)",
              movement: "Minimalism"
            },
            {
              id: "lee_krasner",
              name: "Lee Krasner",
              years: "1908–1984",
              image: "images/artists/lee_krasner.jpg",
              imageAlt: "Neutral placeholder tile for Lee Krasner — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#3a2a1a",
              insight: "Long overshadowed by her husband Jackson Pollock, Krasner's large-scale Abstract Expressionist works — including the collaged Night Journeys series made after his death — are now recognized as central to the movement.",
              keyWork: "The Seasons (1957)",
              movement: "Abstract Expressionism"
            }
          ]
        },
        figurative: {
          id: "figurative",
          label: "Figurative",
          artists: [
            {
              id: "alice_neel",
              name: "Alice Neel",
              years: "1900–1984",
              image: "images/artists/alice_neel.jpg",
              imageAlt: "Neutral placeholder tile for Alice Neel — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1e3a2a",
              insight: "Neel painted the people mainstream art ignored: working-class New Yorkers, Black and Latino neighbors, pregnant women, and gay men — creating a radical portrait of 20th-century American life from the margins.",
              keyWork: "Andy Warhol (1970)",
              movement: "Social Realism"
            },
            {
              id: "jenny_saville",
              name: "Jenny Saville",
              years: "b. 1970",
              image: "images/artists/jenny_saville.jpg",
              imageAlt: "Neutral placeholder tile for Jenny Saville — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#3a1a1a",
              insight: "Saville paints the female body at monumental scale and from unconventional vantage points — looking down at flesh that overflows the frame — refusing the idealizing traditions of the nude.",
              keyWork: "Propped (1992)",
              movement: "Neo-Expressionism"
            },
            {
              id: "lynette_yiadom_boakye",
              name: "Lynette Yiadom-Boakye",
              years: "b. 1977",
              image: "images/artists/lynette_yiadom_boakye.jpg",
              imageAlt: "Neutral placeholder tile for Lynette Yiadom-Boakye — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1a2a1a",
              insight: "Yiadom-Boakye paints fictional Black figures, composing them from imagination rather than life or reference. Her subjects suggest interiority without disclosure — neither portraits nor allegories.",
              keyWork: "Any Number of Preoccupations (2010)",
              movement: "Figurative Painting"
            }
          ]
        },
        political: {
          id: "political",
          label: "Political",
          artists: [
            {
              id: "faith_ringgold",
              name: "Faith Ringgold",
              years: "b. 1930",
              image: "images/artists/faith_ringgold.jpg",
              imageAlt: "Neutral placeholder tile for Faith Ringgold — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a1a1a",
              insight: "Ringgold's story quilts merge West African textile tradition with American quilt-making and narrative text — using a domestic craft historically associated with Black women to tell stories that museums once refused to exhibit.",
              keyWork: "Tar Beach (1988)",
              movement: "Narrative Art"
            },
            {
              id: "kara_walker",
              name: "Kara Walker",
              years: "b. 1969",
              image: "images/artists/kara_walker.jpg",
              imageAlt: "Neutral placeholder tile for Kara Walker — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#0a0a0a",
              insight: "Walker's large-scale black silhouettes stage grotesque tableaux of slavery's violence and sexual exploitation — using a genteel 19th-century art form to force confrontation with histories Americans prefer to obscure.",
              keyWork: "A Subtlety (2014)",
              movement: "Neo-Conceptualism"
            },
            {
              id: "cecily_brown",
              name: "Cecily Brown",
              years: "b. 1969",
              image: "images/artists/cecily_brown.jpg",
              imageAlt: "Neutral placeholder tile for Cecily Brown — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a1a2a",
              insight: "Brown's densely layered paintings hover between figuration and abstraction — bodies, landscapes, and violence blur together in surfaces that reward sustained looking and resist easy resolution.",
              keyWork: "Horizontale (2003)",
              movement: "Neo-Expressionism"
            }
          ]
        }
      },
      quiz: [
        {
          question: "Helen Frankenthaler developed which painting technique central to Color Field painting?",
          options: [
            "Impasto — applying paint thickly with a palette knife",
            "Soak-stain — pouring thinned paint onto unprimed canvas",
            "Encaustic — painting with heated wax",
            "Fresco — painting on wet plaster"
          ],
          correct: 1,
          explanation: "Frankenthaler's soak-stain technique, developed in Mountains and Sea (1952), created luminous color that was of the canvas rather than on it — directly influencing Morris Louis and Kenneth Noland."
        },
        {
          question: "Alice Neel is celebrated for painting subjects largely ignored by the mainstream art world. Which groups did she especially focus on?",
          options: [
            "Wealthy Manhattan socialites",
            "Abstract Expressionist painters",
            "Working-class New Yorkers, pregnant women, and LGBTQ+ individuals",
            "European immigrants in the 1920s"
          ],
          correct: 2,
          explanation: "Neel spent decades painting her Harlem and Upper West Side neighbors — a radical act of attention toward people the art world rendered invisible. Her late recognition came only after decades of neglect."
        },
        {
          question: "Faith Ringgold's story quilts combine which two traditions?",
          options: [
            "Japanese woodblock printing and American folk art",
            "European oil painting and Native American beadwork",
            "Abstract Expressionism and Surrealism",
            "West African textile tradition and American quilt-making"
          ],
          correct: 3,
          explanation: "Ringgold began making quilts after museums refused to exhibit her protest paintings. The quilt format let her embed written narrative into a craft form with deep roots in Black women's culture."
        },
        {
          question: "Jenny Saville's large-scale figurative paintings are known for depicting what?",
          options: [
            "Landscapes of the Scottish Highlands",
            "The female body from confrontational, unconventional perspectives at monumental scale",
            "Historical mythological scenes",
            "Tightly controlled still life arrangements"
          ],
          correct: 1,
          explanation: "Saville often paints herself or the female body from above or at extreme close range — flesh overflowing the frame — directly challenging the Western tradition of the idealized nude."
        },
        {
          question: "Agnes Martin described her minimal grid paintings as expressing what?",
          options: [
            "Happiness, innocence, and classical beauty",
            "Industrial alienation and urban anxiety",
            "Political resistance and feminist anger",
            "The unconscious mind and dream imagery"
          ],
          correct: 0,
          explanation: "Martin wrote extensively that her paintings were about positive emotional states — joy, beauty, innocence. She resisted the Minimalist label, insisting her work was closer to Abstract Expressionism in intent."
        }
      ]
    },

    sculpture: {
      id: "sculpture",
      label: "Sculpture",
      status: "coming-soon",
      comingSoonDescription:
        "Three topics—body, space, and material—are in progress. When this series goes live, you will browse artists and take topic-specific quizzes here.",
      icon: "◯",
      topics: {
        body: {
          id: "body",
          label: "Body",
          artists: [
            {
              id: "louise_bourgeois",
              name: "Louise Bourgeois",
              years: "1911–2010",
              image: "images/artists/louise_bourgeois.jpg",
              imageAlt: "Neutral placeholder tile for Louise Bourgeois — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1a1a2a",
              insight: "Bourgeois spent seven decades making art about the body, memory, and family. Her giant spider sculptures Maman represent her mother — described as patient, protective, and industrious as a weaver.",
              keyWork: "Maman (1999)",
              movement: "Feminist Art / Surrealism"
            },
            {
              id: "kiki_smith",
              name: "Kiki Smith",
              years: "b. 1954",
              image: "images/artists/kiki_smith.jpg",
              imageAlt: "Neutral placeholder tile for Kiki Smith — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a2a1a",
              insight: "Smith makes the interior of the body visible — casting organs, trailing viscera, depicting bodily processes that culture renders taboo. Tale features a female figure crawling, with a long tail behind her.",
              keyWork: "Tale (1992)",
              movement: "Feminist Art"
            },
            {
              id: "sarah_lucas",
              name: "Sarah Lucas",
              years: "b. 1962",
              image: "images/artists/sarah_lucas.jpg",
              imageAlt: "Neutral placeholder tile for Sarah Lucas — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a1a1a",
              insight: "Lucas's sculptures use everyday objects — mattresses, toilets, fried eggs, cigarettes — to deconstruct the sexual objectification of women through crude, sardonic wit rather than earnest protest.",
              keyWork: "Au Naturel (1994)",
              movement: "YBA / Feminist Art"
            }
          ]
        },
        space: {
          id: "space",
          label: "Space",
          artists: [
            {
              id: "rachel_whiteread",
              name: "Rachel Whiteread",
              years: "b. 1963",
              image: "images/artists/rachel_whiteread.jpg",
              imageAlt: "Neutral placeholder tile for Rachel Whiteread — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#d0c8b8",
              insight: "Whiteread casts the negative space inside and around ordinary objects — the air under a chair, the inside of a room — making invisible domestic space tangible and monumental.",
              keyWork: "Ghost (1990)",
              movement: "Conceptual Sculpture"
            },
            {
              id: "maya_lin",
              name: "Maya Lin",
              years: "b. 1959",
              image: "images/artists/maya_lin.jpg",
              imageAlt: "Neutral placeholder tile for Maya Lin — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1a2a1a",
              insight: "Lin's Vietnam Veterans Memorial refuses heroic imagery entirely — a black granite chevron cut into the earth, listing 58,000 names. Visitors see their own reflection in the names of the dead.",
              keyWork: "Vietnam Veterans Memorial (1982)",
              movement: "Environmental Art"
            },
            {
              id: "ursula_von_rydingsvard",
              name: "Ursula von Rydingsvard",
              years: "b. 1942",
              image: "images/artists/ursula_von_rydingsvard.jpg",
              imageAlt: "Neutral placeholder tile for Ursula von Rydingsvard — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#3a2a1a",
              insight: "Von Rydingsvard builds massive sculptures from thousands of cedar beams, cutting and gouging them with chainsaws and chisels to create surfaces that resemble eroded landscape or interior organs.",
              keyWork: "For Paul (1992)",
              movement: "Contemporary Sculpture"
            }
          ]
        },
        material: {
          id: "material",
          label: "Material",
          artists: [
            {
              id: "eva_hesse",
              name: "Eva Hesse",
              years: "1936–1970",
              image: "images/artists/eva_hesse.jpg",
              imageAlt: "Neutral placeholder tile for Eva Hesse — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#c8b89a",
              insight: "Hesse transformed Post-Minimalism by introducing latex, rope, and fiberglass — organic, unstable materials that sag, droop, and decay. Her work insists on the absurd and the bodily within geometric form.",
              keyWork: "Hang Up (1966)",
              movement: "Post-Minimalism"
            },
            {
              id: "el_anatsui",
              name: "El Anatsui",
              years: "b. 1944",
              image: "images/artists/el_anatsui.jpg",
              imageAlt: "Neutral placeholder tile for El Anatsui — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#8a6a2a",
              insight: "Anatsui creates large-scale tapestry-like sculptures from thousands of flattened bottle caps and aluminum foil, referencing both African kente cloth and the global trade routes that brought alcohol to West Africa.",
              keyWork: "Dusasa I (2007)",
              movement: "Contemporary African Art"
            },
            {
              id: "simone_leigh",
              name: "Simone Leigh",
              years: "b. 1967",
              image: "images/artists/simone_leigh.jpg",
              imageAlt: "Photograph of Simone Leigh.",
              imagePlaceholder: "#5a3a2a",
              insight: "Leigh merges the female figure with architectural forms drawn from African vernacular buildings — thatched roofs, granaries, jugs. Brick House rose four stories as the US Pavilion centerpiece at Venice 2022.",
              keyWork: "Brick House (2019)",
              movement: "Black Feminism / Sculpture"
            }
          ]
        }
      },
      quiz: [
        {
          question: "Louise Bourgeois's giant spider sculptures, Maman, represent what personal figure?",
          options: [
            "Her father, who ran a tapestry restoration business",
            "An imaginary childhood monster she feared",
            "Her mother, whom she described as patient, protective, and industrious as a weaver",
            "A symbol of female predation in mythology"
          ],
          correct: 2,
          explanation: "Bourgeois often said: 'My best friend was my mother — she was deliberate, clever, patient, soothing, reasonable, dainty, indispensable, neat, and as useful as a spider.'"
        },
        {
          question: "Rachel Whiteread is best known for casting what?",
          options: [
            "The faces of living subjects in plaster",
            "The negative space inside and around everyday objects",
            "Bronze figurative sculptures of historical figures",
            "Large-scale outdoor landscape interventions"
          ],
          correct: 1,
          explanation: "Ghost cast the interior air of an entire Victorian living room. House cast the inside of a condemned terraced house. Whiteread makes absence visible and solid."
        },
        {
          question: "Maya Lin's Vietnam Veterans Memorial deliberately avoids what?",
          options: [
            "Using the color black",
            "Any reference to the war's geography",
            "Naming individual soldiers",
            "Heroic imagery — it lists only names, cut into the earth"
          ],
          correct: 3,
          explanation: "Lin's design was deeply controversial precisely because it refuses triumphalism. There are no soldiers, weapons, or eagles — only names in polished black granite that reflects visitors' own images."
        },
        {
          question: "Eva Hesse's post-minimalist sculptures are characterized by using what kinds of materials?",
          options: [
            "Industrial and organic materials like latex, rope, and fiberglass that sag and decay",
            "Traditional bronze and marble casting",
            "Welded steel and painted aluminum",
            "Found wooden furniture and domestic objects"
          ],
          correct: 0,
          explanation: "Hesse deliberately chose unstable materials that change over time — latex yellows and cracks, rope sags. This impermanence was central to her critique of Minimalism's claim to timeless geometric purity."
        },
        {
          question: "Simone Leigh's Brick House merges the female figure with what?",
          options: [
            "Industrial machinery and scaffolding",
            "Classical Greek architectural columns",
            "Architectural forms referencing African vernacular buildings",
            "Digital projection and neon light"
          ],
          correct: 2,
          explanation: "Leigh fused a monumental Black female bust with a skirt resembling a thatched African granary. The title references both the idiom for a large woman and architecture as a carrier of cultural memory."
        }
      ]
    },

    performance: {
      id: "performance",
      label: "Performance",
      icon: "◈",
      topics: {
        bodyAsMedium: {
          id: "bodyAsMedium",
          label: "Body as Medium",
          artists: [
            {
              id: "marina_abramovic",
              name: "Marina Abramović",
              years: "b. 1946",
              image: "images/artists/marina_abramovic.jpg",
              imageAlt: "Neutral placeholder tile for Marina Abramović — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1a1a1a",
              insight: "Abramović's The Artist is Present placed her silently opposite museum visitors for 736 hours — testing the limits of presence, endurance, and what it means to truly see and be seen by another person.",
              keyWork: "The Artist is Present (2010)",
              movement: "Performance Art"
            },
            {
              id: "yoko_ono",
              name: "Yoko Ono",
              years: "b. 1933",
              image: "images/artists/yoko_ono.jpg",
              imageAlt: "Neutral placeholder tile for Yoko Ono — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a2a2a",
              insight: "Cut Piece invited audience members to cut away Ono's clothing with scissors — transferring agency to the viewer and exposing the violence latent in looking, long before this language entered mainstream feminist theory.",
              keyWork: "Cut Piece (1964)",
              movement: "Conceptual Art / Fluxus"
            },
            {
              id: "ana_mendieta",
              name: "Ana Mendieta",
              years: "1948–1985",
              image: "images/artists/ana_mendieta.jpg",
              imageAlt: "Neutral placeholder tile for Ana Mendieta — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1a2a1a",
              insight: "Mendieta's Silueta Series documented her imprinting her body's outline into earth, sand, and natural materials — merging the female form with landscape as a search for belonging between her Cuban heritage and American exile.",
              keyWork: "Silueta Series (1973–80)",
              movement: "Earth-Body Art"
            }
          ]
        },
        duration: {
          id: "duration",
          label: "Duration",
          artists: [
            {
              id: "tehching_hsieh",
              name: "Tehching Hsieh",
              years: "b. 1950",
              image: "images/artists/tehching_hsieh.jpg",
              imageAlt: "Neutral placeholder tile for Tehching Hsieh — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1a1a2a",
              insight: "Hsieh's One Year Performances subjected his body to extreme constraints for exactly 365 days — punching a time clock every hour, living outdoors, never entering buildings. Art as a record of time itself.",
              keyWork: "One Year Performance (1980–81)",
              movement: "Endurance Art"
            },
            {
              id: "adrian_piper",
              name: "Adrian Piper",
              years: "b. 1948",
              image: "images/artists/adrian_piper.png",
              imageAlt: "Neutral placeholder tile for Adrian Piper — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a1a2a",
              insight: "Piper's Catalysis performances took place in public — she rode the subway smelling of vinegar, or wore a sign reading 'Wet Paint' — inserting discomfort into everyday space to expose social codes governing public behavior.",
              keyWork: "Catalysis (1970–71)",
              movement: "Conceptual Art"
            },
            {
              id: "carolee_schneemann",
              name: "Carolee Schneemann",
              years: "1939–2019",
              image: "images/artists/carolee_schneemann.jpg",
              imageAlt: "Neutral placeholder tile for Carolee Schneemann — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a2a1a",
              insight: "Schneemann's Interior Scroll involved drawing a text from her vagina and reading it aloud — directly asserting the female body as a site of intellectual and creative authority against the erasure of women's voices.",
              keyWork: "Interior Scroll (1975)",
              movement: "Feminist Performance"
            }
          ]
        },
        ritual: {
          id: "ritual",
          label: "Ritual",
          artists: [
            {
              id: "coco_fusco",
              name: "Coco Fusco",
              years: "b. 1960",
              image: "images/artists/coco_fusco.jpg",
              imageAlt: "Neutral placeholder tile for Coco Fusco — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a1a1a",
              insight: "Fusco and Guillermo Gómez-Peña spent three days in a cage at the 1992 Columbus quincentennial, posing as 'undiscovered Amerindians' — exposing how Western institutions had always displayed colonised bodies as spectacle.",
              keyWork: "Two Undiscovered Amerindians (1992)",
              movement: "Post-Colonial Performance"
            },
            {
              id: "lorraine_ogrady",
              name: "Lorraine O'Grady",
              years: "b. 1934",
              image: "images/artists/lorraine_ogrady.jpg",
              imageAlt: "Neutral placeholder tile for Lorraine O'Grady — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1a1a1a",
              insight: "O'Grady's Mlle Bourgeoise Noire crashed white art world openings wearing a gown made of white gloves, flogging herself and demanding: 'Black art must take more risks!' — a direct confrontation with institutional exclusion.",
              keyWork: "Mlle Bourgeoise Noire (1980–83)",
              movement: "Institutional Critique"
            },
            {
              id: "pope_l",
              name: "Pope.L",
              years: "b. 1955",
              image: "images/artists/pope_l.jpg",
              imageAlt: "Neutral placeholder tile for Pope.L — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a2a2a",
              insight: "Pope.L's crawl performances — including a 22-mile crawl the length of Broadway — use abjection and endurance to excavate race, poverty, and public space, asking who has the right to occupy a city's streets.",
              keyWork: "The Great White Way (2000–09)",
              movement: "Interventionist Performance"
            }
          ]
        }
      },
      quiz: [
        {
          question: "Marina Abramović's The Artist is Present at MoMA (2010) involved her doing what?",
          options: [
            "Creating a large-scale painting live over three months",
            "Sitting silently opposite museum visitors for 736 hours across 79 days",
            "Re-enacting her early dangerous performances with a stand-in",
            "Installing mirrors that reflected visitors into infinite space"
          ],
          correct: 1,
          explanation: "Abramović sat motionless at a table for the entire duration of the exhibition. Over 1,500 visitors sat opposite her — many reported profound emotional experiences. The queues lasted hours."
        },
        {
          question: "Yoko Ono's Cut Piece (1964) invited the audience to do what?",
          options: [
            "Cut away her clothing with scissors",
            "Cut their own hair and place it on the stage",
            "Cut paper into shapes spelling words",
            "Cut recorded music tapes into new sequences"
          ],
          correct: 0,
          explanation: "Ono sat passively as audience members cut her clothing away piece by piece. The performance made visible the power dynamics of spectatorship — who looks, who is exposed, who controls the gaze."
        },
        {
          question: "Ana Mendieta's Silueta Series involved which action?",
          options: [
            "Painting self-portraits in her studio using her own blood",
            "Filming her body in free-fall from tall buildings",
            "Imprinting her body's outline into earth, sand, and natural materials",
            "Casting her silhouette in iron and leaving it in public spaces"
          ],
          correct: 2,
          explanation: "Mendieta traveled to Mexico and Cuba to make these works, pressing her body into the land. The series responds to her forced exile from Cuba at age 12 — a search for belonging through the body's union with earth."
        },
        {
          question: "Carolee Schneemann's Interior Scroll (1975) is known for what act?",
          options: [
            "Writing feminist theory on the walls of a gallery in her own blood",
            "Unrolling an enormous canvas scroll across a performance space",
            "Reading aloud from art critics' reviews she had memorized",
            "Drawing a scroll from her vagina and reading it aloud as a text on female creativity"
          ],
          correct: 3,
          explanation: "The text on the scroll was a critique of a male filmmaker who dismissed her work as 'personal clutter.' The act insisted the female body is a source of intellectual authority, not merely an object of the male gaze."
        },
        {
          question: "Coco Fusco and Guillermo Gómez-Peña's cage performance Two Undiscovered Amerindians was intended to satirize what?",
          options: [
            "The commercialization of indigenous crafts in tourist markets",
            "The Western history of displaying colonised and indigenous peoples as exotic spectacles",
            "The immigration enforcement system at the US-Mexico border",
            "The failure of art museums to collect Latin American art"
          ],
          correct: 1,
          explanation: "Performed at the 1992 Columbus quincentennial, many audiences believed they were seeing real 'undiscovered' people — inadvertently proving that the colonial impulse to exoticize the other had never ended."
        }
      ]
    },

    videoArt: {
      id: "videoArt",
      label: "Video Art",
      icon: "▶",
      topics: {
        pioneeringSingle: {
          id: "pioneeringSingle",
          label: "Pioneers",
          artists: [
            {
              id: "joan_jonas",
              name: "Joan Jonas",
              years: "b. 1936",
              image: "images/artists/joan_jonas.jpg",
              imageAlt: "Neutral placeholder tile for Joan Jonas — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1a1a2a",
              insight: "Jonas was among the first artists to use video as a live feedback tool, incorporating mirrors, masks, and live monitors into performances where image and body deliberately desynchronize. Her Vertical Roll (1972) exploits a TV's rolling malfunction as a rhythmic, hypnotic device.",
              keyWork: "Vertical Roll (1972)",
              movement: "Video / Performance Art"
            },
            {
              id: "ulrike_rosenbach",
              name: "Ulrike Rosenbach",
              years: "b. 1943",
              image: "images/artists/ulrike_rosenbach.jpg",
              imageAlt: "Neutral placeholder tile for Ulrike Rosenbach — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a1a2a",
              insight: "Rosenbach overlaid live video of her own face onto art-historical images of the Madonna, forcing confrontation between representations of women in Christian iconography and the living female body performing in real time.",
              keyWork: "Don't Believe I Am an Amazon (1975)",
              movement: "Feminist Video Art"
            },
            {
              id: "shigeko_kubota",
              name: "Shigeko Kubota",
              years: "1937–2015",
              image: "images/artists/shigeko_kubota.jpg",
              imageAlt: "Neutral placeholder tile for Shigeko Kubota — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1a2a2a",
              insight: "Kubota built sculptural furniture and objects containing embedded monitors — her Duchampiana series enclosed video footage inside a physical staircase, forcing the viewer to move through the work rather than simply watch it.",
              keyWork: "Duchampiana: Nude Descending a Staircase (1975–76)",
              movement: "Video Sculpture"
            }
          ],
          quiz: [
            {
              question: "Joan Jonas's Vertical Roll (1972) uses what device as its central visual element?",
              options: [
                "A camera mounted on a rotating platform",
                "A TV monitor's rolling malfunction exploited as rhythmic repetition",
                "A vertical split screen dividing two simultaneous performances",
                "A scrolling text feed overlaid on footage of her body"
              ],
              correct: 1,
              explanation: "Jonas deliberately induced and sustained the rolling glitch in a television monitor, turning a technical failure into a hypnotic pulse — one of the earliest instances of an artist using video's own malfunctions as expressive material.",
              curatorNote: "Technical 'failure' in early video often becomes the work's pulse—notice when the medium, not just the scene, is the subject."
            },
            {
              question: "Dara Birnbaum's Technology/Transformation: Wonder Woman isolates which specific moment from the TV series, and to what end?",
              options: [
                "The final fight scene, to critique representations of female violence",
                "The transformation sequence, to expose how television packages female power as spectacle",
                "The opening credits, to analyze how music shapes viewer identification",
                "Close-ups of the villain, to examine how broadcast TV constructs villainy"
              ],
              correct: 1,
              explanation: "By looping the pyrotechnic transformation moment continuously, Birnbaum strips it of narrative context — revealing it as pure spectacular image-commodity, a fantasy of women's strength sold back to female audiences.",
              curatorNote: "Looping one broadcast moment turns plot into pattern—ask what the loop hides and what it sells."
            },
            {
              question: "Pipilotti Rist's video installations characteristically project onto which surfaces, and why does this matter?",
              options: [
                "Onto white gallery walls, to reference the history of cinema projection",
                "Onto floors and ceilings, immersing viewers inside the image rather than facing it",
                "Onto water in outdoor pools, to link video with natural phenomena",
                "Onto the bodies of live performers, to merge human and digital form"
              ],
              correct: 1,
              explanation: "Projecting beneath and above the viewer collapses the conventional distance between artwork and audience — viewers become part of the color field, unable to adopt the detached frontal position of traditional spectatorship.",
              curatorNote: "Where the image lands in the room is part of the argument—ceiling and floor refuse the neutral 'cinema wall'."
            },
            {
              question: "Hito Steyerl's essay film How Not to Be Seen treats which technical phenomena as political material?",
              options: [
                "High-definition resolution and color grading",
                "Image compression, file formats, and resolution degradation",
                "Satellite transmission delays and time-zone displacement",
                "Facial recognition software and biometric databases"
              ],
              correct: 1,
              explanation: "Steyerl argues that poor-resolution images — jpegs, pixelated uploads, compressed files — circulate more freely than high-definition ones. Degradation becomes a mode of survival, invisibility, and escape from surveillance.",
              curatorNote: "Poor images travel differently than pristine ones—compression and format are part of power, not just aesthetics."
            },
            {
              question: "Eija-Liisa Ahtila's multi-screen works require viewers to do what, and what effect does this produce?",
              options: [
                "Wear headphones tuned to different audio channels, creating private listening experiences",
                "Move between multiple projections to assemble a narrative distributed across space",
                "Lie on the floor to see the image correctly, making the body part of the work",
                "Choose one screen and ignore the others, forcing selective attention"
              ],
              correct: 1,
              explanation: "By splitting a single narrative across synchronized screens, Ahtila spatializes storytelling — the viewer's movement through the room becomes part of how meaning is constructed, refusing the fixed position of cinema spectatorship.",
              curatorNote: "Multi-screen narrative makes your path through space part of the edit—there is no single 'correct' seat."
            }
          ]
        },
        narrativeIdentity: {
          id: "narrativeIdentity",
          label: "Narrative",
          artists: [
            {
              id: "dara_birnbaum",
              name: "Dara Birnbaum",
              years: "b. 1946",
              image: "images/artists/dara_birnbaum.jpg",
              imageAlt: "Neutral placeholder tile for Dara Birnbaum — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a1a1a",
              insight: "Technology/Transformation: Wonder Woman looped the transformation sequence from the TV series, isolating the pyrotechnic spectacle of female power to expose how broadcast television packages and sells a fantasy of women's strength.",
              keyWork: "Technology/Transformation: Wonder Woman (1978–79)",
              movement: "Appropriation Video"
            },
            {
              id: "sadie_benning",
              name: "Sadie Benning",
              years: "b. 1973",
              image: "images/artists/sadie_benning.jpg",
              imageAlt: "Neutral placeholder tile for Sadie Benning — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1a1a1a",
              insight: "Benning made confessional diary videos as a teenager using a Fisher-Price PXL 2000 toy camera — the deliberately degraded pixelvision image becoming inseparable from the rawness of coming out as a queer teenager in Wisconsin.",
              keyWork: "It Wasn't Love (1992)",
              movement: "Queer Video Diary"
            },
            {
              id: "amal_kenawy",
              name: "Amal Kenawy",
              years: "1974–2012",
              image: "images/artists/amal_kenawy.jpg",
              imageAlt: "Neutral placeholder tile for Amal Kenawy — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a2a1a",
              insight: "Kenawy's videos fused performance, choreography, and surrealist imagery to address political repression and bodily constraint in Egypt — Silence of the Lambs staged dozens of crawling figures in Cairo's streets as an uninvited public intervention.",
              keyWork: "Silence of the Lambs (2010)",
              movement: "Video / Performance Art"
            }
          ]
        },
        installationEnvironment: {
          id: "installationEnvironment",
          label: "Installation",
          artists: [
            {
              id: "pipilotti_rist",
              name: "Pipilotti Rist",
              years: "b. 1962",
              image: "images/artists/pipilotti_rist.jpg",
              imageAlt: "Neutral placeholder tile for Pipilotti Rist — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#1a2a1a",
              insight: "Rist projects large-scale video onto floors and ceilings rather than walls, immersing viewers inside lush, distorted color fields — Ever Is Over All shows her smashing car windows with a flower while a police officer smiles in approval.",
              keyWork: "Ever Is Over All (1997)",
              movement: "Video Installation"
            },
            {
              id: "hito_steyerl",
              name: "Hito Steyerl",
              years: "b. 1966",
              image: "images/artists/hito_steyerl.jpg",
              imageAlt: "Neutral placeholder tile for Hito Steyerl — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#0a1a2a",
              insight: "Steyerl's essay films treat resolution, compression artifacts, and file formats as political material — How Not to Be Seen: A Fucking Didactic Educational .MOV File uses the logic of surveillance and image degradation to examine visibility and erasure.",
              keyWork: "How Not to Be Seen (2013)",
              movement: "Essay Film / Video Art"
            },
            {
              id: "eija_liisa_ahtila",
              name: "Eija-Liisa Ahtila",
              years: "b. 1959",
              image: "images/artists/eija_liisa_ahtila.jpg",
              imageAlt: "Neutral placeholder tile for Eija-Liisa Ahtila — artwork photo pending; see docs/IMAGE_CREDITS.md.",
              imagePlaceholder: "#2a1a2a",
              insight: "Ahtila presents narrative across multiple synchronized screens, fragmenting a single story in space so that viewers must move between projections to assemble meaning — Anne, Aki and God uses three screens to depict psychosis from inside the experience.",
              keyWork: "Anne, Aki and God (1998)",
              movement: "Multi-Screen Narrative"
            }
          ]
        }
      }
    }

  }
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
