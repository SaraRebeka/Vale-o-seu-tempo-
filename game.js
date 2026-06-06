// ── DADOS DO JOGO ────────────────────────────────────────────

const scenes = [
  {
    chapter: "MANHÃ · 06:00",
    title: "O alarme tocou",
    text: "São 6h da manhã. O alarme toca. Você tem uma hora livre antes do trabalho. O dia inteiro depende de como você começa.",
    choices: [
      {
        text: "Ficar na cama rolando o celular",
        icon: "📱",
        cost: "1h · prazer imediato",
        type: "distraction",
        feedback: "Fácil de justificar, difícil de abandonar. Esse hábito consome em média 2h por dia da maioria das pessoas — sem perceber."
      },
      {
        text: "Fazer uma caminhada curta",
        icon: "🚶",
        cost: "1h · corpo e mente",
        type: "care",
        feedback: "Movimento pela manhã aumenta foco e bem-estar. Você investiu em você."
      },
      {
        text: "Ler um livro com café",
        icon: "📖",
        cost: "1h · aprendizado",
        type: "growth",
        feedback: "30 páginas por dia = 12 livros por ano. Um hábito pequeno com impacto enorme."
      }
    ]
  },
  {
    chapter: "MANHÃ · 10:00",
    title: "Pausa no trabalho",
    text: "Você tem 20 minutos de pausa. Seus colegas foram tomar café juntos, mas você está com uma tarefa importante pela metade.",
    choices: [
      {
        text: "Ir com os colegas",
        icon: "👥",
        cost: "20min · conexão",
        type: "social",
        feedback: "Relacionamentos no trabalho importam. Você trocou produtividade por vínculo — um tradeoff válido."
      },
      {
        text: "Continuar trabalhando",
        icon: "💼",
        cost: "20min · entrega",
        type: "work",
        feedback: "Foco tem valor, mas pausas também. Trabalhar sem parar reduz a qualidade ao longo do dia."
      },
      {
        text: "Sair para tomar ar fresco sozinho",
        icon: "☀️",
        cost: "20min · recarga",
        type: "care",
        feedback: "Tempo solo consciente é diferente de isolamento. Você escolheu se recarregar."
      }
    ]
  },
  {
    chapter: "TARDE · 13:00",
    title: "A hora do almoço",
    text: "Você tem 1 hora de almoço. Pode comer rápido e ganhar tempo, ou desacelerar de verdade.",
    choices: [
      {
        text: "Comer na frente do computador",
        icon: "💻",
        cost: "0min · eficiência",
        type: "work",
        feedback: "Pausa? Qual pausa? Seu cérebro precisava de descanso — e não teve."
      },
      {
        text: "Almoçar com calma, sem tela",
        icon: "🥗",
        cost: "1h · presença",
        type: "care",
        feedback: "Comer com atenção melhora digestão, humor e foco. Uma pausa de verdade vale mais do que parece."
      },
      {
        text: "Usar a hora para um curso online",
        icon: "🎓",
        cost: "1h · futuro",
        type: "growth",
        feedback: "Você está construindo algo. Mas lembre: descanso também é produtivo."
      }
    ]
  },
  {
    chapter: "NOITE · 19:00",
    title: "Fim do expediente",
    text: "O dia de trabalho acabou. Você tem a noite livre. São suas horas — o que vai fazer com elas?",
    choices: [
      {
        text: "Maratonar séries até tarde",
        icon: "📺",
        cost: "3h · entretenimento",
        type: "distraction",
        feedback: "Descanso é legítimo, mas séries até tarde roubam sono — o recurso mais subestimado da vida."
      },
      {
        text: "Jantar em família / com amigos",
        icon: "❤️",
        cost: "2h · vínculos",
        type: "social",
        feedback: "No fim da vida, as pessoas raramente se arrependem de ter passado tempo com quem amam."
      },
      {
        text: "Praticar um hobby criativo",
        icon: "🎨",
        cost: "2h · criação",
        type: "growth",
        feedback: "Criar algo — seja o que for — alimenta uma parte de você que o trabalho raramente alcança."
      }
    ]
  },
  {
    chapter: "NOITE · 22:00",
    title: "A última hora do dia",
    text: "Falta uma hora para dormir. Como você fecha o dia?",
    choices: [
      {
        text: "Rolar o Instagram na cama",
        icon: "📸",
        cost: "1h · escapismo",
        type: "distraction",
        feedback: "A luz azul e o scroll infinito atrapalham o sono. Seu cérebro merecia um encerramento melhor."
      },
      {
        text: "Escrever sobre o dia (diário)",
        icon: "✍️",
        cost: "30min · reflexão",
        type: "growth",
        feedback: "Quem escreve sobre o próprio dia tende a viver com mais intenção. Você fechou o ciclo."
      },
      {
        text: "Ler algo leve e dormir cedo",
        icon: "🌙",
        cost: "1h · recuperação",
        type: "care",
        feedback: "Sono de qualidade é a base de tudo. Uma boa noite de sono muda o dia seguinte inteiro."
      }
    ]
  }
];

const typeLabels = {
  distraction: "Distração",
  care:        "Autocuidado",
  growth:      "Crescimento",
  social:      "Conexão",
  work:        "Trabalho"
};

