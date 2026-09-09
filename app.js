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
    }
};

// 🚨 Unexpected Topics Pool (서베이 미선택 돌발 주제 - 5개 이상의 콤보 세트로 확장!)
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
    }
];

// 🎭 Role-Play Combo Pools (Q11 ~ Q13)
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
    }
];

// 🔥 Advanced Social Issues & Trends (Q14 ~ Q15)
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

            // TTS Volume & Progress Bar UI
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
            mobileNextBtn: document.getElementById('mobile-next-btn')
        };

        this.ttsVolume = 0.3; // Default 30% quiet & comfortable volume
        this.isMuted = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.initSpeechRecognition();
    }

    bindEvents() {
        // [1안] TTS Volume Slider Listener (Real-Time Mid-Speech Volume Update)
        if (this.ui.ttsVolumeSlider) {
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

                // If TTS is currently speaking, restart speech immediately at the new volume level!
                if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
                    this.speakQuestion();
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
                const targetId = btn.id.replace('nav-', '') + '-section';
                if (targetId === 'stats-section') {
                    if (this.isRecording) this.stopRecording();
                    this.saveCurrentAnswer();
                    this.renderFinalReport();
                }
                this.switchSection(targetId, btn);
            });
        });

        // Survey Radio Option Select
        document.querySelectorAll('.survey-radio').forEach(radio => {
            radio.addEventListener('click', () => {
                const groupName = radio.querySelector('input').name;
                document.querySelectorAll(`input[name="${groupName}"]`).forEach(inp => {
                    inp.parentElement.classList.remove('checked');
                });
                radio.classList.add('checked');
                radio.querySelector('input').checked = true;
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

        // Topic Checkbox Toggle
        document.querySelectorAll('.topic-checkbox').forEach(cb => {
            cb.addEventListener('click', () => {
                const input = cb.querySelector('input');
                input.checked = !input.checked;
                cb.classList.toggle('checked', input.checked);
            });
        });

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

        // Question TTS Play
        this.ui.listenQBtn.addEventListener('click', () => {
            this.speakQuestion();
        });

        // Next Question Button - Auto-Save and commit answer
        const handleNextQuestion = () => {
            if (this.isRecording) {
                this.stopRecording();
            }
            this.saveCurrentAnswer();

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
                this.speakQuestion();
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
        const topic2Key = shuffledUserTopics[1] || (shuffledUserTopics[0] !== "park" ? "park" : "travel");

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
        this.ui.sections.forEach(sec => sec.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');

        this.ui.navBtns.forEach(b => b.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
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
        const qObj = (this.activeExamPaper && this.activeExamPaper[this.currentQuestionIndex]) ? this.activeExamPaper[this.currentQuestionIndex] : null;
        const text = qObj ? qObj.question : "";
        if (!text) return;

        let targetVol = 0.5;
        if (this.isMuted) {
            targetVol = 0;
        } else if (typeof this.ttsVolume === 'number' && !isNaN(this.ttsVolume)) {
            targetVol = this.ttsVolume;
        }

        // Stop any previous speech audio player
        if (this.ttsAudioPlayer) {
            try { this.ttsAudioPlayer.pause(); } catch(e) {}
            this.ttsAudioPlayer = null;
        }

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        // 1. Primary Engine: Web Speech Synthesis API
        if ('speechSynthesis' in window) {
            try {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                utterance.rate = 0.95;
                utterance.volume = Math.max(0, Math.min(1.0, targetVol));

                let hasStarted = false;
                if (this.ui.evaWave) this.ui.evaWave.style.opacity = '1';

                utterance.onstart = () => {
                    hasStarted = true;
                };

                utterance.onend = () => {
                    if (this.ui.evaWave) this.ui.evaWave.style.opacity = '0';
                };

                utterance.onerror = (e) => {
                    console.warn("SpeechSynthesis error, playing audio fallback:", e);
                    if (this.ui.evaWave) this.ui.evaWave.style.opacity = '0';
                    this.playAudioFallback(text, targetVol);
                };

                window.speechSynthesis.speak(utterance);

                // Fallback check after 400ms if SpeechSynthesis failed to start
                setTimeout(() => {
                    if (!hasStarted && (!window.speechSynthesis.speaking || window.speechSynthesis.paused)) {
                        console.warn("SpeechSynthesis silent, triggering audio fallback");
                        this.playAudioFallback(text, targetVol);
                    }
                }, 400);
                return;
            } catch(e) {
                console.warn("SpeechSynthesis exception:", e);
            }
        }

        // 2. Fallback Engine: High-quality TTS Audio Stream
        this.playAudioFallback(text, targetVol);
    }

    playAudioFallback(text, volume) {
        try {
            const encodedText = encodeURIComponent(text);
            const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodedText}`;
            
            if (this.ttsAudioPlayer) {
                try { this.ttsAudioPlayer.pause(); } catch(e) {}
            }
            
            this.ttsAudioPlayer = new Audio(ttsUrl);
            this.ttsAudioPlayer.volume = Math.max(0, Math.min(1.0, volume));
            
            if (this.ui.evaWave) this.ui.evaWave.style.opacity = '1';
            this.ttsAudioPlayer.onended = () => {
                if (this.ui.evaWave) this.ui.evaWave.style.opacity = '0';
            };
            this.ttsAudioPlayer.onerror = (e) => {
                console.warn("Audio fallback error:", e);
                if (this.ui.evaWave) this.ui.evaWave.style.opacity = '0';
            };

            this.ttsAudioPlayer.play().catch(e => {
                console.warn("Audio playback exception:", e);
                if (this.ui.evaWave) this.ui.evaWave.style.opacity = '0';
            });
        } catch(err) {
            console.error("playAudioFallback failure:", err);
        }
    }

    toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    startRecording() {
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

        // C. Tense & Syntax Score (20%)
        let tenseScore = 0;
        if (wordCount === 0) {
            tenseScore = 0;
        } else {
            const isExperienceQ = questionObj && (
                questionObj.tag?.includes("경험") ||
                questionObj.question?.toLowerCase().includes("memorable") ||
                questionObj.question?.toLowerCase().includes("past") ||
                questionObj.question?.toLowerCase().includes("happened")
            );

            let pastPts = Math.min(isExperienceQ ? 55 : 35, pastCount * (isExperienceQ ? 9 : 6));
            let conjPts = Math.min(35, matchedConj.length * 9);
            let modalPts = Math.min(25, modals.length * 6);
            tenseScore = Math.min(100, pastPts + conjPts + modalPts + 10);
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

            // Tense
            const pastStr = pastCount > 0 ? `과거동사 ${pastCount}개` : `과거동사 미검출`;
            const conjStr = matchedConj.length > 0 ? `, 접속사 [${matchedConj.slice(0, 2).join(', ')}]` : '';
            if (pastCount >= 4 || matchedConj.length >= 2) {
                fbTenseMsg = `★ ${pastStr}${conjStr} 감지. 시제 일관성과 복합 문장 구성 능력이 우수합니다.`;
            } else {
                fbTenseMsg = `${pastStr}${conjStr}. 과거 경험 질문에서는 시제 일관성 유지(went, had, felt 등)가 핵심 채점 요소입니다.`;
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

        this.totalTimerInterval = setInterval(() => {
            if (this.totalSecondsLeft > 0) {
                this.totalSecondsLeft--;
                const mins = String(Math.floor(this.totalSecondsLeft / 60)).padStart(2, '0');
                const secs = String(this.totalSecondsLeft % 60).padStart(2, '0');
                this.ui.totalTimer.textContent = `${mins}:${secs}`;
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
