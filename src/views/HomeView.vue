<template>
  <main>
    <header class="c-header">
      <div style="display: flex; gap: 4px">
        <DropdownGlobal
          ref="calendar"
          hide-indicator
          :change-name-on-select="false"
        >
          <SvgIcon name="Calendar" size="18" />
          <template v-slot:content>
            <div style="padding: 4px; display: flex; gap: 4px">
              <Button @click="skipBack" :disabled="currDay === 1">
                <SvgIcon name="SkipBack" size="18" />
              </Button>
              <Button @click="goToToday">
                <SvgIcon name="Target" size="18" />
              </Button>
              <Button @click="skipForward" :disabled="currDay === todayDay">
                <SvgIcon name="SkipForward" size="18" />
              </Button>
            </div>
          </template>
        </DropdownGlobal>
        <Button @click="showHelp = true">
          <SvgIcon name="Help" size="18" />
        </Button>
      </div>
      CrossTe #{{ currDay }}
      <CountDown v-show="false" @timeout="reload" />
      <div style="display: flex; gap: 4px">
        <Button @click="showAbout = true">
          <SvgIcon name="Support" size="18" />
        </Button>
        <Button @click="showStats = true">
          <SvgIcon name="Stats" size="18" />
        </Button>
      </div>
    </header>
    <p
      v-if="currDay !== todayDay"
      class="c-input--correct"
      style="
        margin: 4px 8px;
        padding: 2px 4px;
        border-radius: 4px;
        text-align: center;
        color: #fff;
      "
    >
      Visitando o passado! Os resultados não ficarão salvos.
    </p>

    <div class="c-board">
      <div class="c-input-group">
        <div v-for="i in 2" :key="i" class="c-input c-input--hide" />
        <div class="c-input c-input__label">1</div>
      </div>
      <div class="c-input-group" v-for="j in 2" :key="j">
        <div v-for="i in 2" :key="i" class="c-input c-input--hide" />
        <input
          readonly
          :id="`i-${j - 1}`"
          :ref="`i-${j - 1}`"
          class="c-input c-input--visible"
          @click="putFocus(j - 1)"
          :class="getStatusColor(0, j - 1)"
        />
      </div>
      <div class="c-input-group">
        <div class="c-input c-input__label">2</div>
        <input
          v-for="i in 5"
          :ref="i === 2 ? 'i-2' : `i-${i + 4}`"
          :id="i === 2 ? 'i-2' : `i-${i + 4}`"
          :key="i"
          :class="getStatusColor(1, i - 1)"
          class="c-input c-input--visible"
          readonly
          @click="putFocus(i === 2 ? 2 : i + 4)"
        />
      </div>
      <div class="c-input-group">
        <div v-for="i in 2" :key="i" class="c-input c-input--hide" />
        <input
          readonly
          id="i-3"
          ref="i-3"
          class="c-input c-input--visible"
          @click="putFocus(3)"
          :class="getStatusColor(0, 3)"
        />
      </div>
      <div class="c-input-group">
        <div class="c-input c-input--hide" />
        <div class="c-input c-input__label">3</div>
        <input
          readonly
          id="i-4"
          ref="i-4"
          class="c-input c-input--visible"
          @click="putFocus(4)"
          :class="getStatusColor(0, 4)"
        />
        <input
          readonly
          :id="`i-${i + 10}`"
          :ref="`i-${i + 10}`"
          @click="putFocus(i + 10)"
          v-for="i in 4"
          :key="`3-${i}`"
          class="c-input c-input--visible"
          :class="getStatusColor(2, i)"
        />
      </div>
    </div>
    <div class="c-keyboard">
      <div class="c-past" v-for="t in tries" :key="t" v-html="t" />
      <Keyboard ref="keyboard" @key-pressed="handleKey" />
    </div>

    <InstructionsModal
      v-if="showHelp"
      @close="showHelp = false"
      title="Instruções"
    />

    <Modal
      v-if="showEndGame || showStats"
      title="Progresso"
      @close="closeStats"
    >
      <div class="c-result__header">
        <div class="c-status">
          <span class="c-status__number">{{ stats.games }}</span>
          <span>Jogos</span>
        </div>
        <div class="c-status">
          <span class="c-status__number">{{ winsPercentage }}%</span>
          <span>de vitórias</span>
        </div>
      </div>
      <p style="margin-top: 8px; text-align: center">
        Distribuição de tentativas
      </p>
      <ol>
        <li v-for="i in 8" :key="i">
          <ProgressBar
            :value="stats?.history?.[i] || 0"
            :total="stats.games || 0"
          />
        </li>
      </ol>
      <ul>
        <li>
          <ProgressBar
            :value="stats?.history?.[9] || 0"
            :total="stats.games || 0"
          />
        </li>
      </ul>
      <div v-if="endGame && !won">
        <p>Você perdeu! 😩 As palavras eram:</p>
        <p>{{ word1 }} - {{ word2 }} - {{ word3 }}</p>
      </div>
      <div v-if="endGame && won">
        <p v-if="currDay === todayDay">Você ganhou hoje! 🎉</p>
        <p v-if="currDay !== todayDay">
          Você acertou essa, mas não vai contar no progresso, porque já passou!
          🎉
        </p>
      </div>
      <div
        style="
          margin-top: 16px;
          display: flex;
          gap: 8px;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div style="font-size: 11px; text-align: center">
          Próximo jogo em: <CountDown />
        </div>
        <div v-if="endGame" style="display: grid; grid-gap: 4px">
          <Button @click="copy"> Copiar resultado </Button>
          <Button @click="share"> Compartilhar </Button>
        </div>
      </div>
    </Modal>
    <GoogleAnalytics v-if="cookies" />
    <CookiesBanner v-if="cookies === null" @close="cookies = $event" />
    <AboutModal v-if="showAbout" @close="showAbout = false" />
  </main>
