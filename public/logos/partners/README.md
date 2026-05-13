# Partner / Collaborator Logos

Place institution logos here. Each filename must match the `logo` field in
`lib/collaborators.ts`.

## Convention

| File                          | Collaborator slug        |
| ----------------------------- | ------------------------ |
| `mayo-clinic-mars.png`        | `mayo-clinic-mars`       |
| `surgical-ai2-lab.png`        | `surgical-ai2-lab`       |
| `sara-lab.png`                | `sara-lab`               |

## Format guidelines

- PNG with transparent background preferred (or SVG)
- Recommended width: 280px minimum, 560px for 2x retina
- Keep file size under 50 KB; optimize with Squoosh or svgo before committing

If a logo file is missing, the `<CollaboratorCard>` component will render the
institution's short name as a styled placeholder — no broken images.