const reflections = {
  distraction: "Você passou bastante tempo em piloto automático — redes sociais, séries, o scroll sem fim. Isso é humano, mas vale perguntar: essas horas te nutrem de verdade?",
  care:        "Você priorizou seu bem-estar com consciência. Descanso e autocuidado não são luxo — são a base para tudo mais que você quer construir.",
  growth:      "Você investiu em aprendizado e criação. Pequenos hábitos consistentes moldam quem você vai ser em 5 anos.",
  social:      "Você valorizou as pessoas ao seu redor. Conexões humanas são o maior preditor de felicidade de longo prazo.",
  work:        "Você se dedicou às entregas. Mas lembre: eficiência sem recarga tem um prazo de validade. Cuide também de você."
};

// ── ESTADO ───────────────────────────────────────────────────

let state = {
  scene:        0,
  choices:      [],
  showFeedback: false,
  selectedIdx:  null
};

// ── ELEMENTOS DO DOM ─────────────────────────────────────────

const progressWrap  = document.getElementById("progress-wrap");
const progressFill  = document.getElementById("progress-fill");
const progressText  = document.getElementById("progress-text");
const sceneCard     = document.getElementById("scene-card");
const chapterTag    = document.getElementById("chapter-tag");
const sceneTitle    = document.getElementById("scene-title");
const sceneText     = document.getElementById("scene-text");
const choicesEl     = document.getElementById("choices");
const feedbackBox   = document.getElementById("feedback-box");
const btnNext       = document.getElementById("btn-next");
const resultCard    = document.getElementById("result-card");
const resultSub     = document.getElementById("result-sub");
const statsGrid     = document.getElementById("stats-grid");
const reflectionBox = document.getElementById("reflection-box");
const btnRestart    = document.getElementById("btn-restart");

// ── FUNÇÕES AUXILIARES ────────────────────────────────────────

function getDominantType(choices) {
  const count = {};
  choices.forEach(c => {
    count[c.type] = (count[c.type] || 0) + 1;
  });
  return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
}

function getTypeCounts(choices) {
  const count = {};
  choices.forEach(c => {
    count[c.type] = (count[c.type] || 0) + 1;
  });
  return count;
}

// ── RENDER DA CENA ───────────────────────────────────────────

function renderScene() {
  const scene = scenes[state.scene];
  const pct   = Math.round((state.scene / scenes.length) * 100);

  progressText.textContent = `${state.scene}/${scenes.length} MOMENTOS`;
  progressFill.style.width = `${pct}%`;

  chapterTag.textContent = scene.chapter;
  sceneTitle.textContent = scene.title;
  sceneText.textContent  = scene.text;

  choicesEl.innerHTML = "";
  scene.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerHTML = `
      <span class="choice-icon">${choice.icon}</span>
      <span>${choice.text}</span>
      <span class="choice-cost">${choice.cost}</span>
    `;
    btn.addEventListener("click", () => handleChoice(i));
    choicesEl.appendChild(btn);
  });

  feedbackBox.classList.add("hidden");
  btnNext.classList.add("hidden");
}

// ── INTERAÇÕES ────────────────────────────────────────────────

function handleChoice(index) {
  const scene  = scenes[state.scene];
  const choice = scene.choices[index];

  state.choices.push(choice);
  state.selectedIdx  = index;
  state.showFeedback = true;

  // Desabilita botões após escolha
  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = "0.4";
  });

  feedbackBox.textContent = choice.feedback;
  feedbackBox.classList.remove("hidden");
  btnNext.classList.remove("hidden");
}

function handleNext() {
  state.scene++;
  state.showFeedback = false;
  state.selectedIdx  = null;

  if (state.scene >= scenes.length) {
    renderResult();
  } else {
    renderScene();
  }
}

// ── RENDER DO RESULTADO ───────────────────────────────────────

function renderResult() {
  sceneCard.classList.add("hidden");
  progressWrap.classList.add("hidden");
  resultCard.classList.remove("hidden");

  const total   = state.choices.length;
  const domType = getDominantType(state.choices);
  const counts  = getTypeCounts(state.choices);

  resultSub.textContent = `Você tomou ${total} decisões sobre o seu tempo`;

  statsGrid.innerHTML = Object.entries(counts)
    .map(([type, n]) => `
      <div class="stat-box">
        <div class="stat-label">${typeLabels[type]}</div>
        <div class="stat-val">${n} escolha${n > 1 ? "s" : ""}</div>
      </div>
    `)
    .join("");

  reflectionBox.textContent = reflections[domType];
}

// ── REINICIAR ─────────────────────────────────────────────────

function restartGame() {
  state = { scene: 0, choices: [], showFeedback: false, selectedIdx: null };

  resultCard.classList.add("hidden");
  progressWrap.classList.remove("hidden");
  sceneCard.classList.remove("hidden");

  renderScene();
}

// ── EVENT LISTENERS ───────────────────────────────────────────

btnNext.addEventListener("click", handleNext);
btnRestart.addEventListener("click", restartGame);

// ── INÍCIO ────────────────────────────────────────────────────

renderScene();