</template>
<script>
import words from "@/data/words.js";
import Keyboard from "@/components/Keyboard/Keyboard.vue";

import ProgressBar from "@/components/ProgressBar/ProgressBar.vue";
import CookiesBanner from "@/components/CookiesBanner/CookiesBanner.vue";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics.vue";
import CountDown from "@/components/CountDown/CountDown.vue";

import InstructionsModal from "@/components/InstructionsModal/InstructionsModal.vue";
import { chooseAnIndex } from "@/utils/array.js";
import { UAExplorer } from "@/utils/uaexplorer.js";
import AboutModal from "@/components/AboutModal/AboutModal.vue";
import { subDays, addDays } from "date-fns";

export default {
  name: "HomeView",
  components: {
    Keyboard,
    ProgressBar,
    AboutModal,
    CountDown,
    InstructionsModal,
    GoogleAnalytics,
    CookiesBanner,
  },
  data() {
    return {
      nextIndex: null,
      previousIndex: null,
      fromIndex: null,
      wordOne: {
        letters: [],
      },
      wordTwo: {
        letters: [],
      },
      wordThree: {
        letters: [],
      },
      keyboard: null,
      tries: [],
      correctMap: [],
      showHelp: false,
      showAbout: false,
      endGame: false,
      showEndGame: false,
      showStats: false,
      startDay: 0,
      stats: { games: 0, history: {}, wins: 0 },
      cookies: null,
      inUseDate: new Date(),
    };
  },
  computed: {
    todayDay() {
      const date1 = new Date("03/11/2022");
      const date2 = new Date();

      // To calculate the time difference of two dates
      const Difference_In_Time = date2.getTime() - date1.getTime();
      // To calculate the no. of days between two dates
      return Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
    },
    currDay() {
      const date1 = new Date("03/11/2022");
      const date2 = new Date(this.inUseDate);

      // To calculate the time difference of two dates
      const Difference_In_Time = date2.getTime() - date1.getTime();
      // To calculate the no. of days between two dates
      const result = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
      return result > this.todayDay ? this.todayDay : result;
    },
    word2() {
      return words[chooseAnIndex(words.length, this.inUseDate)];
    },
    first() {
      return words.filter((i) => i[2] === this.word2[1]);
    },
    word1() {
      return this.first[chooseAnIndex(this.first.length, this.inUseDate)];
    },
    third() {
      return words.filter((i) => i[0] === this.word1[4]);
    },
    word3() {
      return this.third[chooseAnIndex(this.third.length, this.inUseDate)];
    },
    won() {
      let status = true;
      this.correctMap.forEach((j) => {
        if (j.length < 5) {
          status = false;
        }

        const k = j.reduce((acc, item) => {
          acc = item?.status === 1 ? acc + 1 : acc;
          return acc;
        }, 0);

        if (k < 5) {
          status = false;
        }
      });

      return status;
    },
    winsPercentage() {
      return Math.ceil(
        ((this.stats.wins || 0) * 100) / (this.stats.games || 1)
      );
    },
  },
  created() {
    console.log("Um salve para o grupo Praia & Hipocrisia!");
    this.todayNumber = this.create();
  },
  mounted() {
    this.mount();
  },
  methods: {
    resetShots() {
      [...document.getElementsByClassName("c-input--visible")].forEach(
        (i) => (i.value = "")
      );

      if (this.currDay === this.todayDay) {
        this.create();
        this.mount();
      } else {
        this.wordOne = {
          letters: [],
        };
        this.wordTwo = {
          letters: [],
        };
        this.wordThree = {
          letters: [],
        };
        this.correctMap = [];
        this.$refs.keyboard.reset();
        this.endGame = false;
        this.tries = [];
      }
    },
    changeDay() {
      this.$refs.calendar.hide();
      this.resetShots();
      this.updateNextIndex(-1);
      this.putFocus(this.nextIndex);
      this.$toast.success("Você foi para o CrossTe #" + this.currDay);
    },
    goToToday() {
      this.inUseDate = new Date();
      this.changeDay();
    },
    skipBack() {
      this.inUseDate = subDays(new Date(this.inUseDate), 1);
      this.changeDay();
    },
    skipForward() {
      this.inUseDate = addDays(new Date(this.inUseDate), 1);
      this.changeDay();
    },
    getStatusColor(line, column) {
      return {
        "c-input--correct": this.isCorrect(line, column),
      };
    },
    isCorrect(line, column) {
      return this.correctMap?.[line]?.[column]?.status === 1;
    },
    reload() {
      document.location.reload();
    },
    mount() {
      this.startDay = this.currDay;
      if (this.keyboard) {
        this.$refs.keyboard.keyboard = this.keyboard;
      }
      if (this.correctMap.length) {
        this.correctMap.forEach((item, index) => {
          item.forEach((letter, i) => {
            let position = index === 0 ? i : index === 1 ? i + 5 : i + 10;
            if (position === 6) {
              position = 2;
            }
            if (position === 10) {
              position = 4;
            }
            if (letter?.status === 1) {
              const ref = this.$refs[`i-${position}`];
              const current = Array.isArray(ref) ? ref[0] : ref;
              current.value = letter.letter;
            }
          });
        });
      }
      this.updateNextIndex(-1);
      this.putFocus(this.nextIndex);
    },
    create() {
      const raw = localStorage.getItem("cross");
      let cross = null;
      if (raw) {
        cross = JSON.parse(raw);

        this.cookies = typeof cross.cookies === "boolean" || null;

        // Get currennt Game details
        if (cross.state.day === this.currDay) {
          this.tries = cross.state?.tries || [];
          this.keyboard = cross.state?.keyboard || null;
          this.correctMap = cross.state?.correctMap || [];
          this.wordOne = cross.state?.wordOne || {
            letters: [],
          };
          this.wordTwo = cross.state?.wordTwo || {
            letters: [],
          };
          this.wordThree = cross.state?.wordThree || {
            letters: [],
          };
          this.endGame = cross.state?.endGame || false;

          this.showEndGame = this.endGame;
          this.showStats = false;
        }
      } else {
        this.showHelp = true;
      }

      if (!raw || !cross || cross.state.day !== this.currDay) {
        cross = {
          ...cross,
          state: {
            day: this.currDay,
          },
          stats: {
            ...(cross?.stats || {}),
            games: (cross?.stats?.games || 0) + 1,
          },
        };
        if (this.currDay === this.todayDay) {
          localStorage.setItem("cross", JSON.stringify(cross));
        }
      }
      this.stats = cross?.stats || this.stats;
    },
    closeStats() {
      this.showEndGame = false;
      this.showStats = false;
    },
    getShareText() {
      const numberEmojis = [
        "0️⃣",
        "1️⃣",
        "2️⃣",
        "3️⃣",
        "4️⃣",
        "5️⃣",
        "6️⃣",
        "7️⃣",
        "8️⃣",
        "9️⃣",
      ];

      const t = [...this.tries]
        .map((i) =>
          i.split("c-published-position").filter((i) => i.includes("."))
        )
        .reduce(
          (acc, i, key) => {
            i.forEach((j) => {
              const index = parseInt(j.match(/\d+/g).join(""));
              const completed = j.match(/correct/g)?.length === 5;

              acc[index] = completed && acc[index] === null ? key : acc[index];
            });
            return acc;
          },
          { 1: null, 2: null, 3: null }
        );

      const art = Object.keys(t)
        .map(
          (key) =>
            `${numberEmojis[key]}➡️${
              t[key] === null ? "🟥" : numberEmojis[t[key] + 1]
            }`
        )
        .join("\n");

      return this.won
        ? `Joguei crosste.github.io #${this.currDay}\n\n${art}\n\nVenci com ${
            this.tries?.length
          } ${this.tries?.length === 1 ? "tentativa" : "tentativas"}!`
        : `Joguei crosste.github.io #${this.currDay}\n\n${art}\n\n Perdi, mas você pode ganhar!`;
    },
    copy() {
      this.$copyText(this.getShareText())
        .then(() => {
          this.$toast.success("Resultado copiado!");
        })
        .catch(() => {
          this.$toast.error("Não conseguimos copiar!");
        });
    },
    share() {
      const ua = UAExplorer(navigator.userAgent);

      const title = `Joguei CrossTe #${this.currDay}`;

      if (navigator.share && ua.browser !== "Firefox") {
        navigator
          .share({
            title,
            text: this.getShareText(),
          })
          .then(() => {
            console.log("Thanks for sharing!");
          })
          .catch(console.error);
      } else {
        this.copy();
      }
    },
    putFocus(index) {
      [...document.getElementsByClassName("c-input--visible")].forEach((i) =>
        i.classList.remove("c-input--focus")
      );
      const ref = this.$refs[`i-${index}`];
      const current = Array.isArray(ref) ? ref[0] : ref;

      if (!current.classList.contains("c-input--focus")) {
        current.classList.add("c-input--focus");
        current.focus();
      }
    },
    mountWord(kind, index, letter) {
      let word = 1;
      let key = index;
      switch (kind) {
        case 1:
          word = "wordOne";
          break;
        case 2:
          word = "wordTwo";
          key = key - 5;
          break;
        case 3:
          key = key - 10;

          word = "wordThree";
          break;
      }

      this[word].letters[key] = { letter, status: null };
      // Word Two cross word One
      if (index === 2) {
        this.wordTwo.letters[1] = { letter, status: null };
      }

      if (index === 4) {
        this.wordThree.letters[0] = { letter, status: null };
      }
    },
    updateNextIndex(i) {
      this.nextIndex = i === 5 ? 7 : i + 1;

      switch (i) {
        case 1:
          // Cross between word one and word two
          this.nextIndex = this.isCorrect(1, 1) ? 3 : 2;
          break;
        case 2:
          // Interception point between one and two
          this.nextIndex = this.previousIndex === 5 ? 7 : 3;
          break;
        case 4:
          // Interception point between one and three, and last point of word one
          this.nextIndex =
            this.previousIndex === null || this.previousIndex === 9 ? 11 : 5;
          break;
        case 5:
          // Cross between word two and word one
          this.nextIndex = this.isCorrect(0, 2) ? 7 : 2;
          break;
        case 9:
          // Last point of word two
          this.nextIndex = this.isCorrect(0, 4) ? 11 : 4;
          break;
        case 14:
          // Last point of word three
          this.nextIndex = 14;
          break;
      }

      let nextMapLine = 0;
      let nextMapColumn = 0;

      do {
        nextMapLine = this.nextIndex <= 4 ? 0 : this.nextIndex <= 9 ? 1 : 2;
        nextMapColumn =
          nextMapLine === 1
            ? this.nextIndex - 5
            : nextMapLine === 2
            ? this.nextIndex - 10
            : this.nextIndex;

        if (nextMapColumn < 0) {
          nextMapColumn = 0;
          nextMapLine = nextMapLine === 2 ? 0 : nextMapLine + 1;
        }

        if (this.isCorrect(nextMapLine, nextMapColumn)) {
          if (this.nextIndex === 9 || this.nextIndex === 5) {
            this.nextIndex++;
          }
          this.nextIndex++;
        }
        if (this.nextIndex > 14) {
          this.nextIndex = 14;
          return;
        }
      } while (this.isCorrect(nextMapLine, nextMapColumn));
    },
    keyup(i, $e) {
      let mapLine = i <= 4 ? 0 : i <= 9 ? 1 : 2;
      let mapColumn = mapLine === 1 ? i - 5 : mapLine === 2 ? i - 10 : i;

      if (mapColumn < 0) {
        mapColumn = 0;
        mapLine = mapLine === 2 ? 0 : mapLine + 1;
      }

      const ref = this.$refs[`i-${i}`];
      const current = Array.isArray(ref) ? ref[0] : ref;

      if (this.correctMap?.[mapLine]?.[mapColumn]?.status !== 1) {
        current.value = $e.data.toUpperCase();
      }

      this.updateNextIndex(i);
      const kind = i >= 0 && i <= 4 ? 1 : i >= 5 && i <= 9 ? 2 : 3;

      this.previousIndex = i;

      this.mountWord(kind, i, current.value);

      if ($e.inputType.toLowerCase() !== "deletecontentbackward") {
        this.putFocus(this.nextIndex);
      }
    },
    handleKey(key) {
      if (this.endGame) {
        this.showEndGame = true;
        return;
      }
      this.$nextTick(() => {
        let inputs = [...document.getElementsByClassName("c-input--focus")];
        if (!inputs.length) {
          this.updateNextIndex(-1);
          this.putFocus(this.nextIndex);
          inputs = [...document.getElementsByClassName("c-input--focus")];
        }
        const place = inputs[0];

        if (key === "DELETE")
          return this.handleDelete(parseInt(place.id.replace("i-", "")));
        if (key === "ENTER") return this.handleSubmit();

        this.keyup(parseInt(place.id.replace("i-", "")), {
          data: key,
          inputType: "insertText",
        });
      });
    },
    handleDelete(i) {
      let mapLine = i <= 4 ? 0 : i <= 9 ? 1 : 2;
      let mapColumn = mapLine === 1 ? i - 5 : mapLine === 2 ? i - 10 : i;

      if (mapColumn < 0) {
        mapColumn = 0;
        mapLine = mapLine === 2 ? 0 : mapLine + 1;
      }

      const ref = this.$refs[`i-${i}`];
      const current = Array.isArray(ref) ? ref[0] : ref;

      let previousIndex = i - 1;

      switch (i) {
        case 2:
          previousIndex = this.fromIndex === 7 ? 5 : 1;
          break;
        case 7:
          previousIndex = 2;
          break;
        case 11:
          previousIndex = 4;
          break;
      }

      if (current.value === "" && previousIndex >= 0) {
        let prevMapLine = previousIndex <= 4 ? 0 : previousIndex <= 9 ? 1 : 2;
        let prevMapColumn =
          prevMapLine === 1
            ? previousIndex - 5
            : prevMapLine === 2
            ? previousIndex - 10
            : previousIndex;

        if (prevMapColumn < 0) {
          prevMapColumn = 0;
          prevMapLine = prevMapLine === 2 ? 0 : prevMapLine + 1;
        }

        const prevRef = this.$refs[`i-${previousIndex}`];
        const previous = Array.isArray(prevRef) ? prevRef[0] : prevRef;

        if (!this.isCorrect(prevMapLine, prevMapColumn)) {
          previous.value = "";
          this.putFocus(previousIndex);
        } else {
          this.updateNextIndex(-1);
          this.putFocus(this.nextIndex);
        }
      }
      this.fromIndex = i;

      if (!this.isCorrect(mapLine, mapColumn)) {
        current.value = "";
      } else {
        this.updateNextIndex(-1);
        this.putFocus(this.nextIndex);
      }
    },
    handleSubmit() {
      if (this.endGame) {
        this.showEndGame = true;
        return;
      }

      if (
        this.wordOne.letters.filter((i) => i).length +
          this.wordTwo.letters.filter((i) => i).length +
          this.wordThree.letters.filter((i) => i).length <
        15
      ) {
        this.$toast.error("Você precisa preencher todos os quadros!");
        return;
      }

      const insertedWordsRaw = [this.wordOne, this.wordTwo, this.wordThree];

      const insertedWords = [
        this.wordOne.letters.map((i) => i?.letter || "").join(""),
        this.wordTwo.letters.map((i) => i?.letter || "").join(""),
        this.wordThree.letters.map((i) => i?.letter || "").join(""),
      ];

      const validWords = [this.word1, this.word2, this.word3];

      let invalids = [];

      insertedWords.forEach((word) => {
        if (!words.includes(word)) {
          invalids.push(word);
        }
      });

      if (invalids.length) {
        const phrase =
          invalids.length === 1
            ? `Não conheço a palavra ${invalids[0]}!`
            : invalids.length === 2
            ? `Não conheço as palavras ${invalids.join(" e ")}!`
            : `Não conheço as palavras ${invalids[0]}, ${invalids[1]} e ${invalids[2]}!`;
        this.$toast.error(phrase);
        return;
      }

      const validLetters = [
        ...new Set([...validWords[0], ...validWords[1], ...validWords[2]]),
      ].sort();

      const insertedLetters = [
        ...new Set([
          ...insertedWords[0],
          ...insertedWords[1],
          ...insertedWords[2],
        ]),
      ].sort();

      // Updates keyboard
      insertedLetters.forEach((x) => {
        this.$refs.keyboard.keyboard.find(
          (i) =>
            i.key === x &&
            (i.evaluation = !validLetters.includes(x) ? "absent" : "present")
        );
      });

      const tries = [];
      const wordsName = ["wordOne", "wordTwo", "wordThree"];
      this.correctMap = [
        ...[0, 1, 2].map((i) => {
          const validWord = [...validWords[i]];
          let validWordCheck = validWord.join("");
          let checkLatter = [];
          let set = [...insertedWordsRaw[i].letters].map((item, index) => {
            if (validWord[index] === item?.letter) {
              // The letter is in the right position
              tries[i] = [...(tries[i] || [])];
              tries[i][
                index
              ] = `<span class="c-published-letter c-input--correct">${item.letter}</span>`;

              item.status = 1;

              validWordCheck = validWordCheck.replace(item.letter, "");
            } else if (item?.letter) {
              const letter = item.letter;
              item = {
                ...(item || {}),
                letter,
                status: validLetters.includes(letter) ? 2 : 3,
              };
              tries[i] = [...(tries[i] || [])];
              checkLatter.push({ letter, index });

              const position =
                i === 0
                  ? index
                  : i === 1
                  ? index === 1
                    ? 2
                    : index + 5
                  : index === 0
                  ? 4
                  : index + 10;
              const ref = this.$refs[`i-${position}`];
              const current = Array.isArray(ref) ? ref[0] : ref;
              this[wordsName[i]].letters[index] = undefined;

              current.value = "";
            }
            return item;
          });
          checkLatter.forEach(({ letter, index }) => {
            let individualStatus = "absent";
            if (validWordCheck.includes(letter)) {
              individualStatus = "present";
              validWordCheck = validWordCheck.replace(letter, "");
            }
            tries[i][
              index
            ] = `<span class="c-published-letter c-input--${individualStatus}">${letter}</span>`;
          });
          return [...set];
        }),
      ];

      this.tries.push(
        `<span class="c-published-position">1.</span>${tries[0].join(
          ""
        )} <span class="c-published-position">2.</span>${tries[1].join(
          ""
        )}<span class="c-published-position">3.</span>${tries[2].join("")}`
      );

      if (this.tries.length === 8 || this.won) {
        this.endGame = true;
        this.showEndGame = true;
        if (this.won) {
          this.$toast.success("Você venceu!");
        }
      }
      this.updateNextIndex(-1);

      const state = {
        day: this.startDay,
        tries: this.tries,
        keyboard: this.$refs.keyboard.keyboard,
        correctMap: this.correctMap,
        wordOne: this.wordOne,
        wordTwo: this.wordTwo,
        wordThree: this.wordThree,
        endGame: this.endGame,
      };

      let cross = {};
      const raw = localStorage.getItem("cross");

      if (raw) {
        cross = JSON.parse(raw);
      }

      if (this.endGame && this.currDay === this.todayDay) {
        const stats = {
          wins: this.won
            ? (parseInt(cross?.stats?.wins) || 0) + 1
            : parseInt(cross?.stats?.wins) || 0,
          history: this.won
            ? {
                ...(cross?.stats?.history || {}),
                [this.tries.length]:
                  (cross?.stats?.history?.[this.tries.length] || 0) + 1,
              }
            : {
                ...(cross?.stats?.history || {}),
                [9]: (cross?.stats?.history?.[9] || 0) + 1,
              },
        };
        this.stats = stats;
        cross = {
          ...cross,
          stats: {
            ...(cross?.stats || {}),
            ...stats,
          },
        };
      }

      if (this.currDay === this.todayDay) {
        localStorage.setItem(
          "cross",
          JSON.stringify({
            ...cross,
            state,
          })
        );
      }
      this.stats = cross?.stats || this.stats;
      this.putFocus(this.nextIndex);
    },
  },
};
</script>
<style>
main {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}
.c-header {
  padding: 12px;
  font-size: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
}
.c-board {
  padding: 20px 0;
  display: grid;
  align-items: center;
  justify-content: center;
}
.c-input-group {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 2px;
  margin-bottom: 2px;
}

