# Migration status

## Foundation established

- [x] Keep both original standalone HTML files unchanged on the refactor branch.
- [x] Establish React + TypeScript + Vite app shell.
- [x] Add typed plugin registry foundation.
- [x] Add CSS-token theme system with three themes.
- [x] Extract completion scoring into a pure function and tests.
- [x] Add validation primitive for region-fill payloads.
- [x] Add CI workflow and developer commands.

## Not migrated yet

- [ ] Existing image segmentation and flood-fill rendering.
- [ ] Full palette, eraser, reset, and canvas interactions.
- [ ] Host room creation, joining, and player identity lifecycle.
- [ ] PeerJS connection/retry lifecycle and network message validation end-to-end.
- [ ] Persistence and restoration of team progress.
- [ ] End-to-end browser tests and mobile/manual parity checks.

Do not claim feature parity until these items have been implemented and tested.
