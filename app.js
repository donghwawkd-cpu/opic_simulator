/**
 * OPIc AI Master Simulator - State Controller & Voice Audio Recorder v4.5
 * Full Support for HTML5 MediaRecorder Audio Playback + Web Speech Recognition + Text Area Editing
 */

// Master Question Database - 100% Matches Every Single Background Survey Checkbox Option!
const SURVEY_TOPICS = {
    // 1. 주거 형태 (Housing)
    housing: {
        name: "주거 환경 (개인주택/아파트)",
        q1: {
            question: "I'd like to talk about where you live. Describe your house or apartment in detail. How many rooms does it have, and what is your favorite room at home?",
            kor: "(당신이 사는 집을 자세히 설명해 주세요. 방은 몇 개이며, 가장 좋아하는 방은 어디인가요?)",
            modelAnswer: "Well, I live in a modern apartment located near the city center. It has three bedrooms, two bathrooms, a living room, and a balcony. My absolute favorite room is my bedroom. It has a large window that gets plenty of natural sunlight, and I have a cozy desk setup with my computer where I do my research and relax."
        },
        q2: {
            question: "What do you usually do at home on weekdays and weekends? Describe your typical daily routine at home from morning to night.",
            kor: "(평일과 주말에 집에서 주로 무엇을 하나요? 아침부터 밤까지의 일상을 설명해 주세요.)",
            modelAnswer: "On weekdays, my routine is quite structured. I wake up around 7 AM, brew a fresh cup of coffee, and check my daily schedule. When I return home from work in the evening, I usually cook dinner, listen to some music, or watch podcasts on YouTube to unwind before sleeping."
        },
        q3: {
            question: "Tell me about a memorable problem or unexpected incident you experienced at your home. What happened, and how did you resolve it?",
            kor: "(집에서 겪은 기억에 남는 문제나 뜻밖의 사건에 대해 말해 주세요. 어떤 일이 있었고 어떻게 해결했나요?)",
            modelAnswer: "A couple of months ago, I had a sudden water leak under my kitchen sink right in the middle of a busy week! Water was pooling quickly on the floor, so I immediately shut off the main water valve and called a professional plumber. He arrived within an hour and replaced the damaged pipe. It was a stressful moment, but a blessing in disguise as it taught me basic home maintenance."
        }
    },

    // 2. 여가 활동 - 영화 보기 (movie)
    movie: {
        name: "여가 활동: 영화 보기",
        q1: {
            question: "You selected watching movies in your survey. What genre of movies do you enjoy most, and who is your favorite actor or director?",
            kor: "(어떤 장르의 영화를 가장 좋아하며, 좋아하는 배우나 감독은 누구인가요?)",
            modelAnswer: "I am a huge fan of science fiction and psychological thriller movies. My favorite director is Christopher Nolan. Movies like 'Interstellar' and 'Inception' blow my mind with their complex storylines, stunning visual effects, and philosophical themes. I never get tired of rewatching them."
        },
        q2: {
            question: "What is your routine before and after going to the cinema? Do you buy tickets online, and what food or drinks do you enjoy during the movie?",
            kor: "(영화관에 가기 전후의 일상은 어떤가요? 티켓은 온라인으로 예매하며 어떤 팝콘/음료를 즐기나요?)",
            modelAnswer: "I usually reserve tickets online via mobile apps to get good seats. Before the movie starts, I always stop by the concession stand to buy caramel popcorn and a large iced Americano. After the film ends, I love going to a nearby cafe with my friends to discuss the plot and review the acting."
        },
        q3: {
            question: "Tell me about a memorable movie you watched recently or in the past. What was the storyline, and why did it leave a strong impression on you?",
            kor: "(최근이나 과거에 감명 깊게 본 영화에 대해 말해 주세요. 줄거리는 무엇이었고 왜 강한 인상을 남겼나요?)",
            modelAnswer: "Recently, I watched the movie 'Oppenheimer' in an IMAX theater. The film depicts the dramatic life of J. Robert Oppenheimer during the Manhattan Project. The sound design during the Trinity nuclear test scene was breathtaking. It left a profound impression on me regarding the responsibility of scientific innovation."
        }
    },

    // 여가 활동 - TV 보기 (tv)
    tv: {
        name: "여가 활동: TV 보기",
        q1: {
            question: "You indicated that you enjoy watching TV in your survey. What kind of TV programs or dramas do you like to watch, and who is your favorite actor or host?",
            kor: "(TV 보기를 선택하셨습니다. 어떤 종류의 TV 프로그램이나 드라마를 좋아하며, 좋아하는 배우나 진행자는 누구인가요?)",
            modelAnswer: "I enjoy watching documentary series and entertainment talk shows on TV. My favorite host is Yoo Jae-suk. His natural wit, warm humor, and brilliant communication skills make every show he hosts extremely fun to watch."
        },
        q2: {
            question: "What is your typical routine when watching TV at home? When do you usually watch TV, and what snacks or drinks do you enjoy?",
            kor: "(집에서 TV를 볼 때의 일상은 어떤가요? 주로 언제 시청하며 어떤 간식이나 음료를 즐기나요?)",
            modelAnswer: "I usually turn on the TV in the evening after returning home from work to relax. I love getting comfortable on the couch, eating fried chicken or popcorn, and sipping a cold beer while binge-watching my favorite drama series."
        },
        q3: {
            question: "Tell me about a memorable TV program, drama episode, or live broadcast you watched recently. Why did it leave a strong impression on you?",
            kor: "(최근 시청했던 기억에 남는 TV 프로그램, 드라마 에피소드, 라이브 방송에 대해 말해 주세요. 왜 인상 깊었나요?)",
            modelAnswer: "Recently, I watched a space science documentary on TV explaining satellite propulsion and plasma technology. The visual animations and interviews with actual space engineers were so fascinating that it inspired my own research passion."
        }
    },

    // 여가 활동 - 리얼리티쇼 시청하기 (reality_tv)
    reality_tv: {
        name: "여가 활동: 리얼리티쇼 시청하기",
        q1: {
            question: "You selected watching reality shows in your survey. What kind of reality TV shows do you enjoy, and why do you find them entertaining?",
            kor: "(리얼리티쇼 시청을 선택하셨습니다. 어떤 종류의 리얼리티 프로그램을 좋아하며 왜 흥미롭나요?)",
            modelAnswer: "I really enjoy watching survival reality shows and observational lifestyle reality TV. Seeing how cast members react to unscripted, real-life challenges brings out authentic emotions and unpredictable drama that scripted series just can't match."
        },
        q2: {
            question: "Describe a popular reality TV show in your country. What is the main concept of the show, and why is it so famous among viewers?",
            kor: "(우리나라의 유명한 리얼리티쇼를 설명해 주세요. 어떤 콘셉트이고 왜 인기가 많나요?)",
            modelAnswer: "One of the most famous reality shows in Korea is 'I Live Alone', which follows the unedited daily lives of single celebrities. Viewers strongly relate to their candid morning routines, cooking attempts, and relatable personal hobbies."
        },
        q3: {
            question: "Tell me about a memorable episode or scene from a reality show that caused a lot of discussion or left a deep impression on you.",
            kor: "(리얼리티쇼에서 인상 깊었던 기억에 남는 에피소드나 장면에 대해 말해 주세요.)",
            modelAnswer: "I remember a dramatic episode of a music competition reality show where an underdog contestant overcame vocal strain to deliver a breathtaking live performance. The emotional standing ovation from judges gave me goosebumps."
        }
    },

    // 여가 활동 - 뉴스 보거나 듣기 (news)
    news: {
        name: "여가 활동: 뉴스 보거나 듣기",
        q1: {
            question: "You indicated that you watch or listen to the news. How do you usually get your news updates, and what topics interest you most?",
            kor: "(뉴스를 보거나 듣는다고 하셨습니다. 주로 어떻게 뉴스를 접하며 어떤 주제에 관심이 많나요?)",
            modelAnswer: "I usually read news articles on mobile news applications during my morning commute. I am particularly interested in technology, science, and economic trends."
        },
        q2: {
            question: "What is your daily routine for staying informed with current events? When do you check the news?",
            kor: "(시사 정보를 접하는 일상은 어떤가요? 주로 언제 뉴스를 확인하나요?)",
            modelAnswer: "I check headline news first thing in the morning over breakfast, and listen to evening news podcasts while driving home to stay informed on international events."
        },
        q3: {
            question: "Tell me about a memorable news story or breaking news report you saw recently. Why was it significant?",
            kor: "(최근 보았던 기억에 남는 뉴스 기사나 속보에 대해 말해 주세요.)",
            modelAnswer: "Recently, I saw a breaking news report about breakthrough advancements in clean renewable energy and plasma fusion technology. It gave me great hope for global climate change solutions."
        }
    },

    // 여가 활동 - 요리 프로그램 시청하기 (cooking_show)
    cooking_show: {
        name: "여가 활동: 요리 관련 프로그램 시청하기",
        q1: {
            question: "You selected watching cooking shows in your survey. What kind of food programs do you like to watch?",
            kor: "(요리 프로그램 시청을 선택하셨습니다. 어떤 요리 방송을 좋아하시나요?)",
            modelAnswer: "I love watching culinary competition shows and celebrity chef recipe programs. Seeing professional chefs craft gourmet dishes from simple ingredients is incredibly satisfying."
        },
        q2: {
            question: "Have you ever tried cooking a recipe you saw on a TV cooking show? Describe what you made.",
            kor: "(요리 프로그램에서 본 레시피를 따라 요리해 본 적이 있나요? 무엇을 만들었는지 설명해 주세요.)",
            modelAnswer: "Yes, after watching a famous chef make authentic Italian pasta, I bought fresh basil, olive oil, and garlic to cook it at home. It turned out amazingly delicious!"
        },
        q3: {
            question: "Tell me about a memorable cooking show episode that inspired you or taught you a unique culinary technique.",
            kor: "(기억에 남는 요리 방송 에피소드에 대해 말해 주세요.)",
            modelAnswer: "I remember an episode featuring street food markets around the world. Learning about secret spice combinations used by local street vendors made me eager to travel and taste foreign cuisines."
        }
    },

    // 여가 활동 - 쇼핑하기 (shopping)
    shopping: {
        name: "여가 활동: 쇼핑하기",
        q1: {
            question: "You selected shopping in your survey. Where do you usually go shopping, and what items do you buy most often?",
            kor: "(쇼핑하기를 선택하셨습니다. 주로 어디서 쇼핑을 하며 어떤 물건을 가장 자주 사나요?)",
            modelAnswer: "I enjoy shopping at large suburban outlet malls and online shopping platforms. I mostly shop for comfortable casual clothes, athletic footwear, and electronic accessories."
        },
        q2: {
            question: "Describe your step-by-step process when shopping for a new item. How do you research products and compare prices?",
            kor: "(새 물건을 잘 사기 위한 쇼핑 과정과 가격 비교 방법은 어떤가요?)",
            modelAnswer: "Before buying expensive items, I read customer reviews online and compare prices across different e-commerce platforms to find discount coupons and special deals."
        },
        q3: {
            question: "Tell me about a memorable shopping trip where you found a great bargain or had an issue with a product.",
            kor: "(기억에 남는 쇼핑 경험에 대해 말해 주세요.)",
            modelAnswer: "During a seasonal clearance sale, I found a premium winter jacket at a 70% discount! Finding such a high-quality item at a bargain price felt like winning a jackpot."
        }
    },

    // 여가 활동 - 차 드라이브하기 (driving)
    driving: {
        name: "여가 활동: 차 드라이브하기",
        q1: {
            question: "You selected driving in your survey. Where do you like to go driving, and what does your favorite driving route look like?",
            kor: "(차 드라이브하기를 선택하셨습니다. 주로 어디로 드라이브를 가며 코스는 어떤가요?)",
            modelAnswer: "I love taking weekend drives along scenic coastal highways. The winding roads offering panoramic ocean views with the windows rolled down make driving pure therapy."
        },
        q2: {
            question: "What do you usually do while driving? Do you listen to music, radio, or podcasts?",
            kor: "(드라이브 중에 주로 무엇을 하나요? 음악이나 팟캐스트를 듣나요?)",
            modelAnswer: "I always curate a lively pop music playlist before going on a drive. Singing along to upbeat music while cruising down the highway instantly blows away my work stress."
        },
        q3: {
            question: "Tell me about a memorable road trip or driving experience where you saw stunning scenery.",
            kor: "(기억에 남는 도로 여행이나 드라이브 경험에 대해 말해 주세요.)",
            modelAnswer: "Last autumn, I drove through a mountain pass surrounded by vibrant red and yellow autumn leaves. Driving through the colorful forest canopy at sunset was a truly breathtaking experience."
        }
    },

    // 여가 활동 - 스파/마사지샵 가기 (spa)
    spa: {
        name: "여가 활동: 스파 / 마사지샵 가기",
        q1: {
            question: "You selected going to a spa or massage shop in your survey. Describe a spa facility you visit.",
            kor: "(스파/마사지샵 가기를 선택하셨습니다. 자주 찾는 스파 시설에 대해 설명해 주세요.)",
            modelAnswer: "I like visiting a quiet wellness spa in the city that offers soothing aromatherapy, warm hydrotherapy baths, and comfortable relaxation lounges."
        },
        q2: {
            question: "What is your routine when you visit a spa to relax and unwind after a busy week?",
            kor: "(바쁜 한 주를 보낸 뒤 스파에서 어떻게 힐링하나요?)",
            modelAnswer: "I start by soaking in a warm mineral bath for 30 minutes, followed by a soothing full-body massage. Afterwards, I sip herbal tea in the quiet lounge to fully recharge."
        },
        q3: {
            question: "Tell me about a memorable experience you had while relaxing at a spa.",
            kor: "(스파에서 겪은 기억에 남는 힐링 경험에 대해 말해 주세요.)",
            modelAnswer: "During a mountain retreat last winter, I soaked in an outdoor hot spring while snow gently fell around the pool. The contrast between warm spring water and cold mountain air was unforgettable."
        }
    },

    // 여가 활동 - 구직 활동하기 (job_hunting)
    job_hunting: {
        name: "여가 활동: 구직 활동하기",
        q1: {
            question: "You mentioned job hunting in your survey. What kind of career or industry are you interested in?",
            kor: "(구직 활동을 선택하셨습니다. 어떤 분야나 산업에 관심이 있나요?)",
            modelAnswer: "I am interested in high-tech research and engineering positions in plasma technology and aerospace systems, focusing on innovation and advanced R&D."
        },
        q2: {
            question: "How do you prepare your resume, cover letter, and interview skills when applying for positions?",
            kor: "(입사 지원을 위해 이력서와 면접을 어떻게 준비하나요?)",
            modelAnswer: "I highlight key project achievements in my resume, tailor cover letters to each organization, and practice mock interview questions to articulate my problem-solving skills."
        },
        q3: {
            question: "Tell me about a memorable job interview or career application experience you had in the past.",
            kor: "(과거 기억에 남는 면접이나 입사 지원 경험에 대해 말해 주세요.)",
            modelAnswer: "I remember a technical interview where I was asked to solve a complex engineering problem on a whiteboard. Successfully demonstrating my analytical reasoning boosted my professional confidence."
        }
    },

    // 여가 활동 - 자원봉사하기 (volunteer)
    volunteer: {
        name: "여가 활동: 자원봉사하기",
        q1: {
            question: "You selected volunteering in your survey. What kind of volunteer work do you participate in?",
            kor: "(자원봉사하기를 선택하셨습니다. 어떤 자원봉사 활동에 참여하시나요?)",
            modelAnswer: "I participate in local community cleanup campaigns and educational mentoring programs for young students interested in science and technology."
        },
        q2: {
            question: "Describe your routine when participating in a volunteer project. What responsibilities do you have?",
            kor: "(봉사 활동에 참여할 때의 일상과 역할은 어떤가요?)",
            modelAnswer: "On volunteer days, I join team briefings in the morning, distribute event materials, assist participants, and help organize activities to ensure a smooth community event."
        },
        q3: {
            question: "Tell me about a memorable volunteer experience where you felt a strong sense of reward.",
            kor: "(가장 보람찼던 기억에 남는 자원봉사 경험에 대해 말해 주세요.)",
            modelAnswer: "Teaching basic science experiments to elementary school kids during a summer volunteer camp was deeply rewarding. Seeing their eyes light up with wonder made all the effort worthwhile."
        }
    },

    // 3. 여가 활동 - 공연/뮤지컬 보기 (show)
    show: {
        name: "여가 활동: 공연/뮤지컬 보기",
        q1: {
            question: "You selected going to shows or musicals in your survey. Describe a show venue or theater you visit often. What makes it special?",
            kor: "(공연이나 뮤지컬 관람을 좋아한다고 했습니다. 자주 찾는 공연장에 대해 설명해 주세요.)",
            modelAnswer: "I love visiting the Arts Center grand theater in the city. It features magnificent acoustics, comfortable seating, and an impressive stage setup. Watching live musical performances there gives me goosebumps every single time."
        },
        q2: {
            question: "How do you prepare when going to a live performance or show? What do you do before the performance starts?",
            kor: "(공연을 보러 갈 때 어떻게 준비하나요? 공연 시작 전 무엇을 하나요?)",
            modelAnswer: "I always book tickets weeks in advance to secure front-row center seats. On the day of the show, I arrive at the theater an hour early to pick up physical tickets, read through the program booklet, and take commemorative photos at the photo zone."
        },
        q3: {
            question: "Tell me about a memorable live show or musical you watched in the past. What made it so unforgettable?",
            kor: "(과거에 본 기억에 남는 공연이나 뮤지컬에 대해 말해 주세요. 왜 잊지 못할 추억인가요?)",
            modelAnswer: "Last year, I watched the live performance of 'The Phantom of the Opera'. The famous chandelier falling scene was so realistic that the entire audience gasped! The live orchestra and powerful vocals created a truly spine-tingling experience that I will cherish forever."
        }
    },

    // 4. 여가 활동 - 콘서트 보기 (concert)
    concert: {
        name: "여가 활동: 콘서트 보기",
        q1: {
            question: "You indicated that you enjoy going to music concerts. What kind of concerts do you like, and who is your favorite performer?",
            kor: "(콘서트 보기를 선택하셨습니다. 어떤 장르의 콘서트를 좋아하며 좋아하는 가수는 누구인가요?)",
            modelAnswer: "I love attending live rock and indie music concerts. My favorite performer is Coldplay. Their live shows are famous for spectacular light displays, wristband LED effects, and unmatched crowd energy."
        },
        q2: {
            question: "Describe what happens during a typical concert you attend. What is the atmosphere like when the artist comes on stage?",
            kor: "(콘서트장에서의 분위기는 어떤가요? 아티스트가 무대에 오를 때 어떤 일이 일어나나요?)",
            modelAnswer: "When the artist finally appears on stage, the entire venue erupts into deafening cheers! Everyone stands up, waves their lightsticks, and sings along to every single lyrics. The collective energy is completely intoxicating."
        },
        q3: {
            question: "Tell me about a memorable concert experience where something unexpected happened. What made it so special?",
            kor: "(콘서트에서 겪은 기억에 남는 사건에 대해 말해 주세요. 무슨 일이 있었나요?)",
            modelAnswer: "At an outdoor festival concert last summer, a sudden summer rain started pouring right during the main encore song! Instead of running away, everyone kept dancing and singing in the rain together with the band. It was one of the most liberating moments of my life."
        }
    },

    // 5. 여가 활동 - 공원 가기 (park)
    park: {
        name: "여가 활동: 공원 가기",
        q1: {
            question: "You selected going to parks in your survey. Describe a park you frequently visit. Where is it located, and what features make it attractive?",
            kor: "(자주 가는 공원에 대해 설명해 주세요. 어디에 위치해 있으며 어떤 특징이 있나요?)",
            modelAnswer: "There is a beautiful riverside park located just ten minutes away from my apartment. It features a long biking path, paved walking trails, and well-maintained grassy lawns. What I love most about it is the peaceful view of the river, especially during sunset."
        },
        q2: {
            question: "What do you usually do when you go to the park? Who do you go with, and what activities do you enjoy there?",
            kor: "(공원에 가면 주로 무엇을 하나요? 누구와 가고 어떤 활동을 즐기나요?)",
            modelAnswer: "Whenever I visit the park on weekends, I usually put on my running shoes and go for a 5-kilometer jog. Sometimes, I bring my dog along for a walk or grab an iced Americano at a nearby cafe and sit on a bench reading a book."
        },
        q3: {
            question: "Tell me about a memorable experience or an unexpected event that happened while you were at a park. When was it, and what made it memorable?",
            kor: "(공원에서 겪었던 기억에 남는 경험이나 사건에 대해 말해 주세요. 언제였고 왜 기억에 남나요?)",
            modelAnswer: "A few months ago, while walking in the park on a sunny afternoon, a sudden unexpected thunderstorm poured down! Everyone ran under a large wooden gazebo for shelter. We ended up chatting with strangers while waiting for the rain to stop, turning a rainy emergency into a warm memory."
        }
    },

    // 6. 여가 활동 - 캠핑 가기 (camping)
    camping: {
        name: "여가 활동: 캠핑 가기",
        q1: {
            question: "You selected camping in your survey. Describe your favorite camping spot. Where is it, and what equipment do you bring?",
            kor: "(캠핑 가기를 선택하셨습니다. 즐겨 찾는 캠핑장에 대해 설명해 주세요. 어떤 장비를 가져가나요?)",
            modelAnswer: "My favorite camping spot is a pine forest campsite located near the mountains. I usually pack a spacious dome tent, folding chairs, a portable gas stove, and a cozy sleeping bag. Cooking barbecue under the tall pine trees is pure therapy."
        },
        q2: {
            question: "What is your step-by-step routine when setting up camp? What do you do after pitched your tent?",
            kor: "(캠핑장에 도착해서 텐트를 치는 과정과 텐트를 친 후 일상은 어떤가요?)",
            modelAnswer: "Upon arrival, the first thing I do is pitch the tent and set up tarp for shade. Once the camp setup is complete, I start a campfire to grill steaks and sausages for dinner, followed by drinking hot cocoa while stargazing."
        },
        q3: {
            question: "Tell me about a memorable incident or unexpected weather problem you experienced while camping outdoors.",
            kor: "(캠핑 중 겪었던 기억에 남는 사건이나 뜻밖의 날씨 문제 경험에 대해 말해 주세요.)",
            modelAnswer: "Once during an autumn camping trip, the temperature dropped drastically overnight and high winds blew away our tarp! We had to reinforce the tent stakes in the middle of the night using heavy rocks. It was freezing cold, but sitting around the morning campfire afterwards made it a memorable bonding story."
        }
    },

    // 7. 여가 활동 - 해변 가기 (beach)
    beach: {
        name: "여가 활동: 해변 가기",
        q1: {
            question: "You selected going to the beach in your survey. Describe a beach you like to visit. What does it look like, and what can people do there?",
            kor: "(해변 가기를 선택하셨습니다. 좋아하는 해변에 대해 설명해 주세요.)",
            modelAnswer: "I love visiting Haeundae Beach in Busan. It has a vast sandy shoreline lined with modern skyscrapers and oceanfront cafes. People can swim in the ocean, play beach volleyball, or take scenic strolls along the coastal boardwalk."
        },
        q2: {
            question: "What do you usually do when you spend a day at the beach? Describe your activities from morning to evening.",
            kor: "(해변에서 하루를 보낼 때 주로 무엇을 하나요? 아침부터 저녁까지의 활동을 설명해 주세요.)",
            modelAnswer: "When I go to the beach, I like to rent a beach umbrella, relax on a sunbed, and listen to the waves while sipping cold beverages. In the evening, I enjoy eating fresh grilled seafood at local markets while watching fireworks over the ocean."
        },
        q3: {
            question: "Tell me about a memorable trip or episode you had at a beach. What made it so special?",
            kor: "(해변에서 겪었던 기억에 남는 여행이나 일화에 대해 말해 주세요.)",
            modelAnswer: "Last summer, my friends and I rented a sailboat at the beach to watch the sunset from the water. Seeing the sun dip below the horizon while dolphins swam alongside our boat was an absolute once-in-a-lifetime breathtaking experience."
        }
    },

    // 8. 취미 - 음악 감상하기 (music)
    music: {
        name: "취미: 음악 감상하기",
        q1: {
            question: "You mentioned that you enjoy listening to music. What kind of music do you like, and who is your favorite singer or composer?",
            kor: "(음악 감상을 좋아한다고 했습니다. 어떤 장르의 음악을 좋아하며, 가장 좋아하는 가수는 누구인가요?)",
            modelAnswer: "I am a huge fan of indie pop and acoustic instrumental music. My absolute favorite artist is Coldplay. Their melodies are incredibly uplifting and emotional. Whenever I feel stressed from research, listening to their album helps me regain focus."
        },
        q2: {
            question: "When and where do you usually listen to music? Do you listen to music on your smartphone or through headphones?",
            kor: "(주로 언제 어디서 음악을 듣나요? 스마트폰이나 헤드폰을 사용하시나요?)",
            modelAnswer: "I listen to music almost constantly throughout the day! During my morning commute, I wear noise-canceling headphones to tune into Spotify playlists. While doing coding or data analysis at the lab, playing low-fidelity beats in the background really boosts my concentration."
        },
        q3: {
            question: "Tell me about a memorable live music performance or a song that holds special meaning to you.",
            kor: "(기억에 남는 라이브 음악 공연이나 자신에게 특별한 의미가 있는 노래에 대해 말해 주세요.)",
            modelAnswer: "I remember hearing the song 'Fix You' live at a festival. The guitar solo combined with light displays gave me goosebumps. It gave me great comfort during a challenging period of my life, making it a song I treasure deeply."
        }
    },

    // 9. 운동 - 걷기 (walking)
    walking: {
        name: "운동: 걷기 / 산책",
        q1: {
            question: "You selected walking in your survey. Where do you usually go walking, and what does your walking route look like?",
            kor: "(걷기 운동을 선택하셨습니다. 주로 어디서 걸으며 산책 코스는 어떻게 생겼나요?)",
            modelAnswer: "I usually walk along a scenic neighborhood trail near my apartment. The path is lined with shady trees and flower beds. Walking for 45 minutes every evening is my favorite way to burn calories and clear my mind."
        },
        q2: {
            question: "What gear or items do you take with you when you go walking? What music or podcasts do you listen to?",
            kor: "(산책할 때 어떤 복장이나 아이템을 챙기나요? 어떤 음악이나 팟캐스트를 듣나요?)",
            modelAnswer: "I always put on lightweight running shoes and comfortable athletic wear. I carry a small pouch for my phone and wireless earbuds, listening to tech podcasts or audiobook chapters while keeping a brisk walking pace."
        },
        q3: {
            question: "Tell me about a memorable walking experience or an interesting sight you saw while walking outdoors.",
            kor: "(산책 중 겪었던 기억에 남는 경험이나 본 인상적인 풍경에 대해 말해 주세요.)",
            modelAnswer: "One evening while walking during cherry blossom season, a gentle breeze created a romantic flower rain along the entire trail. It was so stunning that everyone stopped walking to take photos under the pink canopy."
        }
    },

    // 10. 운동 - 조깅 (jogging)
    jogging: {
        name: "운동: 조깅",
        q1: {
            question: "You selected jogging in your survey. How long have you been jogging, and where do you usually run?",
            kor: "(조깅을 선택하셨습니다. 조깅을 한 지 얼마나 되었으며 주로 어디서 달리나요?)",
            modelAnswer: "I have been jogging regularly for about two years. I run along a paved 5-kilometer circuit around a nearby lake twice a week. The flat terrain and fresh lake breeze make it an optimal running spot."
        },
        q2: {
            question: "What is your routine before and after running? How do you warm up and cool down?",
            kor: "(조깅 전후의 일상은 어떤가요? 준비 운동과 마무리 운동은 어떻게 하나요?)",
            modelAnswer: "Before running, I spend 10 minutes doing dynamic leg stretches to prevent muscle cramps. After completing my 5k run, I walk slowly for five minutes to lower my heart rate and drink plenty of electrolyte water."
        },
        q3: {
            question: "Tell me about a memorable marathon or personal best achievement you accomplished while jogging.",
            kor: "(조깅을 하면서 달성한 개인 최고 기록이나 기억에 남는 달리기에 대해 말해 주세요.)",
            modelAnswer: "Last autumn, I participated in a local 10k charity run. Pushing through physical fatigue and crossing the finish line under 50 minutes was an exhilarating achievement that boosted my self-confidence immensely."
        }
    },

    // 11. 여행 - 국내 여행 (dom_travel)
    dom_travel: {
        name: "여행: 국내 여행",
        q1: {
            question: "You selected domestic travel in your survey. Describe a favorite place you visited in your country. What makes it attractive?",
            kor: "(국내 여행을 선택하셨습니다. 우리나라의 좋아하는 여행지에 대해 설명해 주세요.)",
            modelAnswer: "One of my favorite domestic travel spots is Jeju Island. It is famous for emerald beaches, volcanic craters, and fresh seafood. The relaxed island vibe makes it an ideal weekend getaway."
        },
        q2: {
            question: "How do you usually plan and prepare for a domestic trip? What do you pack in your luggage?",
            kor: "(국내 여행을 계획하고 준비하는 과정은 어떤가요? 짐은 어떻게 싸나요?)",
            modelAnswer: "I research local food markets and scenic view points on travel blogs first. Then I book a rental car and a cozy pension. I pack light with clothes, toiletries, a camera, and emergency medicines."
        },
        q3: {
            question: "Tell me about a memorable experience or incident you had during a domestic travel trip.",
            kor: "(국내 여행 중 겪은 기억에 남는 경험이나 사건에 대해 말해 주세요.)",
            modelAnswer: "During a road trip along the East Coast, our car got a flat tire near a remote coastal cliff! We called emergency roadside assistance and while waiting, enjoyed a breathtaking sunset over the ocean. What started as a hassle turned into a romantic memory."
        }
    },

    // 12. 여행 - 해외 여행 (overseas_travel)
    overseas_travel: {
        name: "여행: 해외 여행",
        q1: {
            question: "You selected overseas travel in your survey. Describe a country or city you visited abroad. What was it like?",
            kor: "(해외 여행을 선택하셨습니다. 다녀온 해외 도시나 국가에 대해 설명해 주세요.)",
            modelAnswer: "A couple of years ago, I traveled to Tokyo, Japan. It was an amazing blend of futuristic skyscrapers and traditional shrines. The efficient subway system and delicious local ramen made the city trip delightful."
        },
        q2: {
            question: "What steps do you take when preparing for an international flight and overseas trip?",
            kor: "(해외 여행 및 비행기 탑승을 준비할 때 어떤 단계를 거치나요?)",
            modelAnswer: "For overseas travel, I check passport validity, apply for necessary visas, and exchange currency in advance. I also buy travel insurance and download offline map applications to navigate easily without mobile roaming."
        },
        q3: {
            question: "Tell me about an unforgettable incident or unexpected challenge you faced while traveling abroad.",
            kor: "(해외 여행 중 겪었던 잊지 못할 사건이나 당황스러웠던 문제에 대해 말해 주세요.)",
            modelAnswer: "While traveling abroad, my smartphone battery completely died in the middle of a busy foreign city! I couldn't use translation or GPS apps. Forced to communicate using body language and paper maps, I asked friendly locals for help and reached my hotel safely. It was a thrilling adventure."
        }
    },

    // 여가 활동: 카페 / 커피전문점 가기 (cafe)
    cafe: {
        name: "여가 활동: 카페 / 커피전문점 가기",
        q1: {
            question: "You indicated in the survey that you enjoy going to cafes. Describe your favorite cafe that you often visit. What does it look like, and why do you like going there?",
            kor: "(카페 가기를 선택하셨습니다. 자주 방문하는 좋아하는 카페를 묘사해 주세요. 인테리어는 어떻고 왜 그곳을 좋아하나요?)",
            modelAnswer: "Well, my absolute go-to spot is a cozy independent coffee shop located just a five-minute walk from my apartment. The moment you walk in, you're greeted by the rich aroma of freshly roasted coffee beans and mellow acoustic music. It features warm wooden furniture, exposed brick walls, and floor-to-ceiling windows that let in plenty of natural sunlight. The baristas roast single-origin beans in-house, and their signature iced vanilla latte with oat milk is simply heavenly. It has comfortable ergonomic seating with plenty of power outlets, making it the perfect sanctuary for me to read, study, or just unwind after a busy day."
        },
        q2: {
            question: "Tell me about the very first time you went to a coffee shop. How old were you, who did you go with, what did you drink, and what was that experience like?",
            kor: "(처음으로 커피숍에 갔던 기억에 대해 말해 주세요. 몇 살이었고, 누구와 함께 갔으며, 무엇을 마셨나요? 그 경험은 어땠나요?)",
            modelAnswer: "If I recall correctly, the very first time I visited a modern coffee shop was back when I was in middle school, around fourteen years old. My older sister took me to a newly opened franchise cafe near our downtown station. Back then, I wasn't used to drinking bitter black coffee, so my sister ordered me an iced caramel frappuccino topped with fluffy whipped cream and sweet caramel drizzle. I was completely mesmerized by the aroma of freshly ground espresso, the stylish modern interior, and the relaxing jazz background music. It felt so grown-up and chic compared to the traditional bakeries I was used to. That memorable afternoon sparked my lifelong fascination with cafe culture."
        },
        q3: {
            question: "How have coffee shops and coffee culture in your country changed compared to when you were young or in the past? What are the major differences between cafes back then and cafes today?",
            kor: "(어렸을 때 혹은 과거와 비교하여 오늘날의 커피숍과 커피 문화가 어떻게 변화했나요? 과거의 카페와 오늘날 카페의 주요 차이점은 무엇인가요?)",
            modelAnswer: "Looking back, coffee shops in my country have undergone an astonishing transformation over the past two decades. When I was young, coffee was mostly consumed as instant powdered mix with sugar and creamer, and traditional old-fashioned tea houses called 'Dabang' were primarily social spots for older businessmen. In stark contrast, today coffee culture is an indispensable staple of daily life. Specialty coffee shops and boutique roasteries are ubiquitous on virtually every single street corner. Furthermore, the functional role of cafes has evolved dramatically; they are no longer just beverage spots, but multi-functional community hubs. People spend hours studying, telecommuting with laptops, and catching up with friends. With the rise of single-origin pour-over brews, non-dairy oat milk options, and artisanal bakery desserts, our cafe culture has become remarkably sophisticated and diverse."
        }
    },

    // 여가 활동: 술집 / 바에 가기 (bar)
    bar: {
        name: "여가 활동: 술집 / 바에 가기",
        q1: {
            question: "You mentioned in the survey that you go to bars. Describe a bar or pub you often go to. What is the atmosphere like, and what kind of drinks do they serve?",
            kor: "(술집이나 바에 가는 것을 선택하셨습니다. 자주 가는 바나 펍을 설명해 주세요. 분위기는 어떻고 어떤 술을 판매하나요?)",
            modelAnswer: "I frequently visit a craft beer pub located in a vibrant downtown alley. The pub features an industrial brick interior with warm amber lighting and vintage vinyl records on the walls. They serve over twenty varieties of local craft beer on tap, ranging from fruity IPAs to rich chocolate stouts. The energetic yet laid-back atmosphere makes it an ideal place to unwind on Friday evenings."
        },
        q2: {
            question: "When you go out for drinks with friends or colleagues, what is the usual routine? What food or appetizers do you like to order with your drinks?",
            kor: "(친구들이나 동료들과 술자리를 가질 때의 일반적인 루틴은 무엇인가요? 어떤 안주를 곁들여 주문하나요?)",
            modelAnswer: "We usually meet up around 7 PM on weekends. First, we start with a hearty dinner at a barbecue restaurant, and then we move on to a casual pub for a second round. We love ordering finger foods like spicy chicken wings, crispy nachos, or cheese platters. We spend hours catching up on each other's lives, sharing funny stories, and laughing until late at night."
        },
        q3: {
            question: "Tell me about an unforgettable experience or a funny episode you had while having drinks at a bar or gathering.",
            kor: "(술집이나 모임에서 술을 마시던 중 겪었던 잊지 못할 경험이나 재미있는 에피소드를 들려주세요.)",
            modelAnswer: "A couple of months ago, my close college friends and I gathered at a local pub to celebrate my best friend's surprise birthday. We secretly arranged with the pub owner to dim the lights and play his favorite rock song when he arrived. The look of pure shock and joy on his face was priceless! Everyone in the pub ended up singing along and congratulating him. It was truly an unforgettable night filled with warmth and camaraderie."
        }
    },

    // 취미: 요리하기 (cooking)
    cooking: {
        name: "취미: 요리하기",
        q1: {
            question: "You indicated that one of your hobbies is cooking. What is your signature dish that you cook best, and what ingredients do you need for it?",
            kor: "(요리하기를 선택하셨습니다. 가장 자신 있는 대표 요리는 무엇이며 어떤 재료가 필요한가요?)",
            modelAnswer: "My absolute signature dish is spicy seafood pasta. To make it, I need fresh shrimp, squid, cherry tomatoes, minced garlic, olive oil, and spaghetti noodles. The secret ingredient is a spoonful of Korean chili flakes, which gives the rich tomato sauce a fantastic spicy kick. My friends always request this dish whenever they visit my place."
        },
        q2: {
            question: "Describe your step-by-step cooking routine from grocery shopping and prep work to washing the dishes.",
            kor: "(장보기와 재료 손질부터 요리, 설거지까지의 단계별 요리 루틴을 설명해 주세요.)",
            modelAnswer: "I usually start by visiting a local organic grocery market on Saturday morning to pick up fresh produce. When I return home, I wash and chop all the vegetables meticulously. While the food is simmering on the stove, I clean up the cutting board and utensils to keep the kitchen tidy. After enjoying the homemade meal, I soak the cookware in warm soapy water and run the dishwasher."
        },
        q3: {
            question: "Tell me about a time when you cooked a special meal for someone or experienced a memorable cooking failure.",
            kor: "(누군가를 위해 특별한 음식을 만들었거나 기억에 남는 요리 실패를 겪었던 경험에 대해 말해 주세요.)",
            modelAnswer: "I remember the first time I attempted to bake a chocolate souffle for my mother's birthday. I accidentally mixed up sugar and salt in the batter! When my mother took the first bite, her polite expression turned into hilarious disbelief. We both burst out laughing and ended up ordering takeout pizza instead. It was a complete culinary disaster, but a sweet memory we still talk about."
        }
    },

    // 운동: 요가 / 스트레칭 (yoga)
    yoga: {
        name: "운동: 요가 / 스트레칭",
        q1: {
            question: "You selected yoga in your survey. Where do you usually practice yoga, and what equipment or clothing do you need for it?",
            kor: "(요가를 선택하셨습니다. 주로 어디서 요가를 하며 어떤 장비나 복장이 필요한가요?)",
            modelAnswer: "I usually practice yoga in the corner of my living room where I have plenty of open space and natural light. All I need is a high-density non-slip yoga mat, a pair of foam blocks for alignment support, and comfortable breathable athletic clothes. Practicing at home allows me to play soothing meditation music and focus entirely on my breathing."
        },
        q2: {
            question: "How often do you practice yoga or stretching in a typical week? Describe your exercise routine from warm-up to cool-down.",
            kor: "(보통 일주일에 얼마나 자주 요가를 하나요? 준비 운동부터 마무리 스트레칭까지의 루틴을 설명해 주세요.)",
            modelAnswer: "I practice yoga three to four times a week, usually right after waking up or before going to bed. I start with five minutes of deep diaphragmatic breathing and gentle neck rolls. Then, I transition through sun salutations to warm up my muscles, followed by warrior poses and core balancing exercises. Finally, I end with a restful child's pose and corpse pose to relieve tension."
        },
        q3: {
            question: "Why did you first start practicing yoga, and what physical or mental benefits have you noticed since you started?",
            kor: "(처음 요가를 시작하게 된 계기는 무엇이며, 시작한 이후 몸과 마음에 어떤 긍정적인 변화가 있었나요?)",
            modelAnswer: "I started practicing yoga about two years ago because I was suffering from severe lower back pain and chronic fatigue from sitting at a desk all day. Within a few months of consistent practice, my posture improved remarkably, and my back stiffness completely vanished. More importantly, it has taught me mindfulness and helps me manage daily stress with mental clarity."
        }
    },

    // 운동: 농구 (basketball)
    basketball: {
        name: "운동: 농구",
        q1: {
            question: "You indicated playing basketball in your survey. Describe the basketball court or gym where you usually play. What does it look like?",
            kor: "(농구를 선택하셨습니다. 주로 농구를 하는 코트나 체육관을 묘사해 주세요. 어떤 시설이 갖추어져 있나요?)",
            modelAnswer: "I regularly play basketball at an indoor hardwood gym near our community center. It has standard regulation glass backboards, pristine spring-loaded breakaway rims, and smooth maple flooring that provides excellent shoe grip. It's fully climate-controlled, so we can play comfortably year-round regardless of outside weather."
        },
        q2: {
            question: "Who do you usually play basketball with, and what is your typical routine before and after playing?",
            kor: "(주로 누구와 농구를 하며, 경기 전후의 전형적인 루틴은 어떤가요?)",
            modelAnswer: "I usually play pickup games with my friends and fellow hoopers every Saturday morning. We spend twenty minutes doing shooting drills from around the three-point arc and stretching our ankles. After several full-court games, we drink plenty of iced electrolyte water and analyze our game highlights over a hearty lunch."
        },
        q3: {
            question: "Tell me about a memorable basketball match you played in. What was the score, and why was the match so thrilling?",
            kor: "(직접 뛰었던 기억에 남는 농구 경기에 대해 말해 주세요. 스코어는 어땠고 왜 그토록 흥미진진했나요?)",
            modelAnswer: "Last winter, our local pickup squad played in a friendly weekend tournament. We were trailing by two points with only five seconds remaining on the clock! My teammate drove into the lane and kicked the ball out to me in the corner. I released a three-pointer as the buzzer sounded, and it swished cleanly through the hoop! That buzzer-beater victory gave all of us chills."
        }
    },

    // 운동: 축구 (soccer)
    soccer: {
        name: "운동: 축구",
        q1: {
            question: "You indicated in your survey that you play soccer. Describe the soccer field or stadium where you usually play. What does it look like, and what facilities are available?",
            kor: "(축구를 선택하셨습니다. 주로 축구를 하는 축구장이나 구장을 묘사해 주세요. 어떻게 생겼고 어떤 시설이 있나요?)",
            modelAnswer: "I usually play soccer at a local sports park that has a full-sized artificial turf field. The pitch is surrounded by professional running tracks, covered spectator stands, and bright LED floodlights for evening matches. The turf is well-cushioned with rubber pellets, which minimizes the risk of knee injuries during fast sprints and sudden turns."
        },
        q2: {
            question: "Who do you usually play soccer with, and what is your typical routine before and after a soccer match?",
            kor: "(주로 누구와 축구를 하며, 경기 전후의 일반적인 루틴은 어떤가요?)",
            modelAnswer: "I play on a weekend amateur soccer club with my college alumni and neighborhood friends. We arrive 30 minutes early to warm up with short-passing drills, agility ladder exercises, and dynamic groin stretches. After playing two intense 45-minute halves, we do cool-down stretches, rehydrate with cold sports drinks, and head out to eat barbecue together."
        },
        q3: {
            question: "Tell me about a memorable or exciting soccer match you participated in or watched. What happened, and why was it so memorable?",
            kor: "(직접 뛰었거나 관람했던 기억에 남는 축구 경기에 대해 말해 주세요. 어떤 일이 있었고 왜 기억에 남나요?)",
            modelAnswer: "Last spring, our club reached the final of a local community tournament. We were trailing 1-0 until the final minute of stoppage time! From a corner kick, I managed to head the ball into the top corner of the net to equalize. We eventually won the championship in a dramatic penalty shootout, and celebrating with my teammates was an unforgettable rush."
        }
    },

    // 운동: 야구 / 소프트볼 (baseball)
    baseball: {
        name: "운동: 야구 / 소프트볼",
        q1: {
            question: "You indicated that you enjoy baseball in your survey. Describe the baseball field or stadium you usually visit. What is the atmosphere like?",
            kor: "(야구를 선택하셨습니다. 자주 방문하는 야구장이나 연습장을 설명해 주세요. 분위기는 어떤가요?)",
            modelAnswer: "I frequently visit both an amateur baseball diamond at a public sports complex and our city's professional baseball stadium. The amateur field has well-raked dirt infields, expansive green outfields, and protective batting cages. The atmosphere during weekend games is always buzzing with team camaraderie and enthusiastic cheers from family and friends."
        },
        q2: {
            question: "What equipment or gear do you need when you play baseball, and what do you do to prepare for a game?",
            kor: "(야구를 할 때 어떤 장비가 필요하며, 경기를 준비할 때 무엇을 하나요?)",
            modelAnswer: "To play safely, I gear up with a genuine leather fielding glove, molded cleats, a fitted batting helmet, and protective batting gloves. Before every game, I spend plenty of time warming up my shoulder and elbow joints with long-toss throwing drills, followed by taking batting practice in the cages to dial in my swing timing."
        },
        q3: {
            question: "Tell me about a memorable baseball game you played in or watched live. What was the dramatic highlight of that game?",
            kor: "(직접 뛰었거나 직관했던 기억에 남는 야구 경기에 대해 이야기해 주세요. 어떤 극적인 하이라이트가 있었나요?)",
            modelAnswer: "Last summer, I watched a thrilling playoff baseball game at the stadium. It was the bottom of the ninth inning with two outs, bases loaded, and our home team down by two runs. The batter hit a walk-off grand slam right over the center-field fence! The entire stadium exploded with fireworks and thunderous roaring cheers. It was pure cinematic magic."
        }
    },

    // 운동: 배구 (volleyball)
    volleyball: {
        name: "운동: 배구",
        q1: {
            question: "You indicated playing volleyball in the survey. Describe the volleyball court or gymnasium where you usually play. What does it look like?",
            kor: "(배구를 선택하셨습니다. 주로 배구를 하는 코트나 체육관을 설명해 주세요. 어떤 모습인가요?)",
            modelAnswer: "I play volleyball at an indoor sports gymnasium equipped with regulation-height net systems, clean wooden sprung flooring, and padded boundary poles for safety. The gym has high ceilings that allow high aerial sets and powerful spikes without obstruction, making it a fantastic venue for fast-paced rallies."
        },
        q2: {
            question: "What position do you play in volleyball, and what is your routine when practicing with your teammates?",
            kor: "(배구에서 어떤 포지션을 맡고 있으며, 동료들과 연습할 때 루틴은 어떤가요?)",
            modelAnswer: "I usually play as an outside hitter or defensive libero. Our training session starts with dynamic pepper drills, where pairs practice bumping, setting, and spiking in continuous rhythm. Then, we rotate through serve-receive formations and practice coordinated team blocking at the net to build defensive chemistry."
        },
        q3: {
            question: "Tell me about a memorable volleyball match you played. What was the most intense rally or turning point of the game?",
            kor: "(기억에 남는 배구 경기에 대해 말해 주세요. 가장 치열했던 랠리나 경기의 전환점은 무엇이었나요?)",
            modelAnswer: "A memorable match happened during a community club final that went into a fifth-set deuce! During a marathon rally, our setter made a diving pancake save just inches above the floor, and I spiked the ball down the opposing team's sideline for the match point. The sheer intensity and teamwork required in that single rally was breathtaking."
        }
    },

    // 운동: 테니스 (tennis)
    tennis: {
        name: "운동: 테니스",
        q1: {
            question: "You indicated playing tennis in your survey. Describe the tennis court where you usually play. What surface is it, and what are its features?",
            kor: "(테니스를 선택하셨습니다. 주로 테니스를 치는 코트를 묘사해 주세요. 어떤 코트 표면이고 어떤 특징이 있나요?)",
            modelAnswer: "I regularly play on hard courts at a municipal tennis club located in a scenic park. The club has six well-maintained acrylic surface courts, high perimeter fencing with windbreaks, and bright floodlights for evening sessions. The court surface provides a consistent medium-fast bounce that suits my baseline aggressive playing style."
        },
        q2: {
            question: "What gear or equipment do you use for tennis, and what is your typical warm-up routine before a match?",
            kor: "(테니스를 칠 때 어떤 장비를 사용하며, 경기 전 준비 운동 루틴은 어떤가요?)",
            modelAnswer: "I play with a 300-gram graphite composite racket strung at 52 pounds of tension, and I wear specialized non-marking tennis shoes with strong lateral ankle support. Before playing, I warm up with short-court mini-tennis to tune my touch, followed by baseline groundstroke rallies and practicing my first and second serves."
        },
        q3: {
            question: "Tell me about a memorable tennis match you played against a tough opponent. How did the match unfold?",
            kor: "(까다로운 상대와 치렀던 기억에 남는 테니스 경기에 대해 말해 주세요. 경기가 어떻게 진행되었나요?)",
            modelAnswer: "Last autumn, I played a grueling three-set match against a seasoned veteran club player. His heavy slices and drop shots tested my stamina to the absolute limit. After losing the first set, I adjusted my strategy to play aggressively towards his backhand. Coming back from behind to win the tiebreaker in the third set taught me mental resilience under pressure."
        }
    },

    // 운동: 배드민턴 (badminton)
    badminton: {
        name: "운동: 배드민턴",
        q1: {
            question: "You indicated playing badminton in your survey. Describe the badminton court or facility where you usually play. What is it like?",
            kor: "(배드민턴을 선택하셨습니다. 주로 배드민턴을 치는 코트나 체육 시설을 묘사해 주세요.)",
            modelAnswer: "I play at an indoor dedicated badminton center with eight professional green vinyl courts. Since badminton is sensitive to air currents, the facility has indirect ventilation with zero drafts. The bright anti-glare LED lighting allows us to track the high-speed shuttlecock clearly from any angle."
        },
        q2: {
            question: "Who do you play badminton with, and what is your typical routine during a practice session?",
            kor: "(주로 누구와 배드민턴을 치며, 연습할 때의 일반적인 루틴은 어떤가요?)",
            modelAnswer: "I play doubles matches with my coworkers and club members every Tuesday and Thursday evening. We start by hitting high clears and drop shots to loosen our wrists and shoulders. Then, we practice rapid front-court net kills and drive rallies before competing in best-of-three 21-point competitive games."
        },
        q3: {
            question: "Tell me about a memorable badminton rally or match you experienced. What happened, and why was it unforgettable?",
            kor: "(기억에 남는 배드민턴 랠리나 경기에 대해 이야기해 주세요. 어떤 일이 있었고 왜 잊지 못할 경험인가요?)",
            modelAnswer: "During a doubles tournament match last year, my partner and I were locked in a continuous 40-shot rally at match point! Both sides scrambled across the court diving and retrieving smashes. Finally, I executed a deceptive cross-court drop that caught our opponents off guard. Collapsing on the court in exhausted celebration was pure ecstasy."
        }
    },

    // 운동: 탁구 (table_tennis)
    table_tennis: {
        name: "운동: 탁구",
        q1: {
            question: "You indicated playing table tennis in the survey. Describe the table tennis club or room where you usually play. What equipment is available there?",
            kor: "(탁구를 선택하셨습니다. 주로 탁구를 치는 탁구장이나 시설을 설명해 주세요. 어떤 장비가 갖추어져 있나요?)",
            modelAnswer: "I frequent a neighborhood table tennis club located near my subway station. It is equipped with eight competition-grade tables, non-slip red rubber flooring, and automatic ball-feeding robot machines for solo practice. The club has air conditioning and ample spacing between tables to allow wide defensive footwork."
        },
        q2: {
            question: "What is your routine when practicing table tennis, and what kind of paddle or rubber do you prefer?",
            kor: "(탁구를 연습할 때 루틴은 어떠하며, 어떤 라켓이나 러버를 선호하시나요?)",
            modelAnswer: "I play with a shakehand carbon blade fitted with high-tension inverted rubber on both sides for heavy topspin. My routine starts with 15 minutes of forehand and backhand cross-court counter-drives to find my rhythm, followed by practicing short pendulum serves and third-ball attack patterns."
        },
        q3: {
            question: "Tell me about an exciting or memorable table tennis match you played with a friend or club member. How did it end?",
            kor: "(친구나 동호회 회원과 치렀던 흥미진진하고 기억에 남는 탁구 경기에 대해 말해 주세요. 경기가 어떻게 끝났나요?)",
            modelAnswer: "Last month, I played an epic five-game match against the top-ranked player in our club. His heavy backspin chops were frustratingly difficult to lift. In the deciding fifth game at 10-all deuce, I took a risk by attacking down the line with full power and clinched the victory. Winning against a much higher-rated player gave me immense satisfaction."
        }
    },

    // 운동: 수영 (swimming)
    swimming: {
        name: "운동: 수영",
        q1: {
            question: "You indicated swimming in your survey. Describe the swimming pool you usually go to. What facilities and amenities does it have?",
            kor: "(수영을 선택하셨습니다. 주로 이용하는 수영장을 묘사해 주세요. 어떤 시설과 편의시설이 있나요?)",
            modelAnswer: "I swim at an Olympic-sized municipal sports complex that features a 50-meter indoor pool with eight lanes. The water is treated with an eco-friendly ozone purification system, so it doesn't irritate my eyes with strong chlorine. It also has a warm jacuzzi spa, modern locker rooms, and dry saunas for relaxing after workouts."
        },
        q2: {
            question: "How often do you go swimming, and what is your typical routine from entering the pool until you finish?",
            kor: "(얼마나 자주 수영을 가며, 수영장에 들어가서 마칠 때까지의 전형적인 루틴은 어떤가요?)",
            modelAnswer: "I swim three mornings a week before heading to work. I always spend five minutes doing poolside joint rotations and stretching before diving into the water. My workout consists of 500 meters of freestyle warm-up, followed by breaststroke and butterfly interval laps. I wrap up with a gentle backstroke cool-down to normalize my heart rate."
        },
        q3: {
            question: "Tell me about how you first learned how to swim, or a memorable experience you had in the water.",
            kor: "(처음 수영을 배웠던 기억이나, 물속에서 겪었던 잊지 못할 경험에 대해 이야기해 주세요.)",
            modelAnswer: "I vividly remember learning to swim during elementary school summer camp. Initially, I was terrified of putting my head underwater. But our instructor patiently taught me breathing techniques with a kickboard. The moment I let go of the board and floated across the pool unaided for the first time was an unforgettable milestone of overcoming fear."
        }
    },

    // 운동: 자전거 / 라이딩 (bicycle)
    bicycle: {
        name: "운동: 자전거 / 라이딩",
        q1: {
            question: "You indicated cycling or riding a bicycle in your survey. Describe the bicycle path or scenic route you usually ride on. What does it look like?",
            kor: "(자전거/라이딩을 선택하셨습니다. 주로 달리는 자전거 도로나 코스를 묘사해 주세요. 어떤 풍경인가요?)",
            modelAnswer: "I usually cycle along an extensive riverside dedicated bike path that stretches for tens of kilometers through the city. The trail is completely separated from motor vehicles, smoothly paved with asphalt, and lined with weeping willows and seasonal flower gardens. Riding alongside the sparkling water on breezy mornings is pure therapy."
        },
        q2: {
            question: "What safety gear and accessories do you equip when you ride a bicycle, and what is your routine before starting a ride?",
            kor: "(자전거를 탈 때 어떤 안전 장비와 용품을 갖추며, 라이딩 전 준비 루틴은 어떤가요?)",
            modelAnswer: "Safety is my top priority, so I always wear an aerodynamic certified helmet, UV-blocking cycling sunglasses, and padded gloves. Before embarking on a ride, I thoroughly check tire pressure, test both front and rear disc brakes, lubricate the chain, and mount front headlights and rear flashing lights for visibility."
        },
        q3: {
            question: "Tell me about an unforgettable cycling trip or an unexpected challenge you experienced while riding your bicycle.",
            kor: "(자전거를 타며 겪었던 잊지 못할 장거리 라이딩이나 예상치 못한 난관에 대해 말해 주세요.)",
            modelAnswer: "Last autumn, my friends and I completed an ambitious 100-kilometer cross-country cycling route. Around the 70-kilometer mark, my rear tire got punctured by a sharp rock! Fortunately, I carried a portable repair kit and mini pump. We replaced the inner tube together in twenty minutes and finished the journey just in time to watch a spectacular sunset over the lake."
        }
    },

    // 운동: 골프 / 스크린 골프 (golf)
    golf: {
        name: "운동: 골프 / 스크린 골프",
        q1: {
            question: "You indicated playing golf in your survey. Describe the golf course, driving range, or screen golf facility you frequently visit. What is it like?",
            kor: "(골프를 선택하셨습니다. 자주 방문하는 골프장, 인도어 연습장, 또는 스크린 골프장을 설명해 주세요.)",
            modelAnswer: "I frequently visit an advanced indoor screen golf center located near my office on weekdays, and outdoor driving ranges on weekends. The screen golf simulator uses high-speed dual camera sensors to track club angle, ball speed, and spin rate in ultra-realistic 4K graphic simulation. The private booths are comfortable and equipped with modern refreshments."
        },
        q2: {
            question: "What is your typical routine when you practice golf or play a round on the course? What clubs do you use most?",
            kor: "(골프를 연습하거나 라운딩할 때의 일반적인 루틴은 무엇이며, 어떤 클럽을 가장 많이 사용하시나요?)",
            modelAnswer: "I begin every practice session with ten minutes of rotational torso stretches to prevent back strain. I warm up starting with my sand wedge for short chip shots, gradually move up through 7-iron approach shots, and finish with full driver swings. On the course, I pay meticulous attention to course management and pre-shot alignment routines."
        },
        q3: {
            question: "Tell me about a memorable round of golf or your best shot on the green. What made that moment so special?",
            kor: "(기억에 남는 골프 라운딩이나 필드에서의 인생 샷에 대해 이야기해 주세요. 왜 그 순간이 특별했나요?)",
            modelAnswer: "During a round at a scenic mountainous golf course last spring, I faced a daunting par-3 hole surrounded by a deep water hazard. Fighting a stiff crosswind, I selected my 8-iron and hit a pure, crisp shot. The ball landed softly on the green just three feet from the pin, and I sank the putt for a sweet birdie! That pure strike was pure bliss."
        }
    },

    // 운동: 헬스 / 웨이트 트레이닝 (fitness)
    fitness: {
        name: "운동: 헬스 / 웨이트 트레이닝",
        q1: {
            question: "You indicated working out at a fitness center in the survey. Describe the gym you go to and the equipment available there. What does it look like?",
            kor: "(헬스/웨이트 트레이닝을 선택하셨습니다. 다니시는 헬스장과 구비된 운동 기구를 묘사해 주세요.)",
            modelAnswer: "I work out at a modern 24-hour fitness center situated just five minutes from my home. It features a spacious free-weight zone with power racks, dumbbells ranging up to 40 kilograms, and cutting-edge cable machines. It also has a dedicated cardio zone overlooking panoramic city skyline views and clean shower facilities."
        },
        q2: {
            question: "What is your typical workout routine when you go to the gym? Describe your exercises from warm-up to cool-down.",
            kor: "(헬스장에 갔을 때의 전형적인 운동 루틴은 무엇인가요? 준비 운동부터 마무리까지 설명해 주세요.)",
            modelAnswer: "I follow a four-day upper and lower body split routine. I kick off with foam rolling and dynamic mobility drills for ten minutes. Then, I focus on heavy compound lifts like squats, bench presses, and deadlifts, followed by isolated dumbbell exercises. I always conclude with twenty minutes of incline treadmill cardio and drink a whey protein shake."
        },
        q3: {
            question: "Tell me about a time when you set a personal fitness goal or achieved a significant milestone in your workouts. How did it impact your life?",
            kor: "(피트니스 목표를 세우고 의미 있는 성과를 달성했던 경험에 대해 말해 주세요. 그 경험이 삶에 어떤 변화를 주었나요?)",
            modelAnswer: "At the beginning of last year, my goal was to bench press 100 kilograms, which had been a psychological plateau for me. Through consistent progressive overload, disciplined nutrition, and adequate sleep over six months, I finally locked out a clean 100-kilogram repetition! Breaking that personal barrier gave me tremendous confidence that transcended into my professional work."
        }
    },

    // 운동: 하이킹 / 등산 (hiking)
    hiking: {
        name: "운동: 하이킹 / 등산",
        q1: {
            question: "You indicated hiking in your survey. Describe a mountain or hiking trail you frequently visit. What does the scenery look like?",
            kor: "(등산/하이킹을 선택하셨습니다. 자주 찾는 산이나 등산로를 묘사해 주세요. 경치는 어떤가요?)",
            modelAnswer: "I frequently hike Mount Bukhan located on the northern perimeter of Seoul. The trail features rugged granite peaks, crystal-clear valley streams, and lush pine forests. As you climb higher, the trail offers breathtaking panoramic vistas overlooking the entire metropolitan cityscape nestled against nature."
        },
        q2: {
            question: "How do you prepare for a hike, and what essential gear and food do you pack in your backpack?",
            kor: "(등산을 어떻게 준비하며, 배낭에 어떤 필수 장비와 음식을 챙기나요?)",
            modelAnswer: "Before heading out, I check the mountain weather forecast carefully. I lace up supportive Gore-Tex hiking boots and use adjustable trekking poles to protect my knees. In my backpack, I pack plenty of water, electrolyte tablets, energy bars, seasonal fruits like kimbap and apples, and a compact windbreaker jacket."
        },
        q3: {
            question: "Tell me about a memorable or challenging hiking experience you had on a mountain. What was the most memorable moment?",
            kor: "(산에서 겪었던 기억에 남거나 힘들었던 등산 경험에 대해 이야기해 주세요. 가장 인상적인 순간은 무엇이었나요?)",
            modelAnswer: "Last autumn, I embarked on a sunrise hike to the summit of Mount Seorak. We began trekking at 3 AM under a pitch-black sky using headlamps. The steep rock scrambles were physically exhausting, but when the brilliant golden sun burst through the rolling sea of clouds at the peak, all exhaustion vanished. It was an awe-inspiring, spiritual spectacle."
        }
    },

    // 여가 활동: 게임하기 (game)
    game: {
        name: "여가 활동: 게임하기",
        q1: {
            question: "You selected playing games in the survey. What video, PC, or mobile games do you enjoy playing most, and what are their features?",
            kor: "(게임하기를 선택하셨습니다. 주로 즐기는 PC/모바일/콘솔 게임은 무엇이며 그 특징은 무엇인가요?)",
            modelAnswer: "I am an avid fan of cooperative multiplayer PC games, especially tactical team shooters and open-world role-playing games. What fascinates me most is the immersive storytelling, photorealistic graphics, and the necessity of strategic real-time communication with teammates across voice chat to achieve collective objectives."
        },
        q2: {
            question: "Describe your gaming environment at home. What devices, peripherals, or habits do you have when you play games?",
            kor: "(집안의 게임 환경을 설명해 주세요. 어떤 기기, 게이밍 장비를 갖추고 있으며 어떤 습관이 있나요?)",
            modelAnswer: "I have a dedicated gaming desk setup equipped with a high-refresh-rate dual monitor, a mechanical RGB keyboard, and a noise-canceling headset with a crystal-clear microphone. I usually game for an hour or two on weekend evenings after wrapping up my daily errands. I always keep a large tumbler of ice water by my side to stay hydrated during matches."
        },
        q3: {
            question: "Tell me about a memorable incident or a thrilling victory you experienced while playing a game.",
            kor: "(게임을 하던 중 겪었던 기억에 남는 일이나 짜릿한 승리 경험에 대해 말해 주세요.)",
            modelAnswer: "Just a few weeks ago, my friends and I were playing a competitive tournament match online. Our team was pushed back against the wall, but we coordinated a synchronized ambush in the final round. Through flawless team communication and quick reflexes, we wiped out the opponent team and secured an incredible comeback victory. The sheer adrenaline rush was unforgettable."
        }
    },

    // 여가 활동: 당구치기 (billiards)
    billiards: {
        name: "여가 활동: 당구치기",
        q1: {
            question: "You indicated playing billiards or pool in the survey. Describe a billiards hall you often visit. What are the tables and atmosphere like?",
            kor: "(당구치기를 선택하셨습니다. 자주 방문하는 당구장의 테이블과 분위기를 묘사해 주세요.)",
            modelAnswer: "I frequently go to a modern billiards club near our city center. Unlike traditional smoky billiard rooms, this place has a clean, smoke-free cafe-style lounge with bright LED spotlights over each international-standard carom table. The cushions and cloth are always kept in pristine condition, offering smooth and precise ball roll."
        },
        q2: {
            question: "What is the typical routine when you go play billiards with friends? How do you decide who buys food or pays for the game?",
            kor: "(친구들과 당구를 치러 갈 때의 일반적인 루틴은 어떤가요? 게임비나 식사 내기는 어떻게 결정하나요?)",
            modelAnswer: "We usually head to the billiard hall after dinner. We divide into two teams and play a game of four-ball carom or eight-ball pool. To make things exciting, we usually make a playful bet where the losing team pays for the game fee and buys iced Americanos or late-night snacks. It's a fantastic way to bond and relieve stress."
        },
        q3: {
            question: "Tell me about a memorable match or an unbelievable trick shot you witnessed while playing billiards.",
            kor: "(당구를 치던 중 경험한 기억에 남는 경기나 놀라운 샷에 대해 이야기해 주세요.)",
            modelAnswer: "I once played a game where my opponent needed only one point to win. On my final turn, the cue ball was blocked behind two obstacle balls. I attempted a daring three-cushion bank shot with maximum backspin. To everyone's astonishment, the ball curved gracefully and scored the winning point! My friends couldn't stop applauding, and we still reminisce about that miracle shot."
        }
    },

    // 취미: 춤추기 (dance)
    dance: {
        name: "취미: 춤추기",
        q1: {
            question: "You mentioned dancing in the survey. What style or genre of dance do you enjoy, and what makes it so appealing to you?",
            kor: "(춤추기를 선택하셨습니다. 어떤 장르의 춤을 좋아하며 그 매력은 무엇인가요?)",
            modelAnswer: "I really enjoy K-Pop choreography and urban street dance. What draws me to dancing is the rhythmic synchronization between body movements and upbeat music. It allows me to express raw emotion and energy that words simply cannot capture, while offering a phenomenal full-body cardio workout."
        },
        q2: {
            question: "How and where do you usually practice dancing? Describe your practice routine from stretching to learning choreography.",
            kor: "(주로 어디서 어떻게 춤 연습을 하나요? 스트레칭부터 안무 연습까지의 과정을 설명해 주세요.)",
            modelAnswer: "I usually rent a mirrored dance studio with my dance crew twice a month, or practice in front of a mirror at home. We spend fifteen minutes doing dynamic stretches and body isolations. Then, we break down a new choreography step by step at half speed using video tutorials before dancing to the original tempo."
        },
        q3: {
            question: "Tell me about a memorable experience when you performed a dance in front of people or learned a challenging routine.",
            kor: "(사람들 앞에서 춤을 선보였거나 어려운 안무를 마스터했던 기억에 남는 경험에 대해 말해 주세요.)",
            modelAnswer: "During our annual university festival, my dance club performed a medley routine on the main outdoor stage in front of hundreds of students. My heart was pounding like crazy backstage, but as soon as the beat dropped, the adrenaline took over. Hearing the roaring crowd cheer for our performance gave me goosebumps that I will never forget."
        }
    },

    // 취미: 악기 연주하기 (instrument)
    instrument: {
        name: "취미: 악기 연주하기",
        q1: {
            question: "You indicated playing a musical instrument in the survey. What instrument do you play, and what does it sound like?",
            kor: "(악기 연주하기를 선택하셨습니다. 어떤 악기를 다루며 그 음색의 특징은 무엇인가요?)",
            modelAnswer: "I have been playing the acoustic guitar for several years. I love the warm, resonant, and organic tone of steel strings vibrating against wooden soundboards. Whether strumming bright chords for pop songs or fingerpicking delicate melodies, the acoustic guitar has a soulful voice that immediately comforts the listener."
        },
        q2: {
            question: "What is your regular practice routine with your instrument? When and where do you play, and what songs do you practice?",
            kor: "(평소 악기 연습 루틴은 어떤가요? 주로 언제 어디서 연주하며 어떤 곡들을 연습하나요?)",
            modelAnswer: "I keep my guitar on a stand in my bedroom so I can easily pick it up whenever inspiration strikes. In the evenings, I usually spend thirty minutes tuning the strings, practicing fingerstyle scales, and playing classic acoustic covers by artists like Ed Sheeran and Eric Clapton. It serves as my daily meditation."
        },
        q3: {
            question: "Tell me about how you first started learning your musical instrument and a memorable milestone in your musical journey.",
            kor: "(처음 악기를 배우게 된 계기와 음악 여정에서 가장 기억에 남는 순간에 대해 말해 주세요.)",
            modelAnswer: "I first picked up the guitar in middle school after watching a legendary concert video. In the beginning, my fingertips blistered and formed calluses, and forming the difficult F-chord seemed almost impossible. But when I finally played my first complete song from beginning to end without stopping, the sense of accomplishment was so exhilarating that it sparked my lifelong passion for music."
        }
    },

    // 취미: 그림 그리기 (drawing)
    drawing: {
        name: "취미: 그림 그리기",
        q1: {
            question: "You selected drawing in your survey. What kind of artwork or drawings do you create, and what tools or media do you use?",
            kor: "(그림 그리기를 선택하셨습니다. 주로 어떤 스타일의 그림을 그리며 어떤 도구를 사용하나요?)",
            modelAnswer: "I mainly create digital landscape illustrations and quick pen-and-ink architectural sketches. I use a graphics tablet with an electronic stylus pen, which allows me to experiment with infinite color palettes, textures, and brush strokes without making a physical mess. I love capturing the interplay of natural sunlight and urban buildings."
        },
        q2: {
            question: "Where do you get inspiration for your drawings, and what is your creative process when starting a new piece?",
            kor: "(그림을 그릴 때 주로 어디서 영감을 얻으며, 새 작품을 시작할 때의 창작 과정은 어떤가요?)",
            modelAnswer: "I get most of my inspiration from taking leisurely walks around historical neighborhoods or browsing photographic travel essays. When starting a piece, I begin with rough geometric outlines to establish perspective. Then, I block in primary color values, gradually layering shadows and intricate highlights until the artwork comes alive."
        },
        q3: {
            question: "Tell me about a special drawing you completed that holds sentimental value or an exhibition you visited that inspired your art.",
            kor: "(각별한 의미가 있는 완성작이나 예술적 영감을 주었던 전시회 관람 경험에 대해 이야기해 주세요.)",
            modelAnswer: "Last year, I drew a detailed watercolor illustration of my grandparents' old countryside home as a surprise anniversary gift. When I presented the framed painting to them, my grandmother was so moved that she teared up. Seeing how deeply art can convey gratitude and emotional connection made it the most meaningful piece I have ever created."
        }
    },

    // 취미: 글쓰기 (writing)
    writing: {
        name: "취미: 글쓰기",
        q1: {
            question: "You indicated writing as a hobby. What types of writing do you enjoy, and what topics do you like to write about?",
            kor: "(글쓰기를 선택하셨습니다. 어떤 종류의 글을 즐겨 쓰며 주로 어떤 주제를 다루나요?)",
            modelAnswer: "I enjoy writing reflective personal essays and tech reviews on my personal blog. I frequently write about my professional research thoughts, book summaries, and life lessons learned from everyday interactions. Writing provides me with a quiet space to clarify my thoughts and organize complex ideas systematically."
        },
        q2: {
            question: "What is your typical writing routine? When and where do you sit down to write, and how do you overcome writer's block?",
            kor: "(평소 글쓰기 루틴은 어떤가요? 주로 언제 어디서 글을 쓰며 글이 잘 안 풀릴 땐 어떻게 하나요?)",
            modelAnswer: "I do my best writing early on Sunday mornings in a quiet corner of my room with a hot mug of coffee. When I face writer's block, I don't force myself to type. Instead, I step outside for a brisk twenty-minute walk or jot down free-flowing bullet points in a pocket notebook. Changing the physical scenery always reignites my creativity."
        },
        q3: {
            question: "Tell me about a memorable piece of writing you wrote or feedback from a reader that left a strong impression on you.",
            kor: "(기억에 남는 글이나 독자에게서 받았던 인상 깊은 피드백에 대해 이야기해 주세요.)",
            modelAnswer: "A few months ago, I published an in-depth essay about overcoming career burnout and maintaining mental resilience. A young graduate student left a comment saying my honest words gave him the courage to persevere through his thesis defense. Realizing that sharing my vulnerabilities could positively touch someone else's life was deeply rewarding."
        }
    },

    // 여가 활동: 박물관 / 미술관 가기 (museum)
    museum: {
        name: "여가 활동: 박물관 / 미술관 가기",
        q1: {
            question: "You selected visiting museums in your survey. Describe a museum or art gallery you frequently visit or like best.",
            kor: "(박물관 가기를 선택하셨습니다. 자주 방문하거나 가장 좋아하는 박물관/미술관을 설명해 주세요.)",
            modelAnswer: "I love visiting the National Museum of Korea located in Yongsan. It is a monumental contemporary building surrounded by a peaceful mirrored pond and landscaped gardens. The museum houses thousands of historical artifacts and national treasures spanning centuries. The serene 'Room of Quiet Contemplation' featuring the meditating Bodhisattva statues is awe-inspiring."
        },
        q2: {
            question: "What is your typical routine when you go to a museum? How do you explore the exhibits from start to finish?",
            kor: "(박물관에 갈 때의 일반적인 관람 루틴은 어떤가요? 처음부터 끝까지 어떻게 둘러보나요?)",
            modelAnswer: "I usually reserve tickets online in advance to avoid long weekend queues. Upon arrival, I pick up an audio guide headset so I can listen to expert curatorial commentary while viewing the relics. I spend about three hours exploring the main gallery, and I always wrap up my visit by purchasing art postcards and drinking tea at the museum cafe."
        },
        q3: {
            question: "Tell me about a memorable exhibition you visited recently or in the past. What made the experience so special?",
            kor: "(최근이나 과거에 방문했던 인상 깊은 특별 전시에 대해 말해 주세요. 무엇이 그토록 특별했나요?)",
            modelAnswer: "Last autumn, I visited a blockbuster special exhibition featuring original Impressionist masterpieces on loan from European museums. Seeing the delicate brushstrokes and vivid light of Claude Monet's water lilies in real life took my breath away. Standing just inches from iconic paintings I had only seen in textbooks was an unforgettable cultural experience."
        }
    },

    // 여가 활동: 클럽 / 나이트클럽 가기 (club)
    club: {
        name: "여가 활동: 클럽 / 나이트클럽 가기",
        q1: {
            question: "You indicated going to clubs in the survey. Describe a popular club you know of. What is the music, lighting, and vibe like?",
            kor: "(클럽 가기를 선택하셨습니다. 알고 있는 인기 클럽의 음악, 조명, 분위기를 묘사해 주세요.)",
            modelAnswer: "There is a renowned underground electronic music club in the trendy Hongdae district. It features state-of-the-art acoustic sound systems, mesmerizing laser light shows, and world-class resident DJs spinning deep house and progressive techno. The atmosphere is brimming with electric energy, where people from all walks of life dance freely without judgment."
        },
        q2: {
            question: "When people go clubbing in your country, what is the usual routine before entering and after leaving the club?",
            kor: "(클럽에 갈 때의 전형적인 루틴은 어떤가요? 들어가기 전과 나온 후 무엇을 하나요?)",
            modelAnswer: "People typically meet up with friends around 10 PM for dinner and pre-drinks at a nearby lounge bar. They usually enter the club around midnight when the headlining DJ takes the stage. After dancing energetically for several hours, they leave around 4 or 5 AM to grab warm Korean street food or hangover soup at a 24-hour diner to recharge."
        },
        q3: {
            question: "Tell me about a memorable night or a funny incident you experienced while at a club or music party.",
            kor: "(클럽이나 음악 파티에서 겪었던 기억에 남는 밤이나 재미있는 에피소드에 대해 말해 주세요.)",
            modelAnswer: "On New Year's Eve, my friends and I counted down to the new year inside a packed music club. As the clock struck midnight, golden confetti cannons exploded from the ceiling, and the entire venue roared in celebration. Strangers were hugging, high-fiving, and dancing together under the glittering lights. Celebrating the new year with such vibrant collective euphoria was unforgettable."
        }
    },

    // 여가 활동: 스포츠 관람 (sports_watch)
    sports_watch: {
        name: "여가 활동: 스포츠 관람",
        q1: {
            question: "You mentioned watching sports in the survey. What sport do you enjoy watching most, and who is your favorite team or player?",
            kor: "(스포츠 관람을 선택하셨습니다. 가장 즐겨 보는 스포츠는 무엇이며 좋아하는 팀이나 선수는 누구인가요?)",
            modelAnswer: "I am a passionate fan of professional baseball. My favorite team is the local franchise team from my hometown. Watching a live game at the stadium with tens of thousands of enthusiastic spectators singing team fight songs and cheering for every home run is pure exhilaration."
        },
        q2: {
            question: "What is the typical routine when you go watch a live sporting match at a stadium? What food and gear do you bring?",
            kor: "(경기장에 직접 스포츠를 직관하러 갈 때의 루틴은 어떤가요? 어떤 응원 도구와 음식을 챙기나요?)",
            modelAnswer: "We always arrive an hour before first pitch to find our seats and soak in the pre-game atmosphere. The quintessential Korean stadium experience involves buying crispy fried chicken and cold draft beer. We put on team jerseys, inflate cheering sticks, and sing synchronized chants throughout all nine innings."
        },
        q3: {
            question: "Tell me about the most thrilling sports match you have ever watched live or on television.",
            kor: "(직관했거나 TV로 보았던 경기 중 가장 짜릿했던 최고의 스포츠 경기에 대해 말해 주세요.)",
            modelAnswer: "During the baseball postseason last year, our team was losing by three runs in the bottom of the ninth inning with two outs! The bases were loaded, and our cleanup hitter stepped up to the plate. On a full count, he hit a walk-off grand slam into the upper deck! The entire stadium erupted in pure pandemonium. It was easily the greatest sporting moment of my life."
        }
    },

    // 여가 활동: 주거 개선 / 인테리어 (home_improve)
    home_improve: {
        name: "여가 활동: 주거 개선 / 인테리어",
        q1: {
            question: "You indicated an interest in home improvement. What changes or improvements have you made to your living space recently?",
            kor: "(주거 개선을 선택하셨습니다. 최근 주거 공간에 어떤 변화나 인테리어 개선을 시도했나요?)",
            modelAnswer: "Recently, I completely upgraded my home study area. I replaced my old bulky desk with a motorized standing desk, installed warm indirect LED light strips behind my monitor, and placed several potted air-purifying plants like snake plants around the room. It transformed a cluttered room into an aesthetically pleasing, productive sanctuary."
        },
        q2: {
            question: "What is your typical process when you decide to redecorate a room or organize your household furniture?",
            kor: "(방을 새롭게 꾸미거나 가구를 재배치할 때의 일반적인 진행 과정은 어떤가요?)",
            modelAnswer: "I always start by decluttering and discarding items I no longer use. Then, I browse interior design apps like Pinterest to create a visual mood board for color harmony. I measure room dimensions carefully before purchasing modular furniture, ensuring optimal airflow and efficient walking space."
        },
        q3: {
            question: "Tell me about a DIY home repair or redecorating project you did that turned out better or worse than expected.",
            kor: "(직접 시도했던 DIY 인테리어나 집수리 프로젝트 중 예상보다 좋았거나 힘들었던 경험을 말해 주세요.)",
            modelAnswer: "A few months ago, I decided to assemble a large Scandinavian modular bookshelf all by myself. What I thought would take one hour turned into a four-hour marathon with dozens of screws, confusing manual diagrams, and upside-down panels! But once I tightened the final bolt and arranged all my books, the sense of triumph was unbeatable."
        }
    },

    // 여가 활동: 친구들과 문자 대화하기 (texting)
    texting: {
        name: "여가 활동: 친구들과 문자 대화하기",
        q1: {
            question: "You selected texting with friends in the survey. What messaging apps do you use, and what features do you find most useful?",
            kor: "(친구들과 문자 대화하기를 선택하셨습니다. 주로 어떤 메신저 앱을 쓰며 어떤 기능이 가장 유용한가요?)",
            modelAnswer: "In Korea, KakaoTalk is the indispensable national messaging platform used by virtually everyone. Beyond basic instant messaging, it offers fantastic features like funny animated emoticons, seamless mobile gift vouchers, high-quality voice and video calls, and group chat voting tools for scheduling meetings."
        },
        q2: {
            question: "How often do you text throughout the day, and what kind of group chat rooms are you active in?",
            kor: "(하루 중 얼마나 자주 문자를 주고받으며 주로 어떤 단체 대화방에 참여하고 있나요?)",
            modelAnswer: "I check and send text messages periodically throughout the day. I am active in several group chats, including an everyday banter room with my closest friends, a family chat room where we share photos of meals, and professional project chat channels for rapid work coordination."
        },
        q3: {
            question: "Tell me about a funny episode, misunderstanding, or mistake you experienced while texting someone.",
            kor: "(문자를 보내던 중 겪었던 재미있는 에피소드나 오타, 실수로 인한 해프닝에 대해 말해 주세요.)",
            modelAnswer: "Once, I intended to send a goofy selfie with a silly joke to my close friend group chat, but in my rush, I accidentally posted it into my serious university research group chat! My advisor was the first to see it. Thankfully, he responded with a laughing emoticon and teased me gently. My face turned bright red, but it ended up lightening the lab atmosphere."
        }
    },

    // 취미: 독서 / 책 읽어주기 (read_book)
    read_book: {
        name: "취미: 독서 / 책 읽어주기",
        q1: {
            question: "You indicated reading in your survey. What genres of books do you enjoy, and who is your favorite author?",
            kor: "(독서하기를 선택하셨습니다. 어떤 장르의 책을 좋아하며 좋아하는 작가는 누구인가요?)",
            modelAnswer: "I enjoy reading behavioral economics, popular science, and historical biographies. One of my favorite authors is Yuval Noah Harari. His book 'Sapiens' blew my mind with its sweeping, multidisciplinary perspective on the cognitive and agricultural revolutions of humankind. It completely reshaped my understanding of human society."
        },
        q2: {
            question: "Describe your personal reading habits. When and where do you prefer to read, and how many books do you read in a month?",
            kor: "(개인적인 독서 습관을 설명해 주세요. 주로 언제 어디서 책을 읽으며 한 달에 몇 권 정도 읽나요?)",
            modelAnswer: "I aim to read at least two books a month. I do most of my reading during my daily subway commute using an e-book reader, or in bed for thirty minutes before sleeping. Reading analog paper books at night helps me detach from digital screens and promotes sound, restful sleep."
        },
        q3: {
            question: "Tell me about a book you read that left a profound impression on you or changed your outlook on life.",
            kor: "(자신의 가치관이나 인생관에 깊은 감명을 주었던 인상 깊은 책에 대해 말해 주세요.)",
            modelAnswer: "A book that deeply moved me is 'Atomic Habits' by James Clear. It taught me that monumental life achievements don't come from sudden drastic transformations, but from the compounding effect of tiny 1% daily improvements. Applying this principle to my daily English speaking and exercise routines has produced astonishing results in my life."
        }
    },

    // 취미: 노래 부르기 (singing)
    singing: {
        name: "취미: 노래 부르기",
        q1: {
            question: "You selected singing in the survey. Where do you usually sing, and what songs do you like to perform?",
            kor: "(노래 부르기를 선택하셨습니다. 주로 어디서 노래를 부르며 어떤 노래를 즐겨 부르나요?)",
            modelAnswer: "I often go to coin karaoke booths, known as 'Coin Noraebang' in Korea. They are modern, private, air-conditioned acoustic booths equipped with high-fidelity microphones and sound systems. I love singing emotional acoustic ballads, classic pop rock anthems, and energetic K-Pop songs that allow me to hit high notes and release stress."
        },
        q2: {
            question: "What is your typical routine when you go to a karaoke room with your friends?",
            kor: "(친구들과 노래방에 갔을 때의 일반적인 진행 과정과 루틴은 어떤가요?)",
            modelAnswer: "We usually head to karaoke after having a big group dinner. We start by putting on upbeat dance tracks to warm up our vocal cords and build hype. Then, we take turns passing the microphones, singing duets, and scoring points on the karaoke machine. It's the ultimate Korean cultural bonding ritual."
        },
        q3: {
            question: "Tell me about a memorable memory or funny moment from a time you sang with friends or performed.",
            kor: "(친구들과 노래방에서 노래를 부르며 겪었던 기억에 남는 추억이나 재미있는 순간을 말해 주세요.)",
            modelAnswer: "At a college farewell party, my friends and I stayed at a karaoke room until early sunrise. At the end of the night, with our voices completely hoarse and raspy, we all stood shoulder to shoulder, belting out Queen's 'Bohemian Rhapsody' at the top of our lungs. The sheer passion and camaraderie of that moment is etched forever in my memory."
        }
    },

    // 휴가: 집에서 보내는 휴가 (Staycation) (staycation)
    staycation: {
        name: "휴가: 집에서 보내는 휴가 (Staycation)",
        q1: {
            question: "You indicated spending vacations at home. Describe what a peaceful staycation looks like for you.",
            kor: "(집에서 보내는 휴가를 선택하셨습니다. 평화로운 스테이케이션은 어떤 모습인가요?)",
            modelAnswer: "For me, a staycation is the pinnacle of pure relaxation. Without the stress of packing heavy luggage, booking flights, or battling airport crowds, my home transforms into a personal resort. I enjoy luxurious sleep without alarms, cook elaborate meals, and enjoy uninterrupted quiet time in my favorite comfortable loungewear."
        },
        q2: {
            question: "What is your typical daily routine when you spend your vacation days entirely at home?",
            kor: "(휴가 기간을 집에서 온전히 보낼 때의 전형적인 하루 일과는 어떤가요?)",
            modelAnswer: "I wake up naturally around 10 AM, brew gourmet pour-over coffee, and prepare a leisurely brunch. In the afternoon, I binge-watch acclaimed documentary series on streaming platforms or immerse myself in a good novel. In the evening, I order delicious delivery food and take a soothing hot bath to recharge my batteries."
        },
        q3: {
            question: "Tell me about the best staycation you have ever had. What did you do, and why was it so rejuvenating?",
            kor: "(지금까지 보냈던 최고의 집콕 휴가에 대해 말해 주세요. 무엇을 했고 왜 그토록 힐링이 되었나요?)",
            modelAnswer: "Last summer during a record-breaking heatwave, I decided to take a four-day digital detox staycation. I turned off all work notifications, closed the blackout curtains, kept the air conditioner at a crisp 22 degrees, and spent days reading, sketching, and listening to classical music. That undisturbed solitude recharged my mental stamina far better than any hectic overseas trip could have."
        }
    },

    // 출장: 국내 출장 (dom_biz)
    dom_biz: {
        name: "출장: 국내 출장",
        q1: {
            question: "You selected domestic business trips in your survey. What cities do you frequently visit for work, and what is your mode of transportation?",
            kor: "(국내 출장을 선택하셨습니다. 업무차 자주 방문하는 도시는 어디이며 어떤 교통수단을 이용하나요?)",
            modelAnswer: "I frequently travel to Busan and Daejeon for academic conferences and client research meetings. My primary mode of transportation is the KTX high-speed bullet train. It connects Seoul to Busan in less than three hours, offering free Wi-Fi and power outlets at every seat so I can work productively while traveling."
        },
        q2: {
            question: "Describe your typical business trip schedule from departure to returning home.",
            kor: "(출발부터 귀가까지의 전형적인 출장 일정을 설명해 주세요.)",
            modelAnswer: "I catch an early morning train around 7 AM, reviewing presentation slides on my laptop during the ride. Upon arrival, I attend stakeholder meetings and client presentations throughout the afternoon. After wrapping up business, I often enjoy a quick regional specialty dinner with local partners before catching the evening train back home."
        },
        q3: {
            question: "Tell me about an unexpected challenge or emergency you handled while on a domestic business trip.",
            kor: "(국내 출장 중 겪었던 예상치 못한 돌발 상황이나 문제 해결 경험에 대해 말해 주세요.)",
            modelAnswer: "Last year during a critical project presentation in Daejeon, the presentation venue's HDMI projector adapter was incompatible with my new laptop! With only ten minutes before the presentation, I quickly uploaded my slides to cloud storage, accessed them from a colleague's tablet, and delivered the presentation smoothly without a hitch. It taught me the vital importance of always having redundant digital backups."
        }
    },

    // 출장: 해외 출장 (overseas_biz)
    overseas_biz: {
        name: "출장: 해외 출장",
        q1: {
            question: "You indicated overseas business trips. Describe a country or city you visited for business and the nature of your trip.",
            kor: "(해외 출장을 선택하셨습니다. 업무로 방문했던 해외 도시와 출장의 목적에 대해 설명해 주세요.)",
            modelAnswer: "I traveled to San Francisco, California, to attend an international engineering symposium and meet with international research collaborators. The conference took place at a massive convention center in downtown San Francisco, where researchers from across the globe gathered to discuss the latest advancements in technology."
        },
        q2: {
            question: "What is your preparation routine before going on an overseas business trip? What do you pack and prepare?",
            kor: "(해외 출장을 가기 전의 준비 과정은 어떤가요? 무엇을 챙기고 준비하나요?)",
            modelAnswer: "Preparation begins weeks in advance. I ensure my passport and travel visas are up to date, prepare customized presentation slides in English, and pack business formal attire alongside power plug converters. I also download offline translation maps and foreign currency exchange apps on my smartphone to navigate international airports smoothly."
        },
        q3: {
            question: "Tell me about a memorable cross-cultural experience or an unexpected hurdle you encountered during an overseas business trip.",
            kor: "(해외 출장 중 겪었던 기억에 남는 문화적 경험이나 예상치 못한 난관에 대해 이야기해 주세요.)",
            modelAnswer: "During my first international conference in Germany, I experienced significant jet lag combined with a sudden flight cancellation due to an airline strike! I had to quickly navigate the international train station to book an intercity train across cities to reach the conference hall on time. Overcoming that challenge boosted my self-confidence immensely when handling international logistics."
        }
    },

    // 취미: 여행 블로그 읽기 (travel_blog)
    travel_blog: {
        name: "취미: 여행 블로그 읽기",
        q1: {
            question: "You selected reading travel blogs. What kinds of travel blogs or travel vlogs do you follow, and what makes them captivating?",
            kor: "(여행 블로그 읽기를 선택하셨습니다. 어떤 여행 블로그나 브이로그를 찾아보며 그 매력은 무엇인가요?)",
            modelAnswer: "I follow independent travel blogs and YouTube travel channels that focus on off-the-beaten-path destinations and authentic local gastronomy. What captivates me is the raw, unfiltered perspectives, stunning high-resolution photography, and honest cost breakdowns that commercial travel guidebooks rarely disclose."
        },
        q2: {
            question: "How do you utilize travel blogs when planning an upcoming trip? Describe your research process.",
            kor: "(여행을 계획할 때 여행 블로그를 어떻게 활용하나요? 정보 탐색 과정을 설명해 주세요.)",
            modelAnswer: "Whenever I plan a vacation, I search for recent travel blog reviews using specific keywords. I save hidden gem restaurant recommendations, transit pass tips, and scenic photo spot coordinates directly onto my digital map app. This allows me to craft an efficient daily itinerary tailored to my personal pace."
        },
        q3: {
            question: "Tell me about a time when you visited a place recommended by a travel blog. Did it live up to your expectations?",
            kor: "(여행 블로그 추천을 보고 찾아갔던 장소에 대한 경험을 말해 주세요. 기대만큼 좋았나요?)",
            modelAnswer: "Before traveling to Jeju Island, I read a blog post recommending a tiny seafood noodle eatery tucked away in a remote coastal village. The blogger claimed it had the best sea urchin noodles on the island. When I visited, the breathtaking ocean view combined with the freshest, sweetest seafood exceeded every expectation! It became the highlight of my entire trip."
        }
    },

    // 운동: 운동을 전혀 하지 않음 (no_exercise)
    no_exercise: {
        name: "운동: 운동을 전혀 하지 않음",
        q1: {
            question: "You indicated in the survey that you do not exercise. What sedentary hobbies or restful activities do you enjoy instead during your free time?",
            kor: "(운동을 하지 않음을 선택하셨습니다. 격렬한 운동 대신 여가 시간에 주로 어떤 정적인 활동이나 휴식을 즐기나요?)",
            modelAnswer: "Instead of strenuous physical workouts, I prefer intellectually stimulating and relaxing sedentary hobbies. In my free time, I immerse myself in reading science books, watching thought-provoking cinema, listening to classical jazz music, or solving complex computer programming puzzles from the comfort of my sofa."
        },
        q2: {
            question: "How do you maintain your health and stamina in your daily life without engaging in regular sports?",
            kor: "(정기적인 스포츠 운동을 하지 않으면서 일상 속에서 건강과 체력을 어떻게 유지하나요?)",
            modelAnswer: "Although I don't go to a gym, I incorporate natural physical movement into my daily routine. For instance, I take the stairs instead of the elevator, walk briskly during my daily commutes, and maintain strict dietary habits with balanced nutrition, high water intake, and plenty of restorative sleep."
        },
        q3: {
            question: "Tell me about a time when friends or family tried to persuade you to exercise, or a brief attempt you made to work out.",
            kor: "(주변에서 운동을 권유받았거나 짧게 운동을 시도해보았던 경험에 대해 말해 주세요.)",
            modelAnswer: "Last New Year's, my close friend persuaded me to register for a three-month gym membership together. I went faithfully for the first week, but by the second week, lifting heavy weights felt more like an exhausting chore than fun. I realized that forcing myself into workouts I dislike isn't sustainable, so I decided to stick to peaceful walking and healthy eating instead."
        }
    },

    // 운동: 태권도 / 무술 (taekwondo)
    taekwondo: {
        name: "운동: 태권도 / 무술",
        q1: {
            question: "You indicated interest in martial arts like Taekwondo. Describe the training dojang or martial arts academy you usually go to. What does it look like?",
            kor: "(태권도/무술을 선택하셨습니다. 주로 수련하는 도장을 묘사해 주세요. 어떤 시설이 갖추어져 있나요?)",
            modelAnswer: "I regularly practice Taekwondo at a traditional martial arts dojang located in my neighborhood. The gym is fitted with high-density shock-absorbing mats, wooden training dummies, and kicking pads mounted along the mirrored walls. Training in an authentic uniform with a crisp belt gives me a deep sense of discipline and mental focus."
        },
        q2: {
            question: "What is your typical training routine from warm-up exercises to sparring or form practice?",
            kor: "(준비 운동부터 품새 또는 겨루기까지의 전형적인 수련 루틴을 설명해 주세요.)",
            modelAnswer: "A typical training session begins with a rigorous twenty-minute warm-up consisting of dynamic high kicks, jump rope, and core conditioning. Then, we practice fundamental form patterns called Poomsae, followed by controlled sparring drills wearing chest protectors. We always finish with respectful bow salutations and meditative breathing."
        },
        q3: {
            question: "Tell me about a memorable milestone, a belt promotion test, or an exciting match you experienced while practicing Taekwondo.",
            kor: "(승급 심사나 대회 경기 중 기억에 남는 특별한 경험에 대해 이야기해 주세요.)",
            modelAnswer: "A defining milestone in my journey was testing for my first-degree black belt after years of relentless practice. During the final breaking demonstration, I had to execute a jumping spinning heel kick to shatter a thick pine board in mid-air. When the board split cleanly with a loud snap, the entire hall erupted in applause. The feeling of perseverance paying off was deeply gratifying."
        }
    }
};