.c-false-key {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  display: inline-block;
  background-color: #fff;
  margin: 8px 0;
}

.c-input {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  font-size: 24px;
  text-align: center;
  display: inline-block;
  background-color: #fff;
}
.c-input:focus,
.c-input--focus {
  border-bottom: 4px;
  background-color: #aaa;
}
.c-input--hide {
  background-color: transparent;
  border: none;
  pointer-events: none;
  display: inline-block;
}
.c-input--correct {
  background-color: #3aa394;
}
.c-keyboard {
  bottom: 0;
  width: 100%;
  left: 0;
  margin-bottom: 60px;
  padding: 0 4px;
}
.c-keyboard__line {
  display: grid;
  width: 100%;
  grid-gap: 4px;
  grid-template-columns: repeat(11, 1fr);
  margin-bottom: 4px;
  align-items: center;
  align-content: center;
}
.c-keyboard__button {
  height: 66px;
  font-weight: bold;
  font-size: 24px;
}
.c-status {
  font-size: 11px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
}
.c-status__number {
  font-size: 16px;
  font-weight: bold;
}
.c-result__header {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
ol {
  padding: 0;
  padding-left: 16px;
}
ul {
  padding: 0;
  list-style: none;
}
ul > li {
  display: grid;
  grid-template-columns: 16px 1fr;
}
ul > li:before {
  content: "💀";
  display: inline;
  margin-left: -3px;
}

.c-input__label {
  background-color: transparent;
  color: inherit;
}

.c-published-position {
  margin-left: 4px;
  font-size: 9px;
  color: inherit;
}

.c-published-letter {
  font-weight: bold;
  border-radius: 1.5px;
  color: #fff;
  font-size: 10px;
  text-align: center;
}

.c-past {
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(18, 1fr);
  height: min-content;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
}

.c-input--absent {
  background-color: black;
}
.c-input--present {
  background-color: #d3ad69;
}
.c-input--correct {
  background-color: #3aa394;
}
</style>
