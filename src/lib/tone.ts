/**
 * The semantic status vocabulary shared by tone-aware primitives (Ping, Badge)
 * and by consumers that colour a state: callers pick a meaning, never a
 * palette, so two views of the same state can't drift apart.
 */
export type Tone = "success" | "warning" | "danger" | "neutral"