const UNEXPECTED_TOPICS = [
    {
        name: "음식 & 건강 (Food & Health)",
        q1: {
            question: "What are some of the popular healthy foods in your country? What is special about them, and why are they good for health?",
            kor: "[🚨 돌발 질문] (우리나라의 대표적인 건강식과 그 특징에 대해 설명해 주세요.)",
            modelAnswer: "Well, one of the most popular healthy foods in Korea is definitely Kimchi. As everybody knows, Kimchi is a fermented dish rich in natural probiotics, vitamins, and fiber. It is known to strengthen the immune system and aid digestion."
        },
        q2: {
            question: "Tell me about a health-conscious person you know. What does he or she do to stay healthy and fit?",
            kor: "[🚨 돌발 질문] (당신이 아는 건강에 신경 쓰는 사람에 대해 말해 주세요. 건강을 위해 무엇을 하나요?)",
            modelAnswer: "When it comes to staying healthy, my mother is number one. She is extremely health-conscious. She goes to a yoga class four times a week and makes sure our family eats balanced meals with plenty of fresh vegetables and fruits."
        },
        q3: {
            question: "Tell me about a time when you made an effort to improve your health or diet. What did you do, and what were the results?",
            kor: "[🚨 돌발 질문] (건강이나 식습관을 개선하기 위해 노력했던 경험에 대해 말해 주세요. 어떤 결과를 얻었나요?)",
            modelAnswer: "Last year, I realized I was spending too much time sitting at my desk, so I decided to start jogging every morning. At first it was tough, but after a month, I felt much more energetic and slept much better at night."
        }
    },
    {
        name: "날씨 & 계절 (Weather & Seasons)",
        q1: {
            question: "Describe the weather and four seasons in your country. Which season do you like best, and why?",
            kor: "[🚨 돌발 질문] (우리나라의 날씨와 사계절을 설명해 주세요. 어떤 계절을 가장 좋아하나요?)",
            modelAnswer: "Korea has four distinct seasons: spring, summer, autumn, and winter. My absolute favorite season is autumn. The weather is crisp and cool, the sky is crystal clear, and the colorful fall foliage makes outdoor walks extremely pleasant."
        },
        q2: {
            question: "How has the weather in your country changed over the years compared to when you were young?",
            kor: "[🚨 돌발 질문] (어렸을 때와 비교하여 우리나라의 날씨가 어떻게 변했나요?)",
            modelAnswer: "Over the past few years, summer has become noticeably hotter and longer due to global climate change. We also experience more unpredictable heavy rainfalls and heatwaves compared to when I was a child."
        },
        q3: {
            question: "Tell me about a memorable experience you had due to unexpected weather conditions such as a severe storm or heavy snow.",
            kor: "[🚨 돌발 질문] (폭우나 폭설 등 갑작스러운 날씨 변화로 인해 겪었던 기억에 남는 경험에 대해 말해 주세요.)",
            modelAnswer: "Two years ago, a massive sudden snowfall paralyzed the entire city during evening rush hour. Public transit was delayed for hours, so I ended up walking home in the snow for two hours with my friends. It was freezing cold, but walking through the silent snowy city felt like a scene from a movie."
        }
    },
    {
        name: "재활용 & 환경 (Recycling & Environment)",
        q1: {
            question: "Describe the recycling system in your country. How do people separate and dispose of household garbage, plastics, and paper?",
            kor: "[🚨 돌발 질문] (우리나라의 재활용 시스템에 대해 설명해 주세요. 쓰레기와 플라스틱을 어떻게 분리배출 하나요?)",
            modelAnswer: "In Korea, we have a very strict mandatory recycling system. Households must separate recyclables into designated bins for plastics, glass bottles, paper, and vinyl. Organic food waste must also be disposed of in special biodegradable bags."
        },
        q2: {
            question: "What steps do you personally take at home or at work to reduce waste and protect the environment?",
            kor: "[🚨 돌발 질문] (쓰레기를 줄이고 환경을 보호하기 위해 개인적으로 어떤 노력을 하나요?)",
            modelAnswer: "At home and in the lab, I try my best to minimize single-use plastics. I always carry a reusable stainless-steel water bottle and use canvas tote bags when grocery shopping instead of plastic bags."
        },
        q3: {
            question: "Tell me about a time when you experienced or heard about a problem related to recycling or environmental pollution.",
            kor: "[🚨 돌발 질문] (재활용이나 환경 오염과 관련된 겪거나 들었던 문제 경험에 대해 말해 주세요.)",
            modelAnswer: "During the pandemic, the volume of plastic delivery containers surged dramatically, causing recycling centers to overflow. Seeing pictures of plastic waste polluting oceans made me realize how urgent it is to switch to eco-friendly biodegradable packaging."
        }
    },
    {
        name: "스마트폰 & 기술 (Technology & Smartphones)",
        q1: {
            question: "People use smartphones for various tasks today. Describe what apps you use most frequently on your mobile device and why.",
            kor: "[🚨 돌발 질문] (스마트폰으로 주로 어떤 앱을 사용하며 그 이유는 무엇인가요?)",
            modelAnswer: "I use my smartphone for almost everything throughout the day. My most used apps are messaging apps for daily communication, mobile banking for quick transfers, and YouTube for watching tech tutorials and educational videos during commutes."
        },
        q2: {
            question: "How has smartphone technology changed the way people communicate and work compared to ten years ago?",
            kor: "[🚨 돌발 질문] (10년 전과 비교하여 스마트폰 기술이 일상 업무나 소통 방식을 어떻게 바꾸었나요?)",
            modelAnswer: "Ten years ago, people relied heavily on traditional phone calls or SMS text messages. Today, instant mobile messengers, video conferencing, and cloud storage allow seamless collaboration and instant sharing from anywhere in the world."
        },
        q3: {
            question: "Tell me about a memorable incident when your smartphone froze, broke, or ran out of battery at a critical moment.",
            kor: "[🚨 돌발 질문] (중요한 순간 스마트폰이 멈추거나 방전되었던 기억에 남는 사건에 대해 말해 주세요.)",
            modelAnswer: "Right before boarding a high-speed train last month, my mobile electronic ticket app froze and wouldn't load! I quickly restarted the phone while standing in line and fortunately opened the digital ticket just five seconds before the ticket barrier closed."
        }
    },
    {
        name: "은행 & 금융 (Banking & Finance)",
        q1: {
            question: "Describe a bank or financial institution you frequently visit or use online. What features make it convenient?",
            kor: "[🚨 돌발 질문] (자주 이용하는 은행이나 온라인 뱅킹에 대해 설명해 주세요. 어떤점이 편리한가요?)",
            modelAnswer: "I mainly use a digital mobile banking app. It allows biometric fingerprint login, instant zero-fee wire transfers, and real-time transaction alerts. I rarely have to physically visit a brick-and-mortar bank branch anymore."
        },
        q2: {
            question: "What is your typical process when doing banking tasks on your mobile phone or at an ATM?",
            kor: "[🚨 돌발 질문] (모바일 뱅킹이나 ATM기에서 금융 업무를 처리할 때의 과정은 어떤가요?)",
            modelAnswer: "For routine transfers, I log into the mobile app using face recognition, select the recipient account, and authenticate with a digital PIN code. The entire transfer process takes less than 15 seconds."
        },
        q3: {
            question: "Tell me about a memorable problem or security issue you experienced while using online banking or card payment.",
            kor: "[🚨 돌발 질문] (온라인 뱅킹이나 카드 결제 중 겪었던 기억에 남는 문제에 대해 말해 주세요.)",
            modelAnswer: "Once while paying online, my security card certificate expired unexpectedly in the middle of a purchase! I had to go through a identity verification process via SMS to issue a new cloud certificate before completing the order."
        }
    },

    {
        name: "명절 및 기념일 (Holidays & Celebrations)",
        q1: {
            question: "Describe the major traditional holidays in your country. What do people eat, and what traditional customs do families practice?",
            kor: "[🚨 돌발 질문] (우리나라의 대표 명절인 설날이나 추석에 대해 설명해 주세요. 어떤 음식을 먹고 어떤 전통 풍습을 행하나요?)",
            modelAnswer: "In Korea, the two grandest traditional holidays are Seollal, which is Lunar New Year, and Chuseok, the Korean Thanksgiving. During Chuseok, families gather from all across the country to celebrate the autumn harvest. We prepare a festive feast featuring Songpyeon, which are half-moon shaped rice cakes stuffed with sweet sesame, and conduct memorial ancestral rites called Charye."
        },
        q2: {
            question: "How have the ways people celebrate holidays in your country changed over the years compared to when you were young?",
            kor: "[🚨 돌발 질문] (어렸을 때와 비교하여 오늘날 명절을 보내는 방식이 어떻게 변화했나요?)",
            modelAnswer: "In the past, holidays were strictly about large extended family reunions, labor-intensive food preparation, and ancestral rituals. Nowadays, many modern families prefer simplified ceremonies, ordering pre-made feast food online, or using the long holiday weekend to travel abroad together for relaxation."
        },
        q3: {
            question: "Tell me about a memorable or special holiday experience you had with your family or friends in the past.",
            kor: "[🚨 돌발 질문] (과거 가족이나 친구들과 보냈던 특별하고 기억에 남는 명절 추억에 대해 이야기해 주세요.)",
            modelAnswer: "Two years ago during Chuseok, our entire family decided to break tradition and rent a private villa by the coast instead of staying home. We had a lively barbecue party under the full moon, played traditional folk board games with the children, and walked along the ocean beach. It was the most relaxing and harmonious holiday celebration we have ever experienced."
        }
    },

    {
        name: "약속 및 모임 (Appointments & Social Gatherings)",
        q1: {
            question: "Where do you usually meet up when making appointments with friends or colleagues? Describe the typical meeting spot.",
            kor: "[🚨 돌발 질문] (친구들이나 지인들과 약속을 잡을 때 주로 어디서 만나나요? 전형적인 약속 장소를 묘사해 주세요.)",
            modelAnswer: "When making plans with friends, we usually choose bustling transit hubs with easy subway access, such as Gangnam or Hongdae. These locations offer a rich variety of trendy cafes, international restaurants, and entertainment arcades within walking distance, making it convenient for everyone coming from different parts of the city."
        },
        q2: {
            question: "What is your typical process when planning a social gathering or appointment from picking a date to sending invitations?",
            kor: "[🚨 돌발 질문] (약속이나 모임을 계획할 때 날짜 선정부터 연락까지의 일반적인 과정은 어떤가요?)",
            modelAnswer: "We usually initiate a group chat on mobile messengers and use online scheduling polls to identify a date when everyone is free. Once the date is finalized, one of us researches popular restaurants with high online ratings and makes a table reservation in advance to guarantee a smooth, hassle-free evening."
        },
        q3: {
            question: "Tell me about a memorable time when an appointment was delayed, mixed up, or unexpectedly canceled at the last minute.",
            kor: "[🚨 돌발 질문] (약속이 늦어지거나 일정이 엉키거나 직전에 취소되었던 기억에 남는 경험에 대해 말해 주세요.)",
            modelAnswer: "Last month, I was supposed to meet a college friend at a popular Italian bistro. However, due to a sudden signal failure on Subway Line 2, my train was stuck underground for nearly forty minutes! I immediately notified my friend via mobile chat. Graciously, he waited for me at a nearby bookstore with a cup of coffee. When I finally arrived, I happily treated him to dinner to make up for the delay."
        }
    },

    {
        name: "대중교통 및 출퇴근 (Transportation & Commuting)",
        q1: {
            question: "Describe the public transportation system in your country. How convenient and accessible is it for daily commuters?",
            kor: "[🚨 돌발 질문] (우리나라의 대중교통 시스템에 대해 설명해 주세요. 통근자들에게 얼마나 편리한가요?)",
            modelAnswer: "Korea boasts one of the most efficient, clean, and punctual public transportation networks in the world. The metropolitan subway system covers extensive lines with heated seats in winter, air conditioning in summer, and digital arrival screens. Furthermore, the integrated transit transfer system offers free transfer discounts between buses and subways using a single smart transit card or smartphone."
        },
        q2: {
            question: "What is your typical daily commute from home to work or school? What do you usually do during your travel time?",
            kor: "[🚨 돌발 질문] (집에서 직장이나 학교까지의 일상적인 출퇴근 경로는 어떤가요? 이동 중에 주로 무엇을 하나요?)",
            modelAnswer: "My daily commute takes approximately forty minutes each way. I walk five minutes to the subway station, take the train for seven stops, and walk another five minutes to my office. During the train ride, I put on noise-canceling earbuds to listen to English news podcasts, read e-books, or review my daily work agenda."
        },
        q3: {
            question: "Tell me about a memorable challenge or incident you encountered while using public transportation, such as severe delays or lost items.",
            kor: "[🚨 돌발 질문] (대중교통을 이용하다가 겪었던 극심한 지연이나 분실물 등 기억에 남는 사건에 대해 말해 주세요.)",
            modelAnswer: "Once during a crowded morning rush hour, I accidentally left my leather briefcase containing my work tablet on the overhead luggage rack of the subway train! The moment the train doors closed, I panicked. I immediately ran to the station customer service center. The staff coordinated swiftly with the terminal station, and miraculously, my briefcase was recovered untouched within an hour. The honesty of the public transit system was astonishing."
        }
    },

    {
        name: "가구 및 생활용품 (Furniture & Living Essentials)",
        q1: {
            question: "What pieces of furniture do you have in your home? Describe the piece of furniture you use most and like best.",
            kor: "[🚨 돌발 질문] (집에 어떤 가구들이 있나요? 가장 자주 쓰고 좋아하는 가구를 자세히 묘사해 주세요.)",
            modelAnswer: "Our home is furnished with practical modern furniture, including an ergonomic sofa, a dining table, and wardrobe units. My favorite piece is my ergonomic mesh office chair. It has adjustable lumbar support, 4D armrests, and a flexible headrest that perfectly supports my spine during long hours of research and writing. It is the best investment I've ever made for my health."
        },
        q2: {
            question: "When you buy new furniture, what factors do you consider most important, and what is your shopping process?",
            kor: "[🚨 돌발 질문] (새 가구를 살 때 가장 중요하게 고려하는 요소는 무엇이며 구매 과정은 어떤가요?)",
            modelAnswer: "When purchasing furniture, durability and ergonomic functionality are my top priorities, followed closely by aesthetic design harmony. I usually research customer reviews and specifications online, and then visit offline showrooms to sit on the chairs or touch the materials firsthand before making a final purchase decision."
        },
        q3: {
            question: "Tell me about a memorable experience you had when purchasing, moving, or assembling a piece of furniture.",
            kor: "[🚨 돌발 질문] (가구를 새로 사거나 조립, 이사할 때 겪었던 기억에 남는 일화에 대해 말해 주세요.)",
            modelAnswer: "When I moved into my current apartment, I purchased a massive multi-tier wooden wardrobe. However, upon delivery, the delivery workers discovered that the wardrobe box was slightly too wide to fit into the building elevator! We had to carefully carry the heavy components up five flights of stairs by hand. It was an exhausting workout, but the wardrobe looks spectacular in my bedroom today."
        }
    },

    {
        name: "패션 및 옷차림 (Fashion & Clothing Styles)",
        q1: {
            question: "People wear different styles of clothing depending on the seasons. Describe what people in your country typically wear in summer and winter.",
            kor: "[🚨 돌발 질문] (계절에 따라 사람들의 옷차림이 다릅니다. 우리나라 사람들이 여름과 겨울에 주로 입는 스타일을 설명해 주세요.)",
            modelAnswer: "Because Korea experiences distinct climate extremes, seasonal fashion varies drastically. In humid summers, people opt for lightweight, breathable linen shirts, cool-touch cotton tees, and shorts. In freezing winters, virtually everyone wears long down-padded parkas, warm thermal underwear, cashmere turtlenecks, and woolen scarves to brave the sub-zero temperatures."
        },
        q2: {
            question: "What is your personal fashion style for work and for weekends? What accessories do you like to wear?",
            kor: "[🚨 돌발 질문] (본인의 평소 출근 복장과 주말 일상 패션 스타일은 어떠하며 어떤 악세서리를 착용하나요?)",
            modelAnswer: "For work, my style leans towards neat business casual. I typically wear well-fitted chinos, crisp collared shirts, and clean leather loafers. On weekends, I prioritize maximum comfort, wearing relaxed-fit hoodies, denim jeans, and running sneakers. My signature daily accessory is a minimalist analog wristwatch."
        },
        q3: {
            question: "Tell me about a time when you bought a piece of clothing that did not fit well or had a defect. How did you resolve the issue?",
            kor: "[🚨 돌발 질문] (사이즈가 맞지 않거나 하자가 있는 옷을 사서 곤란했던 경험과 어떻게 해결했는지 말해 주세요.)",
            modelAnswer: "I once ordered an expensive winter woolen coat from an online shopping mall. When the package arrived, the coat was two sizes too large, and one of the front buttons was hanging loose! I immediately initiated an online exchange request with photo evidence. The company arranged a pickup the next day and delivered a perfectly tailored replacement coat within three days."
        }
    },

    {
        name: "지형 및 자연환경 (Geography & Landscapes of Korea)",
        q1: {
            question: "Describe the geography and natural landscape of your country. What are the distinctive geographical features?",
            kor: "[🚨 돌발 질문] (우리나라의 지형과 자연환경을 설명해 주세요. 어떤 지리적 특징이 있나요?)",
            modelAnswer: "Korea is a peninsula surrounded by water on three sides, with roughly 70 percent of its landmass covered by picturesque mountains. The eastern region features steep mountain ranges like Seoraksan, while the western and southern coasts are characterized by gentle plains, scenic islands, and fertile valleys. This geographical diversity offers breathtaking scenery in every province."
        },
        q2: {
            question: "What outdoor recreational activities do people enjoy taking advantage of the geographical features in your country?",
            kor: "[🚨 돌발 질문] (사람들이 지형적 특성을 활용하여 즐기는 대표적인 야외 활동은 무엇인가요?)",
            modelAnswer: "Due to abundant mountains, mountain hiking is practically a national pastime in Korea. On weekends, trails are filled with hikers wearing colorful gear. In addition, people flock to the eastern coastal beaches for surfing and ocean camping in the summer, and ski resorts in the northern mountains in winter."
        },
        q3: {
            question: "Tell me about a memorable trip you took to a mountainous area or coastal region in your country. What did you see and do?",
            kor: "[🚨 돌발 질문] (우리나라의 산이나 바닷가로 떠났던 기억에 남는 여행 경험에 대해 말해 주세요.)",
            modelAnswer: "Last autumn, I hiked to the summit of Mount Halla on Jeju Island. The eight-hour trek was physically demanding, but hiking through the vibrant autumn foliage was exhilarating. When I finally reached the volcanic crater lake at the peak under the clear blue sky, the panoramic view above the clouds was so majestic that it took all my exhaustion away."
        }
    },

    {
        name: "호텔 및 숙박시설 (Hotels & Accommodations)",
        q1: {
            question: "When you travel, what kind of accommodations do you prefer staying in? Describe a hotel or resort you stayed in recently.",
            kor: "[🚨 돌발 질문] (여행 시 어떤 숙소를 선호하나요? 최근에 묵었던 호텔이나 리조트를 묘사해 주세요.)",
            modelAnswer: "When traveling, I prefer modern boutique hotels or oceanfront resorts that offer clean amenities and excellent accessibility. Recently, I stayed at a coastal hotel in Gangneung. The room featured an expansive balcony overlooking the East Sea, plush goose-down bedding, and a rooftop infinity pool that merged seamlessly with the ocean horizon."
        },
        q2: {
            question: "What facilities and services do you look for most when choosing a hotel or lodging for vacation?",
            kor: "[🚨 돌발 질문] (휴가를 위해 숙소를 고를 때 가장 중요하게 확인하는 부대시설이나 서비스는 무엇인가요?)",
            modelAnswer: "First and foremost, impeccable room cleanliness and soundproofing are non-negotiable for me. I also look for hotels that offer complimentary high-speed Wi-Fi, fitness centers, and a diverse breakfast buffet featuring both local and continental options. Reading verified guest reviews is my essential selection ritual."
        },
        q3: {
            question: "Tell me about an unexpected problem or inconvenience you experienced during a hotel stay and how the staff handled it.",
            kor: "[🚨 돌발 질문] (호텔에 묵는 동안 겪었던 뜻밖의 불편이나 문제, 그리고 직원의 대처에 대해 말해 주세요.)",
            modelAnswer: "During a summer getaway, the air conditioning unit in my hotel room started leaking water with a loud buzzing sound in the middle of the night! I contacted the front desk immediately. The duty manager arrived within ten minutes, apologized sincerely, and upgraded us to an executive suite on the top floor with complimentary breakfast vouchers. Their prompt and courteous service turned a frustrating glitch into five-star hospitality."
        }
    }
];

