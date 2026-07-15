/* ========================================
   IELTS SIMULATOR JS
   ======================================== */

// ===== EXAM DATA =====
const examData = {
  listening: {
    title: "Listening - Comprension Auditiva",
    desc: "Escucha el audio (lee el contexto) y responde las preguntas. Tienes 30 minutos.",
    timeMinutes: 30,
    questions: [
      {
        part: "Part 1 - Conversacion cotidiana",
        context: "Listen to a conversation between a woman and a hotel receptionist about booking a room.\n\nWoman: Good morning, I'd like to book a room for three nights, please.\nReceptionist: Certainly, madam. When would you like to stay?\nWoman: From the 15th to the 18th of March.\nReceptionist: Let me check... We have a single room available at $85 per night, or a twin room at $110.\nWoman: I think a single room would be fine. Is breakfast included?\nReceptionist: Yes, breakfast is included. We serve it from 7 to 10 AM in the dining room on the ground floor.\nWoman: Perfect. My name is Sarah Collins.\nReceptionist: Could you spell your surname, please?\nWoman: C-O-L-L-I-N-S.\nReceptionist: Thank you, Ms Collins. Your confirmation number is HT-4521.",
        type: "fill",
        question: "What is the woman's surname?",
        answer: "Collins",
        explanation: "The woman spells her surname: C-O-L-L-I-N-S."
      },
      {
        part: "Part 1 - Conversacion cotidiana",
        type: "fill",
        question: "How many nights will the woman stay?",
        answer: "3",
        acceptableAnswers: ["3", "three"],
        explanation: "The woman says 'I'd like to book a room for three nights'."
      },
      {
        part: "Part 1 - Conversacion cotidiana",
        type: "multiple",
        question: "How much does the single room cost per night?",
        options: ["A) $75", "B) $85", "C) $110"],
        correctIndex: 1,
        explanation: "The receptionist says 'We have a single room available at $85 per night'."
      },
      {
        part: "Part 1 - Conversacion cotidiana",
        type: "multiple",
        question: "What time does breakfast finish?",
        options: ["A) 7:00 AM", "B) 9:00 AM", "C) 10:00 AM"],
        correctIndex: 2,
        explanation: "The receptionist says 'We serve it from 7 to 10 AM'."
      },
      {
        part: "Part 2 - Monologo",
        context: "Listen to a guide talking about the new community centre.\n\nGood morning, everyone, and welcome to the new Riverside Community Centre. This facility opened just two months ago and has already become very popular. The centre has three main floors. On the ground floor, you'll find the reception area, a small cafe, and a library with over 5,000 books. The first floor has four classrooms where we offer courses in computing, languages, and art. The second floor contains a fully equipped gym and two squash courts. Membership costs $30 per month for adults and $15 for students. The centre is open Monday to Saturday, from 8 AM to 9 PM, and on Sundays from 10 AM to 5 PM.",
        type: "multiple",
        question: "How many floors does the community centre have?",
        options: ["A) Two", "B) Three", "C) Four"],
        correctIndex: 1,
        explanation: "The guide says 'The centre has three main floors'."
      },
      {
        part: "Part 2 - Monologo",
        type: "fill",
        question: "How many books does the library contain?",
        answer: "5000",
        acceptableAnswers: ["5000", "5,000", "over 5,000"],
        explanation: "The guide says 'a library with over 5,000 books'."
      },
      {
        part: "Part 2 - Monologo",
        type: "multiple",
        question: "How much does an adult membership cost per month?",
        options: ["A) $15", "B) $25", "C) $30"],
        correctIndex: 2,
        explanation: "The guide says 'Membership costs $30 per month for adults'."
      },
      {
        part: "Part 3 - Discusion academica",
        context: "Listen to two students discussing their research project on urban gardening.\n\nStudent A: So, I've been looking at the benefits of urban gardening. Did you know that community gardens can reduce stress levels by up to 20%?\nStudent B: That's impressive. I found something similar - there was a study in Melbourne that showed people who gardened regularly had lower blood pressure.\nStudent A: Right. And what about the environmental benefits? I think we should mention that urban gardens help reduce the urban heat island effect.\nStudent B: Definitely. Also, they improve air quality. But we need to be careful with our sources - Professor Green said we need at least 15 academic references.\nStudent A: I've got 12 so far. I'll look for more this weekend.\nStudent B: Good. Let's meet again on Tuesday to combine our findings.",
        type: "multiple",
        question: "According to Student A, by how much can community gardens reduce stress levels?",
        options: ["A) Up to 10%", "B) Up to 15%", "C) Up to 20%"],
        correctIndex: 2,
        explanation: "Student A says 'community gardens can reduce stress levels by up to 20%'."
      },
      {
        part: "Part 3 - Discusion academica",
        type: "fill",
        question: "How many academic references does Professor Green require?",
        answer: "15",
        acceptableAnswers: ["15", "fifteen"],
        explanation: "Student B says 'Professor Green said we need at least 15 academic references'."
      },
      {
        part: "Part 4 - Conferencia academica",
        context: "Listen to a lecture about the history of coffee.\n\nCoffee is one of the world's most popular beverages, but its history is surprisingly recent. The earliest credible evidence of coffee drinking dates back to the 15th century, in the Sufi shrines of Yemen. Coffee cultivation first took place in the Arabian Peninsula, and for centuries, the Arab world maintained a monopoly on coffee production. The Dutch were the first to successfully cultivate coffee outside of Arabia, establishing plantations in their colonies in Java and Sumatra in the 17th century. By the 18th century, coffee had become one of the world's most profitable export commodities. Today, Brazil is the world's largest producer, growing approximately one-third of the global supply.",
        type: "multiple",
        question: "Where did the earliest evidence of coffee drinking come from?",
        options: ["A) Brazil", "B) Java", "C) Yemen"],
        correctIndex: 2,
        explanation: "The lecture says 'The earliest credible evidence of coffee drinking dates back to the 15th century, in the Sufi shrines of Yemen'."
      },
      {
        part: "Part 4 - Conferencia academica",
        type: "fill",
        question: "Which country is the world's largest coffee producer today?",
        answer: "Brazil",
        acceptableAnswers: ["Brazil", "brazil"],
        explanation: "The lecture says 'Today, Brazil is the world's largest producer'."
      }
    ]
  },
  reading: {
    title: "Reading - Comprension Lectora",
    desc: "Lee los textos cuidadosamente y responde las preguntas. Tienes 60 minutos.",
    timeMinutes: 60,
    questions: [
      {
        type: "passage",
        title: "The Rise of Remote Working",
        text: "The concept of working from home, once considered a rare privilege, has become increasingly mainstream in recent years. The COVID-19 pandemic accelerated this trend dramatically, forcing millions of employees worldwide to adapt to remote work almost overnight. While some predicted this would be a temporary measure, many companies have since adopted permanent hybrid working models.\n\nResearch suggests that remote work offers numerous benefits. A study by Stanford University found that remote workers were 13% more productive than their office-based counterparts. Employees also reported higher job satisfaction, citing reduced commuting stress and better work-life balance. However, the transition has not been without challenges. Isolation, communication difficulties, and the blurring of boundaries between work and personal life are common complaints among remote workers.\n\nDespite these drawbacks, the trend appears irreversible. A recent survey of 500 large companies found that 78% intended to maintain some form of remote working policy. The implications for commercial real estate are significant, with many experts predicting a long-term decline in demand for traditional office space. Urban planners are also reconsidering city layouts, as fewer daily commuters could reshape transportation patterns and reduce congestion in city centres."
      },
      {
        type: "multiple",
        question: "According to the Stanford University study, remote workers were ___ more productive than office workers.",
        options: ["A) 10%", "B) 13%", "C) 15%"],
        correctIndex: 1,
        explanation: "The text states 'A study by Stanford University found that remote workers were 13% more productive'."
      },
      {
        type: "tfng",
        question: "Remote workers reported lower job satisfaction than office workers.",
        options: ["True", "False", "Not Given"],
        correctIndex: 1,
        explanation: "The text says 'Employees also reported higher job satisfaction', so the statement is False."
      },
      {
        type: "tfng",
        question: "The COVID-19 pandemic made remote work more common.",
        options: ["True", "False", "Not Given"],
        correctIndex: 0,
        explanation: "The text states 'The COVID-19 pandemic accelerated this trend dramatically'."
      },
      {
        type: "tfng",
        question: "Most companies plan to completely eliminate office space within five years.",
        options: ["True", "False", "Not Given"],
        correctIndex: 2,
        explanation: "The text says companies 'intended to maintain some form of remote working policy' but doesn't mention eliminating office space completely."
      },
      {
        type: "passage",
        title: "Ocean Plastic Pollution",
        text: "Plastic pollution in the world's oceans has emerged as one of the most pressing environmental challenges of the 21st century. An estimated 8 million tonnes of plastic enter the oceans each year, threatening marine ecosystems and biodiversity. The Great Pacific Garbage Patch, a massive accumulation of plastic debris located between Hawaii and California, now covers an area approximately three times the size of France.\n\nThe impact on marine life is severe. Over 800 species are affected by plastic pollution through ingestion, entanglement, or habitat destruction. Sea turtles often mistake plastic bags for jellyfish, one of their primary food sources. Seabirds feed plastic fragments to their chicks, leading to starvation. Microplastics — tiny fragments less than 5mm in size — have been found in the digestive systems of fish consumed by humans, raising concerns about potential health risks.\n\nAddressing this crisis requires a multi-pronged approach. Many countries have introduced bans on single-use plastics, while innovative technologies are being developed to clean ocean garbage patches. However, experts argue that prevention is more effective than cleanup. Reducing plastic production at the source, improving waste management systems in developing countries, and developing biodegradable alternatives are essential strategies for tackling this global problem."
      },
      {
        type: "multiple",
        question: "How much plastic enters the oceans each year?",
        options: ["A) 5 million tonnes", "B) 8 million tonnes", "C) 10 million tonnes"],
        correctIndex: 1,
        explanation: "The text states 'An estimated 8 million tonnes of plastic enter the oceans each year'."
      },
      {
        type: "tfng",
        question: "The Great Pacific Garbage Patch is larger than France.",
        options: ["True", "False", "Not Given"],
        correctIndex: 0,
        explanation: "The text says it 'covers an area approximately three times the size of France'."
      },
      {
        type: "tfng",
        question: "Microplastics have been found in human blood.",
        options: ["True", "False", "Not Given"],
        correctIndex: 2,
        explanation: "The text mentions microplastics in fish consumed by humans, but doesn't mention human blood specifically."
      },
      {
        type: "multiple",
        question: "What do experts say is more effective than ocean cleanup?",
        options: ["A) Education", "B) Prevention", "C) Legislation"],
        correctIndex: 1,
        explanation: "The text states 'experts argue that prevention is more effective than cleanup'."
      },
      {
        type: "passage",
        title: "The History of Maps",
        text: "Cartography, the art and science of map-making, has a rich history spanning thousands of years. The earliest known maps date back to ancient Babylon, around 2300 BC, when clay tablets depicted simple geographical features. The ancient Greeks made significant advances in cartography, with figures like Eratosthenes calculating the Earth's circumference with remarkable accuracy around 240 BC.\n\nThe Middle Ages saw a period of stagnation in map-making, with many European maps being primarily religious rather than geographical in nature. The 'T-O maps' of this period divided the world into three continents — Asia, Europe, and Africa — with Jerusalem at the centre. It was not until the Renaissance that cartography experienced a revival, driven by the Age of Exploration. Portuguese and Spanish navigators commissioned increasingly accurate maps to support their voyages to the Americas and around Africa to Asia.\n\nThe invention of the printing press in the 15th century revolutionised cartography, making maps widely available for the first time. Gerardus Mercator's famous 1569 world map introduced the cylindrical projection that remains in widespread use today, despite its well-known distortions of landmass sizes near the poles. Modern cartography has been transformed by satellite technology and Geographic Information Systems (GIS), enabling unprecedented levels of accuracy and detail."
      },
      {
        type: "multiple",
        question: "When were the earliest known maps created?",
        options: ["A) Around 2300 BC", "B) Around 240 BC", "C) Around 1569 AD"],
        correctIndex: 0,
        explanation: "The text states 'The earliest known maps date back to ancient Babylon, around 2300 BC'."
      },
      {
        type: "tfng",
        question: "Medieval European maps were mainly used for navigation.",
        options: ["True", "False", "Not Given"],
        correctIndex: 1,
        explanation: "The text says they 'were primarily religious rather than geographical in nature'."
      },
      {
        type: "multiple",
        question: "What invention made maps widely available for the first time?",
        options: ["A) The compass", "B) The printing press", "C) Satellite technology"],
        correctIndex: 1,
        explanation: "The text states 'The invention of the printing press in the 15th century revolutionised cartography, making maps widely available'."
      },
      {
        type: "tfng",
        question: "Mercator's projection shows landmass sizes accurately near the poles.",
        options: ["True", "False", "Not Given"],
        correctIndex: 1,
        explanation: "The text says it has 'well-known distortions of landmass sizes near the poles'."
      }
    ]
  },
  writing: {
    title: "Writing - Expresion Escrita",
    desc: "Escribe tus respuestas en los campos de texto. El word count se actualiza en tiempo real.",
    timeMinutes: 60,
    questions: [
      {
        type: "writing",
        task: 1,
        title: "Task 1 - Describir un grafico",
        prompt: "The bar chart below shows the percentage of people using different modes of transport to travel to work in four cities in 2024.\n\n[Bar Chart Data]\n- City A: Car 45%, Public Transport 35%, Bicycle 12%, Walking 8%\n- City B: Car 30%, Public Transport 50%, Bicycle 10%, Walking 10%\n- City C: Car 55%, Public Transport 20%, Bicycle 8%, Walking 17%\n- City D: Car 25%, Public Transport 40%, Bicycle 25%, Walking 10%\n\nWrite a report describing the main features and make comparisons where relevant.\nWrite at least 150 words.",
        minWords: 150,
        sampleAnswer: "The bar chart illustrates the proportion of commuters using four different modes of transport — car, public transport, bicycle, and walking — across four cities in 2024.\n\nOverall, cars were the most popular mode of transport in Cities A and C, while public transport dominated in Cities B and D. City D showed the highest rate of cycling among all four cities.\n\nIn City C, car usage was the highest at 55%, compared to City D where it was the lowest at 25%. Public transport was most commonly used in City B, accounting for half of all commuters, while in City C it was used by only 20% of people.\n\nCycling showed significant variation between cities. City D had the highest proportion of cyclists at 25%, which was more than double that of City A (12%) and three times that of City C (8%). Walking was most popular in City C at 17%, while the other three cities showed similar rates of between 8% and 10%.\n\nIn conclusion, there were considerable differences in transport preferences across the four cities, with public transport and cycling being more popular in Cities B and D respectively.",
        wordCount: 0
      },
      {
        type: "writing",
        task: 2,
        title: "Task 2 - Ensayo de opinion",
        prompt: "Some people believe that technology is making children less creative and less able to think independently. Others argue that technology provides children with more opportunities to learn and develop new skills.\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words.",
        minWords: 250,
        sampleAnswer: "The impact of technology on children's creativity and independent thinking has been a subject of considerable debate. While some argue that excessive screen time diminishes creative abilities, others believe that technology offers unprecedented learning opportunities.\n\nThose who oppose the widespread use of technology by children present several compelling arguments. Firstly, children who spend hours on devices may become passive consumers of content rather than active creators. The instant gratification provided by video games and social media can reduce the patience required for creative pursuits such as writing, painting, or problem-solving. Furthermore, studies have shown that excessive screen time can shorten attention spans, making it more difficult for children to engage in deep, independent thinking. For instance, a child accustomed to quick entertainment may struggle with tasks that require sustained concentration.\n\nOn the other hand, technology can be a powerful tool for fostering creativity. Applications such as digital art software, music production tools, and coding platforms give children access to creative tools that were previously unavailable. Online resources provide tutorials and inspiration that can help children develop new skills at their own pace. Moreover, collaborative platforms allow children to share their work with others and receive feedback, which can enhance their learning experience. For example, a child interested in filmmaking can use free editing software to create and share videos with a global audience.\n\nIn my opinion, technology itself is neither beneficial nor harmful — it depends entirely on how it is used. With proper guidance and balanced screen time, technology can complement traditional creative activities rather than replace them.\n\nIn conclusion, while there are legitimate concerns about technology's impact on children, I believe that when used wisely, it can enhance rather than diminish their creative and intellectual development.",
        wordCount: 0
      }
    ]
  },
  speaking: {
    title: "Speaking - Expresion Oral",
    desc: "Practica tus respuestas en voz alta. Usa el cronometro para medir tu tiempo.",
    timeMinutes: 14,
    questions: [
      {
        type: "speaking",
        part: "Part 1 - Entrevista",
        prompt: "Responde estas preguntas en voz alta. Intenta dar 2-3 oraciones por respuesta.",
        questions: [
          "Where are you from? Can you describe your hometown?",
          "What do you do for a living or for studies?",
          "Do you enjoy your work/studies? Why or why not?",
          "What do you usually do in your free time?",
          "Do you prefer to spend time indoors or outdoors? Why?"
        ]
      },
      {
        type: "speaking",
        part: "Part 2 - Cue Card",
        cueCard: {
          topic: "Describe a place you would like to visit",
          points: [
            "Where it is located",
            "How you learned about it",
            "What you would do there",
            "Why you want to visit this place"
          ]
        },
        prepTime: 60,
        speakTime: 120,
        sampleAnswer: "I'd like to visit Iceland, which is a small island nation in the North Atlantic Ocean. I first learned about it through a nature documentary that showcased its stunning landscapes, including glaciers, geysers, and volcanic terrain.\n\nIf I visited Iceland, I would love to see the Northern Lights, which are visible from September to March. I would also visit the Blue Lagoon, a famous geothermal spa, and go on a glacier hike. Additionally, I'd like to explore the capital city, Reykjavik, and try traditional Icelandic cuisine.\n\nI want to visit Iceland because it offers a completely different environment from what I'm used to. The combination of dramatic natural scenery, unique geological features, and rich cultural heritage makes it an ideal destination for someone who loves adventure and nature."
      },
      {
        type: "speaking",
        part: "Part 3 - Discusion",
        prompt: "Responde estas preguntas con mayor profundidad. Intenta dar opiniones, razones y ejemplos.",
        questions: [
          "Why do you think people enjoy traveling to new places?",
          "How has tourism changed in recent years?",
          "Do you think virtual travel can replace real travel? Why or why not?",
          "What problems can mass tourism cause in popular destinations?",
          "How might travel change in the next 50 years?"
        ]
      }
    ]
  }
};

