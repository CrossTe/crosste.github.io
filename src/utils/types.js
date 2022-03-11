export enum ValidKey {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
  I = "I",
  J = "J",
  K = "K",
  L = "L",
  M = "M",
  N = "N",
  O = "O",
  P = "P",
  Q = "Q",
  R = "R",
  S = "S",
  T = "T",
  U = "U",
  V = "V",
  W = "W",
  X = "X",
  Y = "Y",
  Z = "Z",
  ENTER = "ENTER",
  BACKSPACE = "BACKSPACE",
  BLANK = "",
}

export enum EvaluationState {
  UNKNOWN = "unknown",
  ABSENT = "absent",
  PRESENT = "present",
  CORRECT = "correct",
  MULTIPLE = "multiple",
}

export interface KeyInfo {
  key: ValidKey
  state: EvaluationState
}

export interface CellInfo {
  value: ValidKey
  state: EvaluationState
  wiggle?: boolean
}

export enum GameStatus {
  WIN = "win",
  LOSS = "loss",
}

export interface GameResult {
  status: GameStatus
  word: string
  streak: number
  guesses: number
  score: number
  cheated: boolean
}