const ROLEPLAY_POOLS = [
    {
        name: "콘서트 티켓 예매 & 돌발 취소",
        q11: {
            question: "I'd like to give you a role-play scenario. You want to buy tickets for a live music concert. Call the ticket office and ask three or four questions to get information about the event.",
            kor: "[🎭 롤플레이 Q11] (콘서트 티켓을 예매하려고 합니다. 매표소에 전화해 3~4가지 질문을 하세요.)",
            modelAnswer: "Hi there! I'm calling to inquire about the upcoming concert tickets. First of all, are there still seats available for the Saturday show? Secondly, could you tell me how much the VIP section tickets cost? Also, is there any group discount available? Lastly, what is the refund policy in case I need to cancel my booking? Thank you!"
        },
        q12: {
            question: "There is a problem you need to solve. You bought concert tickets, but on the day of the show, a sudden emergency came up and you cannot attend. Call your friend, explain the situation, and offer two or three alternatives.",
            kor: "[🎭 롤플레이 Q12] (티켓을 샀는데 갑자기 급한 일이 생겨 갈 수 없게 되었습니다. 친구에게 전화해 상황을 설명하고 2~3가지 대안을 제시하세요.)",
            modelAnswer: "Hey Alex, it's DongHwa. Look, I'm really sorry, but something urgent came up at work, and I won't be able to make it to the concert tonight. Here's what we can do: First, why don't you take my ticket and invite your brother instead? Or second, I can transfer both tickets to next week's show if you'd prefer to go together then. Let me know what works best!"
        },
        q13: {
            question: "Have you ever experienced a situation where plans for an event or trip were unexpectedly changed or canceled? Tell me what happened from start to finish.",
            kor: "[🎭 롤플레이 Q13] (약속이나 계획이 갑자기 변경되거나 취소되었던 유사 경험에 대해 처음부터 끝까지 말해 주세요.)",
            modelAnswer: "Yes, I remember a time when a heavy rainstorm completely canceled our weekend camping trip. We had spent weeks preparing all the gear. Instead of getting disappointed, we turned it into an indoor movie marathon at my friend's house with hot pizza, having a fantastic time despite the weather."
        }
    },
    {
        name: "전자기기/노트북 구매 & 고장 대치",
        q11: {
            question: "You want to purchase a new laptop at an electronics store. Call the store employee and ask three or four detailed questions about the product specifications and warranty.",
            kor: "[🎭 롤플레이 Q11] (전자제품 매장에서 새 노트북을 사려고 합니다. 직원에게 전화해 사양과 보증에 대해 3~4가지 질문을 하세요.)",
            modelAnswer: "Hello, I'm calling to inquire about the latest ultrabook laptop advertised on your website. First, what is the RAM capacity and processor model? Second, how long does the battery last on a single charge? Also, does it come with a one-year warranty? Lastly, do you offer any free accessories upon purchase? Thanks!"
        },
        q12: {
            question: "You bought a new laptop, but after bringing it home, you discovered the screen is flickering and won't turn on. Call the service center, explain the defect, and suggest two solutions.",
            kor: "[🎭 롤플레이 Q12] (새 노트북을 샀는데 화면에 잔상이 생기고 켜지지 않습니다. 서비스 센터에 전화해 결함을 설명하고 2가지 해결책을 제안하세요.)",
            modelAnswer: "Hi, I just purchased a new laptop from your store two hours ago, but the screen is flickering constantly and went completely black! Here is what I propose: Can I bring it back to the store today for an immediate product replacement? Or if that model is out of stock, could you issue a full refund so I can select a different model? Please let me know."
        },
        q13: {
            question: "Tell me about a time when an electronic device or appliance broke down unexpectedly. What was the device, how did you handle the situation, and what was the outcome?",
            kor: "[🎭 롤플레이 Q13] (전자기기나 가전제품이 갑자기 고장 났던 실제 경험에 대해 말해 주세요.)",
            modelAnswer: "Last year right before a big project deadline, my laptop hard drive crashed without warning! Fortunately, I had backed up most files to cloud storage the night before. I took the laptop to an authorized repair shop, replaced the drive with a fast SSD, and restored my data within a day."
        }
    },
    {
        name: "호텔/숙소 예약 & 일정 변경 문의",
        q11: {
            question: "You are planning a vacation trip. Call a hotel receptionist and ask three or four questions about room availability, check-in time, and facilities.",
            kor: "[🎭 롤플레이 Q11] (휴가 여행을 위해 호텔에 전화해 객실 예약, 체크인 시간, 부대시설에 대해 3~4가지 질문을 하세요.)",
            modelAnswer: "Hello! I'm calling to check room availability for next weekend. Do you have an ocean-view double room available for two nights? Also, what is the exact check-in and check-out time? Is breakfast included in the room rate, and do you have free parking facilities for guests? Thank you!"
        },
        q12: {
            question: "You reserved a hotel room, but due to a scheduling emergency, you cannot check in on the reserved date. Call the hotel, explain your situation, and propose two solutions.",
            kor: "[🎭 롤플레이 Q12] (호텔을 예약했는데 일정이 생겨 당일 체크인을 할 수 없게 되었습니다. 호텔에 전화해 상황을 설명하고 2가지 해결책을 제시하세요.)",
            modelAnswer: "Hi, I have a reservation under the name DongHwa for tonight. I'm so sorry, but my flight was delayed due to severe weather, so I won't be able to check in today. Could you please postpone my reservation start date to tomorrow night instead? Or if full room changes aren't allowed, could you hold the room for late check-in tomorrow morning? Please help me out!"
        },
        q13: {
            question: "Tell me about a time when you experienced flight delays or hotel booking changes during a trip in the past.",
            kor: "[🎭 롤플레이 Q13] (과거 여행 중 비행기 지연이나 숙소 예약 변경으로 힘들었던 경험에 대해 말해 주세요.)",
            modelAnswer: "Two years ago, my flight home was delayed by eight hours due to dense fog. The airline provided us with food vouchers and lounge access while we waited. I used the extra time to read a book and chat with fellow travelers, turning a tedious delay into a restful afternoon."
        }
    },

    {
        name: "식당 예약 & 인원 변경 문의",
        q11: {
            question: "I'd like to give you a role-play scenario. You want to reserve a table for a family dinner at a famous Italian restaurant. Call the restaurant and ask three or four questions regarding reservation details, menu options, and parking.",
            kor: "[🎭 롤플레이 Q11] (유명 이탈리안 레스토랑에 가족 식사 예약을 하려고 합니다. 식당에 전화해 예약, 메뉴, 주차에 대해 3~4가지 질문을 하세요.)",
            modelAnswer: "Hello, good afternoon! I'd like to make a dinner reservation for next Saturday evening. First of all, do you have a private room or quiet table available for six adults at 7 PM? Secondly, do you offer any special family set menus or vegetarian options? Also, is valet parking available for guests? Lastly, do I need to pay a deposit for the reservation? Thank you so much!"
        },
        q12: {
            question: "There is a problem you need to solve. On the afternoon of the reservation, two family members suddenly caught the flu and cannot attend. Call the restaurant, explain the situation, and suggest two alternatives.",
            kor: "[🎭 롤플레이 Q12] (예약 당일 오후 가족 2명이 독감에 걸려 갈 수 없게 되었습니다. 식당에 전화해 상황을 설명하고 2가지 대안을 제시하세요.)",
            modelAnswer: "Hi, I have a reservation under the name DongHwa for six people tonight at 7 PM. I'm terribly sorry, but two of our family members suddenly came down with a high fever and cannot make it. Here is what I propose: First, would it be possible to reduce our party size from six to four people while keeping the reservation? Or second, if the private room requires a minimum party size, could you reschedule our entire booking to next Saturday instead? Please let me know what works best for your staff."
        },
        q13: {
            question: "Have you ever experienced a time when dining plans or party reservations had to be altered abruptly? Tell me what happened and how you handled the situation.",
            kor: "[🎭 롤플레이 Q13] (외식 약속이나 식당 예약이 갑자기 변경되어 곤란했던 실제 경험에 대해 이야기해 주세요.)",
            modelAnswer: "Last year during year-end holiday season, we booked a rooftop barbecue venue for our team celebration. However, a sudden torrential winter rainstorm struck on the event day! The outdoor terrace was closed due to safety concerns. We quickly negotiated with the venue manager to transfer our party to their indoor private lounge, enjoying great food and drinks in a cozy indoor setting."
        }
    },

    {
        name: "옷/신발 매장 구매 & 교환/환불 대안",
        q11: {
            question: "You are at a clothing boutique and want to purchase a stylish winter coat. Ask the store clerk three or four detailed questions about sizes, colors, material, and discounts.",
            kor: "[🎭 롤플레이 Q11] (옷 매장에서 겨울 코트를 사려고 합니다. 점원에게 사이즈, 색상, 소재, 할인에 대해 3~4가지 질문을 하세요.)",
            modelAnswer: "Excuse me, could you help me with this cashmere coat? First, do you have this design in a medium size? Second, does this coat come in charcoal grey or navy as well? Also, what is the exact wool-to-cashmere blend ratio of the fabric? Lastly, are there any promotional discounts or membership perks applied to this seasonal collection? Thanks!"
        },
        q12: {
            question: "You purchased the coat and brought it home, but you found a tear along the inner lining and the sleeves are too short. Call the store, explain the defects, and suggest two solutions.",
            kor: "[🎭 롤플레이 Q12] (코트를 샀는데 안감이 찢어져 있고 소매가 너무 짧습니다. 매장에 전화해 결함을 알리고 2가지 해결책을 제안하세요.)",
            modelAnswer: "Hello, I purchased a cashmere coat at your downtown branch just two hours ago, but upon inspecting it at home, I found a tear along the inner sleeve lining, and the sleeve length is noticeably uneven. Here are two solutions: Can I bring it back to the store this evening for an immediate exchange for a flawless coat in size Large? Or if that item is out of stock, could you process a full refund to my credit card? I have the receipt and original tags intact."
        },
        q13: {
            question: "Tell me about a real-life experience when an item of clothing or shoes you bought had a defect or didn't fit, and you had to return or exchange it.",
            kor: "[🎭 롤플레이 Q13] (구매한 옷이나 신발에 결함이 있거나 맞지 않아 교환/환불을 해야 했던 실제 경험을 말해 주세요.)",
            modelAnswer: "A few months ago, I bought running shoes online. When they arrived, the left shoe's air cushion was defective and squeaked loudly with every step! I immediately submitted an exchange request on the vendor's app with a short video clip. A courier picked up the defective pair the following day, and a brand-new replacement pair arrived within forty-eight hours. The prompt resolution made me trust the brand even more."
        }
    },

    {
        name: "렌터카 대여 & 차량 고장 대안",
        q11: {
            question: "You are planning a road trip during your vacation and want to rent a car. Call the car rental agency and ask three or four questions about car models, rental rates, and insurance coverage.",
            kor: "[🎭 롤플레이 Q11] (휴가 로드트립을 위해 렌터카 업체에 전화해 차종, 요금, 보험에 대해 3~4가지 질문을 하세요.)",
            modelAnswer: "Hi, I'm calling to inquire about renting a vehicle for a three-day weekend trip. First, do you have a mid-size SUV or hybrid sedan available starting this Friday morning? Second, what is the total rental cost including unlimited mileage? Also, what does your comprehensive zero-deductible insurance cover? Lastly, can I drop off the vehicle at a different branch near the train station? Thank you!"
        },
        q12: {
            question: "While driving the rented car on a highway, an engine warning light turns on and you hear an abnormal rattling noise. Call the rental agency customer service, describe the issue, and demand two solutions.",
            kor: "[🎭 롤플레이 Q12] (렌터카를 몰고 가던 중 엔진 경고등이 켜지고 덜컹거리는 소음이 납니다. 고객센터에 전화해 상황을 설명하고 2가지 대안을 요구하세요.)",
            modelAnswer: "Hello, this is DongHwa renting vehicle license plate number 1234. I'm currently pulled over at a rest stop on the highway because the engine check light suddenly started flashing, and there's a loud metallic rattling noise coming from the front hood! Here is what we need to do immediately: First, can you dispatch emergency roadside assistance with a replacement vehicle to my location right away? Or second, if that takes too long, can you arrange a taxi to the nearest city and book a replacement car at your local branch? Please treat this as urgent."
        },
        q13: {
            question: "Tell me about a memorable trouble or unexpected incident you experienced while driving or traveling in a car.",
            kor: "[🎭 롤플레이 Q13] (운전 중이나 자동차 여행 중 겪었던 기억에 남는 문제나 돌발 사건에 대해 말해 주세요.)",
            modelAnswer: "A couple of years ago while driving to the coast, my car suffered a sudden tire blowout on a rainy highway! The steering wheel shook violently, but I managed to pull over safely to the shoulder. I put on hazard lights, set up an emergency warning triangle, and called my insurance emergency dispatch. They arrived within twenty minutes and swapped the flat tire with a spare. It was a terrifying moment, but staying calm kept me safe."
        }
    },

    {
        name: "부동산 아파트 렌트 문의 & 시설 하자 보수 요청",
        q11: {
            question: "You are looking for a new apartment to rent. Call a real estate agent and ask three or four questions about available rental units, monthly maintenance fees, and neighborhood amenities.",
            kor: "[🎭 롤플레이 Q11] (새 아파트 임대를 위해 부동산 중개인에게 전화해 매물, 관리비, 주변 환경에 대해 3~4가지 질문을 하세요.)",
            modelAnswer: "Hello, I saw your online listing for studio apartments near the station. First, are there any furnished units available for immediate move-in? Second, how much is the security deposit and average monthly maintenance fee? Also, is parking included in the rent? Lastly, what are the nearby amenities like grocery stores and subway exits? I'd love to schedule an in-person viewing tomorrow."
        },
        q12: {
            question: "You moved into the new apartment, but on your second day, the heating system stopped working and the bathroom drain is completely clogged. Call the property manager, report the urgent problems, and propose two solutions.",
            kor: "[🎭 롤플레이 Q12] (입주 이틀 차에 난방이 꺼지고 배수구가 막혔습니다. 집주인/관리인에게 전화해 하자를 알리고 2가지 대안을 제시하세요.)",
            modelAnswer: "Hi, this is DongHwa in apartment unit 402. I moved in just two days ago, but the boiler broke down completely in this freezing weather, and the bathroom drain is severely clogged with standing water! Here is what we must do: First, could you please send an emergency plumber and heating technician over this afternoon to fix both issues? Or second, if your regular contractor isn't available today, can I hire an emergency local repairman myself and deduct the repair costs from next month's rent? Please let me know immediately."
        },
        q13: {
            question: "Have you ever experienced a sudden breakdown of facilities or appliances in your living space? Tell me what happened and how the issue was resolved.",
            kor: "[🎭 롤플레이 Q13] (주거 공간에서 배관이나 보일러, 가전이 고장 나 곤란했던 실제 경험에 대해 말해 주세요.)",
            modelAnswer: "During the peak of summer heat last July, the air conditioner in my living room suddenly began blowing hot air! The indoor temperature skyrocketed to over thirty degrees. I called customer service, but all repair technicians were fully booked for a week. Fortunately, a friendly local contractor came by the next morning and refilled the refrigerant gas, restoring crisp, cool air. It taught me to always service cooling systems before summer begins."
        }
    },

    {
        name: "친구에게 장비 빌리기 & 파손 후 보상 대안",
        q11: {
            question: "You have an important trip coming up and want to borrow a high-end digital camera from your friend. Call your friend and ask three or four questions about operating the camera, lenses, and battery life.",
            kor: "[🎭 롤플레이 Q11] (여행을 위해 친구의 고급 디지털 카메라를 빌리려고 합니다. 친구에게 전화해 사용법, 렌즈, 배터리에 대해 3~4가지 질문을 하세요.)",
            modelAnswer: "Hey Chris! How have you been? Listen, I'm heading on a road trip next week and I was wondering if I could borrow your mirrorless camera. First of all, would that be okay with you? Second, how many extra batteries do you have? Also, does it come with a versatile zoom lens suitable for landscape photos? Lastly, do you have a spare high-speed SD memory card I could borrow as well? I promise to take extraordinary care of it!"
        },
        q12: {
            question: "While traveling, you accidentally dropped the borrowed camera on a rocky path, cracking the camera lens. Call your friend, explain the unfortunate accident, apologize sincerely, and offer two compensation solutions.",
            kor: "[🎭 롤플레이 Q12] (여행 중 실수로 빌린 카메라를 떨어뜨려 렌즈가 깨졌습니다. 친구에게 전화해 진심으로 사과하고 2가지 보상 대안을 제시하세요.)",
            modelAnswer: "Hey Chris, it's DongHwa. Look, I feel absolutely terrible, but an unfortunate accident happened earlier today. While taking landscape photos, the camera strap slipped and the camera fell onto a rock, cracking the front lens element! I am so deeply sorry. Here is how I will make this right: First, I can bring it straight to the official manufacturer service center as soon as I return and cover 100% of the repair costs. Or second, if the lens cannot be repaired to factory standard, I will buy you a brand-new authentic replacement lens immediately. Please let me know which option you prefer."
        },
        q13: {
            question: "Tell me about a time when you damaged or lost an item belonging to someone else, or vice versa. How was the situation resolved?",
            kor: "[🎭 롤플레이 Q13] (타인의 물건을 잃어버리거나 파손시켰던, 혹은 반대의 경우를 겪었던 실제 경험에 대해 말해 주세요.)",
            modelAnswer: "Back in college, I borrowed a rare, out-of-print economics textbook from my senior classmate. While studying at a cafe, a cup of green tea spilled and stained several pages! I felt so guilty that I spent the whole evening searching second-hand bookstores online. I finally found a pristine collector's copy and presented it to him alongside his favorite coffee beans with a handwritten apology note. He appreciated my sincerity, and we became even closer friends."
        }
    }
];