// ===== STATE =====
let currentSection = null;
let currentQuestion = 0;
let answers = {};
let timerInterval = null;
let timeRemaining = 0;

// ===== FUNCTIONS =====

function startSection(section) {
  currentSection = section;
  currentQuestion = 0;
  answers = {};
  const data = examData[section];

  document.getElementById('heroSection').style.display = 'none';
  document.getElementById('examContainer').classList.add('active');
  document.getElementById('sectionTitle').textContent = data.title;
  document.getElementById('sectionDesc').textContent = data.desc;

  // Start timer
  timeRemaining = data.timeMinutes * 60;
  document.getElementById('navTimer').style.display = 'flex';
  startTimer();
  renderQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      submitSection();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const min = Math.floor(timeRemaining / 60);
  const sec = timeRemaining % 60;
  document.getElementById('timerDisplay').textContent = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  const box = document.getElementById('timerBox');
  box.className = 'timer-box ' + (timeRemaining > 300 ? 'green' : timeRemaining > 60 ? 'yellow' : 'red');
  document.getElementById('timerStatus').textContent = timeRemaining > 300 ? 'En curso' : timeRemaining > 60 ? 'Poco tiempo' : 'Ultimo minuto!';
}

function renderQuestion() {
  const data = examData[currentSection];
  const q = data.questions[currentQuestion];
  const total = data.questions.length;
  const progress = ((currentQuestion + 1) / total) * 100;
  document.getElementById('examProgress').style.width = progress + '%';

  const container = document.getElementById('questionsContainer');
  let html = '';

  if (q.type === 'passage') {
    currentQuestion++;
    renderQuestion();
    return;
  }

  // Show part header if different from previous
  if (q.part) {
    html += `<div style="background:var(--primary); color:white; padding:12px 20px; border-radius:10px; margin-bottom:20px; font-weight:600;">${q.part}</div>`;
  }

  // Show passage for reading section
  if (currentSection === 'reading' && q.type !== 'writing' && q.type !== 'speaking') {
    for (let i = currentQuestion - 1; i >= 0; i--) {
      if (data.questions[i].type === 'passage') {
        html += `<div class="passage"><span class="passage-title">${data.questions[i].title}</span>${data.questions[i].text.replace(/\n/g, '<br>')}</div>`;
        break;
      }
    }
  }

  // Show context for listening
  if (q.context) {
    html += `<div class="question-context">${q.context.replace(/\n/g, '<br>')}</div>`;
  }

  html += `<div class="question-card">`;
  html += `<div class="question-num">Pregunta ${currentQuestion + 1} de ${total}</div>`;
  html += `<div class="question-text">${q.question || ''}</div>`;

  if (q.type === 'multiple' || q.type === 'tfng') {
    html += `<div class="options">`;
    q.options.forEach((opt, i) => {
      const selected = answers[currentSection + '_' + currentQuestion] === i ? ' selected' : '';
      html += `<div class="option${selected}" onclick="selectOption(${i})">
        <div class="option-letter">${String.fromCharCode(65 + i)}</div>
        <span>${opt}</span>
      </div>`;
    });
    html += `</div>`;
  }

  if (q.type === 'fill') {
    const val = answers[currentSection + '_' + currentQuestion] || '';
    html += `<div class="fill-blank">
      <input type="text" placeholder="Escribe tu respuesta..." value="${val}" oninput="fillAnswer(this.value)">
    </div>`;
  }

  if (q.type === 'writing') {
    const key = 'writing_task' + q.task;
    const val = answers[key] || '';
    const wc = val.trim() ? val.trim().split(/\s+/).length : 0;
    html += `<div class="passage" style="max-height:200px;">
      <span class="passage-title">${q.title}</span>
      ${q.prompt.replace(/\n/g, '<br>')}
    </div>`;
    html += `<textarea class="writing-textarea" placeholder="Escribe tu respuesta aqui..." oninput="updateWordCount(this, ${q.minWords}, 'task${q.task}')">${val}</textarea>`;
    html += `<div class="word-count" id="wordCount_task${q.task}">${wc} / ${q.minWords} palabras minimo</div>`;
  }

  if (q.type === 'speaking') {
    if (q.part === 'Part 2 - Cue Card' && q.cueCard) {
      html += `<div class="cue-card">
        <h3>${q.cueCard.topic}</h3>
        <p style="font-weight:600; margin-bottom:8px;">You should say:</p>
        <ul>${q.cueCard.points.map(p => `<li><strong>${p}</strong></li>`).join('')}</ul>
        <p style="margin-top:12px; font-size:0.85rem; color:var(--text-secondary);">Prep time: ${q.cueCard.prepTime}s | Speak time: ${q.cueCard.speakTime}s</p>
      </div>`;
      html += `<div class="speaking-timer">
        <button class="speak-btn record" onclick="startSpeakingTimer(${q.cueCard.speakTime})" id="speakBtn">🎤</button>
        <div class="speak-time" id="speakDisplay">${Math.floor(q.cueCard.speakTime / 60)}:${String(q.cueCard.speakTime % 60).padStart(2,'0')}</div>
      </div>`;
    } else {
      html += `<div style="background:var(--bg); padding:20px; border-radius:12px; margin-bottom:20px;">
        <p style="font-weight:600; margin-bottom:12px;">${q.part}</p>
        <p style="color:var(--text-secondary); margin-bottom:16px;">${q.prompt}</p>
        <ul style="padding-left:20px;">
          ${q.questions.map(question => `<li style="margin-bottom:8px; padding:8px 12px; background:white; border-radius:8px; border-left:3px solid var(--accent);">${question}</li>`).join('')}
        </ul>
      </div>`;
      html += `<textarea class="writing-textarea" placeholder="Escribe tus respuestas aqui (para practicar la estructura)..." oninput="updateWordCount(this, 0, 'speaking_${currentQuestion}')" style="min-height:150px;">${answers['speaking_' + currentQuestion] || ''}</textarea>`;
    }
  }

  html += `</div>`;
  container.innerHTML = html;

  // Update buttons
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.style.display = currentQuestion === total - 1 ? 'inline-flex' : 'none';

  document.querySelector('.btn-secondary').style.display = currentQuestion > 0 ? 'inline-flex' : 'none';
}

