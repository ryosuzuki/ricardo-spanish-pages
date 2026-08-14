# Ricardo Spanish — Reysol

A mobile-first Spanish learning web app built from Ricardo Rodriguez's actual spoken Spanish in Kashiwa Reysol-related primary video sources.

## Deployment

- Live app: https://ryosuzuki.github.io/ricardo-spanish-pages/
- Primary source repository: private
- Public repository: deployment-only static mirror at https://github.com/ryosuzuki/ricardo-spanish-pages

## Features

- Sentence-level lessons bound to a source video and exact timestamp
- Japanese meaning, phrase structure, vocabulary, and football context
- Dual playback for every lesson: Ricardo's original delivery and clear Spanish study narration
- Clear narration highlights the currently spoken word and shows a Japanese gloss under every Spanish token
- Exact-stop original-audio clips for official videos that reject YouTube embedding
- Frequent-word bank and audio comprehension quiz
- Local saved-progress state and installable PWA shell
- Provenance ledger separating playable primary sources from deleted/unrecoverable videos

## Accuracy Contract

- No Spanish is reconstructed from Japanese translations.
- Lessons use playable original voice sources.
- YouTube Spanish auto-captions are minimally normalized and assigned a confidence level.
- Unavailable videos remain in a recovery ledger and are excluded from lesson data.

## Run Locally

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Corpus Snapshot

- 74 source-timestamped lessons
- 16 recurring football/interview vocabulary entries
- 12 playable primary sources, including pre-match interviews and post-match locker-room talks
- 61 short exact-stop original-audio excerpts from official sources
- 366 unique Spanish tokens with always-visible Japanese glosses
- 20 deleted 2025 post-match interview video IDs preserved for possible future recovery

## Source Policy

The app embeds YouTube playback when permitted. For official Kashiwa videos that reject embedding, it serves only the short sentence-level original-audio excerpt needed for study and retains the exact source URL and timestamp. It does not redistribute full videos or interviews.