const ADVANCED_ISSUE_POOLS = [
    {
        name: "미디어 기술 트렌드 변화 & 저작권 이슈",
        q14: {
            question: "How has technology changed the way people listen to music or watch movies compared to ten or fifteen years ago? Discuss the major differences.",
            kor: "[🔥 고난도 Q14] (10~15년 전과 비교하여 기술이 음악 감상이나 영화 관람 방식을 어떻게 바꾸었는지 비교해 보세요.)",
            modelAnswer: "Technology has fundamentally transformed how we consume media over the past decade. In the past, people used to buy physical CDs or download MP3 files. Today, streaming services like Spotify and Netflix allow us to access millions of songs and movies instantly anywhere on our smartphones."
        },
        q15: {
            question: "What are some current social concerns or copyright issues related to online streaming platforms or digital content sharing today?",
            kor: "[🔥 고난도 Q15] (오늘날 온라인 스트리밍이나 디지털 콘텐츠 공유와 관련된 주요 사회적 관심사나 저작권 이슈는 무엇인가요?)",
            modelAnswer: "One of the major issues today is fair royalty distribution for digital creators and protecting intellectual property from illegal piracy. As AI-generated music and video content flood streaming platforms, ensuring proper copyright attribution has become a hot topic of debate."
        }
    },
    {
        name: "환경 지속 가능성 & 기후 변화 대응",
        q14: {
            question: "Compare the public awareness regarding environmental pollution and recycling today with that of the past. How have people's habits changed?",
            kor: "[🔥 고난도 Q14] (과거와 비교하여 오늘날 환경 오염 및 재활용에 대한 대중의 인식이 어떻게 변했는지 비교하세요.)",
            modelAnswer: "In the past, environmental recycling was often seen as a minor chore. However, today due to severe climate change and extreme weather events, people are much more eco-conscious. Recycling, reducing plastic consumption, and supporting eco-friendly brands have become an essential lifestyle standard."
        },
        q15: {
            question: "What are the current challenges or controversies governments and companies face when transitioning toward renewable energy and carbon neutrality?",
            kor: "[🔥 고난도 Q15] (정부나 기업이 신재생 에너지 전환 및 탄소 중립을 추진할 때 직면하는 주요 도전 과제나 쟁점은 무엇인가요?)",
            modelAnswer: "The biggest challenge is balancing the economic cost of building renewable infrastructure like solar and wind farms with maintaining grid stability. Additionally, industries face temporary financial strains while upgrading to zero-emission production standards."
        }
    },

    {
        name: "인공지능(AI) 혁신과 미래 일자리 패러다임 변화",
        q14: {
            question: "Compare how people worked in office environments ten or fifteen years ago with how people work today utilizing cutting-edge AI and digital automation tools. What are the key differences?",
            kor: "[🔥 고난도 Q14] (10~15년 전의 사무 환경과 비교하여 오늘날 AI와 자동화 도구를 활용하는 업무 환경이 어떻게 달라졌는지 비교해 보세요.)",
            modelAnswer: "A decade ago, white-collar workers spent countless hours manually sorting through spreadsheets, drafting formal emails, and conducting tedious document searches. Today, generative AI tools and intelligent cloud automation have revolutionized workplace productivity. Workers can now summarize lengthy research papers, generate presentation outlines, and analyze vast datasets in mere seconds, shifting the human focus from routine administrative tasks to creative strategic decision-making."
        },
        q15: {
            question: "What are some of the primary concerns, ethical controversies, or societal challenges surrounding the rapid adoption of artificial intelligence in the modern workforce?",
            kor: "[🔥 고난도 Q15] (현대 노동 시장에서 인공지능의 급속한 도입으로 인해 제기되는 주요 우려, 윤리적 논란 또는 사회적 과제는 무엇인가요?)",
            modelAnswer: "The paramount social concern is technological unemployment, as AI automation threatens to displace entry-level cognitive roles across industries like customer service, software coding, and creative copywriting. Furthermore, ethical controversies regarding algorithmic bias, digital copyright infringement, and data privacy remain hotly debated. To mitigate these disruptions, governments and academic institutions must urgently overhaul educational curriculums to retrain workers for human-AI collaborative skills."
        }
    },

    {
        name: "부동산 시장 변화 & 청년층 주거 환경 문제",
        q14: {
            question: "How have the living arrangements and housing preferences of young adults today changed compared to the previous generation? Discuss the notable differences.",
            kor: "[🔥 고난도 Q14] (기성세대와 비교하여 오늘날 청년들의 주거 형태나 선호도가 어떻게 변화했는지 비교해 보세요.)",
            modelAnswer: "In the past generation, traditional nuclear families prioritized purchasing permanent single-family homes or large suburban apartments as primary lifelong investments. In contrast, today's young generation, driven by rising single-person households and soaring real estate prices, prefers living in compact, convenient studio apartments or shared co-living spaces located close to downtown subway stations, prioritizing immediate lifestyle mobility over property ownership."
        },
        q15: {
            question: "What are the significant social challenges associated with soaring housing prices and rental burdens in major metropolitan cities, and what solutions are being discussed?",
            kor: "[🔥 고난도 Q15] (대도시의 가파른 집값 상승과 높은 임대료 부담으로 인한 사회적 문제점과 어떤 해결책들이 논의되고 있나요?)",
            modelAnswer: "Skyrocketing urban housing prices have created severe social inequality, preventing young professionals from accumulating wealth and contributing to record-low marriage and birth rates. As housing cost burdens escalate, societal debate centers on increasing public rental housing supplies, expanding low-interest mortgage subsidies for first-time buyers, and incentivizing corporate decentralization to develop balanced regional economies outside capital areas."
        }
    },

    {
        name: "현대인의 건강 관리 트렌드 & 웰니스 라이프스타일",
        q14: {
            question: "Compare the public's awareness and habits regarding physical fitness and dietary health today with that of the past. How has health management evolved?",
            kor: "[🔥 고난도 Q14] (과거와 비교하여 오늘날 신체 건강과 식단 관리에 대한 대중의 인식과 습관이 어떻게 진화했는지 비교하세요.)",
            modelAnswer: "In previous decades, health management was often reactive, focusing simply on curing illnesses at hospitals when symptoms appeared. Today, there is a seismic cultural shift toward proactive preventive wellness. People rigorously track their daily steps and sleep quality using smartwatches, participate in high-intensity functional training, and consciously consume low-sugar, plant-based, and protein-enriched organic diets."
        },
        q15: {
            question: "Despite widespread interest in wellness, what are the modern health issues or psychological stresses people face today, and how should society address them?",
            kor: "[🔥 고난도 Q15] (웰빙에 대한 관심에도 불구하고 현대인들이 겪는 건강 문제나 심리적 스트레스는 무엇이며 어떻게 대처해야 할까요?)",
            modelAnswer: "Ironically, despite fitness booms, modern professionals suffer from chronic mental health crises, including digital burnout, sleep deprivation, and psychological anxiety exacerbated by constant social media comparisons. Moreover, sedentary desk lifestyles lead to severe postural and metabolic syndromes. Society must foster supportive workplace cultures that respect work-life boundaries, encourage digital detoxes, and provide accessible community mental health counseling."
        }
    },

    {
        name: "친환경 모빌리티 혁신 & 도시 교통 문제",
        q14: {
            question: "How have urban transportation systems and personal mobility options changed over the past decade? Compare how commuters travel today versus the past.",
            kor: "[🔥 고난도 Q14] (지난 10년 동안 도시 교통망과 개인 이동 수단이 어떻게 변했는지 과거와 현재의 통근 방식을 비교해 보세요.)",
            modelAnswer: "A decade ago, urban commuting was overwhelmingly divided between traditional gasoline automobiles and fixed public buses or subways. Today, the urban mobility ecosystem is vastly diversified. Commuters seamlessly integrate shared electric scooters, app-based public bicycles, and ride-hailing services for last-mile transit, while electric and hybrid vehicles have become commonplace on metropolitan streets."
        },
        q15: {
            question: "What conflicts, safety controversies, or infrastructure challenges have emerged with the proliferation of electric vehicles and shared micro-mobility devices?",
            kor: "[🔥 고난도 Q15] (전기차와 공유 전동킥보드 등 신규 모빌리티의 확산으로 어떤 안전 논란이나 인프라 갈등이 발생하고 있나요?)",
            modelAnswer: "The rapid expansion of electric scooters has ignited severe pedestrian safety controversies due to careless sidewalk riding and haphazard parking that clutters sidewalks. Simultaneously, the surge in electric vehicles has exposed shortages in fast-charging infrastructure, battery fire safety concerns, and ethical dilemmas regarding lithium mining supply chains. Municipalities must urgently enact designated parking zones, enforce helmet regulations, and upgrade grid infrastructure to ensure safe coexistence."
        }
    },

    {
        name: "커피 산업 트렌드 변화 & 카페 일회용품/자영업 이슈",
        q14: {
            question: "How has the coffee culture and coffee shop industry changed over the past decade compared to the past? Discuss the notable differences in consumer habits and cafe concepts.",
            kor: "[🔥 고난도 Q14] (과거와 비교하여 지난 10년 동안 커피 문화와 카페 산업이 어떻게 변화했는지 소비자 습관과 카페 트렌드의 차이점을 비교해 보세요.)",
            modelAnswer: "A decade or two ago, coffee consumption was largely dominated by convenient instant coffee mixes or commercial franchises offering standard drip coffee. Today, consumer tastes have matured remarkably. People actively seek out premium single-origin beans, cold brews, and specialized brewing methods like pour-over. Furthermore, cafes have evolved from simple beverage vendors into all-in-one lifestyle spaces where people study, work remotely, and hold casual business meetings. The sheer explosion of high-end boutique roasteries reflects this elevated cultural appreciation for specialty coffee."
        },
        q15: {
            question: "What are some of the current environmental challenges, government regulations, or economic issues that coffee shops and consumers are facing today?",
            kor: "[🔥 고난도 Q15] (오늘날 커피숍과 소비자들이 직면하고 있는 환경 규제, 일회용품 문제 또는 자영업 경제적 이슈는 무엇인가요?)",
            modelAnswer: "One of the most pressing challenges today revolves around environmental sustainability. With millions of takeout coffees sold daily, the disposal of single-use plastic cups and straws has created severe environmental strain. In response, governments have introduced strict regulations banning single-use plastics for dine-in customers and encouraging reusable tumblers. On top of that, cafe owners face intense market saturation, soaring coffee bean import costs, and skyrocketing commercial rents, leading to fierce competition and tightening profit margins across the industry."
        }
    }
];