function selectOption(index) {
  answers[currentSection + '_' + currentQuestion] = index;
  renderQuestion();
}

function fillAnswer(value) {
  answers[currentSection + '_' + currentQuestion] = value;
}

function updateWordCount(textarea, minWords, key) {
  answers[key] = textarea.value;
  const words = textarea.value.trim() ? textarea.value.trim().split(/\s+/).length : 0;
  const el = document.getElementById('wordCount_' + key);
  if (el) {
    el.textContent = `${words} / ${minWords} palabras minimo`;
    el.className = words >= minWords ? 'word-count' : 'word-count warning';
  }
}

let speakTimerInterval = null;
function startSpeakingTimer(seconds) {
  clearInterval(speakTimerInterval);
  let remaining = seconds;
  const display = document.getElementById('speakDisplay');
  const btn = document.getElementById('speakBtn');
  btn.className = 'speak-btn stop';
  btn.textContent = '⏹';

  speakTimerInterval = setInterval(() => {
    remaining--;
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    display.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if (remaining <= 0) {
      clearInterval(speakTimerInterval);
      display.textContent = '00:00';
      btn.className = 'speak-btn record';
      btn.textContent = '🎤';
      alert('Tiempo terminado! En el examen real, esta es la duracion maxima para tu respuesta.');
    }
  }, 1000);
}