// Application State Controller
class OpicSimulatorApp {
    constructor() {
        this.currentQuestionIndex = 0;
        this.activeExamPaper = []; // Dynamic 15 Questions Test Paper
        this.evaluations = []; // Stores scores for each question
        
        // Comprehensive 15 Questions Answer & Recording Storage
        this.questionAnswers = Array(15).fill(null).map((_, i) => ({
            questionIndex: i,
            audioBlob: null,
            audioUrl: null,
            duration: 0,
            transcript: "",
            evaluation: null
        }));

        this.selectedGrade = "AL";
        this.selectedLevel = "5-5";
        this.isRecording = false;
        this.recognition = null;
        this.recordedText = "";
        
        // MediaRecorder for Audio File Capture
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.audioBlob = null;
        this.audioUrl = null;

        // Timers
        this.totalTimerInterval = null;
        this.totalSecondsLeft = 40 * 60; // 40 minutes
        this.responseTimerInterval = null;
        this.responseSeconds = 0;

        // UI DOM Elements
        this.ui = {
            navBtns: document.querySelectorAll('.nav-btn'),
            sections: document.querySelectorAll('.view-section'),
            startTestBtn: document.getElementById('start-test-btn'),
            
            // Sim Elements
            qNumber: document.getElementById('q-number'),
            totalTimer: document.getElementById('total-timer'),
            qCategory: document.getElementById('q-category'),
            qTag: document.getElementById('q-tag'),
            questionText: document.getElementById('question-text'),
            questionKor: document.getElementById('question-kor'),
            modelText: document.getElementById('model-text'),
            
            listenQBtn: document.getElementById('listen-q-btn'),
            nextQBtn: document.getElementById('next-q-btn'),
            micToggleBtn: document.getElementById('mic-toggle-btn'),
            evalAnswerBtn: document.getElementById('eval-answer-btn'),
            
            transcriptInput: document.getElementById('live-transcript-input'),
            audioPlaybackBox: document.getElementById('audio-playback-box'),
            voiceAudioPlayer: document.getElementById('voice-audio-player'),
            downloadAudioBtn: document.getElementById('download-audio-btn'),

            recIndicator: document.getElementById('rec-indicator'),
            recStatusText: document.getElementById('rec-status-text'),
            responseTimer: document.getElementById('response-timer'),
            evaWave: document.getElementById('eva-wave'),
            
            // Real-Time 4-Dimensional Feedback Drawer
            feedbackDrawer: document.getElementById('ai-feedback-drawer'),
            estGrade: document.getElementById('est-grade'),
            barVolume: document.getElementById('bar-volume'),
            fbVolume: document.getElementById('fb-volume'),
            barVocab: document.getElementById('bar-vocab'),
            fbVocab: document.getElementById('fb-vocab'),
            barTense: document.getElementById('bar-tense'),
            fbTense: document.getElementById('fb-tense'),
            barFluency: document.getElementById('bar-fluency'),
            fbFluency: document.getElementById('fb-fluency'),
            
            // Final Report Stats
            finalGradeText: document.getElementById('final-grade-text'),
            finalGradeSub: document.getElementById('final-grade-sub'),
            statVolume: document.getElementById('stat-volume'),
            statVocab: document.getElementById('stat-vocab'),
            statPast: document.getElementById('stat-past'),
            statFiller: document.getElementById('stat-filler'),

            // 15-Question Recordings Archive UI
            downloadAllZipBtn: document.getElementById('download-all-zip-btn'),
            downloadAllTxtBtn: document.getElementById('download-all-txt-btn'),
            recCompletedCount: document.getElementById('rec-completed-count'),
            recTotalDuration: document.getElementById('rec-total-duration'),
            recTotalWords: document.getElementById('rec-total-words'),
            archiveListContainer: document.getElementById('archive-list-container'),

            // TTS Voice, Rate, Volume & Progress Bar UI
            ttsVoiceSelect: document.getElementById('tts-voice-select'),
            ttsRateSelect: document.getElementById('tts-rate-select'),
            ttsVolumeSlider: document.getElementById('tts-volume-slider'),
            ttsVolText: document.getElementById('tts-vol-text'),
            ttsMuteBtn: document.getElementById('tts-mute-btn'),
            muteIcon: document.getElementById('mute-icon'),
            timerProgressFill: document.getElementById('timer-progress-fill'),
            timerZoneLabel: document.getElementById('timer-zone-label'),
            fillerCountNum: document.getElementById('filler-count-num'),

            // Mobile Dedicated Sticky Bar Elements
            mobileStickyBar: document.getElementById('mobile-sticky-bar'),
            mobileListenBtn: document.getElementById('mobile-listen-btn'),
            mobileMicBtn: document.getElementById('mobile-mic-btn'),
            mobileTimerDisplay: document.getElementById('mobile-timer-display'),
            mobileEvalBtn: document.getElementById('mobile-eval-btn'),
            mobileNextBtn: document.getElementById('mobile-next-btn'),

            // v8.0 실전 시험 모드, 서베이 카운터 & 난이도 재조정 인터미션 UI
            surveyCountPill: document.getElementById('survey-count-pill'),
            surveyCheckedCount: document.getElementById('survey-checked-count'),
            presetSurveyBtn: document.getElementById('preset-survey-btn'),
            realExamModeToggle: document.getElementById('real-exam-mode-toggle'),
            realExamBlindOverlay: document.getElementById('real-exam-blind-overlay'),
            revealQuestionBtn: document.getElementById('reveal-question-btn'),
            listenBtnLabel: document.getElementById('listen-btn-label'),
            difficultyModal: document.getElementById('difficulty-modal'),
            diffMaintainBtn: document.getElementById('diff-maintain-btn'),
            diffUpgradeBtn: document.getElementById('diff-upgrade-btn'),
            modalEvaWave: document.getElementById('modal-eva-wave')
        };

        this.ttsVolume = 0.3; // Default 30% quiet & comfortable volume
        this.ttsRate = 0.95;
        this.selectedVoiceURI = 'auto';
        this.availableVoices = [];
        this.isMuted = false;

        // v8.0 실전 시험 모드 & 인터미션 상태
        this.realExamMode = true;
        this.replayCount = 0;
        this.questionRevealed = false;
        this.difficultyReassessed = false;

        this.init();
    }