function nextQuestion() {
  const total = examData[currentSection].questions.length;
  if (currentQuestion < total - 1) {
    currentQuestion++;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function submitSection() {
  clearInterval(timerInterval);
  clearInterval(speakTimerInterval);

  const data = examData[currentSection];
  let correct = 0;
  let total = 0;
  const reviews = [];

  data.questions.forEach((q, i) => {
    if (q.type === 'passage' || q.type === 'writing' || q.type === 'speaking') return;
    total++;
    const key = currentSection + '_' + i;
    const userAnswer = answers[key];
    let isCorrect = false;

    if (q.type === 'multiple') {
      isCorrect = userAnswer === q.correctIndex;
      reviews.push({
        question: q.question,
        userAnswer: userAnswer !== undefined ? q.options[userAnswer] : 'Sin respuesta',
        correctAnswer: q.options[q.correctIndex],
        isCorrect: isCorrect,
        explanation: q.explanation
      });
    } else if (q.type === 'tfng') {
      isCorrect = userAnswer === q.correctIndex;
      reviews.push({
        question: q.question,
        userAnswer: userAnswer !== undefined ? q.options[userAnswer] : 'Sin respuesta',
        correctAnswer: q.options[q.correctIndex],
        isCorrect: isCorrect,
        explanation: q.explanation
      });
    } else if (q.type === 'fill') {
      const acceptable = q.acceptableAnswers || [q.answer];
      isCorrect = userAnswer && acceptable.some(a => a.toLowerCase() === userAnswer.toLowerCase().trim());
      reviews.push({
        question: q.question,
        userAnswer: userAnswer || 'Sin respuesta',
        correctAnswer: q.answer,
        isCorrect: isCorrect,
        explanation: q.explanation
      });
    }

    if (isCorrect) correct++;
  });

  // Calculate band score
  const percent = total > 0 ? (correct / total) * 100 : 0;
  let band;
  if (percent >= 95) band = 9;
  else if (percent >= 85) band = 8;
  else if (percent >= 75) band = 7;
  else if (percent >= 65) band = 6;
  else if (percent >= 55) band = 5;
  else if (percent >= 45) band = 4.5;
  else if (percent >= 35) band = 4;
  else if (percent >= 25) band = 3;
  else band = 2;

  // Show results
  document.getElementById('examContainer').classList.remove('active');
  document.getElementById('resultsSection').classList.add('active');
  document.getElementById('navTimer').style.display = 'none';

  const scoreClass = band >= 7 ? 'excellent' : band >= 5 ? 'good' : band >= 4 ? 'ok' : 'poor';

  let html = `
    <div class="score-circle ${scoreClass}">
      <span>${band}</span>
      <span class="label">Band Score</span>
    </div>
    <h3 style="text-align:center; font-size:1.3rem; margin-bottom:8px;">${data.title}</h3>
    <p style="text-align:center; color:var(--text-secondary); margin-bottom:32px;">${correct} de ${total} respuestas correctas (${Math.round(percent)}%)</p>

    <div class="answer-review">
      <h3>📝 Revision de respuestas</h3>
      ${reviews.map((r, i) => `
        <div class="review-item ${r.isCorrect ? 'correct' : 'incorrect'}">
          <div class="q">${i + 1}. ${r.question}</div>
          <div class="a">
            Tu respuesta: <strong>${r.userAnswer}</strong>
            ${!r.isCorrect ? ` | Respuesta correcta: <strong>${r.correctAnswer}</strong>` : ''}
          </div>
          <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:4px; font-style:italic;">${r.explanation}</div>
        </div>
      `).join('')}
    </div>
  `;

  // Add writing sample answers if writing section
  if (currentSection === 'writing') {
    html += `<div style="margin-top:32px;">
      <h3 style="font-size:1.3rem; font-weight:700; margin-bottom:16px;">📊 Respuesta modelo (para comparar)</h3>`;
    data.questions.filter(q => q.type === 'writing').forEach(q => {
      html += `<div class="question-card">
        <div class="question-num">Task ${q.task}</div>
        <div class="question-text">${q.title}</div>
        <div style="background:var(--bg); padding:16px; border-radius:10px; font-size:0.9rem; line-height:1.8; white-space:pre-line;">${q.sampleAnswer}</div>
      </div>`;
    });
    html += `</div>`;
  }

  document.getElementById('resultsContent').innerHTML = html;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!currentSection) return;
  if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
  if (e.key === 'ArrowRight') nextQuestion();
  if (e.key === 'ArrowLeft') prevQuestion();
});