    init() {
        this.bindEvents();
        this.initSpeechRecognition();
        this.initVoices();
        this.initRealExamMode();
        this.updateSurveyCounter();
    }

    bindEvents() {
        // TTS Voice Selector Change
        if (this.ui.ttsVoiceSelect) {
            this.ui.ttsVoiceSelect.addEventListener('change', () => {
                this.selectedVoiceURI = this.ui.ttsVoiceSelect.value;
                if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
                    this.speakQuestion();
                }
            });
        }

        // TTS Speed / Rate Selector Change
        if (this.ui.ttsRateSelect) {
            this.ui.ttsRateSelect.addEventListener('change', () => {
                this.ttsRate = parseFloat(this.ui.ttsRateSelect.value) || 0.95;
                if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
                    this.speakQuestion();
                }
            });
        }

        // [1안] TTS Volume Slider Listener (Real-Time Mid-Speech Volume Update)
        if (this.ui.ttsVolumeSlider) {
            let volumeDebounce = null;
            this.ui.ttsVolumeSlider.addEventListener('input', () => {
                const val = parseInt(this.ui.ttsVolumeSlider.value);
                this.ttsVolume = val / 100;
                if (this.ui.ttsVolText) {
                    this.ui.ttsVolText.textContent = `${val}%`;
                }
                if (val === 0) {
                    this.isMuted = true;
                    if (this.ui.muteIcon) this.ui.muteIcon.className = "fa-solid fa-volume-xmark text-red";
                } else {
                    this.isMuted = false;
                    if (this.ui.muteIcon) this.ui.muteIcon.className = "fa-solid fa-volume-high text-blue";
                }

                // Debounce mid-speech restart so dragging slider doesn't machine-gun stutter
                if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
                    clearTimeout(volumeDebounce);
                    volumeDebounce = setTimeout(() => {
                        this.speakQuestion();
                    }, 250);
                }
            });
        }

        // [1안] TTS Mute Toggle Button
        if (this.ui.ttsMuteBtn) {
            this.ui.ttsMuteBtn.addEventListener('click', () => {
                this.isMuted = !this.isMuted;
                if (this.isMuted) {
                    if (this.ui.muteIcon) this.ui.muteIcon.className = "fa-solid fa-volume-xmark text-red";
                    if (this.ui.ttsMuteBtn) this.ui.ttsMuteBtn.classList.add('muted');
                    if (this.ui.ttsVolText) this.ui.ttsVolText.textContent = "0% (음소거)";
                } else {
                    if (this.ui.muteIcon) this.ui.muteIcon.className = "fa-solid fa-volume-high text-blue";
                    if (this.ui.ttsMuteBtn) this.ui.ttsMuteBtn.classList.remove('muted');
                    const val = Math.round(this.ttsVolume * 100);
                    if (this.ui.ttsVolText) this.ui.ttsVolText.textContent = `${val}%`;
                }

                // If TTS is currently speaking, update speech state immediately!
                if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
                    this.speakQuestion();
                }
            });
        }
        // Navigation Tab Switching
        this.ui.navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let targetId = btn.id.replace('nav-', '') + '-section';
                if (targetId === 'sim-section') targetId = 'simulator-section';

                if (targetId === 'stats-section') {
                    if (this.isRecording) this.stopRecording();
                    this.saveCurrentAnswer();
                    this.renderFinalReport();
                } else if (targetId === 'simulator-section') {
                    // Auto-initialize exam paper if not yet generated
                    if (!this.activeExamPaper || this.activeExamPaper.length === 0) {
                        this.generateRandomExamPaper();
                        this.loadQuestion(0);
                        this.startTotalTimer();
                    }
                }
                this.switchSection(targetId, btn);
            });
        });

        // Survey Radio Option Select (Safe Change Event on input)
        document.querySelectorAll('.survey-radio input').forEach(input => {
            input.addEventListener('change', () => {
                const groupName = input.name;
                document.querySelectorAll(`input[name="${groupName}"]`).forEach(inp => {
                    inp.parentElement.classList.toggle('checked', inp.checked);
                });
            });
        });

        // Level Select
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedLevel = btn.dataset.level;
            });
        });

        // Topic Checkbox Toggle (Safe Change Event on input)
        document.querySelectorAll('.topic-checkbox').forEach(cb => {
            const input = cb.querySelector('input');
            if (input) {
                input.addEventListener('change', () => {
                    cb.classList.toggle('checked', input.checked);
                    this.updateSurveyCounter();
                });
            }
        });

        // v8.0 AL/IH 전략 조합 1클릭 자동 세팅 버튼
        if (this.ui.presetSurveyBtn) {
            this.ui.presetSurveyBtn.addEventListener('click', () => {
                this.applyALPresetSurvey();
            });
        }

        // v8.0 실전 시험 모드 (Blind Mask) 토글
        if (this.ui.realExamModeToggle) {
            this.ui.realExamModeToggle.addEventListener('change', () => {
                this.realExamMode = this.ui.realExamModeToggle.checked;
                this.updateRealExamOverlay();
                this.updateListenButtonUI();
            });
        }

        // v8.0 질문 텍스트 살짝 확인하기 버튼
        if (this.ui.revealQuestionBtn) {
            this.ui.revealQuestionBtn.addEventListener('click', () => {
                this.questionRevealed = true;
                this.updateRealExamOverlay();
            });
        }

        // v8.0 7번 문항 직후 난이도 재조정 모달 버튼 (5-5 유지 vs 5-6 상향)
        if (this.ui.diffMaintainBtn) {
            this.ui.diffMaintainBtn.addEventListener('click', () => {
                this.difficultyReassessed = true;
                if (this.ui.difficultyModal) this.ui.difficultyModal.classList.add('hidden');
                this.loadQuestion(7);
            });
        }

        if (this.ui.diffUpgradeBtn) {
            this.ui.diffUpgradeBtn.addEventListener('click', () => {
                this.difficultyReassessed = true;
                this.selectedLevel = "5-6";
                if (this.ui.difficultyModal) this.ui.difficultyModal.classList.add('hidden');
                this.loadQuestion(7);
            });
        }

        // Editable Transcript Area Text Change
        if (this.ui.transcriptInput) {
            this.ui.transcriptInput.addEventListener('input', () => {
                const val = this.ui.transcriptInput.value.trim();
                this.ui.evalAnswerBtn.disabled = (val.length === 0);
                if (this.ui.mobileEvalBtn) this.ui.mobileEvalBtn.disabled = (val.length === 0);
                this.updateFillerCounter(val);
                if (this.questionAnswers[this.currentQuestionIndex]) {
                    this.questionAnswers[this.currentQuestionIndex].transcript = val;
                }
            });
        }

        // Start Test Button (100% Dynamic Randomizer with Zero Bias!)
        this.ui.startTestBtn.addEventListener('click', () => {
            this.generateRandomExamPaper();
            this.evaluations = []; // Clear previous evaluations
            this.difficultyReassessed = false; // Reset intermission flag
            this.questionAnswers = Array(15).fill(null).map((_, i) => ({
                questionIndex: i,
                audioBlob: null,
                audioUrl: null,
                duration: 0,
                transcript: "",
                evaluation: null
            }));
            this.switchSection('simulator-section', document.getElementById('nav-sim'));
            this.startTotalTimer();
            
            // Unlock Chrome Web Speech Synthesis user activation
            if ('speechSynthesis' in window) {
                try { window.speechSynthesis.resume(); } catch(e) {}
            }
            
            this.loadQuestion(0);
        });

        // Question TTS Play (1/1 회 실전 규정 적용)
        this.ui.listenQBtn.addEventListener('click', () => {
            this.handleReplayQuestion();
        });

        // Next Question Button - Auto-Save and commit answer
        const handleNextQuestion = () => {
            if (this.isRecording) {
                this.stopRecording();
            }
            this.saveCurrentAnswer();

            // 7번 문항(인덱스 6) 완료 직후 실전 난이도 재조정 인터미션 모달 호출
            if (this.currentQuestionIndex === 6 && !this.difficultyReassessed) {
                this.showDifficultyModal();
                return;
            }

            if (this.currentQuestionIndex < this.activeExamPaper.length - 1) {
                this.loadQuestion(this.currentQuestionIndex + 1);
            } else {
                this.renderFinalReport();
                this.switchSection('stats-section', document.getElementById('nav-stats'));
            }
        };

        this.ui.nextQBtn.addEventListener('click', handleNextQuestion);

        // Mic Record Toggle Button
        this.ui.micToggleBtn.addEventListener('click', () => {
            this.toggleRecording();
        });

        // Evaluate Answer Button
        this.ui.evalAnswerBtn.addEventListener('click', () => {
            this.evaluateUserAnswer();
        });

        // Mobile Dedicated Sticky Bar Action Handlers
        if (this.ui.mobileListenBtn) {
            this.ui.mobileListenBtn.addEventListener('click', () => {
                this.handleReplayQuestion();
            });
        }
        if (this.ui.mobileMicBtn) {
            this.ui.mobileMicBtn.addEventListener('click', () => {
                this.toggleRecording();
            });
        }
        if (this.ui.mobileEvalBtn) {
            this.ui.mobileEvalBtn.addEventListener('click', () => {
                this.evaluateUserAnswer();
            });
        }
        if (this.ui.mobileNextBtn) {
            this.ui.mobileNextBtn.addEventListener('click', handleNextQuestion);
        }

        // PC Keyboard Shortcuts (Space: Rec/Stop, R: Replay, N: Next Question)
        window.addEventListener('keydown', (e) => {
            // Only operate when simulator-section is active
            const simSec = document.getElementById('simulator-section');
            if (!simSec || !simSec.classList.contains('active')) return;

            // Do not trigger shortcuts when typing inside text inputs
            const activeEl = document.activeElement;
            if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
                return;
            }

            // Do not trigger shortcuts while difficulty reassessment modal is open
            if (this.ui.difficultyModal && !this.ui.difficultyModal.classList.contains('hidden')) {
                return;
            }

            if (e.code === 'Space') {
                e.preventDefault();
                this.toggleRecording();
            } else if (e.key === 'r' || e.key === 'R') {
                e.preventDefault();
                this.handleReplayQuestion();
            } else if (e.key === 'n' || e.key === 'N') {
                e.preventDefault();
                handleNextQuestion();
            }
        });

        // Download All 15 Recordings as ZIP Button
        if (this.ui.downloadAllZipBtn) {
            this.ui.downloadAllZipBtn.addEventListener('click', () => {
                this.downloadAllRecordingsZip();
            });
        }

        // Download All 15 Transcripts as TXT Button
        if (this.ui.downloadAllTxtBtn) {
            this.ui.downloadAllTxtBtn.addEventListener('click', () => {
                this.downloadAllTranscriptsTxt();
            });
        }
    }

    // ========================================================
    // v8.0 실전 시험 모드 (Real Exam Mode) & 인터미션 헬퍼 메서드
    // ========================================================
    initRealExamMode() {
        if (this.ui.realExamModeToggle) {
            this.realExamMode = this.ui.realExamModeToggle.checked;
        }
        this.updateRealExamOverlay();
        this.updateListenButtonUI();
    }

    updateRealExamOverlay() {
        if (!this.ui.realExamBlindOverlay) return;
        if (this.realExamMode && !this.questionRevealed) {
            this.ui.realExamBlindOverlay.classList.remove('hidden');
        } else {
            this.ui.realExamBlindOverlay.classList.add('hidden');
        }
    }

    updateListenButtonUI() {
        if (!this.ui.listenBtnLabel) return;
        if (this.realExamMode) {
            if (this.replayCount >= 1) {
                this.ui.listenBtnLabel.textContent = "질문 청취 완료 (실전 규정)";
                if (this.ui.listenQBtn) this.ui.listenQBtn.disabled = true;
                if (this.ui.mobileListenBtn) this.ui.mobileListenBtn.disabled = true;
            } else {
                this.ui.listenBtnLabel.textContent = "질문 다시 듣기 (1/1회)";
                if (this.ui.listenQBtn) this.ui.listenQBtn.disabled = false;
                if (this.ui.mobileListenBtn) this.ui.mobileListenBtn.disabled = false;
            }
        } else {
            this.ui.listenBtnLabel.textContent = "질문 다시 듣기 (무제한)";
            if (this.ui.listenQBtn) this.ui.listenQBtn.disabled = false;
            if (this.ui.mobileListenBtn) this.ui.mobileListenBtn.disabled = false;
        }
    }

    handleReplayQuestion() {
        if (this.realExamMode) {
            if (this.replayCount >= 1) {
                if (this.ui.recStatusText) {
                    this.ui.recStatusText.innerHTML = '<span style="color:#f59e0b;font-weight:700;"><i class="fa-solid fa-circle-info"></i> 실전 시험 규정상 질문 다시 듣기는 1회만 허용됩니다.</span>';
                }
                return;
            }
            this.replayCount++;
            this.speakQuestion();
            this.updateListenButtonUI();
        } else {
            this.speakQuestion();
        }
    }

    showDifficultyModal() {
        if (!this.ui.difficultyModal) {
            this.difficultyReassessed = true;
            this.loadQuestion(7);
            return;
        }
        if ('speechSynthesis' in window) {
            try { window.speechSynthesis.cancel(); } catch(e) {}
        }
        this.ui.difficultyModal.classList.remove('hidden');
    }

    updateSurveyCounter() {
        const checkedBoxes = document.querySelectorAll('.topic-checkbox input:checked');
        const count = checkedBoxes.length;
        if (this.ui.surveyCheckedCount) {
            this.ui.surveyCheckedCount.textContent = count;
        }
        if (this.ui.surveyCountPill) {
            if (count >= 12) {
                this.ui.surveyCountPill.classList.remove('warning');
                this.ui.surveyCountPill.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> 서베이 항목: <strong id="survey-checked-count">${count}</strong> / 12개 선택됨`;
            } else {
                this.ui.surveyCountPill.classList.add('warning');
                this.ui.surveyCountPill.innerHTML = `<i class="fa-solid fa-circle-exclamation text-yellow"></i> 서베이 항목: <strong id="survey-checked-count">${count}</strong> / 12개 (최소 12개 필요)`;
            }
        }
    }

    applyALPresetSurvey() {
        // 1. 일 경험 없음, 학생 아님, 아파트 홀로 거주
        const occNone = document.querySelector('input[name="occ"][value="none"]');
        if (occNone) {
            occNone.checked = true;
            document.querySelectorAll('input[name="occ"]').forEach(i => i.parentElement.classList.toggle('checked', i.checked));
        }

        const studentNo = document.querySelector('input[name="student"][value="no"]');
        if (studentNo) {
            studentNo.checked = true;
            document.querySelectorAll('input[name="student"]').forEach(i => i.parentElement.classList.toggle('checked', i.checked));
        }

        const housingApt = document.querySelector('input[name="housing"][value="alone_apt"]');
        if (housingApt) {
            housingApt.checked = true;
            document.querySelectorAll('input[name="housing"]').forEach(i => i.parentElement.classList.toggle('checked', i.checked));
        }

        // 2. High-synergy AL 12 topics:
        // 영화(movie), TV(tv), 콘서트(concert), 공원(park), 카페(cafe), 음악(music),
        // 조깅(jogging), 걷기(walking), 수영(swimming), 자전거(bicycle), 국내여행(dom_travel), 해외여행(overseas_travel)
        const presetKeys = [
            'movie', 'tv', 'concert', 'park', 'cafe', 'music',
            'jogging', 'walking', 'swimming', 'bicycle', 'dom_travel', 'overseas_travel'
        ];

        document.querySelectorAll('.topic-checkbox').forEach(cb => {
            const input = cb.querySelector('input');
            if (input) {
                const shouldCheck = presetKeys.includes(input.value);
                input.checked = shouldCheck;
                cb.classList.toggle('checked', shouldCheck);
            }
        });

        this.updateSurveyCounter();

        // Visual bounce animation for instant feedback
        if (this.ui.surveyCountPill) {
            this.ui.surveyCountPill.style.transition = 'transform 0.2s ease';
            this.ui.surveyCountPill.style.transform = 'scale(1.08)';
            setTimeout(() => {
                if (this.ui.surveyCountPill) this.ui.surveyCountPill.style.transform = 'scale(1)';
            }, 250);
        }
    }

    // 100% Dynamic Survey-to-Exam Paper Randomization Engine
    generateRandomExamPaper() {
        const paper = [];
        
        // 1. Collect all checked topics from the survey UI
        const userCheckedKeys = [];
        document.querySelectorAll('.topic-checkbox input:checked').forEach(inp => {
            const val = inp.value;
            if (SURVEY_TOPICS[val]) {
                userCheckedKeys.push(val);
            }
        });

        // Always add housing as an option in the pool if available
        if (SURVEY_TOPICS['housing'] && !userCheckedKeys.includes('housing')) {
            userCheckedKeys.push('housing');
        }

        // Shuffle ALL user checked topics 100% randomly
        const shuffledUserTopics = [...new Set(userCheckedKeys)].sort(() => Math.random() - 0.5);

        // Select Topic 1 & Topic 2 randomly from user's selection
        const topic1Key = shuffledUserTopics[0] || "movie";
        const topic2Key = shuffledUserTopics[1] || (shuffledUserTopics[0] !== "park" ? "park" : "dom_travel");

        // Shuffle unexpected topics randomly
        const shuffledUnexpected = [...UNEXPECTED_TOPICS].sort(() => Math.random() - 0.5);
        // Shuffle role-play randomly
        const randomRoleplay = ROLEPLAY_POOLS[Math.floor(Math.random() * ROLEPLAY_POOLS.length)];
        // Shuffle advanced issue randomly
        const randomIssue = ADVANCED_ISSUE_POOLS[Math.floor(Math.random() * ADVANCED_ISSUE_POOLS.length)];

        // Dynamic Q1 Model Answer
        const t1Obj = SURVEY_TOPICS[topic1Key];
        const hobbyText = t1Obj ? t1Obj.name.replace(/.*:\s*/, '') : "exploring new hobbies";

        paper.push({
            id: 1,
            category: "자기소개 (Self-Intro)",
            tag: "Question 1 [워밍업]",
            question: "Let's start the interview now. Please tell me a little bit about yourself.",
            kor: "(인터뷰를 시작합니다. 자기소개를 간단히 해주세요.)",
            modelAnswer: `Hello Eva, it's a pleasure to meet you. My name is DongHwa. I am currently working as a plasma engineering researcher. In my free time, I really enjoy ${hobbyText} and exploring new activities. I'm taking this OPIc test to challenge myself and achieve an AL grade.`
        });

        // Set 1 (Q2 ~ Q4): 3-Combo from User Checked Survey Topic 1
        const t1 = SURVEY_TOPICS[topic1Key];
        paper.push({ id: 2, category: `${t1.name} [선택서베이 동적반영]`, tag: "Question 2 [3콤보 1/3]", ...t1.q1 });
        paper.push({ id: 3, category: `${t1.name} [선택서베이 동적반영]`, tag: "Question 3 [3콤보 2/3]", ...t1.q2 });
        paper.push({ id: 4, category: `${t1.name} [선택서베이 동적반영]`, tag: "Question 4 [3콤보 3/3]", ...t1.q3 });

        // Set 2 (Q5 ~ Q7): 🚨 UNEXPECTED TOPIC 3-Combo! (서베이 미선택 돌발)
        const unexp = shuffledUnexpected[0];
        paper.push({ id: 5, category: `🚨 ${unexp.name} [서베이 미선택 돌발]`, tag: "Question 5 [🚨 돌발 3콤보 1/3]", ...unexp.q1 });
        paper.push({ id: 6, category: `🚨 ${unexp.name} [서베이 미선택 돌발]`, tag: "Question 6 [🚨 돌발 3콤보 2/3]", ...unexp.q2 });
        paper.push({ id: 7, category: `🚨 ${unexp.name} [서베이 미선택 돌발]`, tag: "Question 7 [🚨 돌발 3콤보 3/3]", ...unexp.q3 });

        // Set 3 (Q8 ~ Q10): 3-Combo from User Checked Survey Topic 2
        const t2 = SURVEY_TOPICS[topic2Key];
        paper.push({ id: 8, category: `${t2.name} [선택서베이 동적반영]`, tag: "Question 8 [3콤보 1/3]", ...t2.q1 });
        paper.push({ id: 9, category: `${t2.name} [선택서베이 동적반영]`, tag: "Question 9 [3콤보 2/3]", ...t2.q2 });
        paper.push({ id: 10, category: `${t2.name} [선택서베이 동적반영]`, tag: "Question 10 [3콤보 3/3]", ...t2.q3 });

        // Set 4 (Q11 ~ Q13): 🎭 ROLE-PLAY 3-Combo
        paper.push({ id: 11, category: `🎭 롤플레이 (${randomRoleplay.name})`, tag: "Question 11 [🎭 롤플레이 문의]", ...randomRoleplay.q11 });
        paper.push({ id: 12, category: `🎭 롤플레이 (${randomRoleplay.name})`, tag: "Question 12 [🎭 롤플레이 대안제시]", ...randomRoleplay.q12 });
        paper.push({ id: 13, category: `🎭 롤플레이 (${randomRoleplay.name})`, tag: "Question 13 [🎭 롤플레이 경험]", ...randomRoleplay.q13 });

        // Set 5 (Q14 ~ Q15): 🔥 ADVANCED 2-Combo
        paper.push({ id: 14, category: `🔥 고난도 이슈 (${randomIssue.name})`, tag: "Question 14 [🔥 고난도 트렌드비교]", ...randomIssue.q14 });
        paper.push({ id: 15, category: `🔥 고난도 이슈 (${randomIssue.name})`, tag: "Question 15 [🔥 고난도 사회적이슈]", ...randomIssue.q15 });

        this.activeExamPaper = paper;
        console.log("🎲 완전 무작위 15문항 오픽 실전 시험지 생성 완료:", paper);
    }

    switchSection(sectionId, activeBtn) {
        if ('speechSynthesis' in window) {
            try { window.speechSynthesis.cancel(); } catch(e) {}
        }
        if (this.ui.evaWave) {
            this.ui.evaWave.style.opacity = '0';
        }

        const normalizedId = (sectionId === 'sim-section') ? 'simulator-section' : sectionId;
        const targetSec = document.getElementById(normalizedId);
        if (!targetSec) return;

        this.ui.sections.forEach(sec => sec.classList.remove('active'));
        targetSec.classList.add('active');

        this.ui.navBtns.forEach(b => b.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
    }

    initVoices() {
        if (!('speechSynthesis' in window)) return;

        const populate = () => {
            const rawVoices = window.speechSynthesis.getVoices();
            if (!rawVoices || rawVoices.length === 0) return;
            
            // Filter English voices
            this.availableVoices = rawVoices.filter(v => v.lang && (v.lang.startsWith('en') || v.lang.includes('US') || v.lang.includes('GB')));
            if (this.availableVoices.length === 0) {
                this.availableVoices = rawVoices;
            }
            this.renderVoiceOptions();
        };

        populate();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = populate;
        }
    }

    renderVoiceOptions() {
        if (!this.ui.ttsVoiceSelect || !this.availableVoices || this.availableVoices.length === 0) return;

        const select = this.ui.ttsVoiceSelect;
        const currentVal = select.value;
        select.innerHTML = '';

        // Check if Samantha exists
        const samantha = this.availableVoices.find(v => v.name.toLowerCase().includes('samantha'));
        
        const autoOpt = document.createElement('option');
        autoOpt.value = 'auto';
        autoOpt.textContent = samantha 
            ? "★ Samantha (자연스러운 미국 여성 · 기본)" 
            : "★ 자연스러운 미국식 음성 (자동 최적화)";
        select.appendChild(autoOpt);

        this.availableVoices.forEach(v => {
            const opt = document.createElement('option');
            opt.value = v.voiceURI || v.name;
            let label = `${v.name} (${v.lang})`;
            if (v.name.toLowerCase().includes('samantha')) {
                label = `★ ${v.name} (macOS 최고급 자연 여성 · 강력 추천)`;
            } else if (v.name.toLowerCase().includes('google')) {
                label = `${v.name} (구글 음성)`;
            } else if (v.name.toLowerCase().includes('alex')) {
                label = `${v.name} (자연스러운 미국 남성)`;
            } else if (v.name.toLowerCase().includes('karen') || v.name.toLowerCase().includes('victoria') || v.name.toLowerCase().includes('ava')) {
                label = `${v.name} (자연스러운 여성)`;
            }
            opt.textContent = label;
            select.appendChild(opt);
        });

        if (currentVal && select.querySelector(`option[value="${currentVal}"]`)) {
            select.value = currentVal;
        } else {
            select.value = 'auto';
        }
    }

    getBestVoice() {
        if (!this.availableVoices || this.availableVoices.length === 0) {
            if ('speechSynthesis' in window) {
                this.availableVoices = window.speechSynthesis.getVoices();
            }
        }
        if (!this.availableVoices || this.availableVoices.length === 0) return null;

        // 1. If user selected a specific voice from dropdown
        if (this.selectedVoiceURI && this.selectedVoiceURI !== 'auto') {
            const found = this.availableVoices.find(v => (v.voiceURI === this.selectedVoiceURI || v.name === this.selectedVoiceURI));
            if (found) return found;
        }

        // 2. Highest Priority: Samantha (macOS natural Siri-like English female voice)
        const samantha = this.availableVoices.find(v => v.name.toLowerCase().includes('samantha'));
        if (samantha) return samantha;

        // 3. High Priority: Ava, Victoria, Karen, Allison, Natural
        const naturalFemale = this.availableVoices.find(v => 
            v.lang.startsWith('en') && (
                v.name.toLowerCase().includes('ava') ||
                v.name.toLowerCase().includes('victoria') ||
                v.name.toLowerCase().includes('karen') ||
                v.name.toLowerCase().includes('allison') ||
                v.name.toLowerCase().includes('natural')
            )
        );
        if (naturalFemale) return naturalFemale;

        // 4. Any local en-US voice that is NOT Google (strictly avoids Google robot voice)
        const nonGoogleLocal = this.availableVoices.find(v => 
            v.lang.replace('_', '-').startsWith('en-US') && 
            !v.name.toLowerCase().includes('google') && 
            v.localService
        );
        if (nonGoogleLocal) return nonGoogleLocal;

        // 5. Any en voice that is NOT Google
        const nonGoogleAny = this.availableVoices.find(v => 
            v.lang.startsWith('en') && 
            !v.name.toLowerCase().includes('google')
        );
        if (nonGoogleAny) return nonGoogleAny;

        // 6. Fallback to first en voice
        return this.availableVoices.find(v => v.lang.startsWith('en')) || null;
    }

    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';

            // Fixed STT duplicated text bug by indexing full results array cleanly
            this.recognition.onresult = (event) => {
                let fullFinal = '';
                let interimTranscript = '';

                for (let i = 0; i < event.results.length; ++i) {
                    const phrase = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        fullFinal += phrase + ' ';
                    } else {
                        interimTranscript += phrase;
                    }
                }

                this.recordedText = fullFinal.trim();
                const totalText = (this.recordedText + ' ' + interimTranscript).trim();
                if (this.ui.transcriptInput) {
                    this.ui.transcriptInput.value = totalText;
                }
                this.updateFillerCounter(totalText);
                this.ui.evalAnswerBtn.disabled = (totalText.length === 0);
                if (this.ui.mobileEvalBtn) this.ui.mobileEvalBtn.disabled = (totalText.length === 0);
            };

            this.recognition.onerror = (e) => {
                console.warn("Speech Recognition notice:", e.error);
                if (e.error === 'no-speech') {
                    // Normal brief silence - DO NOT abort recording session
                    return;
                }
                if (e.error === 'network') {
                    // Network STT dropped, real voice recording continues safely
                    if (this.ui.recStatusText && this.isRecording) {
                        this.ui.recStatusText.textContent = "음성 녹음 진행 중 (STT 네트워크 일시 지연 - 음성 파일은 정상 녹음 중)";
                    }
                    return;
                }
                if (e.error === 'not-allowed') {
                    if (this.ui.recStatusText) {
                        this.ui.recStatusText.innerHTML = '<span style="color:#ef4444;font-weight:700;"><i class="fa-solid fa-triangle-exclamation"></i> 마이크 접근 권한이 차단되어 있습니다. 주소창 좌측 자물쇠에서 마이크를 허용해주세요!</span>';
                    }
                }
            };
        }
    }

    loadQuestion(index) {
        this.currentQuestionIndex = index;
        const qData = this.activeExamPaper[index] || {
            id: index + 1,
            category: "General",
            tag: `Question ${index + 1}`,
            question: "Please prepare your answer.",
            kor: "(답변을 준비해 주세요.)",
            modelAnswer: ""
        };

        this.ui.qNumber.textContent = `Q ${String(index + 1).padStart(2, '0')} / 15`;
        this.ui.qCategory.textContent = qData.category;
        this.ui.qTag.textContent = qData.tag;
        this.ui.questionText.textContent = `"${qData.question}"`;
        this.ui.questionKor.textContent = qData.kor;
        this.ui.modelText.textContent = `"${qData.modelAnswer}"`;

        // v8.0 실전 시험 모드 & 다시듣기 카운터 리셋
        this.questionRevealed = false;
        this.replayCount = 0;
        this.updateRealExamOverlay();
        this.updateListenButtonUI();

        // Reset Recording and timers for current question
        this.stopRecording();
        this.resetTimerProgressBar();
        this.resetFillerCounter();

        // Restore saved answer state if already recorded for this question
        const saved = this.questionAnswers[index];
        if (saved && saved.transcript) {
            this.recordedText = saved.transcript;
            if (this.ui.transcriptInput) this.ui.transcriptInput.value = saved.transcript;
            this.ui.evalAnswerBtn.disabled = false;
            if (this.ui.mobileEvalBtn) this.ui.mobileEvalBtn.disabled = false;
            this.updateFillerCounter(saved.transcript);
        } else {
            this.recordedText = "";
            if (this.ui.transcriptInput) this.ui.transcriptInput.value = "";
            this.ui.evalAnswerBtn.disabled = true;
            if (this.ui.mobileEvalBtn) this.ui.mobileEvalBtn.disabled = true;
        }

        if (saved && saved.audioUrl) {
            this.audioBlob = saved.audioBlob;
            this.audioUrl = saved.audioUrl;
            if (this.ui.voiceAudioPlayer) this.ui.voiceAudioPlayer.src = saved.audioUrl;
            if (this.ui.downloadAudioBtn) {
                this.ui.downloadAudioBtn.href = saved.audioUrl;
                this.ui.downloadAudioBtn.download = `OPIC_Q${String(index + 1).padStart(2, '0')}_VoiceAnswer.webm`;
            }
            if (this.ui.audioPlaybackBox) this.ui.audioPlaybackBox.classList.remove('hidden');
        } else {
            this.audioBlob = null;
            this.audioUrl = null;
            if (this.ui.audioPlaybackBox) this.ui.audioPlaybackBox.classList.add('hidden');
            if (this.ui.voiceAudioPlayer) this.ui.voiceAudioPlayer.src = "";
        }

        if (saved && saved.evaluation) {
            this.renderEvaluationDrawer(saved.evaluation);
        } else {
            this.ui.feedbackDrawer.classList.add('hidden');
        }

        // Speak question synchronously in clear English at comfortable volume
        this.speakQuestion();
    }

    resetTimerProgressBar() {
        if (this.ui.timerProgressFill) {
            this.ui.timerProgressFill.style.width = '0%';
            this.ui.timerProgressFill.style.backgroundColor = '#10b981';
        }
        if (this.ui.timerZoneLabel) {
            this.ui.timerZoneLabel.textContent = '답변 시간 0초 (권장: 45초 ~ 90초)';
        }
        if (this.ui.mobileTimerDisplay) {
            this.ui.mobileTimerDisplay.textContent = '00:00';
        }
    }

    updateTimerProgressBar(seconds) {
        if (!this.ui.timerProgressFill || !this.ui.timerZoneLabel) return;
        const pct = Math.min(100, Math.round((seconds / 90) * 100));
        this.ui.timerProgressFill.style.width = `${pct}%`;

        if (seconds < 45) {
            this.ui.timerProgressFill.style.backgroundColor = '#10b981';
            this.ui.timerZoneLabel.textContent = `기초 발화 진행 중 (${seconds}초 / 권장 45초 이상)`;
        } else if (seconds <= 90) {
            this.ui.timerProgressFill.style.backgroundColor = '#f59e0b';
            this.ui.timerZoneLabel.textContent = `★ AL 최적 답변 분량 달성! (${seconds}초 - 훌륭합니다)`;
        } else {
            this.ui.timerProgressFill.style.backgroundColor = '#ef4444';
            this.ui.timerZoneLabel.textContent = `답변 마무리 권장 시간 (${seconds}초 - 다음 문제 이동 추천)`;
        }
    }

    resetFillerCounter() {
        if (this.ui.fillerCountNum) {
            this.ui.fillerCountNum.textContent = '0';
        }
    }

    updateFillerCounter(text) {
        if (!this.ui.fillerCountNum) return;
        const fillerMatches = text.match(/\b(like|you know|actually|I mean|well|to be honest|speaking of which)\b/gi) || [];
        this.ui.fillerCountNum.textContent = String(fillerMatches.length);
    }

    speakQuestion() {
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();
        
        const qObj = (this.activeExamPaper && this.activeExamPaper[this.currentQuestionIndex]) ? this.activeExamPaper[this.currentQuestionIndex] : null;
        const text = qObj ? qObj.question : "";
        if (!text) return;

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Bind natural native voice (Samantha / Siri / non-Google natural voice)
        const voice = this.getBestVoice();
        if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang || 'en-US';
        } else {
            utterance.lang = 'en-US';
        }

        utterance.rate = (typeof this.ttsRate === 'number' && !isNaN(this.ttsRate)) ? this.ttsRate : 0.95;

        // Dynamic Volume: Default 50% (0.5) volume level
        let vol = 0.5;
        if (this.isMuted) {
            vol = 0;
        } else if (typeof this.ttsVolume === 'number' && !isNaN(this.ttsVolume)) {
            vol = this.ttsVolume;
        }
        utterance.volume = Math.max(0, Math.min(1.0, vol));

        if (this.ui.evaWave) this.ui.evaWave.style.opacity = '1';
        utterance.onend = () => { if (this.ui.evaWave) this.ui.evaWave.style.opacity = '0'; };
        utterance.onerror = (e) => { 
            console.warn("TTS Synthesis Error:", e);
            if (this.ui.evaWave) this.ui.evaWave.style.opacity = '0'; 
        };

        window.speechSynthesis.speak(utterance);
    }

    toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    startRecording() {
        // Stop question TTS speech immediately when user starts answering
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        if (this.ui.evaWave) {
            this.ui.evaWave.style.opacity = '0';
        }

        this.isRecording = true;
        this.ui.micToggleBtn.classList.add('recording');
        if (this.ui.mobileMicBtn) this.ui.mobileMicBtn.classList.add('recording');
        this.ui.recIndicator.classList.add('recording-active');
        this.ui.recStatusText.textContent = "녹음 진행 중... (실제 음성이 파일로 저장됩니다)";
        
        this.responseSeconds = 0;
        this.ui.responseTimer.textContent = "00:00";
        if (this.ui.mobileTimerDisplay) this.ui.mobileTimerDisplay.textContent = "00:00";
        this.resetTimerProgressBar();

        this.responseTimerInterval = setInterval(() => {
            this.responseSeconds++;
            const mins = String(Math.floor(this.responseSeconds / 60)).padStart(2, '0');
            const secs = String(this.responseSeconds % 60).padStart(2, '0');
            this.ui.responseTimer.textContent = `${mins}:${secs}`;
            if (this.ui.mobileTimerDisplay) this.ui.mobileTimerDisplay.textContent = `${mins}:${secs}`;
            this.updateTimerProgressBar(this.responseSeconds);
        }, 1000);

        // 1. Start STT Speech Recognition
        if (this.recognition) {
            try {
                this.recognition.start();
            } catch(e) {}
        }

        // 2. Start Real Voice MediaRecorder
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ 
                audio: { 
                    echoCancellation: true, 
                    noiseSuppression: true, 
                    autoGainControl: true 
                } 
            }).then(stream => {
                this.currentStream = stream;

                // Auto-detect optimal audio codec for browser (Safari mp4 / Chrome webm)
                let mimeType = 'audio/webm';
                let fileExt = 'webm';
                if (window.MediaRecorder && typeof MediaRecorder.isTypeSupported === 'function') {
                    if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                        mimeType = 'audio/webm;codecs=opus';
                        fileExt = 'webm';
                    } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                        mimeType = 'audio/mp4';
                        fileExt = 'mp4';
                    } else if (MediaRecorder.isTypeSupported('audio/webm')) {
                        mimeType = 'audio/webm';
                        fileExt = 'webm';
                    } else if (MediaRecorder.isTypeSupported('audio/aac')) {
                        mimeType = 'audio/aac';
                        fileExt = 'aac';
                    }
                }

                try {
                    this.mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
                } catch(recErr) {
                    console.warn("Fallback to default MediaRecorder options:", recErr);
                    this.mediaRecorder = new MediaRecorder(stream);
                    mimeType = this.mediaRecorder.mimeType || 'audio/webm';
                }

                this.audioChunks = [];

                this.mediaRecorder.ondataavailable = (event) => {
                    if (event.data && event.data.size > 0) {
                        this.audioChunks.push(event.data);
                    }
                };

                this.mediaRecorder.onstop = () => {
                    const blob = new Blob(this.audioChunks, { type: mimeType });
                    const url = URL.createObjectURL(blob);
                    const qIdx = this.currentQuestionIndex;
                    const duration = this.responseSeconds;
                    const transcript = (this.ui.transcriptInput ? this.ui.transcriptInput.value : "").trim();

                    this.audioBlob = blob;
                    this.audioUrl = url;

                    if (!this.questionAnswers[qIdx]) {
                        this.questionAnswers[qIdx] = {
                            questionIndex: qIdx,
                            audioBlob: blob,
                            audioUrl: url,
                            duration: duration,
                            transcript: transcript,
                            evaluation: null
                        };
                    } else {
                        this.questionAnswers[qIdx].audioBlob = blob;
                        this.questionAnswers[qIdx].audioUrl = url;
                        this.questionAnswers[qIdx].duration = duration;
                        this.questionAnswers[qIdx].transcript = transcript;
                    }

                    if (this.ui.voiceAudioPlayer) {
                        this.ui.voiceAudioPlayer.src = url;
                    }
                    if (this.ui.downloadAudioBtn) {
                        this.ui.downloadAudioBtn.href = url;
                        this.ui.downloadAudioBtn.download = `OPIC_Q${String(qIdx + 1).padStart(2, '0')}_VoiceAnswer.${fileExt}`;
                    }
                    if (this.ui.audioPlaybackBox) {
                        this.ui.audioPlaybackBox.classList.remove('hidden');
                    }
                };

                this.mediaRecorder.start();
            }).catch(err => {
                console.warn("Microphone access error for MediaRecorder:", err);
                this.isRecording = false;
                this.ui.micToggleBtn.classList.remove('recording');
                this.ui.recIndicator.classList.remove('recording-active');
                if (this.responseTimerInterval) {
                    clearInterval(this.responseTimerInterval);
                    this.responseTimerInterval = null;
                }
                const isDenied = (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError');
                const errMsg = isDenied 
                    ? '마이크 권한이 차단되어 있습니다! 주소창 왼쪽 자물쇠(설정) 아이콘을 눌러 "마이크: 허용"으로 변경해주세요.'
                    : `마이크 연결 오류: ${err.message || '마이크 장치 설정을 확인해주세요'}`;
                this.ui.recStatusText.innerHTML = `<span style="color:#ef4444;font-weight:700;"><i class="fa-solid fa-triangle-exclamation"></i> ${errMsg}</span>`;
            });
        }
    }

    stopRecording() {
        if (!this.isRecording) return;
        this.isRecording = false;
        this.ui.micToggleBtn.classList.remove('recording');
        if (this.ui.mobileMicBtn) this.ui.mobileMicBtn.classList.remove('recording');
        this.ui.recIndicator.classList.remove('recording-active');
        this.ui.recStatusText.textContent = "녹음 완료! (아래에서 내 음성을 들어보고 AI 평가를 받아보세요)";

        if (this.responseTimerInterval) {
            clearInterval(this.responseTimerInterval);
            this.responseTimerInterval = null;
        }

        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch(e) {}
        }

        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            try {
                this.mediaRecorder.stop();
            } catch(e) {}
        }

        // Release hardware mic track so it doesn't cause device locks on laptops
        if (this.currentStream) {
            try {
                this.currentStream.getTracks().forEach(track => track.stop());
            } catch(e) {}
            this.currentStream = null;
        }
    }

    saveCurrentAnswer() {
        const qIdx = this.currentQuestionIndex;
        const text = (this.ui.transcriptInput ? this.ui.transcriptInput.value : "").trim();

        if (!this.questionAnswers[qIdx]) {
            this.questionAnswers[qIdx] = {
                questionIndex: qIdx,
                audioBlob: this.audioBlob || null,
                audioUrl: this.audioUrl || null,
                duration: this.responseSeconds || 0,
                transcript: text,
                evaluation: null
            };
        } else {
            this.questionAnswers[qIdx].transcript = text;
            if (this.audioBlob) this.questionAnswers[qIdx].audioBlob = this.audioBlob;
            if (this.audioUrl) this.questionAnswers[qIdx].audioUrl = this.audioUrl;
            if (this.responseSeconds > 0) this.questionAnswers[qIdx].duration = this.responseSeconds;
        }

        // If answered with text and not yet evaluated, auto-evaluate
        if (text && (!this.evaluations[qIdx] || !this.questionAnswers[qIdx].evaluation)) {
            const qData = this.activeExamPaper[qIdx] || null;
            const evalRes = this.computeEvaluation(text, this.questionAnswers[qIdx].duration, qData);
            this.evaluations[qIdx] = evalRes;
            this.questionAnswers[qIdx].evaluation = evalRes;
        }
    }

    // Comprehensive ACTFL OPIc Multi-Dimensional Evaluation Engine
    computeEvaluation(text, durationSeconds, questionObj) {
        const cleanText = (text || "").trim();
        const words = cleanText.toLowerCase().replace(/[^a-z0-9'\s]/g, ' ').split(/\s+/).filter(w => w.length > 0);
        const wordCount = words.length;
        const duration = Math.max(0, parseInt(durationSeconds) || 0);
        const wpm = (duration >= 5 && wordCount > 0) ? Math.round((wordCount / duration) * 60) : 0;

        // 1. Lexical Richness & Unique Words
        const uniqueWordSet = new Set(words);
        const uniqueWords = uniqueWordSet.size;
        const ttr = wordCount > 0 ? (uniqueWords / wordCount) : 0;

        // OPIc AL/IH Advanced Expressions Dictionary
        const ADVANCED_VOCAB = [
            "breathtaking", "magnificent", "picturesque", "spectacular", "cozy", "bustling", "vibrant",
            "versatile", "indispensable", "sophisticated", "memorable", "unforgettable", "state-of-the-art",
            "exceptional", "phenomenal", "authentic", "remarkable", "crucial", "essential", "significant",
            "tremendous", "passionate", "nostalgic", "overwhelmed", "affordable", "eco-friendly",
            "perspective", "consequence", "dilemma", "controversy", "preference", "priority",
            "infrastructure", "atmosphere", "circumstance", "obstacle", "breakthrough", "consensus",
            "dimension", "transition", "sustainability", "innovation", "impression", "characteristic",
            "downside", "perk", "alternative", "solution", "resolution", "recommendation",
            "come up with", "figure out", "look forward to", "bump into", "get along with", "unwind",
            "binge-watch", "take for granted", "turn out", "catch up with", "in terms of", "on a daily basis",
            "play an important role", "leave a strong impression", "at the end of the day", "keep in mind",
            "have a knack for", "rule of thumb", "a blessing in disguise", "speak highly of", "make up for"
        ];

        const matchedAdv = [];
        const lowerText = cleanText.toLowerCase();
        ADVANCED_VOCAB.forEach(term => {
            if (lowerText.includes(term)) {
                matchedAdv.push(term);
            }
        });

        // 2. Past Tense Verbs (Irregular & Regular -ed)
        const PAST_VERBS = [
            "went", "saw", "visited", "enjoyed", "had", "was", "were", "took", "felt", "watched",
            "bought", "spent", "became", "made", "decided", "started", "thought", "found", "ate",
            "drank", "stayed", "solved", "learned", "happened", "experienced", "traveled", "walked",
            "arrived", "returned", "noticed", "heard", "spoke", "read", "met", "called", "booked",
            "canceled", "repaired", "replaced", "discovered", "chose", "lost", "remembered", "woke", "fixed"
        ];
        const matchedPast = [];
        words.forEach(w => {
            if (PAST_VERBS.includes(w) || (w.endsWith("ed") && w.length > 4)) {
                matchedPast.push(w);
            }
        });
        const pastCount = matchedPast.length;

        // Conjunctions & Subordinate Clauses
        const CONJUNCTIONS = [
            "because", "although", "even though", "whereas", "while", "since", "so that", "in order to",
            "if", "unless", "whenever", "as soon as", "whether", "as long as", "despite"
        ];
        const matchedConj = [];
        CONJUNCTIONS.forEach(conj => {
            if (lowerText.includes(conj)) {
                matchedConj.push(conj);
            }
        });

        // Modals & Conditionals
        const modals = cleanText.match(/\b(would|could|should|used to|might|be able to|had to|have been|has been)\b/gi) || [];

        // 3. Fillers (Discourse Hesitation Markers)
        const FILLERS = [
            "you know", "i mean", "well", "actually", "to be honest", "honestly", "frankly",
            "speaking of which", "as you know", "like i said", "what i'm trying to say",
            "let's see", "as a matter of fact", "believe it or not"
        ];
        const matchedFillers = [];
        FILLERS.forEach(fil => {
            const regex = new RegExp(`\\b${fil}\\b`, 'gi');
            const hits = cleanText.match(regex);
            if (hits) {
                for (let k = 0; k < hits.length; k++) matchedFillers.push(fil);
            }
        });
        const fillerCount = matchedFillers.length;

        // Discourse Transitions
        const CONNECTORS = [
            "however", "therefore", "furthermore", "in addition", "on the other hand",
            "for instance", "for example", "besides", "as a result", "eventually",
            "overall", "basically", "in particular", "first of all", "moreover"
        ];
        const matchedConnectors = [];
        CONNECTORS.forEach(con => {
            if (lowerText.includes(con)) {
                matchedConnectors.push(con);
            }
        });

        // ==========================================
        // Scoring Dimensions (0 - 100 each)
        // ==========================================

        // A. Volume & Duration Score (35%)
        let volumeScore = 0;
        if (wordCount === 0) {
            volumeScore = 0;
        } else {
            const wordScore = Math.min(50, Math.round((wordCount / 65) * 50));
            const durScore = Math.min(30, Math.round((Math.min(duration, 90) / 60) * 30));
            let wpmScore = 10;
            if (duration >= 5) {
                if (wpm >= 85 && wpm <= 150) wpmScore = 20;
                else if (wpm >= 65) wpmScore = 15;
                else if (wpm >= 45) wpmScore = 10;
                else wpmScore = 5;
            } else {
                wpmScore = Math.min(20, Math.round((wordCount / 20) * 20));
            }
            volumeScore = Math.min(100, wordScore + durScore + wpmScore);
        }

        // B. Vocabulary Richness Score (25%)
        let vocabScore = 0;
        if (wordCount === 0) {
            vocabScore = 0;
        } else {
            const uniqueScore = Math.min(45, Math.round((uniqueWords / 38) * 45));
            let ttrScore = 15;
            if (ttr >= 0.65) ttrScore = 25;
            else if (ttr >= 0.50) ttrScore = 20;
            else if (ttr >= 0.40) ttrScore = 15;
            else ttrScore = 8;
            const advScore = Math.min(30, matchedAdv.length * 6);
            vocabScore = Math.min(100, uniqueScore + ttrScore + advScore);
        }

        // C. Tense, Grammar & Question-Type Scoring (20%)
        let tenseScore = 0;
        const qText = (questionObj && questionObj.question) ? questionObj.question.toLowerCase() : "";
        const qTag = (questionObj && questionObj.tag) ? questionObj.tag.toLowerCase() : "";
        const qCat = (questionObj && questionObj.category) ? questionObj.category.toLowerCase() : "";

        const isRoleplayQ = qTag.includes("롤플레이") || qCat.includes("롤플레이") || qText.includes("call") || qText.includes("ask") || qText.includes("situation") || qText.includes("pretend");
        const isComparisonQ = !isRoleplayQ && (qTag.includes("비교") || qTag.includes("트렌드") || qText.includes("compare") || qText.includes("difference") || qText.includes("versus") || qText.includes("how has") || qText.includes("past and present"));
        const isExperienceQ = !isRoleplayQ && !isComparisonQ && (qTag.includes("경험") || qText.includes("memorable") || qText.includes("past") || qText.includes("happened") || qText.includes("first time") || qText.includes("last time") || qText.includes("incident"));

        const COMP_MARKERS = [
            "compared to", "in contrast", "on the other hand", "whereas", "while",
            "unlike", "used to", "back then", "nowadays", "different from",
            "much more", "far more"
        ];
        const matchedComp = [];
        COMP_MARKERS.forEach(m => {
            if (lowerText.includes(m)) matchedComp.push(m);
        });

        const ROLEPLAY_MARKERS = [
            "could you", "would you", "can you", "i was wondering", "is it possible",
            "do you have", "how much", "the problem is", "unfortunately", "i'm afraid",
            "how about", "instead", "give me a call", "let me know"
        ];
        const matchedRoleplay = [];
        ROLEPLAY_MARKERS.forEach(m => {
            if (lowerText.includes(m)) matchedRoleplay.push(m);
        });

        if (wordCount === 0) {
            tenseScore = 0;
        } else {
            let conjPts = Math.min(35, matchedConj.length * 9);
            let modalPts = Math.min(25, modals.length * 6);
            let corePts = 0;

            if (isExperienceQ) {
                corePts = Math.min(55, pastCount * 9);
            } else if (isComparisonQ) {
                const compPts = Math.min(35, matchedComp.length * 15);
                corePts = Math.min(20, pastCount * 5) + compPts;
            } else if (isRoleplayQ) {
                const rpPts = Math.min(40, matchedRoleplay.length * 14);
                corePts = Math.min(15, pastCount * 4) + rpPts;
            } else {
                corePts = Math.min(35, pastCount * 6);
            }
            tenseScore = Math.min(100, corePts + conjPts + modalPts + 10);
        }

        // D. Fluency & Fillers Score (20%)
        let fluencyScore = 0;
        if (wordCount === 0) {
            fluencyScore = 0;
        } else {
            let filPts = 20;
            if (fillerCount >= 2 && fillerCount <= 6) filPts = 50;
            else if (fillerCount === 1) filPts = 35;
            else if (fillerCount > 6) filPts = 38;
            else filPts = 22;

            const connPts = Math.min(50, matchedConnectors.length * 15 + 10);
            fluencyScore = Math.min(100, filPts + connPts);
        }

        // Composite Overall Score & Grade
        const composite = Math.round(
            (volumeScore * 0.35) +
            (vocabScore * 0.25) +
            (tenseScore * 0.20) +
            (fluencyScore * 0.20)
        );

        let grade = "NL (Novice Low)";
        let gradeCode = "NL";

        if (wordCount === 0) {
            grade = "NL (Novice Low)";
            gradeCode = "NL";
        } else if (wordCount < 15) {
            grade = "NM (Novice Mid)";
            gradeCode = "NM";
        } else if (wordCount < 28 || composite < 50) {
            grade = "IL / IM1 (Intermediate Low/Mid1)";
            gradeCode = "IM1";
        } else if (wordCount < 45 || composite < 66) {
            grade = "IM2 / IM3 (Intermediate Mid 2/3)";
            gradeCode = "IM2";
        } else if (wordCount < 60 || composite < 80) {
            grade = "IH (Intermediate High)";
            gradeCode = "IH";
        } else {
            grade = "AL (Advanced Low)";
            gradeCode = "AL";
        }

        // Descriptive Feedback Messages
        let fbVolumeMsg = "";
        let fbVocabMsg = "";
        let fbTenseMsg = "";
        let fbFluencyMsg = "";

        if (wordCount === 0) {
            fbVolumeMsg = "⚠️ 음성 발화가 감지되지 않았습니다. 마이크를 누르고 답변해 주세요.";
            fbVocabMsg = "⚠️ 인식된 어휘가 없습니다.";
            fbTenseMsg = "⚠️ 분석할 문장이 없습니다.";
            fbFluencyMsg = "⚠️ 발화 시간이 기록되지 않았습니다.";
        } else {
            // Volume
            const timeDesc = duration > 0 ? `${duration}초 발화` : `시간 미기록`;
            const speedDesc = wpm > 0 ? `, 분당 약 ${wpm} WPM` : ``;
            if (wordCount >= 60) {
                fbVolumeMsg = `★ 발화량 ${wordCount}단어 (${timeDesc}${speedDesc}) - AL 권장 분량(60단어 이상)을 완벽히 달성했습니다!`;
            } else if (wordCount >= 40) {
                fbVolumeMsg = `발화량 ${wordCount}단어 (${timeDesc}${speedDesc}) - IH 수준의 안정적인 답변 분량입니다. 조금만 더 살을 붙이면 AL 가능!`;
            } else {
                fbVolumeMsg = `⚠️ 발화량 ${wordCount}단어 (${timeDesc}${speedDesc}) - AL/IH 달성을 위해 45단어 이상의 연속 발화가 권장됩니다.`;
            }

            // Vocab
            const advListStr = matchedAdv.length > 0 ? ` [${matchedAdv.slice(0, 3).join(', ')}]` : '';
            if (uniqueWords >= 35 || matchedAdv.length >= 2) {
                fbVocabMsg = `★ 고유 어휘 ${uniqueWords}개 (다양도 ${Math.round(ttr * 100)}%), 고급 표현${advListStr} 감지! 풍부한 어휘 구사력입니다.`;
            } else if (uniqueWords >= 22) {
                fbVocabMsg = `고유 어휘 ${uniqueWords}개 (다양도 ${Math.round(ttr * 100)}%). 기본 어휘가 충실합니다. 다양한 형용사나 숙어를 추가해 보세요.`;
            } else {
                fbVocabMsg = `고유 어휘 ${uniqueWords}개. 동일 단어 반복을 줄이고 다채로운 표현을 사용하세요.`;
            }

            // Tense & Type-Specific Diagnostics
            const pastStr = pastCount > 0 ? `과거동사 ${pastCount}개` : `과거동사 미검출`;
            const conjStr = matchedConj.length > 0 ? `, 접속사 [${matchedConj.slice(0, 2).join(', ')}]` : '';

            if (isExperienceQ) {
                if (pastCount >= 4) {
                    fbTenseMsg = `★ [과거 경험형] ${pastStr}${conjStr} 검출! 과거 시제 일관성(went, had, felt 등)이 매우 우수하며 AL 채점 기준에 부합합니다.`;
                } else {
                    fbTenseMsg = `⚠️ [과거 경험형] ${pastStr}${conjStr}. 과거 경험 문항은 발화의 70% 이상을 과거 시제로 유지해야 IH/AL 감점을 피할 수 있습니다.`;
                }
            } else if (isComparisonQ) {
                if (matchedComp.length >= 1) {
                    fbTenseMsg = `★ [비교/대조형] 대조 표현 [${matchedComp.slice(0, 2).join(', ')}] 활용! 과거와 현재의 차이점을 논리정연하게 대조했습니다.`;
                } else {
                    fbTenseMsg = `💡 [비교/대조형] ${pastStr}${conjStr}. "Compared to the past...", "I used to..., but now..." 같은 대조 구문을 활용하면 AL 취득에 유리합니다.`;
                }
            } else if (isRoleplayQ) {
                if (matchedRoleplay.length >= 1) {
                    fbTenseMsg = `★ [롤플레이형] 문제해결/질문 표현 [${matchedRoleplay.slice(0, 2).join(', ')}] 활용! 원어민 수준의 자연스러운 상황 대화체입니다.`;
                } else {
                    fbTenseMsg = `💡 [롤플레이형] ${pastStr}. 상대방에게 문의하는 공손한 의문문("Could you tell me...?")이나 대안 제시("How about...?")를 구사해 보세요.`;
                }
            } else {
                if (pastCount >= 4 || matchedConj.length >= 2) {
                    fbTenseMsg = `★ ${pastStr}${conjStr} 감지. 시제 일관성과 복합 문장 구성 능력이 우수합니다.`;
                } else {
                    fbTenseMsg = `${pastStr}${conjStr}. 명확한 주어-동사 호응과 다양한 접속사 활용이 권장됩니다.`;
                }
            }

            // Fluency
            const fillerStr = fillerCount > 0 ? `필러 ${fillerCount}회 [${matchedFillers.slice(0, 2).join(', ')}]` : `필러 0회`;
            const connStr = matchedConnectors.length > 0 ? `, 전환사 [${matchedConnectors.slice(0, 2).join(', ')}]` : '';
            if (fillerCount >= 2 || matchedConnectors.length >= 2) {
                fbFluencyMsg = `★ ${fillerStr}${connStr} 활용! 원어민 특유의 자연스러운 호흡과 담화 연결성을 보여줍니다.`;
            } else {
                fbFluencyMsg = `${fillerStr}${connStr}. 문장 사이 머뭇거릴 때 "You know", "Actually", "I mean" 등의 필러를 자연스럽게 얹어보세요.`;
            }
        }

        return {
            grade,
            gradeCode,
            composite,
            wordCount,
            duration,
            wpm,
            uniqueWords,
            ttr: Math.round(ttr * 100),
            pastCount,
            fillerCount,
            volumeScore,
            vocabScore,
            tenseScore,
            fluencyScore,
            fbVolumeMsg,
            fbVocabMsg,
            fbTenseMsg,
            fbFluencyMsg
        };
    }

    renderEvaluationDrawer(res) {
        if (!res) return;
        this.ui.estGrade.textContent = `AI 예측 등급: ${res.grade}`;

        if (this.ui.barVolume) this.ui.barVolume.style.width = `${res.volumeScore}%`;
        if (this.ui.fbVolume) this.ui.fbVolume.textContent = res.fbVolumeMsg;

        if (this.ui.barVocab) this.ui.barVocab.style.width = `${res.vocabScore}%`;
        if (this.ui.fbVocab) this.ui.fbVocab.textContent = res.fbVocabMsg;

        if (this.ui.barTense) this.ui.barTense.style.width = `${res.tenseScore}%`;
        if (this.ui.fbTense) this.ui.fbTense.textContent = res.fbTenseMsg;

        if (this.ui.barFluency) this.ui.barFluency.style.width = `${res.fluencyScore}%`;
        if (this.ui.fbFluency) this.ui.fbFluency.textContent = res.fbFluencyMsg;

        this.ui.feedbackDrawer.classList.remove('hidden');
        this.ui.feedbackDrawer.scrollIntoView({ behavior: 'smooth' });
    }

    evaluateUserAnswer() {
        this.saveCurrentAnswer();
        const text = (this.ui.transcriptInput ? this.ui.transcriptInput.value : "").trim();
        const qIdx = this.currentQuestionIndex;
        const duration = (this.questionAnswers[qIdx] && this.questionAnswers[qIdx].duration) ? this.questionAnswers[qIdx].duration : this.responseSeconds;
        const qData = this.activeExamPaper[qIdx] || null;

        const res = this.computeEvaluation(text, duration, qData);
        this.evaluations[qIdx] = res;
        if (this.questionAnswers[qIdx]) {
            this.questionAnswers[qIdx].evaluation = res;
        }

        this.renderEvaluationDrawer(res);
    }

    getGradeClass(gradeCode) {
        switch(gradeCode) {
            case 'AL': return 'grade-al';
            case 'IH': return 'grade-ih';
            case 'IM3':
            case 'IM2':
            case 'IM1': return 'grade-im';
            default: return 'grade-novice';
        }
    }

    renderFinalReport() {
        // Collect answered questions
        const answers = this.questionAnswers || [];
        const answeredItems = answers.filter(a => a && (a.audioBlob || (a.transcript && a.transcript.length > 0)));
        const totalRecordings = answers.filter(a => a && a.audioBlob).length;
        const totalDuration = answers.reduce((sum, a) => sum + (a && a.duration ? a.duration : 0), 0);
        const totalWords = answers.reduce((sum, a) => sum + (a && a.evaluation ? a.evaluation.wordCount : (a && a.transcript ? a.transcript.split(/\s+/).filter(w => w.length > 0).length : 0)), 0);

        // Update Summary Pills
        if (this.ui.recCompletedCount) this.ui.recCompletedCount.textContent = `${totalRecordings} / 15`;
        if (this.ui.recTotalDuration) {
            const m = Math.floor(totalDuration / 60);
            const s = totalDuration % 60;
            this.ui.recTotalDuration.textContent = `${m}분 ${s}초`;
        }
        if (this.ui.recTotalWords) this.ui.recTotalWords.textContent = `${totalWords}단어`;

        // Empty state check
        if (answeredItems.length === 0) {
            this.ui.finalGradeText.textContent = "NL";
            this.ui.finalGradeSub.textContent = "⚠️ 답변 기록이 없습니다. 시뮬레이터를 실행하여 녹음을 진행해 주세요.";
            if (this.ui.statVolume) this.ui.statVolume.textContent = "0 / 100";
            if (this.ui.statVocab) this.ui.statVocab.textContent = "0 / 100";
            if (this.ui.statPast) this.ui.statPast.textContent = "0 / 100";
            if (this.ui.statFiller) this.ui.statFiller.textContent = "0 / 100";
            this.renderArchiveList();
            return;
        }

        // Aggregate scores across answered questions
        const validEvals = answeredItems.map(a => a.evaluation).filter(e => e && e.wordCount > 0);
        const evalCount = validEvals.length > 0 ? validEvals.length : 1;

        const avgVolume = Math.round(validEvals.reduce((s, e) => s + e.volumeScore, 0) / evalCount);
        const avgVocab = Math.round(validEvals.reduce((s, e) => s + e.vocabScore, 0) / evalCount);
        const avgPast = Math.round(validEvals.reduce((s, e) => s + e.tenseScore, 0) / evalCount);
        const avgFluency = Math.round(validEvals.reduce((s, e) => s + e.fluencyScore, 0) / evalCount);
        const avgComposite = Math.round(validEvals.reduce((s, e) => s + e.composite, 0) / evalCount);
        const avgWords = Math.round(totalWords / Math.max(1, answeredItems.length));

        // Determine Final OPIc Grade
        let finalGrade = "IM2";
        if (totalWords >= 650 && avgComposite >= 80 && totalRecordings >= 10) {
            finalGrade = "AL";
        } else if (totalWords >= 450 && avgComposite >= 70 && totalRecordings >= 8) {
            finalGrade = "IH";
        } else if (totalWords >= 280 && avgComposite >= 58) {
            finalGrade = "IM3";
        } else if (totalWords >= 160 && avgComposite >= 48) {
            finalGrade = "IM2";
        } else if (totalWords >= 80) {
            finalGrade = "IM1 / IL";
        } else {
            finalGrade = "Novice";
        }

        this.ui.finalGradeText.textContent = finalGrade;
        this.ui.finalGradeSub.textContent = `평균 발화량 ${avgWords}단어 | 종합 평가 ${avgComposite}점 (완료: ${totalRecordings}/15문항)`;

        if (this.ui.statVolume) this.ui.statVolume.textContent = `${avgVolume} / 100`;
        if (this.ui.statVocab) this.ui.statVocab.textContent = `${avgVocab} / 100`;
        if (this.ui.statPast) this.ui.statPast.textContent = `${avgPast} / 100`;
        if (this.ui.statFiller) this.ui.statFiller.textContent = `${avgFluency} / 100`;

        // Render Archive List for all 15 questions
        this.renderArchiveList();
    }

    renderArchiveList() {
        if (!this.ui.archiveListContainer) return;
        this.ui.archiveListContainer.innerHTML = "";

        for (let i = 0; i < 15; i++) {
            const ans = this.questionAnswers[i] || {};
            const q = (this.activeExamPaper && this.activeExamPaper[i]) ? this.activeExamPaper[i] : {
                id: i + 1,
                category: "일반 OPIc 문항",
                tag: `Question ${i + 1}`,
                question: "Question prompt not loaded.",
                kor: "(질문 내용이 로드되지 않았습니다.)"
            };

            const hasAudio = !!ans.audioBlob;
            const transcriptText = ans.transcript || "";
            const hasText = transcriptText.length > 0;
            const evalObj = ans.evaluation || null;
            const qNum = String(i + 1).padStart(2, '0');

            const card = document.createElement('div');
            card.className = "archive-card";

            const gradeClass = evalObj ? this.getGradeClass(evalObj.gradeCode) : 'grade-novice';
            const gradeLabel = evalObj ? evalObj.gradeCode : (hasAudio || hasText ? '평가중' : '미응답');

            // Audio Player & Download Row
            let audioRowHtml = "";
            if (hasAudio) {
                audioRowHtml = `
                    <div class="q-audio-row">
                        <audio controls src="${ans.audioUrl}" class="archive-audio"></audio>
                        <a href="${ans.audioUrl}" download="OPIC_Q${qNum}_Answer.webm" class="q-download-btn">
                            <i class="fa-solid fa-download"></i> Q${qNum} 녹음본 다운로드 (.webm)
                        </a>
                    </div>
                `;
            } else {
                audioRowHtml = `
                    <div class="q-audio-row" style="background: rgba(255,255,255,0.02); justify-content: space-between;">
                        <span class="no-rec-msg"><i class="fa-regular fa-circle-xmark"></i> 녹음된 음성이 없습니다.</span>
                    </div>
                `;
            }

            // Metrics chips
            let metricsHtml = "";
            if (evalObj) {
                metricsHtml = `
                    <div class="q-metrics-row">
                        <span class="metric-chip"><i class="fa-solid fa-font text-blue"></i> 발화량: <strong>${evalObj.wordCount}단어</strong></span>
                        <span class="metric-chip"><i class="fa-solid fa-stopwatch text-green"></i> 발화시간: <strong>${ans.duration || 0}초</strong></span>
                        <span class="metric-chip"><i class="fa-solid fa-gauge-high text-yellow"></i> 속도: <strong>${evalObj.wpm} WPM</strong></span>
                        <span class="metric-chip"><i class="fa-solid fa-book-open text-purple"></i> 고유 어휘: <strong>${evalObj.uniqueWords}개</strong></span>
                        <span class="metric-chip"><i class="fa-solid fa-comments text-blue"></i> 필러: <strong>${evalObj.fillerCount}회</strong></span>
                    </div>
                `;
            }

            // Transcript box
            const transcriptHtml = hasText
                ? `<div class="q-transcript-box"><div class="q-transcript-label">내 음성 답변 스크립트:</div>"${transcriptText}"</div>`
                : `<div class="q-transcript-box" style="opacity: 0.5;"><div class="q-transcript-label">음성 답변 스크립트:</div>(인식된 텍스트가 없습니다)</div>`;

            card.innerHTML = `
                <div class="card-top-row">
                    <div class="q-badge-box">
                        <span class="q-pill">Q ${qNum}</span>
                        <span class="q-category-tag">${q.category} &bull; ${q.tag}</span>
                    </div>
                    <span class="q-grade-badge ${gradeClass}">${gradeLabel}</span>
                </div>
                <div class="q-text-prompt">
                    "${q.question}"
                    <span style="font-size: 13px; color: var(--text-sub); display: block; margin-top: 4px; font-weight: 400;">${q.kor}</span>
                </div>
                ${metricsHtml}
                ${audioRowHtml}
                ${transcriptHtml}
            `;

            this.ui.archiveListContainer.appendChild(card);
        }
    }

    // Bulk Download 1: All 15 Audio Files as a ZIP
    downloadAllRecordingsZip() {
        const answers = this.questionAnswers || [];
        const recordedItems = answers.filter(a => a && a.audioBlob);

        if (recordedItems.length === 0) {
            alert("다운로드할 음성 녹음본이 없습니다!\n시뮬레이터에서 마이크를 켜고 문제를 푼 뒤 다시 시도해 주세요.");
            return;
        }

        // Summary report text to include inside ZIP
        let summaryText = `=======================================================\n` +
                          `  OPIc AI Master - 15문항 전체 답변 녹음 및 성적 리포트\n` +
                          `=======================================================\n` +
                          `최종 예측 등급: ${this.ui.finalGradeText ? this.ui.finalGradeText.textContent : '--'}\n` +
                          `녹음 완료 문항: ${recordedItems.length} / 15\n` +
                          `생성 일시: ${new Date().toLocaleString()}\n\n`;

        for (let i = 0; i < 15; i++) {
            const ans = answers[i];
            const q = this.activeExamPaper[i] || { question: `Question ${i + 1}`, kor: "", category: "일반" };
            const qNum = String(i + 1).padStart(2, '0');
            const evalObj = ans ? ans.evaluation : null;

            summaryText += `-------------------------------------------------------\n` +
                           `[Q${qNum}] ${q.category}\n` +
                           `질문: ${q.question}\n` +
                           `해석: ${q.kor}\n` +
                           `내 답변 스크립트:\n${(ans && ans.transcript) ? ans.transcript : '(음성 답변 없음)'}\n` +
                           `소요 시간: ${(ans && ans.duration) ? ans.duration : 0}초 | 발화 단어수: ${evalObj ? evalObj.wordCount : 0}단어 | 등급: ${evalObj ? evalObj.grade : '--'}\n\n`;
        }

        // Check if JSZip library is loaded
        if (typeof JSZip !== 'undefined') {
            const zip = new JSZip();
            const folder = zip.folder("OPIC_15_Voice_Answers");

            recordedItems.forEach(item => {
                const qNum = String(item.questionIndex + 1).padStart(2, '0');
                const qData = this.activeExamPaper[item.questionIndex];
                const cleanCat = qData ? qData.category.replace(/[^a-zA-Z0-9가-힣]/g, '_').slice(0, 15) : 'Answer';
                const ext = (item.audioBlob && item.audioBlob.type && item.audioBlob.type.includes('mp4')) ? 'mp4' : 'webm';
                folder.file(`Q${qNum}_${cleanCat}_VoiceAnswer.${ext}`, item.audioBlob);
            });

            folder.file("OPIC_15Questions_Transcript_Report.txt", summaryText);

            zip.generateAsync({ type: "blob" }).then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `OPIC_15_Answer_Recordings_${new Date().toISOString().slice(0, 10)}.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }).catch(err => {
                console.error("ZIP Generation Error:", err);
                this.sequentialDownloadFallback(recordedItems);
            });
        } else {
            console.warn("JSZip not found, initiating sequential download fallback");
            this.sequentialDownloadFallback(recordedItems);
        }
    }

    // Fallback: Sequential download if JSZip is offline or blocked
    sequentialDownloadFallback(items) {
        items.forEach((item, index) => {
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = item.audioUrl;
                link.download = `OPIC_Q${String(item.questionIndex + 1).padStart(2, '0')}_VoiceAnswer.webm`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, index * 300);
        });
    }

    // Bulk Download 2: All 15 Transcripts as TXT File
    downloadAllTranscriptsTxt() {
        const answers = this.questionAnswers || [];
        let textContent = `=======================================================\n` +
                          `  OPIc AI Master - 15문항 전체 텍스트 스크립트 리포트\n` +
                          `=======================================================\n` +
                          `AI 종합 예측 등급: ${this.ui.finalGradeText ? this.ui.finalGradeText.textContent : '--'}\n` +
                          `총 발화 시간: ${this.ui.recTotalDuration ? this.ui.recTotalDuration.textContent : '--'}\n` +
                          `총 발화 단어수: ${this.ui.recTotalWords ? this.ui.recTotalWords.textContent : '--'}\n` +
                          `생성 일시: ${new Date().toLocaleString()}\n\n`;

        for (let i = 0; i < 15; i++) {
            const ans = answers[i];
            const q = this.activeExamPaper[i] || { question: `Question ${i + 1}`, kor: "", category: "일반", modelAnswer: "" };
            const qNum = String(i + 1).padStart(2, '0');
            const evalObj = ans ? ans.evaluation : null;

            textContent += `=======================================================\n` +
                           `[Question ${qNum}] ${q.category} - ${q.tag || ''}\n` +
                           `=======================================================\n` +
                           `[질문] ${q.question}\n` +
                           `[해석] ${q.kor}\n\n` +
                           `[내 답변 스크립트]\n${(ans && ans.transcript) ? ans.transcript : '(답변 기록 없음)'}\n\n` +
                           `[답변 지표]\n` +
                           `- 소요 시간: ${(ans && ans.duration) ? ans.duration : 0}초\n` +
                           `- 발화 단어수: ${evalObj ? evalObj.wordCount : 0} 단어\n` +
                           `- 발화 속도: ${evalObj ? evalObj.wpm : 0} WPM\n` +
                           `- 어휘 다양성: ${evalObj ? evalObj.uniqueWords : 0}개 고유 어휘\n` +
                           `- 필러 표현: ${evalObj ? evalObj.fillerCount : 0}회\n` +
                           `- 예상 등급: ${evalObj ? evalObj.grade : '--'}\n\n` +
                           `[AL/IH 모범 답안 (Model Answer)]\n${q.modelAnswer}\n\n\n`;
        }

        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `OPIC_15Questions_Full_Transcripts_${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    startTotalTimer() {
        if (this.totalTimerInterval) clearInterval(this.totalTimerInterval);
        this.totalSecondsLeft = 40 * 60;
        if (this.ui.totalTimer) this.ui.totalTimer.textContent = "40:00";

        this.totalTimerInterval = setInterval(() => {
            if (this.totalSecondsLeft > 0) {
                this.totalSecondsLeft--;
                const mins = String(Math.floor(this.totalSecondsLeft / 60)).padStart(2, '0');
                const secs = String(this.totalSecondsLeft % 60).padStart(2, '0');
                if (this.ui.totalTimer) this.ui.totalTimer.textContent = `${mins}:${secs}`;
            } else {
                clearInterval(this.totalTimerInterval);
                alert("40분 시험 시간이 종료되었습니다! 최종 성적 리포트로 이동합니다.");
                this.renderFinalReport();
                this.switchSection('stats-section', document.getElementById('nav-stats'));
            }
        }, 1000);
    }
}

// Instantiate App
document.addEventListener('DOMContentLoaded', () => {
    window.opicApp = new OpicSimulatorApp();
});
